import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import {Card, CardBody} from '@heroui/card';
import LinkButton from '@/components/ui/LinkButton';
import BlogPostGrid from '@/components/features/BlogPostGrid';
import type { BlogListItem } from '@/lib/types';
import { getBloggerPosts } from '@/lib/blogger';
import { getAllPosts } from '@/lib/blog/utils';
import { renderMarkdownToHtml } from '@/lib/blog/markdown';

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Practical mental health insights and resources from Peyton Shaw Counseling.',
};

export const revalidate = 300;

export default async function BlogPage() {
  const localPosts = await getAllPosts();
  const bloggerPosts = await getBloggerPosts();
  const localPostItems: BlogListItem[] = localPosts.map((post) => ({
    id: post.slug,
    title: post.title,
    content: renderMarkdownToHtml(post.content),
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    readTime: post.readingTime,
    category: post.category,
    tags: post.keywords,
    url: `/blog/${post.slug}`,
    image: post.image,
    author: post.author,
  }));
  const blogPosts = bloggerPosts.length > 0 ? bloggerPosts : localPostItems;
  const hasPosts = blogPosts.length > 0;

  return (
    <>
      <Header />
      <main>
        <Hero
          title="Blog & Resources"
          subtitle="Practical insights for your mental health journey"
          description="Explore articles, tips, and resources designed to support clarity, calm, and growth."
          backgroundImage={false}
          showWave={false}
          size="standard"
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {!hasPosts && (
                <Card className="bg-primary-50 border-primary-200 mb-12">
                  <CardBody>
                    <div className="text-center py-4">
                      <p className="text-primary-800">
                        🚀 <strong>Coming Soon!</strong> I am building a library of practical resources and articles.
                        Check back soon for new posts.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              )}

              {hasPosts && (
                <BlogPostGrid posts={blogPosts} />
              )}

              {/* Newsletter Signup */}
              <div className="mt-16">
                <Card className="bg-secondary-50 border-secondary-200">
                  <CardBody>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Stay Updated
                      </h2>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Want to be notified when new articles are published? Reach out and we will
                        keep you in the loop.
                      </p>
                      <LinkButton
                        href="/contact"
                        color="secondary"
                        size="lg"
                      >
                        Get Updates
                      </LinkButton>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Resource Categories */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  Resource Categories
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['Anxiety', 'Depression', 'Relationships', 'Self-Care'].map((category) => (
                    <Card 
                      key={category} 
                      className="text-center hover:shadow-md transition-shadow cursor-pointer"
                      isPressable
                    >
                      <CardBody>
                        <p className="font-medium text-gray-900">{category}</p>
                        <p className="text-sm text-gray-500 mt-1">Coming Soon</p>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
