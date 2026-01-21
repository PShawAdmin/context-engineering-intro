import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Testimonials from '@/components/features/Testimonials';
import {Button} from '@heroui/button';
import { LOCATIONS } from '@/lib/locations';
import { generateMetaTags } from '@/lib/seo/utils';
import { targetKeywords } from '@/lib/seo/keywords';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import JsonLd from '@/components/seo/JsonLd';
import { generateWebPageSchema } from '@/lib/seo/schemas';

export const metadata = generateMetaTags({
  title: 'Licensed Therapist & Counseling Services',
  description: 'Telehealth therapy focused on teens and adults across Texas. Evidence-based support for anxiety, depression, and life transitions.',
  keywords: [
    ...targetKeywords.primary.combined,
    ...targetKeywords.secondary.specialties.slice(0, 3),
    'mental health counseling',
    'licensed therapist near me'
  ],
  path: '/',
  image: '/images/peyton-shaw-professional.jpg',
});

export default function HomePage() {
  // Generate homepage-specific schema
  const webPageSchema = generateWebPageSchema({
    name: 'Peyton Shaw Counseling - Telehealth Therapy for Teens and Adults in Texas',
    description: metadata.description as string,
    breadcrumb: [
      { name: 'Home', url: '/' }
    ]
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <Header />
      <main>
        {/* Hero Section */}
        <Hero
          title="Therapy That Fits Your Life"
          subtitle="Telehealth for teens and adults across Texas"
          description="Personalized support for anxiety, depression, stress, and life transitions for teens and adults. All sessions are online through secure video."
          primaryAction={{
            label: "Book a Consultation",
            href: "/contact"
          }}
          secondaryAction={{
            label: "Meet Peyton",
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
                Focused, evidence-based therapy for teens and adults managing anxiety, depression,
                relationship stress, and life transitions. Care is tailored to your goals with
                telehealth-only sessions available across Texas.
              </Text>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-nude-cream border border-nude-sand rounded-2xl p-8 md:p-12 shadow-soft">
                <Heading level={3} className="mb-4 text-text-charcoal">
                  A thoughtful approach to the challenges you are facing
                </Heading>
                <Text size="lg">
                  I help teens and adults work through anxiety, low mood, stress, relationship strain,
                  and life transitions. Sessions are collaborative and practical, grounded in CBT,
                  mindfulness, and solution-focused strategies so you can use the tools between
                  appointments.
                </Text>
                <Text size="sm" className="mt-4 text-text-storm">
                  Common focus areas include anxiety, depression, life transitions, relationship
                  stress, and self-esteem. All care is telehealth-only across Texas.
                </Text>
                <div className="mt-8">
                  <Button
                    as={Link}
                    href="/services"
                    variant="bordered"
                    size="lg"
                    className="border-2 border-nude-clay text-nude-clay hover:bg-nude-linen font-medium px-8 transition-all"
                  >
                    View Service Details
                  </Button>
                </div>
              </div>
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
                      s a licensed professional counselor, I provide telehealth-only care for teens and
                      adults across Texas. I offer a calm, collaborative space where you can feel heard
                      and supported. My approach blends evidence-based therapy with practical tools to
                      move forward with clarity and confidence.
                    </Text>
                    <Text className="indent-8">
                      I specialize in anxiety, depression, life transitions, and relationship challenges
                      for teens and adults, with sessions tailored to your goals and grounded in CBT,
                      mindfulness, and person-centered care. All appointments are online through secure
                      video.
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
                      Book a Consultation
                    </Button>
                  </div>
                </div>
                <div className="relative max-w-sm mx-auto">
                  <div className="aspect-square relative rounded-2xl overflow-hidden shadow-warm">
                    <Image
                      src="/images/peyton-shaw-professional.jpg"
                      alt="Peyton Shaw - Licensed Professional Counselor (Telehealth in Texas)"
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

        {/* Areas Served */}
        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="text-center mb-10">
              <Heading level={2} className="mb-4">
                Telehealth Across Texas
              </Heading>
              <Text size="lg" className="max-w-3xl mx-auto">
                We provide telehealth-only therapy for teens and adults across Texas, including Southlake,
                Grapevine, and surrounding communities.
              </Text>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {LOCATIONS.map((location) => (
                <Link
                  key={location.slug}
                  href={`/areas-served/${location.slug}`}
                  className="px-4 py-2 bg-nude-cream text-text-storm rounded-full text-sm hover:bg-nude-sand transition-colors"
                >
                  {location.name}, TX
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button
                as={Link}
                href="/areas-served"
                variant="bordered"
                className="border-2 border-nude-clay text-nude-clay hover:bg-nude-linen font-medium px-8"
              >
                View All Areas
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-nude-clay relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-10"></div>
          <div className="container relative z-10 text-center">
            <Heading level={2} className="text-white mb-6 animate-fade-in">
              Ready to Get Started?
            </Heading>
            <Text size="xl" color="white" className="md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto animate-slide-up">
              Take the next step with supportive, evidence-based care tailored to your goals.
            </Text>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up [animation-delay:200ms]">
              <Button
                as={Link}
                href="/contact"
                size="lg"
                className="bg-nude-cream text-nude-clay hover:bg-nude-linen font-medium px-10 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Book a Consultation
              </Button>
              <Button
                as={Link}
                href="/faq"
                variant="bordered"
                size="lg"
                className="border-2 border-nude-cream text-nude-cream hover:bg-nude-cream/10 font-medium px-10 py-4 text-lg backdrop-blur-sm transition-all"
              >
                Explore FAQs
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
