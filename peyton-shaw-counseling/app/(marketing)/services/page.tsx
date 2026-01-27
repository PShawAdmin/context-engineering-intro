import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { SERVICES } from '@/lib/constants';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import LinkButton from '@/components/ui/LinkButton';

export const metadata: Metadata = {
  title: 'Therapy Services for Teens and Adults',
  description:
    'Telehealth-only therapy for teens and adults across Texas. Explore focus areas, session details, and payment options.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Therapy Services for Teens and Adults"
          subtitle="Telehealth-only care across Texas"
          description="Support for teens and adults navigating anxiety, mood changes, relationships, and life transitions. Out-of-network only, with superbills available."
          primaryAction={{
            label: 'Book a Consultation',
            href: '/contact',
          }}
          backgroundImage={false}
          showWave={false}
          size="standard"
        />

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-25"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10">
              <div className="space-y-6">
                <Heading level={2} className="text-text-charcoal">
                  Care tailored to teens and adults
                </Heading>
                <Text size="lg">
                  Therapy is personalized to your goals, with evidence-based tools that can be used
                  between sessions. Every appointment is a secure telehealth session available
                  across Texas.
                </Text>
                <div>
                  <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                    At a glance
                  </Text>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-nude-cream border border-nude-linen shadow-soft rounded-xl p-5 space-y-2">
                        <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                          Primary focus
                        </Text>
                        <Text size="sm">
                          Teens and adults navigating anxiety, mood, relationships, and change.
                        </Text>
                    </div>
                    <div className="bg-nude-cream border border-nude-linen shadow-soft rounded-xl p-5 space-y-2">
                        <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                          Format
                        </Text>
                        <Text size="sm">
                          Telehealth-only sessions delivered through secure video.
                        </Text>
                    </div>
                    <div className="bg-nude-cream border border-nude-linen shadow-soft rounded-xl p-5 space-y-2">
                        <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                          Service area
                        </Text>
                        <Text size="sm">
                          Available statewide in Texas with flexible scheduling.
                        </Text>
                    </div>
                    <div className="bg-nude-cream border border-nude-linen shadow-soft rounded-xl p-5 space-y-2">
                        <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                          Payment
                        </Text>
                        <Text size="sm">
                          Out-of-network only with superbills for reimbursement.
                        </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-nude-cream border border-nude-linen shadow-soft rounded-2xl overflow-hidden">
                <div className="flex flex-col items-start gap-2 border-b border-nude-linen/70 px-6 py-5">
                  <Heading level={3} className="text-text-charcoal">
                    How sessions work
                  </Heading>
                  <Text size="sm" className="text-text-storm">
                    A steady, three-step flow focused on clarity, progress, and support.
                  </Text>
                </div>
                <div className="px-6 pb-6 pt-5 space-y-5">
                  <ol className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-nude-sand text-text-charcoal font-semibold">
                        1
                      </span>
                      <div>
                        <Text weight="medium" color="charcoal">
                          Consultation and goals
                        </Text>
                        <Text size="sm" className="mt-1">
                          We get clarity on what you want to change and what support will help.
                        </Text>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-nude-sand text-text-charcoal font-semibold">
                        2
                      </span>
                      <div>
                        <Text weight="medium" color="charcoal">
                          Personalized plan
                        </Text>
                        <Text size="sm" className="mt-1">
                          A focused plan based on evidence-based tools and your strengths.
                        </Text>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-nude-sand text-text-charcoal font-semibold">
                        3
                      </span>
                      <div>
                        <Text weight="medium" color="charcoal">
                          Practice and progress
                        </Text>
                        <Text size="sm" className="mt-1">
                          Consistent sessions to build skills, track progress, and adjust as needed.
                        </Text>
                      </div>
                    </li>
                  </ol>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 text-xs font-medium text-text-storm">
                      50-minute sessions
                    </span>
                    <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 text-xs font-medium text-text-storm">
                      Secure video
                    </span>
                    <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 text-xs font-medium text-text-storm">
                      Teen + adult care
                    </span>
                    <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 text-xs font-medium text-text-storm">
                      Out-of-network
                    </span>
                  </div>
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
                  Focus areas and services
                </Heading>
                <Text size="lg" className="mt-4">
                  Find a starting point that feels right. Each service is tailored to your goals with
                  practical, evidence-based support.
                </Text>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-2 text-xs">
                {SERVICES.map((service) => (
                  <a
                    key={service.id}
                    href={`#service-${service.slug}`}
                    className="rounded-full border border-nude-sand bg-background-pearl px-3 py-1 font-medium text-text-storm hover:text-text-charcoal transition-colors"
                  >
                    {service.title}
                  </a>
                ))}
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {SERVICES.map((service) => (
                  <article key={service.id} id={`service-${service.slug}`} className="scroll-mt-24">
                    <div className="bg-nude-cream border border-nude-linen shadow-soft h-full rounded-2xl overflow-hidden">
                      <div className="flex flex-col items-start gap-3 border-b border-nude-linen/70 px-6 py-5">
                        <Heading level={3} className="text-text-charcoal">
                          {service.title}
                        </Heading>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 font-medium text-text-storm">
                            {service.duration}
                          </span>
                          {service.price && (
                            <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 font-medium text-text-storm">
                              {service.price} per session
                            </span>
                          )}
                          <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 font-medium text-text-storm">
                            Telehealth only
                          </span>
                        </div>
                      </div>
                      <div className="px-6 pb-6 pt-5 space-y-4">
                        <Text className="text-text-storm">{service.description}</Text>
                        {service.detailedDescription && (
                          <Text size="sm" className="text-text-storm">
                            {service.detailedDescription}
                          </Text>
                        )}
                        {service.benefits && service.benefits.length > 0 && (
                          <div>
                            <Text size="xs" color="muted" className="uppercase tracking-[0.2em]">
                              Outcome focus
                            </Text>
                            <ul className="mt-3 space-y-2">
                              {service.benefits.slice(0, 3).map((benefit, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-text-storm">
                                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-nude-clay" />
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                          <Link
                            href={`/services/${service.slug}`}
                            className="font-medium text-text-charcoal hover:text-nude-clay transition-colors"
                          >
                            View {service.title} details
                          </Link>
                          <span className="text-grey-blue">•</span>
                          <Link
                            href="/contact"
                            className="font-medium text-text-charcoal hover:text-nude-clay transition-colors"
                          >
                            Book a consultation
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center">
                <Heading level={2} className="text-text-charcoal">
                  Insurance and payment
                </Heading>
                <Text size="lg" className="mt-4">
                  Out-of-network only, with clear guidance on reimbursement and simple payment options.
                </Text>
              </div>
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-nude-cream border border-nude-linen shadow-soft rounded-2xl overflow-hidden">
                  <div className="border-b border-nude-linen/70 px-6 py-5">
                    <Heading level={3} className="text-text-charcoal text-lg">
                      Insurance
                    </Heading>
                  </div>
                  <div className="px-6 pb-6 space-y-3">
                    <Text>
                      I am an out-of-network provider. A superbill can be provided so you can submit for
                      possible reimbursement.
                    </Text>
                    <Text size="sm">
                      Before scheduling, check your plan for out-of-network mental health benefits.
                    </Text>
                  </div>
                </div>
                <div className="bg-nude-cream border border-nude-linen shadow-soft rounded-2xl overflow-hidden">
                  <div className="border-b border-nude-linen/70 px-6 py-5">
                    <Heading level={3} className="text-text-charcoal text-lg">
                      Payment options
                    </Heading>
                  </div>
                  <div className="px-6 pb-6 space-y-3">
                    <Text>Payment is due at the time of service. I accept:</Text>
                    <ul className="space-y-2 text-sm text-text-storm">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-nude-clay" />
                        Credit/Debit Cards
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-nude-clay" />
                        HSA/FSA Cards
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-nude-clay" />
                        Cash or Check
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-nude-linen relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-25"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10 text-center">
            <Heading level={2} className="text-text-charcoal">
              Ready to get started?
            </Heading>
            <Text size="lg" className="mt-4">
              Start with a consultation focused on your goals and the support you need.
            </Text>
            <LinkButton
              href="/contact"
              size="lg"
              className="mt-8 bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8 shadow-clay hover:shadow-lg transition-all"
            >
              Book a Consultation
            </LinkButton>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
