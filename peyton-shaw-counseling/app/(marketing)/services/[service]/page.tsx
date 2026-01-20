import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import {Button} from '@heroui/button';
import {Card, CardHeader, CardBody} from '@heroui/card';
import { SERVICES, businessInfo } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import { generateServiceSchema, generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/schemas';
import { generateMetaTags } from '@/lib/seo/utils';
import { getServiceKeywords } from '@/lib/seo/keywords';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';

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

  const keywords = getServiceKeywords(service.slug);
  
  return generateMetaTags({
    title: `${service.title} - Professional Therapy`,
    description: `${service.detailedDescription || service.description} Telehealth-only across Texas. Book your ${service.title.toLowerCase()} session today.`,
    keywords,
    path: `/services/${service.slug}`,
  });
}

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = SERVICES.find((s) => s.slug === params.service);

  if (!service) {
    notFound();
  }

  // Get other services for recommendations
  const otherServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3);

  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${service.slug}` }
  ];

  // Generate page schema
  const webPageSchema = generateWebPageSchema({
    name: `${service.title} Telehealth in Texas - ${businessInfo.name}`,
    description: service.detailedDescription || service.description,
    breadcrumb: breadcrumbItems,
    url: `/services/${service.slug}`
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={generateServiceSchema(service)} />
      <Header />
      <main>
        <Hero
          title={service.title}
          subtitle="Telehealth-only care for teens and adolescents across Texas"
          primaryAction={{
            label: "Book a Consultation",
            href: "/contact"
          }}
          backgroundImage={false}
        />

        <section className="section-padding">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <Heading level={2} className="mb-4">
                      About {service.title}
                    </Heading>
                    <Text className="leading-relaxed">
                      {service.detailedDescription || service.description} Sessions are tailored to your goals, with practical tools you can use between appointments.
                    </Text>
                  </div>

                  {service.benefits && (
                    <div>
                      <Heading level={3} className="mb-4">
                        What You Can Expect
                      </Heading>
                      <ul className="space-y-3">
                        {service.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-6 h-6 mr-3 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <Text>{benefit}</Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <Heading level={3} className="mb-4">
                      How {service.title} Works
                    </Heading>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                          1
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Consultation and goals</h4>
                          <p className="text-gray-600 mt-1">
                            We clarify what you want to change and how therapy can help.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                          2
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Personalized plan</h4>
                          <p className="text-gray-600 mt-1">
                            We choose evidence-based strategies that fit your goals and preferences.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-semibold">
                          3
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">Practice and progress</h4>
                          <p className="text-gray-600 mt-1">
                            Regular sessions to build skills, review progress, and adjust as needed.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="bg-nude-linen border border-nude-sand">
                    <CardHeader>
                      <Heading level={3} className="text-lg">Session Details</Heading>
                    </CardHeader>
                    <CardBody>
                      <div className="space-y-4">
                        <div>
                          <Text size="sm" className="text-text-storm">Duration</Text>
                          <Text weight="medium">{service.duration}</Text>
                        </div>
                        {service.price && (
                          <div>
                            <Text size="sm" className="text-text-storm">Fee</Text>
                            <Text weight="medium">{service.price} per session</Text>
                          </div>
                        )}
                        <div>
                          <Text size="sm" className="text-text-storm">Format</Text>
                          <Text weight="medium">Telehealth-only (secure video)</Text>
                        </div>
                        <div>
                          <Text size="sm" className="text-text-storm">Service Area</Text>
                          <Text weight="medium">{businessInfo.primaryServiceArea}</Text>
                        </div>
                      </div>
                      <Button
                        as={Link}
                        href="/contact"
                        className="w-full mt-6 bg-nude-clay hover:bg-nude-clay/90 text-white"
                      >
                        Book {service.title}
                      </Button>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="text-lg font-semibold">Questions?</h3>
                    </CardHeader>
                    <CardBody>
                      <p className="text-gray-600 mb-4">
                        Not sure if this service is right for you? I&apos;m happy to answer questions.
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
        <section className="section-padding bg-background-dove">
          <div className="container">
            <Heading level={2} className="mb-8 text-center">
              Other Telehealth Services
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {otherServices.map((otherService) => (
                <Card key={otherService.id} className="hover:shadow-lg transition-shadow bg-nude-cream border border-nude-sand">
                  <CardHeader>
                    <Heading level={3} className="text-lg">{otherService.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text size="sm" className="mb-4">
                      {otherService.description}
                    </Text>
                    <Button
                      as={Link}
                      href={`/services/${otherService.slug}`}
                      variant="light"
                      className="text-nude-clay hover:text-nude-clay/80"
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
