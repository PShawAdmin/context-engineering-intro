'use client';

import { useEffect, useRef, useState } from 'react';
import { Alert } from '@heroui/alert';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Progress } from '@heroui/progress';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Tab, Tabs } from '@heroui/tabs';
import LinkButton from '@/components/ui/LinkButton';

type ApproachAccordionProps = {
  approachPoints: string[];
  expectationCards: {
    title: string;
    description: string;
  }[];
  telehealthDetails: string[];
};

const SESSION_FLOW = [
  {
    title: 'Name the priority',
    description: 'Identify what feels most urgent and set a clear outcome for the session.'
  },
  {
    title: 'Map patterns',
    description: 'Notice the beliefs, body cues, and habits that keep anxiety or depression looping.'
  },
  {
    title: 'Test tools',
    description: 'Practice a strategy in session so it feels familiar before you use it on your own.'
  },
  {
    title: 'Review experiments',
    description: 'Check what worked, what did not, and adjust so the plan stays realistic.'
  },
  {
    title: 'Choose next steps',
    description: 'Leave with one or two actions you can take this week to keep momentum.'
  }
];

const BETWEEN_SESSIONS = [
  {
    title: 'Practice plan',
    description: 'Pick one small tool and anchor it to a routine so it feels doable. We keep it realistic to avoid overwhelm.'
  },
  {
    title: 'Gentle tracking',
    description: 'Notice patterns, wins, and friction with a brief check-in, not a long journal. This gives us usable data without extra stress.'
  },
  {
    title: 'Flexible cadence',
    description: 'Weekly sessions build momentum, then we space out as you feel steadier. We can adjust quickly when life changes.'
  }
];

const FOCUS_AREAS = [
  'Anxiety',
  'Depression',
  'Life transitions',
  'Relationship stress',
  'Self-esteem'
];

const COMMON_GOALS = [
  'Quiet the anxious mental noise and feel more grounded day-to-day.',
  'Build routines that support sleep, energy, and emotional steadiness.',
  'Strengthen communication and boundaries so relationships feel safer.',
  'Increase confidence so decisions feel clearer and more aligned.'
];

