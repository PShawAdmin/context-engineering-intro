import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import {Button} from '@heroui/button';
import {Card, CardHeader, CardBody} from '@heroui/card';
import { SERVICES } from '@/lib/constants';

interface ServicePageProps {
  params: {
    service: string;
  };
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = SERVICES.find((s) => s.slug === params.service);
  
  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.title,
    description: service.detailedDescription || service.description,
  };
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.service);

  if (!service) {
    notFound();
  }

  // Get other services for recommendations
  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <>
      <Header />
      <main>
        <Hero
          title={service.title}
          subtitle={service.description}
          primaryAction={{
            label: "Book This Service",
            href: "/contact"
          }}
          backgroundImage={false}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      About This Service
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {service.detailedDescription || service.description}
                    </p>
                  </div>

                  {service.benefits && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        What You Can Expect
                      </h3>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-6 h-6 mr-3 text-secondary-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      How It Works
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                          1
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Initial Consultation</h4>
                          <p className="text-gray-600 mt-1">
                            We&apos;ll discuss your concerns and goals to ensure this service is the right fit for you.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                          2
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Personalized Treatment Plan</h4>
                          <p className="text-gray-600 mt-1">
                            Together, we&apos;ll create a customized approach that addresses your specific needs.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                          3
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Ongoing Support</h4>
                          <p className="text-gray-600 mt-1">
                            Regular sessions to track progress and adjust our approach as needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="shadow-lg">
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Session Details</h3>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{service.duration}</p>
                        </div>
                        {service.price && (
                          <div>
                            <p className="text-sm text-gray-500">Fee</p>
                            <p className="font-medium">{service.price} per session</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-gray-500">Format</p>
                          <p className="font-medium">In-person or Virtual</p>
                        </div>
                      </div>
                      <Button
                        as={Link}
                        href="/contact"
                        color="primary"
                        className="w-full mt-6"
                      >
                        Book This Service
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Questions?</h3>
                    </CardHeader>
                    <CardBody>
                      <p className="text-gray-600 mb-4">
                        Not sure if this service is right for you? I&apos;m happy to discuss your needs.
                      </p>
                      <Button
                        as={Link}
                        href="/contact"
                        variant="bordered"
                        className="w-full"
                      >
                        Contact Me
                      </Button>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Services */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Explore Other Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {otherServices.map((otherService) => (
                <Card key={otherService.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{otherService.title}</h3>
                  </CardHeader>
                  <CardBody>
                    <p className="text-gray-600 text-sm mb-4">
                      {otherService.description}
                    </p>
                    <Button
                      as={Link}
                      href={`/services/${otherService.slug}`}
                      variant="light"
                      color="primary"
                      size="sm"
                    >
                      Learn More →
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}