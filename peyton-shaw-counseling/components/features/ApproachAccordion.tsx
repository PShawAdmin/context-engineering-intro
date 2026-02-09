'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import Image from 'next/image';
import LinkButton from '@/components/ui/LinkButton';
import ParallaxReveal from '@/components/ui/ParallaxReveal';

type ApproachAccordionProps = {
  approachPoints: string[];
  expectationCards: {
    title: string;
    description: string;
  }[];
  youMightBeHere: string[];
  promiseOutcomes: {
    label: string;
    description: string;
  }[];
};

const SESSION_FLOW = [
  {
    title: 'Choose a focus',
    description: 'Start with what matters most today.'
  },
  {
    title: 'Understand patterns',
    description: 'Spot thoughts, feelings, and habits that keep you stuck.'
  },
  {
    title: 'Practice a skill',
    description: 'Rehearse one practical tool in session for real-life moments.'
  },
  {
    title: 'Set your next steps',
    description: 'Leave with one or two clear actions for the week.'
  }
];

const BETWEEN_SESSIONS = [
  {
    title: 'Practice plan',
    description: 'Pair one small tool with a daily routine.'
  },
  {
    title: 'Gentle tracking',
    description: 'Use a brief check-in to notice wins and sticking points.'
  },
  {
    title: 'Flexible cadence',
    description: 'Start weekly for momentum, then space sessions as you feel steadier.'
  }
];

const WHERE_WE_START = [
  'Lower anxiety and rebuild self-trust',
  'Rebuild energy and routines',
  'Set clearer boundaries so relationships feel safer'
];

const CARE_COMMITMENTS = [
  'Confidential care',
  'Superbills available',
  'Evidence-based care'
];

