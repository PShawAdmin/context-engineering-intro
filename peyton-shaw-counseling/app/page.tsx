import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Testimonials from '@/components/features/Testimonials';
import LinkButton from '@/components/ui/LinkButton';
import { LOCATIONS } from '@/lib/locations';
import { generateMetaTags } from '@/lib/seo/utils';
import { targetKeywords } from '@/lib/seo/keywords';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import ParallaxPattern from '@/components/ui/ParallaxPattern';
import ParallaxReveal from '@/components/ui/ParallaxReveal';
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

const APPROACH_POINTS = [
  'CBT and cognitive tools for anxious thoughts',
  'Mindfulness-based practices for grounding',
  'Solution-focused strategies for forward motion',
  'Person-centered support with room to be yourself',
];

const EXPECTATION_CARDS = [
  {
    title: 'Clear goals',
    description: 'We define a focus for therapy so each session builds on the last.',
  },
  {
    title: 'Practical tools',
    description: 'You get strategies you can use between sessions to manage stress and emotions.',
  },
  {
    title: 'Consistent support',
    description: 'We set a cadence that works for your life so progress feels steady.',
  },
  {
    title: 'Private telehealth care',
    description: 'Online sessions are secure and designed to feel calm and grounded.',
  },
];

const SESSION_STEPS = [
  'Clarify what is bringing you in and identify the outcomes you want most.',
  'Create a realistic plan with tools you can practice between sessions.',
  'Set a cadence that fits your schedule and keeps progress steady.',
];

const TELEHEALTH_DETAILS = [
  'Secure video sessions with clear guidelines for privacy and comfort.',
  'Flexible scheduling to fit school, work, and family commitments.',
  'A calm, structured process that keeps sessions focused and productive.',
];

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
          subtitle="Telehealth therapy for teens and adults across Texas"
          description="Personalized support for anxiety, depression, stress, and life transitions with secure online sessions that meet you where you are."
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
          <div className="container relative z-10">
            <ParallaxReveal className="text-center mb-16" speed={0.04} maxOffset={10} fromOffset={6}>
              <Heading level={2} className="mb-4">
                Start with a clear plan
              </Heading>
              <Text size="xl" className="max-w-3xl mx-auto">
                Focused, evidence-based therapy for teens and adults managing anxiety, depression,
                relationship stress, and life transitions. Telehealth-only sessions are available
                across Texas.
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
                  Sessions are practical and supportive, grounded in CBT, mindfulness, and solution-focused
                  strategies so you can use the tools between appointments. We define goals early and
                  revisit them so each session builds steady momentum.
                </Text>
                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {APPROACH_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-text-storm">
                      <span className="mt-2 h-2 w-2 rounded-full bg-nude-clay shrink-0"></span>
                      <Text as="span" size="sm">
                        {point}
                      </Text>
                    </li>
                  ))}
                </ul>
                <Text size="sm" className="mt-6 text-text-storm">
                  Common focus areas include anxiety, depression, life transitions, relationship
                  stress, and self-esteem.
                </Text>
              </ParallaxReveal>

              <div className="mt-12 lg:mt-14 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                  <ParallaxReveal
                    className="rounded-2xl bg-nude-cream/95 p-6 shadow-soft h-full"
                    speed={0}
                    maxOffset={0}
                    fromOffset={0}
                    fromX={-28}
                    freezeOnce
                  >
                    <Heading level={3} className="mb-4 text-text-charcoal">
                      What to expect
                    </Heading>
                    <ul className="space-y-4 text-text-storm">
                      {EXPECTATION_CARDS.map((card) => (
                        <li key={card.title} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-nude-clay mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <Text weight="semibold" color="charcoal" as="span" className="block mb-1">
                              {card.title}
                            </Text>
                            <Text size="sm">
                              {card.description}
                            </Text>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ParallaxReveal>

                  <ParallaxReveal
                    className="rounded-2xl bg-nude-cream/95 p-6 shadow-soft h-full"
                    speed={0}
                    maxOffset={0}
                    fromOffset={0}
                    fromX={28}
                    freezeOnce
                  >
                      <Heading level={3} className="mb-4 text-text-charcoal">
                        Telehealth details
                      </Heading>
                      <ul className="space-y-3 text-text-storm">
                        {TELEHEALTH_DETAILS.map((detail) => (
                          <li key={detail} className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-nude-clay mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <Text as="span" size="sm">
                              {detail}
                            </Text>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 border-t border-nude-linen/70 pt-5">
                        <Text size="xs" weight="semibold" className="uppercase tracking-[0.2em] text-text-slate mb-3">
                          Care commitments
                        </Text>
                        <div className="space-y-3 text-text-storm">
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          <Text weight="medium" as="span">Confidential care</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <Text weight="medium" as="span">Superbills available</Text>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <Text weight="medium" as="span">Evidence-based care</Text>
                        </div>
                      </div>
                      </div>
                      <div className="mt-6">
                        <LinkButton
                          href="/contact"
                          className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-6 py-2 shadow-clay transition-all"
                        >
                          Schedule a Consultation
                        </LinkButton>
                      </div>
                  </ParallaxReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="section-padding bg-nude-linen relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-pattern-blob opacity-10"></div>
          <div className="absolute inset-0 z-0 pattern-grain opacity-5"></div>
          {/* Elegant chrysanthemum flower pattern watermark */}
          <ParallaxPattern className="absolute -inset-8 z-0 pattern-chrysanthemum opacity-10 pointer-events-none" />
          <div className="container relative z-20">
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
                <div className="relative max-w-sm mx-auto">
                <div className="aspect-square relative rounded-2xl overflow-hidden border border-nude-clay/50 shadow-[0_22px_60px_-36px_rgba(30,41,59,0.6)]">
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
        <section className="section-padding bg-nude-linen">
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
              <LinkButton
                href="/areas-served"
                variant="bordered"
                className="border-2 border-nude-clay text-nude-clay hover:bg-nude-linen font-medium px-8"
              >
                View All Areas
              </LinkButton>
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
              <LinkButton
                href="/contact"
                size="lg"
                className="bg-nude-cream text-nude-clay hover:bg-nude-linen font-medium px-10 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Start Your Consultation
              </LinkButton>
              <LinkButton
                href="/faq"
                variant="bordered"
                size="lg"
                className="border-2 border-nude-cream text-nude-cream hover:bg-nude-cream/10 font-medium px-10 py-4 text-lg backdrop-blur-sm transition-all"
              >
                Explore FAQs
              </LinkButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
