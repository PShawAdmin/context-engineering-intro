import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Testimonials from '@/components/features/Testimonials';
import LinkButton from '@/components/ui/LinkButton';
import { EmailButton } from '@/components/ui/EmailLink';
import { LOCATIONS } from '@/lib/locations';
import { generateMetaTags } from '@/lib/seo/utils';
import { targetKeywords } from '@/lib/seo/keywords';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import ParallaxPattern from '@/components/ui/ParallaxPattern';
import ParallaxReveal from '@/components/ui/ParallaxReveal';
import JsonLd from '@/components/seo/JsonLd';
import { generateWebPageSchema } from '@/lib/seo/schemas';
import ApproachAccordion from '@/components/features/ApproachAccordion';

export const metadata = generateMetaTags({
  title: 'Telehealth Therapy in Texas for Teens & Adults | Peyton Shaw',
  description:
    'Telehealth therapy for teens and adults across Texas, offering evidence-based care for anxiety, depression, relationship stress, and life transitions with secure online sessions.',
  keywords: [
    ...targetKeywords.primary.combined,
    ...targetKeywords.secondary.specialties.slice(0, 3),
    'mental health counseling',
    'licensed therapist near me'
  ],
  path: '/',
  image: '/images/peyton-shaw-main.jpg',
});

const APPROACH_POINTS = [
  'CBT tools for anxious or self-critical thoughts',
  'Mindfulness skills to return to the present',
  'Behavioral activation to rebuild energy',
  'Values-based choices that feel true to you',
  'Communication scripts for hard conversations',
  'Boundary tools to protect your time and energy'
];

const YOU_MIGHT_BE_HERE = [
  'Your mind will not turn off, even when you are exhausted.',
  'You are getting through the day, but it feels heavy.',
  'You keep replaying conversations and second-guessing yourself.',
  'You feel stuck, unmotivated, or disconnected from what matters.',
  'Relationships feel tense, uncertain, or harder than they should.'
];

const PROMISE_OUTCOMES = [
  {
    label: 'Feel',
    description: 'Less flooded. More steady.'
  },
  {
    label: 'Think',
    description: 'Fewer spirals. More clarity and self-trust.'
  },
  {
    label: 'Do',
    description: 'Simple tools you can use in the moments that matter.'
  }
];

const EXPECTATION_CARDS = [
  {
    title: 'Clear goals',
    description: 'A focus that builds from week to week'
  },
  {
    title: 'Practical tools',
    description: 'Strategies you can practice between sessions'
  },
  {
    title: 'Consistent support',
    description: 'A cadence that fits your life'
  },
  {
    title: 'Secure telehealth',
    description: 'Private sessions with clear privacy guidelines'
  },
];

