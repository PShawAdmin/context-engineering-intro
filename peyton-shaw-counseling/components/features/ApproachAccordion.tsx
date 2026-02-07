'use client';

import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import Image from 'next/image';
import LinkButton from '@/components/ui/LinkButton';

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
    description: 'Start with what feels most important right now.'
  },
  {
    title: 'Understand patterns',
    description: 'Notice the thoughts, feelings, and habits that keep you stuck.'
  },
  {
    title: 'Practice a skill',
    description: 'Try a practical tool in session so it is easier to use during the week.'
  },
  {
    title: 'Set your next steps',
    description: 'Review what helped and leave with one or two clear actions for the week.'
  }
];

const BETWEEN_SESSIONS = [
  {
    title: 'Practice plan',
    description: 'Pick one small tool and pair it with a daily routine.'
  },
  {
    title: 'Gentle tracking',
    description: 'Use a short check-in to notice wins and sticking points.'
  },
  {
    title: 'Flexible cadence',
    description: 'Weekly sessions build momentum, then I space them out as you feel steadier.'
  }
];

const WHERE_WE_START = [
  'Lower anxiety while building self-trust',
  'Rebuild energy and routines when you feel stuck',
  'Set clearer boundaries so relationships feel safer'
];

const CARE_COMMITMENTS = [
  'Confidential care',
  'Superbills available',
  'Evidence-based care'
];

const CHECK_ICON = (
  <svg className="w-5 h-5 text-nude-clay mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  'One clear focus for this season',
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
    <section className="mt-5 space-y-5" aria-label="A calm, collaborative approach details">
      <Card
        id="session-blueprint"
        className="border border-nude-linen/70 bg-gradient-to-br from-background-pearl/95 via-white/90 to-nude-cream/80 shadow-soft"
      >
        <CardHeader className="flex flex-col gap-2 pb-3">
          <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Session blueprint</p>
          <p className="text-lg font-semibold text-text-charcoal">
            Telehealth that feels steady, clear, and practical.
          </p>
          <p className="text-sm text-text-storm">
            Secure online sessions with clear goals and tools you can use between appointments.
          </p>
        </CardHeader>
        <CardBody className="pt-0">
          <div className="grid gap-3 sm:grid-cols-2">
            {expectationCards.map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-nude-linen/70 bg-white/75 p-3.5 md:p-4"
              >
                <p className="text-sm font-semibold text-text-charcoal">{card.title}</p>
                <p className="mt-1 text-sm text-text-storm">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-nude-linen/70 pt-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-slate">
              Care commitments
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CARE_COMMITMENTS.map((commitment) => (
                <Chip key={commitment} size="sm" variant="flat" className="bg-nude-sand/40 text-text-charcoal">
                  {commitment}
                </Chip>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border border-nude-linen/70 bg-background-pearl/85 shadow-soft">
          <CardHeader className="flex flex-col gap-1 pb-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-slate">How sessions work</p>
            <p className="text-lg font-semibold text-text-charcoal">
              Simple, focused, and paced to your needs.
            </p>
          </CardHeader>
          <CardBody className="pt-0">
            <ol className="space-y-3.5 md:space-y-4">
              {SESSION_FLOW.map((step, index) => (
                <li
                  key={step.title}
                  className="relative rounded-2xl border border-nude-linen/70 bg-white/75 p-3.5 pl-14 md:p-4 md:pl-14"
                >
                  <span className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-nude-sand/45 text-sm font-semibold text-text-charcoal">
                    {index + 1}
                  </span>
                  <p className="text-sm font-semibold text-text-charcoal">{step.title}</p>
                  <p className="mt-1 text-sm text-text-storm">{step.description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-4 border-t border-nude-linen/70 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Between sessions</p>
              <ul className="mt-3 space-y-2.5 text-sm text-text-storm">
                {BETWEEN_SESSIONS.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    {CIRCLE_BULLET}
                    <span>
                      <span className="font-semibold text-text-charcoal">{item.title}:</span>{' '}
                      {item.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4 text-sm text-text-storm">
              Most sessions follow a simple rhythm: clarify, practice, and plan your next step.
            </p>
          </CardBody>
        </Card>

        <Card className="border border-nude-linen/70 bg-background-pearl/85 shadow-soft">
          <CardHeader className="pb-3">
            <p className="text-sm font-semibold text-text-charcoal">What you will leave with</p>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="space-y-3 text-sm text-text-storm">
              {LEAVE_WITH.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-2xl border border-nude-linen/70 bg-white/75 p-3.5 md:p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-text-slate">A steady path forward</p>
              <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3">
                {promiseOutcomes.map((outcome) => (
                  <div key={outcome.label} className="rounded-xl border border-nude-linen/60 bg-white/80 p-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-text-storm">{outcome.label}</p>
                    <p className="mt-1 text-sm font-semibold text-text-charcoal">{outcome.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-text-storm">
              The goal is steady, sustainable progress.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-nude-linen/70 bg-white/80">
              <Image
                src="/images/progress-flower.png"
                alt="Abstract floral pattern in neutral tones"
                width={1200}
                height={800}
                className="h-auto w-full object-cover"
              />
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="border border-nude-linen/70 bg-background-pearl/85 shadow-soft">
          <CardHeader className="flex flex-col gap-1 pb-3">
            <p className="text-sm font-semibold text-text-charcoal">You might be here because...</p>
            <p className="text-sm text-text-storm">
              If this sounds familiar, you are not alone. I can help you sort it out one step at a time.
            </p>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="space-y-2 text-sm text-text-storm">
              {youMightBeHere.slice(0, 4).map((point) => (
                <li key={point} className="flex items-start gap-3">
                  {CIRCLE_BULLET}
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-2xl border border-nude-linen/70 bg-white/75 p-3.5 md:p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Where I often start</p>
              <ul className="mt-3 space-y-2 pl-6 text-sm text-text-storm list-disc">
                {WHERE_WE_START.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-nude-linen/70 bg-background-pearl/85 shadow-soft">
          <CardHeader className="flex flex-col gap-1 pb-3">
            <p className="text-xs uppercase tracking-[0.2em] text-text-slate">Tools I tailor to you</p>
            <p className="text-sm text-text-storm">
              I use evidence-based tools and tailor them to your goals, preferences, and daily life.
            </p>
          </CardHeader>
          <CardBody className="pt-0">
            <ul className="grid gap-2.5 sm:grid-cols-2 text-sm text-text-storm">
              {toolkitPoints.map((tool) => (
                <li key={tool} className="flex items-start gap-3 rounded-xl border border-nude-linen/60 bg-white/80 p-3">
                  {CIRCLE_BULLET}
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card className="border border-nude-linen/70 bg-nude-cream/90 shadow-soft">
        <CardBody className="py-7 md:py-8 text-center">
          <p className="text-lg font-semibold text-text-charcoal">
            If this approach feels like a fit, the next step is a brief consultation.
          </p>
          <p className="mt-2 text-sm md:text-base text-text-storm max-w-2xl mx-auto">
            I will listen to what is going on, answer your questions, and help you choose a clear starting plan.
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
    </section>
  );
}
