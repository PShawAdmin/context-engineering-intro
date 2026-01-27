import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Card, CardBody } from '@heroui/card';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { getAllPosts } from '@/lib/blog/utils';

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Practical guides and resources from Peyton Shaw Counseling.',
};

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value));

export default async function GuidesPage() {
  const posts = await getAllPosts();
  const hasPosts = posts.length > 0;

  return (
    <>
      <Header />
      <main>
        <Hero
          title="Guides"
          subtitle="Practical resources to support clarity, calm, and growth"
          description="Short, actionable guides on therapy, mental health, and next steps."
          backgroundImage={false}
          showWave={false}
          size="standard"
        />

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              {!hasPosts && (
                <Card className="bg-primary-50 border-primary-200">
                  <CardBody>
                    <div className="text-center py-4">
                      <p className="text-primary-800">
                        🚀 <strong>Coming Soon!</strong> Guides are in development. Check back soon.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              )}

              {hasPosts && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {posts.map((post) => (
                    <Card key={post.slug} className="bg-nude-cream border border-nude-linen shadow-soft">
                      <CardBody>
                        <div className="flex items-center justify-between text-xs text-text-storm mb-2">
                          <span>{post.category}</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                        <Heading level={3} className="text-text-charcoal text-xl mb-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-nude-clay transition-colors">
                            {post.title}
                          </Link>
                        </Heading>
                        <Text className="text-text-storm mb-4">{post.excerpt}</Text>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-nude-clay hover:text-nude-clay/80 font-medium"
                        >
                          Read the guide →
                        </Link>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
