import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import {Card, CardHeader, CardBody, CardFooter} from '@heroui/card';
import {Button} from '@heroui/button';
import {Chip} from '@heroui/chip';

export const metadata: Metadata = {
  title: 'Blog & Resources',
  description: 'Mental health insights, tips, and resources from Peyton Shaw Counseling.',
};

// Mock blog posts - in a real app, these would come from a CMS or database
const blogPosts = [
  {
    id: '1',
    title: 'Understanding Anxiety: Signs, Symptoms, and Coping Strategies',
    slug: 'understanding-anxiety',
    excerpt: 'Anxiety is more than just worry. Learn to recognize the signs and discover effective strategies to manage anxiety in daily life.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Anxiety',
    tags: ['anxiety', 'mental health', 'coping strategies'],
  },
  {
    id: '2',
    title: 'The Power of Mindfulness in Therapy',
    slug: 'power-of-mindfulness',
    excerpt: 'Explore how mindfulness techniques can enhance your therapy journey and improve overall mental well-being.',
    date: '2024-01-08',
    readTime: '4 min read',
    category: 'Mindfulness',
    tags: ['mindfulness', 'therapy techniques', 'meditation'],
  },
  {
    id: '3',
    title: 'Navigating Life Transitions with Grace',
    slug: 'navigating-life-transitions',
    excerpt: 'Major life changes can be overwhelming. Here are strategies to help you adapt and thrive during times of transition.',
    date: '2024-01-01',
    readTime: '6 min read',
    category: 'Life Transitions',
    tags: ['life changes', 'adaptation', 'resilience'],
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Blog & Resources"
          subtitle="Insights and Tools for Your Mental Health Journey"
          description="Explore articles, tips, and resources to support your path to wellness"
          backgroundImage={false}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Coming Soon Notice */}
              <Card className="bg-primary-50 border-primary-200 mb-12">
                <CardBody>
                  <div className="text-center py-4">
                    <p className="text-primary-800">
                      🚀 <strong>Coming Soon!</strong> I&apos;m working on creating valuable content to support your mental health journey. 
                      Check back soon for articles, tips, and resources.
                    </p>
                  </div>
                </CardBody>
              </Card>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start w-full">
                        <Chip size="sm" variant="flat" color="primary">
                          {post.category}
                        </Chip>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                    </CardHeader>
                    <CardBody className="py-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </CardBody>
                    <CardFooter className="pt-2">
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <Button
                          as={Link}
                          href={`/blog/${post.slug}`}
                          variant="light"
                          color="primary"
                          size="sm"
                          isDisabled
                        >
                          Coming Soon
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Newsletter Signup */}
              <div className="mt-16">
                <Card className="bg-secondary-50 border-secondary-200">
                  <CardBody>
                    <div className="text-center py-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Stay Updated
                      </h2>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Want to be notified when new articles are published? Join our mailing list 
                        for mental health insights, tips, and resources delivered to your inbox.
                      </p>
                      <Button
                        as={Link}
                        href="/contact"
                        color="secondary"
                        size="lg"
                      >
                        Get In Touch
                      </Button>
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