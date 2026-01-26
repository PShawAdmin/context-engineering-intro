'use client';

import { useEffect, useRef, useState } from 'react';
import { Alert } from '@heroui/alert';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Chip } from '@heroui/chip';
import { Progress } from '@heroui/progress';
import { ScrollShadow } from '@heroui/scroll-shadow';
import { Tab, Tabs } from '@heroui/tabs';
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
    title: 'Name the priority',
    description: "Identify what feels most urgent and define what you want from today's session."
  },
  {
    title: 'Map patterns',
    description: 'Notice the thought loops, body cues, and habits that keep anxiety or depression in place.'
  },
  {
    title: 'Test tools',
    description: 'Practice a strategy in session so it feels familiar before you use it on your own.'
  },
  {
    title: 'Refine the plan',
    description: 'Look at what helped, what did not, and adjust so the plan stays realistic.'
  },
  {
    title: 'Choose next steps',
    description: 'Leave with one or two actions you can take this week to keep momentum.'
  }
];

const BETWEEN_SESSIONS = [
  {
    title: 'Practice plan',
    description: 'Pick one small tool and anchor it to a routine so it feels doable.'
  },
  {
    title: 'Gentle tracking',
    description: 'Notice patterns, wins, and friction with a brief check-in, not a long journal.'
  },
  {
    title: 'Flexible cadence',
    description: 'Weekly sessions build momentum, then we space out as you feel steadier.'
  }
];

const FOCUS_AREAS = [
  'Anxiety',
  'Depression',
  'Life transitions',
  'Relationship stress',
  'Self-esteem'
];

const WHERE_WE_START = [
  'Quiet anxiety while strengthening self-trust',
  'Rebuild routines and energy when depression has you stuck',
  'Clarify boundaries so relationships feel safer and more stable'
];

