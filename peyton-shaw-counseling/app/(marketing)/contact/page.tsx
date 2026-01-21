import { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import CalendlyWidget, { CalendlyWidgetSkeleton } from '@/components/features/CalendlyWidget';
import { getSchedulingUrl } from '@/lib/calendly-dal';
import { SITE_CONFIG } from '@/lib/constants';
import {Card, CardHeader, CardBody} from '@heroui/card';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';

export const metadata: Metadata = {
  title: 'Contact & Book Appointment',
  description: 'Schedule a telehealth consultation and get in touch with Peyton Shaw Counseling. Serving teens and adults across Texas.',
};

async function CalendlySection() {
  let schedulingUrl: string | null = null;
  
  try {
    schedulingUrl = await getSchedulingUrl();
  } catch (error) {
    console.error('Failed to load Calendly URL:', error);
  }

  if (!schedulingUrl) {
    return (
      <div className="px-6 py-8 text-center">
        <Heading level={4} className="text-text-charcoal">
          Alternative Booking Options
        </Heading>
        <Text size="sm" className="mt-2 text-text-storm">
          Our online scheduling is temporarily unavailable. Please contact us directly:
        </Text>
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm text-text-storm">
            <svg className="w-5 h-5 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="font-medium text-text-charcoal">{SITE_CONFIG.phone}</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-text-storm">
            <svg className="w-5 h-5 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="font-medium text-nude-clay hover:text-grey-charcoal transition-colors"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <CalendlyWidget url={schedulingUrl} type="inline" />;
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Book a Consultation"
          subtitle="Take the next step toward feeling better"
          description="Choose a convenient time for your consultation. Telehealth-only sessions are available across Texas."
          backgroundImage={false}
        />

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-25"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10">
                {/* Scheduling */}
                <div className="space-y-6">
                  <Card className="bg-nude-cream border border-nude-linen shadow-soft overflow-hidden">
                    <CardHeader className="flex flex-col items-start gap-2 border-b border-nude-linen/70 px-6 py-5">
                      <Heading level={3} className="text-text-charcoal">
                        Schedule online
                      </Heading>
                      <Text size="sm" className="text-text-storm">
                        Choose a time that works for you. Telehealth-only sessions are available across Texas.
                      </Text>
                    </CardHeader>
                    <CardBody className="px-6 pb-6 pt-4 space-y-6">
                      <div className="rounded-xl overflow-hidden border border-nude-linen/70 bg-white">
                        <Suspense fallback={<CalendlyWidgetSkeleton />}>
                          <CalendlySection />
                        </Suspense>
                      </div>
                      <div className="rounded-lg border border-nude-linen/70 bg-background-dove/60 px-5 py-4">
                        <Text size="sm" className="text-text-storm">
                          <span className="font-medium text-text-charcoal">Appointment notes:</span>{' '}
                          Appointments require 24-hour notice for cancellation or rescheduling. New clients
                          receive intake forms by email after booking. Out-of-network only; superbills are
                          available for possible reimbursement.
                        </Text>
                      </div>
                    </CardBody>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-nude-cream border border-nude-linen shadow-soft">
                    <CardHeader className="border-b border-nude-linen/70 px-6 py-5">
                      <Heading level={4} className="text-text-charcoal">
                        Contact details
                      </Heading>
                    </CardHeader>
                    <CardBody className="px-6 pb-6 space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Text size="xs" color="muted" className="uppercase tracking-[0.08em]">
                            Phone
                          </Text>
                          <a
                            href={`tel:${SITE_CONFIG.phone}`}
                            className="mt-1 inline-flex text-sm font-medium text-text-charcoal hover:text-nude-clay transition-colors"
                          >
                            {SITE_CONFIG.phone}
                          </a>
                        </div>
                        <div>
                          <Text size="xs" color="muted" className="uppercase tracking-[0.08em]">
                            Email
                          </Text>
                          <a
                            href={`mailto:${SITE_CONFIG.email}`}
                            className="mt-1 inline-flex text-sm font-medium text-nude-clay hover:text-grey-charcoal transition-colors"
                          >
                            {SITE_CONFIG.email}
                          </a>
                        </div>
                        <div>
                          <Text size="xs" color="muted" className="uppercase tracking-[0.08em]">
                            Service area
                          </Text>
                          <Text size="sm" weight="medium" color="charcoal">
                            {SITE_CONFIG.serviceArea}
                          </Text>
                        </div>
                      </div>
                      <div className="border-t border-nude-linen/70 pt-4">
                        <Text size="sm" weight="medium" color="charcoal" className="mb-3">
                          Session hours
                        </Text>
                        <div className="space-y-2 text-sm text-text-storm">
                          <div className="flex items-center justify-between">
                            <span>Monday - Friday</span>
                            <span className="font-medium text-text-charcoal">9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Saturday</span>
                            <span className="font-medium text-text-charcoal">By appointment</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Sunday</span>
                            <span className="font-medium text-text-charcoal">Closed</span>
                          </div>
                        </div>
                        <Text size="xs" color="muted" className="mt-3">
                          Evening appointments available upon request.
                        </Text>
                      </div>
                    </CardBody>
                  </Card>

                  <Card className="bg-nude-cream border border-nude-linen shadow-soft">
                    <CardHeader className="border-b border-nude-linen/70 px-6 py-5">
                      <Heading level={4} className="text-text-charcoal">
                        What to expect
                      </Heading>
                    </CardHeader>
                    <CardBody className="px-6 pb-6">
                      <ul className="space-y-3 text-sm text-text-storm">
                        <li className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>50-minute sessions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Confidential and supportive environment</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Evidence-based treatment approaches</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Personalized treatment plan</span>
                        </li>
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Resources */}
        <section className="py-12 bg-background-dove">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-nude-cream border border-red-200/70 shadow-soft">
                <CardBody className="text-center space-y-3">
                  <Heading level={4} className="text-red-900">
                    If you&apos;re experiencing a mental health emergency
                  </Heading>
                  <Text size="sm" className="text-red-800">
                    Please call 911 or go to your nearest emergency room
                  </Text>
                  <div className="flex flex-wrap justify-center gap-4 text-sm">
                    <a href="tel:988" className="flex items-center gap-2 text-red-700 hover:text-red-900">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      National Suicide Prevention Lifeline: 988
                    </a>
                    <a href="tel:1-800-273-8255" className="flex items-center gap-2 text-red-700 hover:text-red-900">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Crisis Text Line: Text HOME to 741741
                    </a>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
