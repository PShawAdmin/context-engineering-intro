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

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-start">
              <div className="space-y-8">
                <ParallaxReveal className="bg-nude-cream/95 rounded-3xl p-8 md:p-10 shadow-soft">
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

                <div className="space-y-4">
                  <ParallaxReveal>
                    <Text size="xs" weight="semibold" className="uppercase tracking-[0.25em] text-text-slate">
                      What you can expect
                    </Text>
                  </ParallaxReveal>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {EXPECTATION_CARDS.map((card) => (
                      <ParallaxReveal
                        key={card.title}
                        className="rounded-2xl bg-nude-cream/95 p-5 shadow-soft"
                        maxOffset={14}
                        speed={0.06}
                        fromOffset={10}
                      >
                        <Text weight="semibold" color="charcoal" className="mb-2">
                          {card.title}
                        </Text>
                        <Text size="sm">
                          {card.description}
                        </Text>
                      </ParallaxReveal>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ParallaxReveal className="rounded-2xl bg-nude-cream/95 p-6 shadow-soft">
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
        </section>

        {/* About Preview */}
        <section className="section-padding bg-nude-linen relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-blob opacity-10"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          {/* Elegant chrysanthemum flower pattern watermark */}
          <ParallaxPattern className="absolute -inset-8 pattern-chrysanthemum opacity-10 pointer-events-none" />
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