const CHECK_ICON = (
  <svg
    className="w-5 h-5 text-nude-clay mt-0.5 shrink-0"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CIRCLE_BULLET = (
  <span
    className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-nude-clay"
    aria-hidden="true"
  />
);

const LEAVE_WITH = [
  'One clear focus',
  'One or two tools for real moments of stress',
  'A realistic next step for the week'
];

export default function ApproachAccordion({
  approachPoints,
  expectationCards,
  youMightBeHere,
  promiseOutcomes
}: ApproachAccordionProps) {
  const toolkitPoints = approachPoints;

  return (
    <section
      className="mt-5 space-y-5 max-[390px]:space-y-4 md:mt-6 md:space-y-7"
      aria-label="A calm, collaborative approach details"
    >
      <ParallaxReveal fromOpacity={0.4} fromOffset={10} speed={0.035} maxOffset={8} freezeOnce>
        <Card
          id="session-blueprint"
          className="border border-nude-linen/70 bg-gradient-to-br from-background-pearl/95 via-white/92 to-nude-cream/85 shadow-soft"
        >
          <CardHeader className="flex flex-col gap-2 pb-2">
            <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Where we begin</p>
            <h3 className="max-w-[23ch] text-xl font-semibold text-text-charcoal leading-snug sm:max-w-none">
              Telehealth that feels steady, clear, and practical.
            </h3>
            <p className="max-w-[35ch] text-base leading-relaxed text-text-storm sm:max-w-3xl">
              You are not alone. We start with what feels most urgent and build a plan you can use this
              week.
            </p>
          </CardHeader>
          <CardBody className="pt-3">
            <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h4 className="text-base font-semibold text-text-charcoal">You might be here because...</h4>
                <ul className="mt-3 space-y-2 text-base text-text-storm sm:space-y-2.5">
                  {youMightBeHere.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      {CIRCLE_BULLET}
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-nude-linen/70 bg-white/80 p-3.5 sm:p-4 md:p-5">
                <h4 className="text-base font-semibold text-text-charcoal">Where I often start</h4>
                <ul className="mt-3 space-y-2 text-base text-text-storm sm:space-y-2.5">
                  {WHERE_WE_START.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      {CIRCLE_BULLET}
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 border-t border-nude-linen/70 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-slate">
                    Care commitments
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {CARE_COMMITMENTS.map((commitment) => (
                      <Chip
                        key={commitment}
                        size="sm"
                        variant="flat"
                        className="bg-nude-sand/40 text-text-charcoal"
                      >
                        {commitment}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </ParallaxReveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <ParallaxReveal className="h-full" fromOpacity={0.45} fromOffset={10} speed={0.04} maxOffset={10} freezeOnce>
          <Card className="h-full border border-nude-linen/70 bg-background-pearl/88 shadow-soft">
            <CardHeader className="flex flex-col gap-1 pb-3">
              <p className="text-xs uppercase tracking-[0.2em] text-text-slate">How sessions work</p>
              <h3 className="text-xl font-semibold text-text-charcoal leading-snug">
                Simple, focused, and paced to you.
              </h3>
            </CardHeader>
            <CardBody className="pt-0">
              <ol className="space-y-3.5">
                {SESSION_FLOW.map((step, index) => (
                  <li
                    key={step.title}
                    className="relative rounded-2xl border border-nude-linen/70 bg-white/78 p-4 pl-14"
                  >
                    <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-nude-sand/45 text-sm font-semibold text-text-charcoal">
                      {index + 1}
                    </span>
                    <p className="text-base font-semibold text-text-charcoal">{step.title}</p>
                    <p className="mt-1 text-base text-text-storm">{step.description}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-5 rounded-2xl border border-nude-linen/70 bg-white/76 p-3.5 sm:p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Between sessions</p>
                <ul className="mt-3 space-y-2.5 text-base text-text-storm">
                  {BETWEEN_SESSIONS.map((item) => (
                    <li key={item.title}>
                      <span className="font-semibold text-text-charcoal">{item.title}:</span>{' '}
                      {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-base text-text-storm">
                Most sessions follow a simple rhythm: clarify, practice, plan.
              </p>
            </CardBody>
          </Card>
        </ParallaxReveal>

        <ParallaxReveal className="h-full" fromOpacity={0.45} fromOffset={10} speed={0.04} maxOffset={10} freezeOnce>
          <Card className="h-full border border-nude-linen/70 bg-background-pearl/88 shadow-soft">
            <CardHeader className="pb-3">
              <h3 className="text-xl font-semibold text-text-charcoal leading-snug">
                What you will leave with
              </h3>
            </CardHeader>
            <CardBody className="pt-0">
              <ul className="space-y-3 text-base text-text-storm">
                {LEAVE_WITH.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    {CHECK_ICON}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl border border-nude-linen/70 bg-white/78 p-3.5 sm:p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Feel, think, do</p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                  {promiseOutcomes.map((outcome) => (
                    <div key={outcome.label} className="rounded-xl border border-nude-linen/60 bg-white/80 p-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-text-storm">{outcome.label}</p>
                      <p className="mt-1 text-base font-semibold text-text-charcoal">{outcome.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 text-base text-text-storm">
                The goal is steady, sustainable progress.
              </p>
            </CardBody>
          </Card>
        </ParallaxReveal>
      </div>

      <details className="group rounded-2xl border border-nude-linen/70 bg-background-pearl/80 p-3.5 sm:p-4 md:p-5 shadow-soft transition-[background-color,border-color,box-shadow] duration-300 ease-out group-open:bg-background-pearl/90 group-open:shadow-[0_20px_48px_-34px_rgba(30,41,59,0.45)]">
        <summary className="list-none cursor-pointer rounded-xl focus-visible:outline-none">
          <div className="flex items-center justify-between gap-3">
            <span className="text-base font-semibold text-text-charcoal">
              Session blueprint and tools tailored to you
            </span>
            <span className="text-sm text-text-slate transition-transform duration-300 ease-out group-open:rotate-180">
              ▾
            </span>
          </div>
        </summary>
        <div className="mt-0 grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-out motion-reduce:transition-none group-open:mt-5 group-open:grid-rows-[1fr] group-open:opacity-100">
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-5">
              <Card className="border border-nude-linen/70 bg-white/85 shadow-soft">
                <CardHeader className="flex flex-col gap-1 pb-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Session blueprint</p>
                  <p className="text-base text-text-storm">
                    Secure online sessions with clear goals and tools you can use between appointments.
                  </p>
                </CardHeader>
                <CardBody className="pt-0">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {expectationCards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-2xl border border-nude-linen/70 bg-white/90 p-3.5 md:p-4"
                      >
                        <p className="text-base font-semibold text-text-charcoal">{card.title}</p>
                        <p className="mt-1 text-base text-text-storm">{card.description}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
                <Card className="border border-nude-linen/70 bg-white/85 shadow-soft">
                  <CardHeader className="pb-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-slate">
                      Tools I tailor to you
                    </p>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <p className="text-base text-text-storm">
                      Evidence-based tools, tailored to your goals and daily life.
                    </p>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 text-base text-text-storm">
                      {toolkitPoints.map((tool) => (
                        <li
                          key={tool}
                          className="flex items-start gap-3 rounded-xl border border-nude-linen/60 bg-white/90 p-3"
                        >
                          {CIRCLE_BULLET}
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>

                <div className="overflow-hidden rounded-2xl border border-nude-linen/70 bg-white/80">
                  <Image
                    src="/images/progress-flower.png"
                    alt="Abstract floral pattern in neutral tones"
                    width={1200}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </details>

      <ParallaxReveal fromOpacity={0.5} fromOffset={8} speed={0.03} maxOffset={6} freezeOnce>
        <Card className="border border-nude-linen/70 bg-nude-cream/92 shadow-soft">
          <CardBody className="py-7 md:py-8 text-center">
            <p className="text-lg font-semibold text-text-charcoal">
              If this approach feels like a fit, the next step is a brief consultation.
            </p>
            <p className="mt-2 text-base text-text-storm max-w-2xl mx-auto">
              I will listen, answer questions, and help you choose a clear starting plan.
            </p>
            <div className="mt-5 flex justify-center">
              <LinkButton
                href="/contact"
                size="lg"
                className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8 py-3 text-lg shadow-clay hover:shadow-lg transition-all duration-200"
              >
                Book a consultation
              </LinkButton>
            </div>
            <p className="mt-3 text-sm text-text-storm/90">
              No pressure, just clarity on fit and next steps.
            </p>
          </CardBody>
        </Card>
      </ParallaxReveal>
    </section>
  );
}