const RHYTHM_STAGES = [
  { label: 'Goal clarity', value: 25 },
  { label: 'Skill practice', value: 55 },
  { label: 'Momentum check-in', value: 100 }
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

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

export default function ApproachAccordion({
  approachPoints,
  expectationCards,
  youMightBeHere,
  promiseOutcomes
}: ApproachAccordionProps) {
  const toolkitPoints = approachPoints;
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
        description="Secure online sessions designed to feel calm and present—not rushed or transactional. Telehealth makes it easier to stay consistent, and we can adjust pace as your tools start to feel automatic."
        classNames={{
          base: 'border border-nude-linen/70 bg-background-pearl/80 shadow-soft',
          title: 'text-sm font-semibold text-text-charcoal',
          description: 'text-sm text-text-storm',
          alertIcon: 'text-nude-clay'
        }}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card id="session-blueprint" className="border border-nude-linen/70 bg-background-pearl/80 shadow-soft">
          <CardHeader className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-text-storm">Your toolkit</p>
            <p className="text-lg font-semibold text-text-charcoal">
              A calm structure that keeps the work clear—without feeling rushed.
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
              <Tab key="toolkit" title="Toolkit">
                <ScrollShadow className="max-h-56 pr-2">
                  <p className="text-sm text-text-storm">
                    The toolkit is collaborative, so we choose evidence-based strategies that match your
                    personality, culture, and day-to-day life. You'll never be asked to do a generic
                    worksheet just to check a box—we choose tools that feel useful and sustainable.
                  </p>
                  <ul className="mt-4 lg:mt-3 space-y-2 text-sm text-text-storm">
                    {toolkitPoints.map((tool) => (
                      <li key={tool} className="flex items-start gap-3">
                        {CIRCLE_BULLET}
                        <span>{tool}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 lg:mt-3 text-sm text-text-storm">
                    We refine what works so your toolkit becomes personal and portable.
                  </p>
                </ScrollShadow>
              </Tab>
              <Tab key="flow" title="Session blueprint">
                <ScrollShadow className="max-h-56 pr-2">
                  <div className="space-y-4 lg:space-y-3">
                    <p className="text-sm text-text-storm">
                      We name the priority, map patterns, and practice tools so you can leave with a plan
                      that fits real life.
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
                    <p className="text-sm text-text-storm">
                      The goal is steady progress—small changes that compound over time, not quick fixes
                      that fade.
                    </p>
                  </div>
                </ScrollShadow>
              </Tab>
              <Tab key="between" title="Between sessions">
                <ScrollShadow className="max-h-56 pr-2">
                  <p className="text-sm text-text-storm">
                    Progress happens between meetings, so we build a plan that fits your schedule. You get
                    a clear practice, a gentle tracking method, and room to adjust if life gets busy.
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
              <p className="text-sm font-semibold text-text-charcoal">What you'll leave with</p>
              <ul className="mt-3 space-y-3 text-sm text-text-storm">
                <li className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>A clear focus for what matters most right now</span>
                </li>
                <li className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>One or two tools you can use in real moments of stress</span>
                </li>
                <li className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>A realistic next step that respects your schedule</span>
                </li>
                <li className="flex items-start gap-3">
                  {CHECK_ICON}
                  <span>A plan that stays adaptable as your needs change</span>
                </li>
              </ul>
              <p className="mt-3 text-sm text-text-storm">
                Progress should feel steady, doable, and supported week to week.
              </p>
            </div>
            <div className="mt-5 rounded-2xl border border-nude-linen/70 bg-white/70 p-4">
              <p className="text-sm font-semibold text-text-charcoal">What to expect (telehealth)</p>
              <ul className="mt-3 space-y-3 text-sm text-text-storm">
                {expectationCards.map((card) => (
                  <li key={card.title} className="flex items-start gap-3">
                    {CIRCLE_BULLET}
                    <span>
                      <span className="font-semibold text-text-charcoal">{card.title}:</span>{' '}
                      {card.description}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-text-storm">
                You don't need the perfect setup—just a private space and a few minutes to settle in.
              </p>
              <div className="mt-4 border-t border-nude-linen/70 pt-4">
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
                aria-label={RHYTHM_STAGES[stageIndex].label}
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
              <p className="text-xs text-text-storm">
                {RHYTHM_STAGES.map((stage, index) => (
                  <span
                    key={stage.label}
                    className={index === stageIndex ? 'text-text-charcoal font-medium' : 'text-text-storm/70'}
                  >
                    {stage.label}
                    {index < RHYTHM_STAGES.length - 1 && (
                      <span className="mx-2 text-text-storm/60" aria-hidden="true">
                        &bull;
                      </span>
                    )}
                  </span>
                ))}
              </p>
              <p className="text-sm text-text-storm">
                Think of the rhythm as a loop: clarify, practice, reflect, refine. Some weeks are
                skill-heavy; others make more space for processing—but we always end with a next step.
                You're always in the driver's seat.
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
                These often overlap—so we follow what matters most right now.
              </p>
              <p className="mt-3 text-sm font-semibold text-text-charcoal">Where we start</p>
              <ul className="mt-2 space-y-2 pl-6 text-sm text-text-storm list-disc">
                {WHERE_WE_START.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-text-storm">
                Not sure what label fits? That's okay. We can sort situational stress from longer patterns
                and adjust as we go.
              </p>
            </CardBody>
          </Card>

          <Card className="border border-nude-linen/70 bg-background-pearl/80 shadow-soft">
            <CardHeader className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-text-charcoal">You might be here because...</p>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-text-storm">
                If any of this sounds familiar, you're not alone—and you don't have to untangle it by
                yourself.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-text-storm">
                {youMightBeHere.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    {CIRCLE_BULLET}
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-text-storm">
                If you're not sure where to start, we'll figure it out together.
              </p>
            </CardBody>
          </Card>

          <Card className="border border-nude-linen/70 bg-background-pearl/80 shadow-soft">
            <CardHeader className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-text-charcoal">A steady path forward</p>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-text-storm">
                We work on what's most urgent—and what keeps repeating—so change can stick.
              </p>
              <div className="mt-4 space-y-3">
                {promiseOutcomes.map((outcome) => (
                  <div
                    key={outcome.label}
                    className="rounded-2xl border border-nude-linen/70 bg-white/70 p-3"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-text-storm">
                      {outcome.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-text-charcoal">
                      {outcome.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
