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
  image: '/images/peyton-shaw-professional.jpg',
});

const APPROACH_POINTS = [
  'CBT reframes for anxious or self-critical loops',
  'Mindfulness cues to help you return to the present',
  'Behavioral activation to rebuild energy and motivation',
  'Values-based decisions that make life feel more aligned',
  'Communication scripts to reduce conflict and confusion',
  'Boundary tools to protect your time and emotional space'
];

const YOU_MIGHT_BE_HERE = [
  "Your mind will not turn off, even when you're exhausted.",
  "You're holding it together on the outside, but you feel spent.",
  "You keep second-guessing yourself and replaying everything.",
  "You feel stuck, unmotivated, or disconnected from what used to matter.",
  "Relationships feel tense, uncertain, or harder than they should.",
  "You want tools that actually work in real life—not just insight."
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
          subtitle="Calm, practical support for anxiety, depression, stress, and life transitions with secure online sessions across Texas."
          description={
            <span className="text-base">
              Secure online sessions &bull; Clear goals &bull; Tools you'll use between appointments
            </span>
          }
          primaryAction={{
            label: "Book a consultation",
            href: "/contact"
          }}
          secondaryAction={{
            label: "How sessions work",
            href: "#session-blueprint"
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
                Therapy that stays focused and flexible—grounded in evidence-based care and shaped
                around your goals. We practice what helps, keep progress realistic, and adjust as your
                needs change.
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
                  A steady, supportive space with a practical rhythm. We slow down when you need it, and
                  keep sessions clear enough that you leave with a next step.
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
                      I
                    </span>
                    <Text>
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
                I offer telehealth-only therapy for teens and adults across Texas, including Southlake,
                Grapevine, and surrounding communities.
              </Text>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {LOCATIONS.map((location) => (
                <Link
                  key={location.slug}
                  href="/areas-served"
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
              Ready to take the next step?
            </Heading>
            <Text size="xl" color="white" className="md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto animate-slide-up">
              If you're feeling overwhelmed, stuck, or just tired of carrying it alone, we can make a
              simple plan together.
            </Text>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up [animation-delay:200ms]">
              <LinkButton
                href="/contact"
                size="lg"
                className="bg-nude-cream text-nude-clay hover:bg-nude-linen font-medium px-10 py-4 text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Book a consultation
              </LinkButton>
              <EmailButton
                label="Ask a question by email"
                variant="bordered"
                size="lg"
                className="border-2 border-nude-cream text-nude-cream hover:bg-nude-cream/10 font-medium px-10 py-4 text-lg backdrop-blur-sm transition-all"
              />
            </div>
            <Text size="sm" color="white" className="mt-6 opacity-80">
              No pressure—just clarity on fit and next steps.
            </Text>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
