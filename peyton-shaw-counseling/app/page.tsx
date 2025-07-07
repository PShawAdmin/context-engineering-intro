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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-charcoal mb-4">
                How I Can Help
              </h2>
              <p className="text-lg md:text-xl text-text-storm max-w-3xl mx-auto leading-relaxed">
                I offer specialized therapy services tailored to your unique needs, 
                providing compassionate support for various life challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {SERVICES.slice(0, 6).map((service, index) => (
                <Card 
                  key={service.id} 
                  className={`group bg-nude-cream border border-nude-sand hover:border-nude-clay shadow-soft hover:shadow-clay hover:transform hover:-translate-y-1 transition-all duration-300 [animation-delay:${index * 100}ms]`}
                >
                  <CardHeader className="pb-4 pt-6 px-6">
                    <div className="flex items-start justify-between w-full">
                      <h3 className="text-xl font-serif text-text-charcoal group-hover:text-nude-clay transition-colors duration-200">
                        {service.title}
                      </h3>
                      <div className="w-10 h-10 rounded-full bg-nude-linen flex items-center justify-center group-hover:bg-nude-sand transition-colors duration-200">
                        <svg className="w-5 h-5 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody className="px-6 pb-6">
                    <p className="text-text-storm mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-grey-storm">
                        <svg className="w-4 h-4 mr-2 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.duration}
                      </div>
                      <Button
                        as={Link}
                        href={`/services/${service.slug}`}
                        variant="light"
                        className="font-medium text-nude-clay hover:text-grey-charcoal transition-colors"
                        endContent={
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        }
                      >
                        Learn More
                      </Button>
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
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-text-charcoal mb-6">
                    Meet <span 
                      className="text-nude-clay text-4xl md:text-5xl lg:text-6xl inline-block font-script"
                    >
                      Peyton Shaw
                    </span>
                  </h2>
                  <p className="text-lg md:text-xl text-text-storm mb-6 leading-relaxed">
                    As a licensed therapist with years of experience, I&apos;m dedicated to 
                    providing a safe, non-judgmental space where you can explore your thoughts, 
                    feelings, and experiences.
                  </p>
                  <p className="text-grey-storm mb-8 leading-relaxed">
                    My approach combines evidence-based techniques with genuine compassion, 
                    helping you develop the tools and insights needed to navigate life&apos;s 
                    challenges and achieve lasting positive change.
                  </p>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 animate-fade-in">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Take the first step towards positive change. Schedule your appointment today 
              and let&apos;s work together towards your goals.
            </p>
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