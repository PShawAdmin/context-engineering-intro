import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import {Card, CardHeader, CardBody} from '@heroui/card';
import {Button} from '@heroui/button';

export const metadata: Metadata = {
  title: 'About Peyton Shaw',
  description: 'Meet Peyton Shaw, licensed professional counselor providing telehealth-only care for teens and adults across Texas.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="About Peyton Shaw"
          subtitle="Licensed Professional Counselor"
          description="Evidence-based therapy grounded in compassion, clarity, and collaboration"
          backgroundImage={false}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      My Journey to Therapy
                    </h2>
                    <div className="prose prose-lg text-gray-700 space-y-4">
                      <p>
                        Welcome. I&apos;m Peyton Shaw, a licensed professional counselor who specializes in
                        helping teens and adults navigate anxiety, depression, life transitions,
                        and relationship stress. My goal is to offer a calm, respectful space where you
                        can feel understood and supported.
                      </p>
                      <p>
                        With years of experience in mental health counseling, I&apos;ve worked with teens,
                        adults, and families facing a wide range of challenges. That experience
                        continues to shape a personalized, practical approach to care.
                      </p>
                      <p>
                        Therapy is a collaborative process. We will define goals together, explore what
                        gets in the way, and build tools you can use in daily life. Sessions are
                        telehealth-only and delivered through secure video across Texas.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      My Therapeutic Approach
                    </h3>
                    <p className="text-gray-700 mb-6">
                      I blend evidence-based practices with a warm, person-centered style. Common
                      approaches include:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: 'Cognitive Behavioral Therapy (CBT)',
                          description: 'Identify and shift unhelpful thought patterns',
                        },
                        {
                          title: 'Mindfulness-Based Techniques',
                          description: 'Build present-moment awareness and steadier coping',
                        },
                        {
                          title: 'Solution-Focused Therapy',
                          description: 'Use strengths to create practical change',
                        },
                        {
                          title: 'Trauma-Informed Care',
                          description: 'Prioritize safety, choice, and stabilization',
                        },
                      ].map((approach, index) => (
                        <Card key={index} className="border-l-4 border-primary-500">
                          <CardBody>
                            <h4 className="font-semibold text-gray-900">{approach.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{approach.description}</p>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      What to Expect
                    </h3>
                    <div className="space-y-4 text-gray-700">
                      <p>
                        In our work together, you can expect:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>A calm, welcoming telehealth space to explore what matters most</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Collaborative goal setting and progress check-ins</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Practical tools you can use between telehealth sessions</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Respect for your privacy and confidentiality</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-6 h-6 text-secondary-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Care that is practical, warm, and collaborative</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Professional Photo */}
                  <Card className="overflow-hidden">
                    <div className="aspect-[4/5] relative">
                      <Image
                        src="/images/peyton-shaw-professional.jpg"
                        alt="Peyton Shaw - Licensed Professional Counselor"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </Card>

                  {/* Credentials */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Education & Credentials</h3>
                    </CardHeader>
                    <CardBody className="space-y-3">
                      <div>
                        <p className="font-medium text-gray-900">Master of Arts</p>
                        <p className="text-sm text-gray-600">University of North Texas</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Bachelor of Science</p>
                        <p className="text-sm text-gray-600">University of North Texas</p>
                      </div>
                      <div className="pt-2 border-t">
                        <p className="font-medium text-gray-900">Licensed Professional Counselor</p>
                        <p className="text-sm text-gray-600">State of Texas • License #86177</p>
                      </div>
                    </CardBody>
                  </Card>

                  {/* Professional Memberships */}
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Professional Memberships</h3>
                    </CardHeader>
                    <CardBody>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          American Counseling Association
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Texas Counseling Association
                        </li>
                        <li className="flex items-center">
                          <svg className="w-4 h-4 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          International Association of Counselors
                        </li>
                      </ul>
                    </CardBody>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-primary-50 border-primary-200">
                    <CardBody className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ready to Get Started?
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Take the first step with supportive, evidence-based care.
                      </p>
                      <Button
                        as={Link}
                        href="/contact"
                        color="primary"
                        className="w-full"
                      >
                        Book a Consultation
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Note */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                A Personal Note
              </h2>
              <div className="text-lg text-gray-700 space-y-4">
                <p>
                  Reaching out for therapy can feel like a big step. I aim to make the process
                  clear and supportive, whether you are facing a specific challenge or simply
                  feeling stuck.
                </p>
                <p>
                  You deserve care that feels personal, respectful, and practical. I would be
                  honored to support you as you move toward the changes you want to make.
                </p>
                <p className="font-medium text-primary-600">
                  — Peyton Shaw, LPC
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
