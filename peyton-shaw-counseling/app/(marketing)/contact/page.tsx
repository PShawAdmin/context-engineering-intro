import { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import CalendlyWidget, { CalendlyWidgetSkeleton } from '@/components/features/CalendlyWidget';
import { getSchedulingUrl } from '@/lib/calendly-dal';
import { SITE_CONFIG } from '@/lib/constants';
import {Card, CardHeader, CardBody} from '@heroui/card';

export const metadata: Metadata = {
  title: 'Contact & Book Appointment',
  description: 'Schedule your therapy appointment online or get in touch with Peyton Shaw Counseling.',
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
      <Card className="p-8">
        <CardBody className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Alternative Booking Options
          </h3>
          <p className="text-gray-600 mb-4">
            Our online scheduling is temporarily unavailable. Please contact us directly:
          </p>
          <div className="space-y-2">
            <p className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-medium">{SITE_CONFIG.phone}</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-primary-600 hover:underline">
                {SITE_CONFIG.email}
              </a>
            </p>
          </div>
        </CardBody>
      </Card>
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
          title="Book Your Appointment"
          subtitle="Take the first step towards better mental health"
          description="Choose a convenient time for your consultation. I offer both in-person and virtual sessions."
          backgroundImage={false}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content - Calendly Widget */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Schedule Your Session
                  </h2>
                  
                  <Suspense fallback={<CalendlyWidgetSkeleton />}>
                    <CalendlySection />
                  </Suspense>

                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> All appointments require 24-hour notice for cancellation or rescheduling. 
                      First-time clients will receive intake forms via email after booking.
                    </p>
                  </div>
                </div>

                {/* Sidebar - Contact Information */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Contact Information</h3>
                    </CardHeader>
                    <CardBody className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="font-medium">{SITE_CONFIG.phone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <a 
                          href={`mailto:${SITE_CONFIG.email}`} 
                          className="font-medium text-primary-600 hover:underline"
                        >
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="font-medium">{SITE_CONFIG.address}</p>
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Office Hours</h3>
                    </CardHeader>
                    <CardBody>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span className="font-medium">9:00 AM - 6:00 PM</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Saturday</span>
                          <span className="font-medium">By appointment</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sunday</span>
                          <span className="font-medium">Closed</span>
                        </li>
                      </ul>
                      <p className="text-xs text-gray-500 mt-4">
                        Evening appointments available upon request
                      </p>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">What to Expect</h3>
                    </CardHeader>
                    <CardBody>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>50-minute sessions</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Confidential and safe environment</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Evidence-based treatment approaches</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-secondary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Personalized treatment plans</span>
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
        <section className="py-8 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                If you&apos;re experiencing a mental health emergency
              </h3>
              <p className="text-red-800 mb-4">
                Please call 911 or go to your nearest emergency room
              </p>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}