export default function HomePage() {
  const googleMapsApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_PLACES_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';
  const googlePlaceId = process.env.GOOGLE_PLACE_ID || '';
  const businessMapQuery =
    process.env.NEXT_PUBLIC_BUSINESS_MAP_QUERY || 'Peyton Shaw Counseling, Southlake, TX';
  const mapCenter = process.env.NEXT_PUBLIC_DFW_MAP_CENTER || '32.8998,-97.0403';
  const staticMapStyles = [
    'feature:administrative|element:labels.text.fill|color:0x334155',
    'feature:administrative|element:labels.text.stroke|color:0xFAF5F0',
    'feature:poi|visibility:off',
    'feature:transit|visibility:off',
    'feature:road|element:geometry|color:0xCBD5E1',
    'feature:road|element:geometry.stroke|color:0x94A3B8',
    'feature:road.highway|element:geometry|color:0x94A3B8',
    'feature:road.highway|element:geometry.stroke|color:0x64748B',
    'feature:road|element:labels.icon|visibility:off',
    'feature:landscape|element:geometry|color:0xF8FAFC',
    'feature:water|element:geometry|color:0xE2E8F0',
  ];
  const staticMapStyleParams = staticMapStyles
    .map((style) => `style=${encodeURIComponent(style)}`)
    .join('&');
  const markerLocation = googlePlaceId ? `place_id:${googlePlaceId}` : businessMapQuery;
  const markerParam = `markers=${encodeURIComponent(`size:mid|color:0xD4A574|${markerLocation}`)}`;
  const dfwStaticMapUrl = googleMapsApiKey
    ? `https://maps.googleapis.com/maps/api/staticmap?key=${encodeURIComponent(googleMapsApiKey)}&center=${encodeURIComponent(mapCenter)}&zoom=8&size=1600x900&scale=2&maptype=roadmap&${staticMapStyleParams}&${markerParam}`
    : null;
  const dfwIframeFallbackUrl = `https://www.google.com/maps?q=${encodeURIComponent(businessMapQuery)}&z=8&output=embed`;

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
          title="Telehealth Therapy in Texas for Teens & Adults"
          subtitle="Calm, practical support for anxiety, depression, stress, and life transitions with secure online sessions across Texas. You will have a steady, supportive space to be heard, plus practical tools you can use between sessions."
          layout="split"
          backgroundImage={false}
          backgroundClassName="bg-background-dove"
          heroImage={{
            src: '/images/hero_image.png',
            alt: 'Peyton Shaw, LPC telehealth counseling in Texas',
            priority: true,
            objectPosition: 'center top'
          }}
          primaryAction={{
            label: "Book a consultation",
            href: "/contact"
          }}
          secondaryAction={{
            label: "How sessions work",
            href: "#session-blueprint"
          }}
          showWave={false}
        />
        <div
          className="-mt-24 h-24 bg-gradient-to-b from-transparent via-nude-linen/70 to-nude-linen"
          aria-hidden="true"
        />

        {/* About Preview */}
        <section className="section-padding bg-background-dove relative overflow-hidden -mt-[1px]">
          <div className="absolute inset-0 z-0 pattern-grain opacity-5"></div>
          <div className="absolute -inset-8 z-0 bg-nude-linen"></div>
          {/* Elegant chrysanthemum flower pattern watermark */}
          <ParallaxPattern className="absolute -inset-8 z-0 pattern-chrysanthemum opacity-10 pointer-events-none" />
          <div className="container relative z-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-up md:order-2">
                  <Heading level={2} className="mb-6">
                    Meet <span 
                      className="text-nude-clay text-4xl md:text-5xl lg:text-6xl inline-block font-script"
                    >
                      Peyton Shaw
                    </span>
                  </Heading>
                  <div className="mb-8">
                    <Text>
                      <span className="drop-cap float-left mr-2 font-serif text-6xl leading-[0.75] text-nude-clay rounded-lg px-2 py-1 -ml-1 mt-0">
                        I
                      </span>{' '}
                      am Peyton Shaw, a Licensed Professional Counselor providing telehealth therapy for
                      teens and adults across Texas. I offer a calm, collaborative space where you can feel
                      heard—and a practical approach that supports real-life change.
                    </Text>
                    <Text className="indent-8">
                      My work is grounded in CBT, mindfulness, and solution-focused strategies, with
                      sessions tailored to your goals and the pace that feels sustainable.
                    </Text>
                    <Text className="indent-8">
                      Specialties: anxiety, depression, life transitions, relationship stress, and
                      self-esteem.
                    </Text>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <LinkButton
                      href="/about"
                      className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8 shadow-clay hover:shadow-lg transition-all"
                    >
                      Learn More About My Approach
                    </LinkButton>
                    <LinkButton
                      href="/contact"
                      variant="bordered"
                      className="border-2 border-grey-charcoal text-grey-charcoal hover:bg-background-dove font-medium px-8 transition-all"
                    >
                      Schedule a Consultation
                    </LinkButton>
                  </div>
                </div>
                <div className="relative max-w-sm mx-auto md:order-1">
                <div className="aspect-[4/5] relative rounded-2xl overflow-hidden border border-nude-clay/50 shadow-[0_22px_60px_-36px_rgba(30,41,59,0.6)]">
                  <Image
                    src="/images/peyton-shaw-main.jpg"
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

        {/* Services Overview */}
        <section className="section-padding bg-nude-linen relative overflow-hidden">
          <div className="absolute inset-0 z-0 pattern-diagonal-lines opacity-35 pointer-events-none"></div>
          <div className="container relative z-10">
            <ParallaxReveal className="text-center mb-16" speed={0.04} maxOffset={10} fromOffset={6}>
              <Heading level={2} className="mb-4">
                Start with a clear plan
              </Heading>
              <Text size="xl" className="max-w-3xl mx-auto">
                Therapy that stays focused and flexible, grounded in evidence-based care and shaped
                around your goals. I keep the process practical and adjust as your needs change.
              </Text>
            </ParallaxReveal>

            <div className="space-y-10 lg:space-y-12">
              <ParallaxReveal
                className="bg-nude-cream/95 rounded-3xl p-8 md:p-10 shadow-soft mb-6 lg:mb-8"
                freezeOnce
              >
                <Heading level={3} className="mb-4 text-text-charcoal">
                  A calm, collaborative approach
                </Heading>
                <Text size="lg">
                  A steady, supportive space with a clear rhythm. I slow down when you need it and make
                  sure you leave each session with a next step.
                </Text>
                <ApproachAccordion
                  approachPoints={APPROACH_POINTS}
                  expectationCards={EXPECTATION_CARDS}
                  youMightBeHere={YOU_MIGHT_BE_HERE}
                  promiseOutcomes={PROMISE_OUTCOMES}
                />
              </ParallaxReveal>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* Areas Served */}
        <section className="section-padding bg-nude-cream relative overflow-hidden">
          {dfwStaticMapUrl ? (
            <div className="absolute inset-0 z-0 opacity-[0.16] pointer-events-none" aria-hidden="true">
              <Image
                src={dfwStaticMapUrl}
                alt=""
                fill
                sizes="100vw"
                unoptimized
                className="object-cover scale-[1.02] origin-center"
              />
            </div>
          ) : (
            <div className="absolute inset-0 z-0 opacity-8 pointer-events-none" aria-hidden="true">
              <iframe
                title="Map of the Dallas-Fort Worth area"
                src={dfwIframeFallbackUrl}
                className="h-full w-full border-0 scale-[1.02] origin-center"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                tabIndex={-1}
              />
            </div>
          )}
          <div className="absolute inset-0 z-0 bg-nude-cream/78 pointer-events-none" aria-hidden="true"></div>
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(250,245,240,0.58) 0%, rgba(245,230,211,0.42) 100%)' }}
            aria-hidden="true"
          ></div>
          <div className="absolute inset-0 z-0 pattern-grain opacity-4 pointer-events-none" aria-hidden="true"></div>
          <div className="container relative z-10">
            <div className="mb-10">
              <div className="max-w-4xl mx-auto text-center rounded-3xl border border-nude-clay bg-nude-cream/88 backdrop-blur-sm px-6 py-7 md:px-10 md:py-8 shadow-[0_24px_55px_-40px_rgba(30,41,59,0.55)]">
                <Heading level={2} className="mb-4">
                  Telehealth Across Texas
                </Heading>
                <Text size="lg" className="max-w-3xl mx-auto text-text-charcoal/95">
                  I offer telehealth-only therapy for teens and adults across Texas, including Southlake,
                  Grapevine, and surrounding communities.
                </Text>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {LOCATIONS.map((location) => (
                <Link
                  key={location.slug}
                  href="/areas-served"
                  className="px-4 py-2 bg-nude-cream text-nude-clay border border-nude-clay rounded-full text-sm hover:bg-nude-sand hover:text-nude-cream transition-colors"
                >
                  {location.name}, TX
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <LinkButton
                href="/areas-served"
                variant="bordered"
                className="bg-nude-cream border-2 border-nude-clay text-nude-clay hover:bg-nude-sand hover:text-nude-cream font-medium px-8"
              >
                View All Areas
              </LinkButton>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-background-dove relative overflow-hidden">
          <div className="absolute inset-0 pattern-diagonal-lines opacity-14 pointer-events-none"></div>
          <div className="absolute inset-0 pattern-grain opacity-8 pointer-events-none"></div>
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(900px circle at 50% -5%, rgba(255,255,255,0.28) 0%, transparent 62%)' }}
          ></div>
          <div className="container relative z-10 text-center">
            <Heading level={2} className="text-text-charcoal mb-6 animate-fade-in">
              Ready to take the next step?
            </Heading>
            <Text size="xl" className="md:text-2xl mb-10 max-w-3xl mx-auto animate-slide-up">
              If you&apos;re feeling overwhelmed, stuck, or just tired of carrying it alone, I can help you make a
              simple plan.
            </Text>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up [animation-delay:200ms]">
              <LinkButton
                href="/contact"
                size="lg"
                className="bg-nude-clay text-white hover:bg-nude-warm font-medium px-10 py-4 text-lg shadow-clay hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              >
                Book a consultation
              </LinkButton>
              <EmailButton
                label="Ask a question by email"
                variant="bordered"
                size="lg"
                className="border-2 border-nude-clay text-nude-clay hover:bg-nude-cream font-medium px-10 py-4 text-lg transition-all"
              />
            </div>
            <Text size="sm" className="mt-6 text-text-storm/90">
              No pressure—just clarity on fit and next steps.
            </Text>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