const RHYTHM_STAGES = [
  { label: 'Goal clarity', value: 25 },
  { label: 'Skill practice', value: 55 },
  { label: 'Momentum check-in', value: 100 }
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const CARE_COMMITMENTS = [
  {
    label: 'Confidential care',
    icon: (
      <svg className="w-5 h-5 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    label: 'Superbills available',
    icon: (
      <svg className="w-5 h-5 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    label: 'Evidence-based care',
    icon: (
      <svg className="w-5 h-5 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  }
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

const shortenLabel = (point: string) => {
  const splitters = [' for ', ' with ', ' to '];
  for (const splitter of splitters) {
    if (point.includes(splitter)) {
      return point.split(splitter)[0].trim();
    }
  }
  return point;
};

export default function ApproachAccordion({
  approachPoints,
  expectationCards,
  telehealthDetails
}: ApproachAccordionProps) {
  const toolkitChips = approachPoints.map((point) => ({
    label: shortenLabel(point),
    detail: point
  }));
  const [stageIndex, setStageIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const progressRef = useRef(progressValue);
  const prevStageRef = useRef(stageIndex);

  useEffect(() => {
    progressRef.current = progressValue;
  }, [progressValue]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = RHYTHM_STAGES[stageIndex].value;
    const previousStage = prevStageRef.current;
    const isReset = stageIndex === 0 && previousStage === RHYTHM_STAGES.length - 1;
    prevStageRef.current = stageIndex;

    if (prefersReducedMotion) {
      if (isReset) {
        setProgressValue(0);
      }
      setProgressValue(target);
      return;
    }

    const from = isReset ? 0 : progressRef.current;
    const duration = 700;
    const resetHoldMs = 450;
    let rafId = 0;
    let timeoutId = 0;
    let delayId = 0;

    if (isReset) {
      progressRef.current = 0;
      setProgressValue(0);
    }

    const animate = (time: number, start: number) => {
      const t = Math.min(1, (time - start) / duration);
      const eased = easeOutCubic(t);
      const next = from + (target - from) * eased;
      setProgressValue(Number(next.toFixed(1)));

      if (t < 1) {
        rafId = window.requestAnimationFrame((nextTime) => animate(nextTime, start));
        return;
      }

      timeoutId = window.setTimeout(() => {
        setStageIndex((current) => (current + 1) % RHYTHM_STAGES.length);
      }, 1200);
    };

    const startAnimation = () => {
      const start = window.performance.now();
      rafId = window.requestAnimationFrame((time) => animate(time, start));
    };

    if (isReset) {
      delayId = window.setTimeout(startAnimation, resetHoldMs);
    } else {
      startAnimation();
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      if (timeoutId) window.clearTimeout(timeoutId);
      if (delayId) window.clearTimeout(delayId);
    };
  }, [stageIndex]);

  return (
    <div className="mt-6 space-y-6">
      <Alert
        title="Telehealth that feels grounded"
        description="Sessions are practical, supportive, and grounded in CBT, mindfulness, and solution-focused care. We define goals early, revisit them often, and keep the pace steady so you can use the tools between appointments."
        classNames={{
          base: 'border border-nude-linen/70 bg-background-pearl/80 shadow-soft',
          title: 'text-sm font-semibold text-text-charcoal',
          description: 'text-sm text-text-storm',
          alertIcon: 'text-nude-clay'
        }}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card className="border border-nude-linen/70 bg-background-pearl/80 shadow-soft">
          <CardHeader className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-text-storm">Session blueprint</p>
            <p className="text-lg font-semibold text-text-charcoal">A calm, collaborative flow</p>
            <p className="text-sm text-text-storm">
              A structured rhythm that stays flexible to what you need most.
            </p>
          </CardHeader>
          <CardBody className="pt-0">
            <Tabs
              aria-label="Therapy approach details"
              classNames={{
                tabList:
                  'gap-2 rounded-full border border-nude-linen/70 bg-background-pearl/70 p-1',
                tab: 'px-3 py-2 text-xs font-medium text-text-storm data-[selected=true]:text-text-charcoal',
                cursor: 'bg-nude-cream shadow-soft',
                panel: 'pt-4 lg:pt-3'
              }}
            >
              <Tab key="flow" title="Session flow">
                <ScrollShadow className="max-h-56 pr-2">
                  <div className="space-y-4 lg:space-y-3">
                    <p className="text-sm text-text-storm">
                      Each session has a gentle structure that keeps the work clear without feeling rushed.
                      We start by orienting to what you want most right now, then slow down long enough to
                      notice the thoughts, body cues, and relationship dynamics that keep stress in place.
                    </p>
                    <p className="text-sm text-text-storm">
                      From there we choose one or two tools to practice, and we end with a concrete plan for
                      the week ahead. The goal is steady momentum: small changes that compound over time,
                      not quick fixes that fade.
                    </p>
                    <ol className="space-y-4 lg:space-y-3">
                    {SESSION_FLOW.map((step, index) => (
                      <li key={step.title} className="flex items-start gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-nude-sand/40 text-sm font-semibold text-text-charcoal">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-text-charcoal">{step.title}</p>
                          <p className="text-sm text-text-storm">{step.description}</p>
                        </div>
                      </li>
                    ))}
                    </ol>
                  </div>
                </ScrollShadow>
              </Tab>
              <Tab key="toolkit" title="Toolkit">
                <ScrollShadow className="max-h-56 pr-2">
                  <p className="text-sm text-text-storm">
                    The toolkit is collaborative, so we pick evidence-based strategies that match your
                    personality, culture, and day-to-day life. You will never be asked to do a generic
                    worksheet just to check a box; we choose tools that feel useful and sustainable.
                  </p>
                  <ul className="mt-4 lg:mt-3 space-y-2 text-sm text-text-storm">
                    {toolkitChips.map((tool) => (
                      <li key={tool.detail} className="flex items-start gap-3">
                        {CIRCLE_BULLET}
                        <span>{tool.detail}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 lg:mt-3 text-sm text-text-storm">
                    We track what helps most and refine it so your toolkit becomes personal and portable.
                  </p>
                </ScrollShadow>
              </Tab>
              <Tab key="between" title="Between sessions">
                <ScrollShadow className="max-h-56 pr-2">
                  <p className="text-sm text-text-storm">
                    Progress happens between meetings, so we build a plan that fits your schedule. You get
                    a clear practice, a gentle tracking method, and room to adjust if life gets busy. The
                    goal is consistency, not perfection.
                  </p>
                  <div className="space-y-4 lg:space-y-3">
                    {BETWEEN_SESSIONS.map((item) => (
                      <div key={item.title} className="rounded-2xl border border-nude-linen/70 bg-white/60 p-4">
                        <p className="text-sm font-semibold text-text-charcoal">{item.title}</p>
                        <p className="text-sm text-text-storm">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </ScrollShadow>
              </Tab>
            </Tabs>
            <div className="mt-5 lg:mt-4 rounded-2xl border border-nude-linen/70 bg-white/70 p-4">
              <p className="text-sm font-semibold text-text-charcoal">What you will leave with</p>
              <ul className="mt-3 space-y-3 text-sm text-text-storm">
                <li className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>A clear focus that names what matters most right now.</span>
                </li>
                <li className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>One or two tools you can practice in real moments of stress.</span>
                </li>
                <li className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>A realistic plan with a next step that respects your schedule and keeps momentum without overwhelm.</span>
                </li>
              </ul>
              <p className="mt-3 text-sm text-text-storm">
                The goal is to make progress feel steady, doable, and supported from week to week.
              </p>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-nude-linen/70 bg-white/70 p-4">
                <p className="text-sm font-semibold text-text-charcoal">What to expect</p>
                <ul className="mt-3 space-y-3 text-sm text-text-storm">
                  {expectationCards.map((card) => (
                    <li key={card.title} className="flex items-start gap-3">
                      {CIRCLE_BULLET}
                      <div>
                        <span className="block text-sm font-semibold text-text-charcoal">{card.title}</span>
                        <span className="block text-sm text-text-storm">{card.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-nude-linen/70 bg-white/70 p-4">
                <p className="text-sm font-semibold text-text-charcoal">Telehealth details</p>
                <ul className="mt-3 space-y-3 text-sm text-text-storm">
                  {telehealthDetails.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      {CHECK_ICON}
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-nude-linen/70 pt-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-slate">
                    Care commitments
                  </p>
                  <ul className="mt-3 space-y-3 text-sm text-text-storm">
                    {CARE_COMMITMENTS.map((commitment) => (
                      <li key={commitment.label} className="flex items-center gap-2">
                        {commitment.icon}
                        <span className="font-medium text-text-storm">{commitment.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <LinkButton
                    href="/contact"
                    className="w-full bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-4 py-2 shadow-clay transition-all"
                  >
                    Schedule a Consultation
                  </LinkButton>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="space-y-6">
          <Card className="border border-nude-linen/70 bg-background-pearl/80 shadow-soft">
            <CardHeader className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-text-charcoal">Session rhythm</p>
              <p className="text-xs text-text-storm">
                A steady cadence that builds confidence without rushing.
              </p>
            </CardHeader>
            <CardBody className="space-y-4">
              <Progress
                label={RHYTHM_STAGES[stageIndex].label}
                value={progressValue}
                size="sm"
                radius="full"
                disableAnimation
                classNames={{
                  label: 'text-xs font-medium text-text-storm',
                  track: 'bg-nude-linen/60',
                  indicator: 'bg-nude-clay/80'
                }}
              />
              <div className="flex flex-wrap gap-2 text-xs text-text-storm">
                {RHYTHM_STAGES.map((stage, index) => (
                  <span
                    key={stage.label}
                    className={`rounded-full border px-2 py-1 transition-colors duration-300 ease-out ${
                      index === stageIndex
                        ? 'border-nude-clay bg-nude-sand/40 text-text-charcoal'
                        : 'border-nude-linen/70 text-text-storm opacity-70'
                    }`}
                  >
                    {stage.label}
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-storm">
                Think of the rhythm as a loop: clarify, practice, reflect, and refine. Some weeks are
                skill-heavy, others make more space for processing, but we always leave with a next step.
                Telehealth makes it easier to stay consistent, and we can slow the pace once the tools
                start to feel automatic. You are always in the driver's seat.
              </p>
            </CardBody>
          </Card>

          <Card className="border border-nude-linen/70 bg-background-pearl/80 shadow-soft">
            <CardHeader className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-text-charcoal">Common focus areas</p>
              <p className="text-xs text-text-storm">
                We tailor sessions to the priorities you want to work on most.
              </p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {FOCUS_AREAS.map((area) => (
                  <Chip
                    key={area}
                    size="sm"
                    variant="flat"
                    className="bg-nude-sand/40 text-text-charcoal"
                  >
                    {area}
                  </Chip>
                ))}
              </div>
              <p className="mt-4 text-sm text-text-storm">
                These areas often overlap, so we follow the thread that feels most important to you.
                Sessions stay grounded in what will make life feel more manageable right now.
              </p>
              <p className="mt-3 text-sm font-semibold text-text-charcoal">Where we start</p>
              <ul className="mt-2 space-y-2 pl-6 text-sm text-text-storm list-disc">
                <li>Steady anxiety while strengthening self-trust.</li>
                <li>Address depression while rebuilding routines and energy.</li>
                <li>Clarify boundaries so relationships feel safer and more stable.</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-text-charcoal">Common goals we build toward</p>
              <ul className="mt-2 space-y-2 pl-6 text-sm text-text-storm list-disc">
                {COMMON_GOALS.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-text-storm">
                Not sure which label fits? That is okay. We can sort situational stress versus a longer
                pattern and shift focus as your needs change. Some clients start with anxiety and later
                want support with boundaries or self-esteem, or they come in for depression and discover
                relationship stress is the bigger driver.
              </p>
              <p className="mt-3 text-sm text-text-storm">
                You do not need a formal diagnosis to begin; we focus on what is getting in the way and
                what would feel better.
              </p>
              <p className="mt-4 text-sm text-text-storm">
                Common focus areas include anxiety, depression, life transitions, relationship stress,
                and self-esteem.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
