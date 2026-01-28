import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import LinkButton from '@/components/ui/LinkButton';
import JsonLd from '@/components/seo/JsonLd';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { getAllPosts, getPostBySlug } from '@/lib/blog/utils';
import { renderMarkdownToHtml } from '@/lib/blog/markdown';
import { businessInfo } from '@/lib/constants';
import { generateMetaTags } from '@/lib/seo/utils';
import { generateArticleSchema, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/schemas';

export const revalidate = 300;

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Guide Not Found' };
  }

  return generateMetaTags({
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    image: post.image,
    path: `/guides/${post.slug}`,
    includeLocation: false,
    ogType: 'article',
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.url;
  const contentHtml = post.contentHtml ?? renderMarkdownToHtml(post.content);
  const pageUrl = `/guides/${post.slug}`;

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: post.title, url: pageUrl },
  ];

  const webPageSchema = generateWebPageSchema({
    name: post.title,
    description: post.excerpt,
    breadcrumb: breadcrumbItems,
    url: pageUrl,
  });

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    author: post.author,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.image,
    url: `${siteUrl}${pageUrl}`,
  });

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd data={webPageSchema} />
      <JsonLd data={articleSchema} />
      <Header />
      <main>
        <Hero
          title={post.title}
          subtitle={`${post.category} • ${formatDate(post.publishedAt)} • ${post.readingTime} min read`}
          description={post.excerpt}
          backgroundImage={false}
          showWave={false}
          size="standard"
        />

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto space-y-10">
              <article>
                <div
                  className="text-text-storm leading-relaxed font-news [&_p]:mb-4 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-news [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-news [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_blockquote]:border-l-4 [&_blockquote]:border-nude-sand [&_blockquote]:pl-4 [&_blockquote]:text-text-storm [&_img]:rounded-2xl [&_img]:my-6 [&_img]:w-full [&_a]:text-nude-clay [&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
              </article>

              <div className="rounded-2xl border border-nude-linen bg-nude-cream/90 p-6 text-center">
                <Heading level={3} className="text-text-charcoal mb-2">
                  Ready to talk?
                </Heading>
                <Text className="text-text-storm mb-4">
                  If you have questions or want to schedule a consultation, I would be glad to help.
                </Text>
                <LinkButton href="/contact" className="bg-nude-clay text-white hover:bg-nude-clay/90">
                  Book a Consultation
                </LinkButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
