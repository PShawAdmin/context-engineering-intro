import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { SERVICES } from '@/lib/constants';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { Button } from '@heroui/button';

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
        />

        <section className="py-16 bg-background-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12">
              <div className="space-y-6">
                <Heading level={2} className="text-text-charcoal">
                  Care tailored to teens and adults
                </Heading>
                <Text size="lg">
                  Therapy is personalized to your goals, with evidence-based tools that can be used
                  between sessions. Every appointment is a secure telehealth session available
                  across Texas.
                </Text>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="border-l-2 border-nude-clay pl-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-grey-blue font-semibold">
                      Primary focus
                    </p>
                    <Text size="sm" className="mt-2">
                      Teens and adults navigating anxiety, mood, relationships, and change.
                    </Text>
                  </div>
                  <div className="border-l-2 border-nude-clay pl-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-grey-blue font-semibold">
                      Format
                    </p>
                    <Text size="sm" className="mt-2">
                      Telehealth-only sessions delivered through secure video.
                    </Text>
                  </div>
                  <div className="border-l-2 border-nude-clay pl-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-grey-blue font-semibold">
                      Service area
                    </p>
                    <Text size="sm" className="mt-2">
                      Available statewide in Texas with flexible scheduling.
                    </Text>
                  </div>
                  <div className="border-l-2 border-nude-clay pl-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-grey-blue font-semibold">
                      Payment
                    </p>
                    <Text size="sm" className="mt-2">
                      Out-of-network only with superbills for reimbursement.
                    </Text>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <Heading level={3} className="text-text-charcoal">
                  How sessions work
                </Heading>
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
        </section>

        <section className="py-16 bg-background-dove">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-12">
                <aside className="lg:w-64 lg:sticky lg:top-24 space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-grey-blue font-semibold">
                      Service map
                    </p>
                    <Heading level={3} className="mt-3 text-text-charcoal">
                      Find the right starting point
                    </Heading>
                    <Text size="sm" className="mt-3">
                      Start with what feels most urgent and explore details as you go.
                    </Text>
                  </div>
                  <nav className="space-y-2 text-sm">
                    {SERVICES.map((service) => (
                      <a
                        key={service.id}
                        href={`#service-${service.slug}`}
                        className="block text-text-storm hover:text-nude-clay transition-colors"
                      >
                        {service.title}
                      </a>
                    ))}
                  </nav>
                  <div className="border-t border-nude-sand pt-4">
                    <Text size="sm" weight="medium" color="charcoal">
                      Telehealth-only across Texas
                    </Text>
                    <Text size="sm" className="mt-2">
                      Teens and adults welcome. Out-of-network only with superbills for possible reimbursement.
                    </Text>
                  </div>
                  <Button as={Link} href="/contact" color="primary" className="w-full">
                    Book a Consultation
                  </Button>
                </aside>

                <div className="flex-1">
                  <div className="relative pl-6">
                    <div className="absolute left-2 top-0 h-full w-px bg-nude-sand" />
                    <div className="space-y-12">
                      {SERVICES.map((service) => (
                        <article key={service.id} id={`service-${service.slug}`} className="relative">
                          <span className="absolute -left-[3px] top-2 h-3 w-3 rounded-full bg-nude-clay shadow-sm" />
                          <div className="pl-6 space-y-4">
                            <div className="space-y-2">
                              <Heading level={3} className="text-text-charcoal">
                                {service.title}
                              </Heading>
                              <Text className="text-text-storm">{service.description}</Text>
                              {service.detailedDescription && (
                                <Text size="sm" className="text-grey-storm">
                                  {service.detailedDescription}
                                </Text>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] gap-6">
                              <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-grey-blue font-semibold">
                                  Outcome focus
                                </p>
                                <ul className="mt-3 space-y-2">
                                  {service.benefits?.slice(0, 4).map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-text-storm">
                                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-nude-clay" />
                                      <span>{benefit}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-grey-blue font-semibold">
                                  Session details
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 text-xs font-medium text-text-storm">
                                    {service.duration}
                                  </span>
                                  {service.price && (
                                    <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 text-xs font-medium text-text-storm">
                                      {service.price} per session
                                    </span>
                                  )}
                                  <span className="inline-flex items-center rounded-full border border-nude-sand bg-background-pearl px-3 py-1 text-xs font-medium text-text-storm">
                                    Telehealth only
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm">
                              <Link
                                href={`/services/${service.slug}`}
                                className="font-medium text-text-charcoal hover:text-nude-clay transition-colors"
                              >
                                View details
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
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background-cream">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Heading level={2} className="text-text-charcoal text-center">
                Insurance and payment
              </Heading>
              <Text size="lg" className="mt-4 text-center">
                Out-of-network only, with clear guidance on reimbursement and simple payment options.
              </Text>

              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="border-t border-nude-sand pt-6 space-y-4">
                  <Heading level={3} className="text-lg text-text-charcoal">
                    Insurance
                  </Heading>
                  <Text>
                    I am an out-of-network provider. A superbill can be provided so you can submit for
                    possible reimbursement.
                  </Text>
                  <Text size="sm">
                    Before scheduling, check your plan for out-of-network mental health benefits.
                  </Text>
                </div>

                <div className="border-t border-nude-sand pt-6 space-y-4 lg:border-t-0 lg:border-l lg:pl-10">
                  <Heading level={3} className="text-lg text-text-charcoal">
                    Payment options
                  </Heading>
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
        </section>

        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4 text-center">
            <Heading level={2} className="text-text-charcoal">
              Ready to get started?
            </Heading>
            <Text size="lg" className="mt-4">
              Start with a consultation focused on your goals and the support you need.
            </Text>
            <Button as={Link} href="/contact" color="primary" className="mt-8">
              Book a Consultation
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
