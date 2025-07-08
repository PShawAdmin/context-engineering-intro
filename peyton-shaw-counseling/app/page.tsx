import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Testimonials from '@/components/features/Testimonials';
import {Card, CardHeader, CardBody} from '@heroui/card';
import {Button} from '@heroui/button';
import { SERVICES, SITE_CONFIG } from '@/lib/constants';
import { generateMetaTags } from '@/lib/seo/utils';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';

export const metadata = generateMetaTags({
  title: 'Therapist in Southlake TX | Peyton Shaw Counseling - Anxiety & Depression Help',
  description: 'Licensed therapist in Southlake, TX specializing in anxiety, depression & life transitions. In-person & online therapy. Accepting new patients. Book today.',
  keywords: ['therapist southlake tx', 'counseling services southlake', 'anxiety therapist near me', 'depression treatment southlake texas', 'individual therapy southlake', 'mental health counseling southlake', 'psychotherapy southlake texas'],
  image: '/images/peyton-shaw-professional.jpg',
});

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          title="Find Peace and Purpose Through Professional Therapy"
          subtitle={SITE_CONFIG.tagline}
          description="Take the first step towards emotional well-being. Book your appointment today and begin your journey to a healthier, happier you."
          primaryAction={{
            label: "Book Your First Session",
            href: "/contact"
          }}
          secondaryAction={{
            label: "Learn More",
            href: "/about"
          }}
        />

        {/* Services Overview */}
        <section className="section-padding bg-background-dove relative overflow-hidden -mt-[1px] pt-24">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-pattern-watercolor opacity-30"></div>
          <div className="container relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <Heading level={2} className="mb-4">
                How I Can Help
              </Heading>
              <Text size="xl" className="max-w-3xl mx-auto">
                I offer specialized therapy services tailored to your unique needs, 
                providing compassionate support for various life challenges.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {SERVICES.slice(0, 6).map((service, index) => (
                <Card 
                  key={service.id} 
                  className={`group bg-nude-cream border border-nude-sand hover:border-nude-clay shadow-soft hover:shadow-clay card-hover-effect hover:scale-[1.015] hover:animate-gentle-bounce [animation-delay:${index * 100}ms] h-full flex flex-col`}
                >
                  <CardHeader className="pb-4 pt-6 px-6">
                    <div className="flex items-start justify-between w-full gap-3">
                      <Heading level={5} className="group-hover:text-nude-clay transition-colors duration-500 ease-in-out flex-1">
                        {service.title}
                      </Heading>
                      <div className="w-10 h-10 min-w-[2.5rem] rounded-full bg-nude-linen flex items-center justify-center group-hover:bg-nude-sand transition-all duration-500 ease-in-out flex-shrink-0">
                        {service.id === '1' && (
                          <svg className="w-5 h-5 text-nude-clay transition-colors duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                        {service.id === '2' && (
                          <svg className="w-5 h-5 text-nude-clay transition-colors duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        )}
                        {service.id === '3' && (
                          <svg className="w-5 h-5 text-nude-clay transition-colors duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                        {service.id === '4' && (
                          <svg className="w-5 h-5 text-nude-clay transition-colors duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        )}
                        {service.id === '5' && (
                          <svg className="w-5 h-5 text-nude-clay transition-colors duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                        {service.id === '6' && (
                          <svg className="w-5 h-5 text-nude-clay transition-colors duration-500 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-6 pb-6 flex flex-col flex-1">
                    <Text className="mb-6 flex-1">
                      {service.description}
                    </Text>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center text-sm text-text-storm">
                        <svg className="w-4 h-4 mr-2 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.duration}
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-nude-clay hover:text-grey-charcoal transition-colors duration-300 relative group/link"
                      >
                        <span className="relative">
                          Learn More
                          <span className="link-underline-animation absolute -bottom-0.5 left-0 h-[1px] w-full origin-left scale-x-0 bg-nude-clay group-hover/link:scale-x-100 transition-transform duration-300 ease-out"></span>
                        </span>
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                as={Link}
                href="/services"
                variant="bordered"
                size="lg"
                className="border-2 border-nude-clay text-nude-clay hover:bg-nude-linen font-medium px-8 transition-all"
              >
                View All Services
              </Button>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="section-padding bg-nude-linen relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-blob opacity-10"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          {/* Elegant chrysanthemum flower pattern watermark */}
          <div className="absolute inset-0 pattern-chrysanthemum opacity-10"></div>
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-up">
                  <Heading level={2} className="mb-6">
                    Meet <span 
                      className="text-nude-clay text-4xl md:text-5xl lg:text-6xl inline-block font-script"
                    >
                      Peyton Shaw
                    </span>
                  </Heading>
                  <div className="mb-8">
                    <span className="drop-cap float-left mr-2 font-serif text-6xl leading-[0.75] text-nude-clay rounded-lg px-2 py-1 -ml-1 mt-0">
                      A
                    </span>
                    <Text>
                      s a licensed therapist with years of experience, I&apos;m dedicated to providing a safe, non-judgmental space where you can explore your thoughts, feelings, and experiences. My approach combines evidence-based techniques with genuine compassion, helping you develop the tools and insights needed to navigate life&apos;s challenges and achieve lasting positive change.
                    </Text>
                    <Text className="indent-8">
                      I specialize in working with individuals facing anxiety, depression, life transitions, and relationship challenges. My therapeutic style integrates Cognitive Behavioral Therapy (CBT), mindfulness practices, and person-centered approaches tailored to your unique needs. Whether you&apos;re seeking support during a difficult time or looking to enhance your personal growth, I&apos;m here to walk alongside you on your journey toward healing and self-discovery.
                    </Text>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      as={Link}
                      href="/about"
                      className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8 shadow-clay hover:shadow-lg transition-all"
                    >
                      Learn More About My Approach
                    </Button>
                    <Button
                      as={Link}
                      href="/contact"
                      variant="bordered"
                      className="border-2 border-grey-charcoal text-grey-charcoal hover:bg-background-dove font-medium px-8 transition-all"
                    >
                      Schedule a Consultation
                    </Button>
                  </div>
                </div>
                <div className="relative max-w-sm mx-auto">
                  <div className="aspect-square relative rounded-2xl overflow-hidden shadow-warm">
                    <Image
                      src="/images/peyton-shaw-professional.jpg"
                      alt="Peyton Shaw - Licensed Therapist"
                      width={340}
                      height={340}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-14 h-14 bg-nude-sand rounded-full filter blur-2xl opacity-40"></div>
                  <div className="absolute -bottom-2 -left-2 w-18 h-18 bg-grey-blue-light rounded-full filter blur-2xl opacity-30"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA Section */}
        <section className="section-padding bg-nude-clay relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-10"></div>
          <div className="container relative z-10 text-center">
            <Heading level={2} className="text-white mb-6 animate-fade-in">
              Ready to Begin Your Journey?
            </Heading>
            <Text size="xl" color="white" className="md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto animate-slide-up">
              Take the first step towards positive change. Schedule your appointment today 
              and let&apos;s work together towards your goals.
            </Text>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up [animation-delay:200ms]">
              <Button
                as={Link}
                href="/contact"
                size="lg"
                className="bg-nude-cream text-nude-clay hover:bg-nude-linen font-medium px-10 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Book Your First Session
              </Button>
              <Button
                as={Link}
                href="/faq"
                variant="bordered"
                size="lg"
                className="border-2 border-nude-cream text-nude-cream hover:bg-nude-cream/10 font-medium px-10 py-4 text-lg backdrop-blur-sm transition-all"
              >
                Have Questions? Read FAQ
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}