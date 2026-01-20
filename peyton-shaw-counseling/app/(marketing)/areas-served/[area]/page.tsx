import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import Testimonials from '@/components/features/Testimonials';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { SERVICES, businessInfo } from '@/lib/constants';
import { LOCATIONS, getLocationBySlug } from '@/lib/locations';
import { generateMetaTags } from '@/lib/seo/utils';
import { generateFAQSchema, generateWebPageSchema } from '@/lib/seo/schemas';
import JsonLd from '@/components/seo/JsonLd';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';

interface LocationPageProps {
  params: {
    area: string;
  };
}

export async function generateStaticParams() {
  return LOCATIONS.map((location) => ({
    area: location.slug,
  }));
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const location = getLocationBySlug(params.area);

  if (!location) {
    return { title: 'Location Not Found' };
  }

  const description = `Therapy for ${location.name}, TX residents. ${location.description} In-person sessions in ${businessInfo.address.addressLocality} and telehealth across Texas.`;
  const keywords = [
    `${location.name} therapist`,
    `therapy in ${location.name}`,
    `${location.name} counseling`,
    `counselor ${location.name} TX`,
    `anxiety therapy ${location.name}`,
    `depression therapy ${location.name}`,
    `teen therapy ${location.name}`,
    `adult counseling ${location.name}`,
    'Southlake therapist',
    'online therapy Texas'
  ];

  return generateMetaTags({
    title: `Therapy in ${location.name}`,
    description,
    keywords,
    path: `/areas-served/${location.slug}`
  });
}

export default function LocationPage({ params }: LocationPageProps) {
  const location = getLocationBySlug(params.area);

  if (!location) {
    notFound();
  }

  const featuredServices = location.serviceFocus
    .map((slug) => SERVICES.find((service) => service.slug === slug))
    .filter((service): service is (typeof SERVICES)[number] => Boolean(service));

  const pageDescription = `Therapy for ${location.name}, TX residents. ${location.intro} In-person sessions in ${businessInfo.address.addressLocality} and telehealth across Texas.`;

  const webPageSchema = generateWebPageSchema({
    name: `Therapy in ${location.name}, TX`,
    description: pageDescription,
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Areas Served', url: '/areas-served' },
      { name: `${location.name}, TX`, url: `/areas-served/${location.slug}` }
    ],
    url: `/areas-served/${location.slug}`
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <JsonLd data={generateFAQSchema(location.faqs)} />
      <Header />
      <main>
        <Hero
          title={`Therapy in ${location.name}, TX`}
          subtitle={`Personalized therapy for ${location.name} and nearby communities`}
          description={location.intro}
          primaryAction={{ label: 'Book a Consultation', href: '/contact' }}
          secondaryAction={{ label: 'View Services', href: '/services' }}
          backgroundImage={false}
        />

        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <Heading level={2} className="mb-4">
                  Local, convenient care for {location.name}
                </Heading>
                <Text className="mb-6">
                  {location.description} Our Southlake office offers a quiet, private setting,
                  and telehealth is available if you prefer to meet from home.
                </Text>
                <ul className="space-y-3">
                  {location.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-nude-clay mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <Text>{highlight}</Text>
                    </li>
                  ))}
                </ul>
              </div>

              <Card className="bg-nude-linen border border-nude-sand">
                <CardHeader>
                  <Heading level={3} className="text-lg">Book a Consultation</Heading>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div>
                      <Text size="sm" className="text-text-storm">In-person location</Text>
                      <Text weight="medium">{businessInfo.address.addressLocality}, TX</Text>
                    </div>
                    <div>
                      <Text size="sm" className="text-text-storm">Phone</Text>
                      <Text weight="medium">{businessInfo.phone}</Text>
                    </div>
                    <div>
                      <Text size="sm" className="text-text-storm">Email</Text>
                      <Text weight="medium">{businessInfo.email}</Text>
                    </div>
                  </div>
                  <Button
                    as={Link}
                    href="/contact"
                    className="w-full mt-6 bg-nude-clay hover:bg-nude-clay/90 text-white"
                  >
                    Get Started
                  </Button>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                Popular services for {location.name} clients
              </Heading>
              <Text size="lg" className="max-w-3xl mx-auto">
                Explore therapy options that support stress relief, emotional growth, and healthier relationships.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {featuredServices.map((service) => (
                <Card key={service.id} className="bg-white border border-nude-sand hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Heading level={3} className="text-lg">{service.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text size="sm" className="mb-4">
                      {service.description}
                    </Text>
                    <Button
                      as={Link}
                      href={`/services/${service.slug}`}
                      variant="light"
                      className="text-nude-clay hover:text-nude-clay/80 p-0 h-auto"
                    >
                      Learn more →
                    </Button>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <Heading level={2} className="mb-4">
                  Neighborhoods we serve in {location.name}
                </Heading>
                <Text className="mb-4">
                  We work with clients across {location.name}, including:
                </Text>
                <ul className="space-y-2">
                  {location.neighborhoods.map((neighborhood) => (
                    <li key={neighborhood} className="text-text-storm">
                      {neighborhood}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <Heading level={2} className="mb-4">
                  ZIP codes served
                </Heading>
                <Text className="mb-4">
                  If you are near any of these ZIP codes, we can help you get started:
                </Text>
                <div className="flex flex-wrap gap-3">
                  {location.zipCodes.map((zip) => (
                    <span key={zip} className="px-4 py-2 bg-nude-cream rounded-full text-sm text-text-storm">
                      {zip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-nude-linen">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="mb-6 text-center">
                FAQs about therapy in {location.name}
              </Heading>
              <div className="space-y-4">
                {location.faqs.map((faq) => (
                  <div key={faq.id} className="bg-white border border-nude-sand rounded-lg p-6">
                    <Heading level={3} className="text-lg mb-2">
                      {faq.question}
                    </Heading>
                    <Text>{faq.answer}</Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Heading level={2} className="mb-4">
                Ready to get started from {location.name}?
              </Heading>
              <Text size="lg" className="mb-6">
                Reach out today to schedule a consultation and take the next step toward feeling better.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as={Link}
                  href="/contact"
                  className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8"
                >
                  Book a Consultation
                </Button>
                <Button
                  as={Link}
                  href="/areas-served"
                  variant="bordered"
                  className="border-2 border-nude-clay text-nude-clay hover:bg-nude-linen font-medium px-8"
                >
                  View All Areas
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
