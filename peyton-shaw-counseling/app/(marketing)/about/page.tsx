import { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import LinkButton from '@/components/ui/LinkButton';

export const metadata: Metadata = {
  title: 'About Peyton Shaw',
  description:
    'Meet Peyton Shaw, licensed professional counselor providing telehealth-only care for teens and adults across Texas.',
};

const HIGHLIGHTS = [
  {
    label: 'Primary focus',
    value: 'Teens and adults navigating anxiety, mood changes, relationships, and life transitions.',
  },
  {
    label: 'Format',
    value: 'Telehealth-only sessions delivered through secure video.',
  },
  {
    label: 'Care style',
    value: 'Warm, collaborative, evidence-based support with clear goals.',
  },
  {
    label: 'Service area',
    value: 'Available across Texas with flexible scheduling.',
  },
];

const APPROACHES = [
  {
    title: 'Cognitive Behavioral Therapy (CBT)',
    description: 'Identify and shift unhelpful thought patterns.',
  },
  {
    title: 'Mindfulness-Based Techniques',
    description: 'Build present-moment awareness and steadier coping.',
  },
  {
    title: 'Solution-Focused Therapy',
    description: 'Use strengths to create practical change.',
  },
  {
    title: 'Trauma-Informed Care',
    description: 'Prioritize safety, choice, and stabilization.',
  },
];

const EXPECTATIONS = [
  'A calm, welcoming telehealth space to explore what matters most.',
  'Collaborative goal setting and progress check-ins.',
  'Practical tools you can use between sessions.',
  'Respect for your privacy and confidentiality.',
  'Care that is practical, warm, and collaborative.',
];

const MEMBERSHIPS = [
  'American Counseling Association',
  'Texas Counseling Association',
  'International Association of Counselors',
];

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
          showWave={false}
          size="standard"
        />

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-25"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12">
              <div className="flex h-full flex-col gap-6 lg:justify-between">
                <div className="space-y-6">
                <Heading level={2} className="text-text-charcoal">
                  A calm, practical approach to therapy
                </Heading>
                <Text size="lg">
                  Welcome. I&apos;m Peyton Shaw, a licensed professional counselor who specializes in
                  helping teens and adults navigate anxiety, depression, life transitions, and
                  relationship stress. My goal is to offer a calm, respectful space where you can
                  feel understood and supported.
                </Text>
                <Text>
                  With years of experience in mental health counseling, I&apos;ve worked with teens,
                  adults, and families facing a wide range of challenges. That experience continues
                  to shape a personalized, practical approach to care.
                </Text>
                <Text>
                  Therapy is a collaborative process. We will define goals together, explore what
                  gets in the way, and build tools you can use in daily life. Sessions are
                  telehealth-only and delivered through secure video across Texas.
                </Text>
                <div>
                  <div className="flex justify-center">
                    <div className="h-px w-40 bg-nude-sand/70"></div>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {HIGHLIGHTS.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-nude-linen bg-nude-cream shadow-soft p-5 space-y-2"
                      >
                        <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                          {item.label}
                        </Text>
                        <Text size="sm">{item.value}</Text>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
                <div className="rounded-2xl border border-nude-linen bg-background-dove/70 shadow-soft px-6 py-5 text-center space-y-3">
                  <Heading level={4} className="text-text-charcoal">
                    Ready to get started?
                  </Heading>
                  <Text size="sm">
                    Take the first step with supportive, evidence-based care.
                  </Text>
                  <LinkButton
                    href="/contact"
                    className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8 shadow-clay hover:shadow-lg transition-all"
                  >
                    Book a Consultation
                  </LinkButton>
                </div>
              </div>

              <div className="flex h-full flex-col gap-6 lg:justify-between">
                <div className="space-y-6">
                <div className="rounded-3xl border border-nude-linen shadow-soft overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <Image
                      src="/images/peyton-shaw-professional.jpg"
                      alt="Peyton Shaw - Licensed Professional Counselor"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft px-6 py-5 space-y-4">
                  <Heading level={4} className="text-text-charcoal">
                    Education & credentials
                  </Heading>
                  <div className="space-y-3">
                    <div>
                      <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                        Master of Science
                      </Text>
                      <Text size="sm" weight="medium" color="charcoal">
                        University of North Texas
                      </Text>
                    </div>
                    <div>
                      <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                        Bachelor of Science
                      </Text>
                      <Text size="sm" weight="medium" color="charcoal">
                        University of North Texas
                      </Text>
                    </div>
                    <div className="pt-3 border-t border-nude-linen/70">
                      <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                        Licensed Professional Counselor
                      </Text>
                      <Text size="sm" weight="medium" color="charcoal">
                        State of Texas • License #86177
                      </Text>
                    </div>
                  </div>
                </div>

                </div>
                <div className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft px-6 py-5 space-y-4">
                  <Heading level={4} className="text-text-charcoal">
                    Professional memberships
                  </Heading>
                  <ul className="space-y-2 text-sm text-text-storm">
                    {MEMBERSHIPS.map((membership) => (
                      <li key={membership} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-nude-clay" />
                        <span>{membership}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-dove relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-blob opacity-10"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center max-w-3xl mx-auto">
                <Heading level={2} className="text-text-charcoal">
                  My therapeutic approach
                </Heading>
                <Text size="lg" className="mt-4">
                  I blend evidence-based practices with a warm, person-centered style. Common
                  approaches include:
                </Text>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {APPROACHES.map((approach) => (
                  <div
                    key={approach.title}
                    className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft p-6 space-y-3"
                  >
                    <Heading level={4} className="text-text-charcoal">
                      {approach.title}
                    </Heading>
                    <Text size="sm" className="text-text-storm">
                      {approach.description}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10">
              <div className="space-y-6">
                <Heading level={2} className="text-text-charcoal">
                  What to expect
                </Heading>
                <Text size="lg">
                  In our work together, you can expect a supportive, structured experience with
                  space to ask questions and build tools that fit your life.
                </Text>
                <ul className="space-y-3">
                  {EXPECTATIONS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-text-storm">
                      <svg
                        className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft px-6 py-6 space-y-4">
                <Heading level={4} className="text-text-charcoal">
                  Session details
                </Heading>
                <div className="space-y-3 text-sm text-text-storm">
                  <div className="flex items-center justify-between">
                    <span>Session length</span>
                    <span className="font-medium text-text-charcoal">50 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Format</span>
                    <span className="font-medium text-text-charcoal">Telehealth-only</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Session focus</span>
                    <span className="font-medium text-text-charcoal">Goals + skills</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payment</span>
                    <span className="font-medium text-text-charcoal">Out-of-network</span>
                  </div>
                </div>
                <div className="rounded-xl border border-nude-linen/70 bg-background-dove/60 px-4 py-3">
                  <Text size="sm">
                    Superbills are available for possible reimbursement. If you have questions about
                    coverage, we can review options together.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-nude-linen relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-25"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Heading level={2} className="text-text-charcoal">
                A personal note
              </Heading>
              <div className="mt-6 space-y-4">
                <Text size="lg">
                  Reaching out for therapy can feel like a big step. I aim to make the process clear
                  and supportive, whether you are facing a specific challenge or simply feeling
                  stuck.
                </Text>
                <Text size="lg">
                  You deserve care that feels personal, respectful, and practical. I would be
                  honored to support you as you move toward the changes you want to make.
                </Text>
                <Text size="sm" weight="medium" className="text-nude-clay">
                  — Peyton Shaw, LPC
                </Text>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
