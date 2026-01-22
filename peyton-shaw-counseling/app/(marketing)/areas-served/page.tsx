import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { businessInfo } from '@/lib/constants';
import { LOCATIONS } from '@/lib/locations';
import { generateMetaTags } from '@/lib/seo/utils';
import { targetKeywords } from '@/lib/seo/keywords';
import JsonLd from '@/components/seo/JsonLd';
import { generateWebPageSchema } from '@/lib/seo/schemas';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';

export const metadata = generateMetaTags({
  title: 'Areas We Serve - Therapy Services',
  description: `Telehealth-only therapy for teens and adults across Texas, including ${businessInfo.areaServed.join(', ')}.`,
  keywords: [
    ...targetKeywords.locationVariations.primary.map(loc => `therapist ${loc}`),
    ...targetKeywords.locationVariations.secondary.slice(0, 2).map(loc => `counseling ${loc}`),
    'North Texas therapy',
    'DFW counseling services'
  ],
  path: '/areas-served'
});

export default function AreasServedPage() {
  const webPageSchema = generateWebPageSchema({
    name: `Areas Served - Therapy Services in ${businessInfo.areaServed.slice(0, 3).join(', ')}, TX`,
    description: metadata.description as string,
    breadcrumb: [
      { name: 'Home', url: '/' },
      { name: 'Areas Served', url: '/areas-served' }
    ],
    url: '/areas-served'
  });

  return (
    <>
      <JsonLd data={webPageSchema} />
      <Header />
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Heading level={1} className="mb-6">
                Telehealth Therapy Across Texas
              </Heading>
              <Text size="xl" className="mb-8">
                Serving clients across {businessInfo.areaServed.slice(0, -1).join(', ')}, and {businessInfo.areaServed.slice(-1)[0]}.
                All sessions are telehealth-only, delivered securely from the comfort of your home.
              </Text>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  as={Link}
                  href="/contact"
                  className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8"
                >
                  Book a Consultation
                </Button>
                <Button
                  as={Link}
                  href="/services"
                  variant="bordered"
                  className="border-2 border-nude-clay text-nude-clay hover:bg-nude-linen font-medium px-8"
                >
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Areas Grid */}
        <section className="section-padding">
          <div className="container">
            <div className="mb-12 text-center">
              <Heading level={2} className="mb-4">
                Communities We Serve
              </Heading>
              <Text size="lg" className="max-w-3xl mx-auto">
                We support teens and adults across Texas with evidence-based care for anxiety,
                depression, relationship stress, and life transitions.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {LOCATIONS.map((area) => (
                <Card key={area.name} className="h-full hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <Heading level={3} className="mb-3 text-nude-clay">
                      {area.name}, TX
                    </Heading>
                    <Text className="mb-4">
                      {area.description}
                    </Text>
                    <div className="space-y-3">
                      <div>
                        <Text size="sm" weight="medium" className="text-grey-charcoal mb-1">
                          Neighborhoods Served:
                        </Text>
                        <Text size="sm" className="text-text-storm">
                          {area.neighborhoods.join(' • ')}
                        </Text>
                      </div>
                      <div>
                        <Text size="sm" weight="medium" className="text-grey-charcoal mb-1">
                          ZIP Codes:
                        </Text>
                        <Text size="sm" className="text-text-storm">
                          {area.zipCodes.join(', ')}
                        </Text>
                      </div>
                      <div className="pt-2">
                        <Button
                          as={Link}
                          href={`/areas-served/${area.slug}`}
                          variant="light"
                          className="text-nude-clay hover:text-nude-clay/80 p-0 h-auto"
                        >
                          Learn about therapy in {area.name} →
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="section-padding bg-nude-linen">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} className="text-center mb-8">
                Why Clients Choose Us Across Texas
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Telehealth Convenience
                  </Heading>
                  <Text>
                    Meet from home with secure video sessions available across Texas.
                  </Text>
                </div>
                
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Flexible Scheduling
                  </Heading>
                  <Text>
                    Telehealth appointments that fit busy school, work, and family schedules.
                  </Text>
                </div>
                
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Teen & Adult Care
                  </Heading>
                  <Text>
                    Developmentally informed care for teens and adults managing anxiety, mood, and life transitions.
                  </Text>
                </div>
                
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Out-of-Network Support
                  </Heading>
                  <Text>
                    Out-of-network only, with superbills available for possible reimbursement.
                  </Text>
                </div>
              </div>

              <div className="text-center">
                <Text size="lg" className="mb-6">
                  No matter which community you call home, support is within reach. Contact us to
                  get started.
                </Text>
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-10"
                >
                  Get Started Today
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Telehealth Availability */}
        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="text-center">
              <Heading level={2} className="mb-4">
                Telehealth-Only Practice
              </Heading>
              <Text className="mb-8 max-w-2xl mx-auto">
                We are currently telehealth-only and do not offer in-person sessions. If you are in
                Texas, you can meet from home using secure video.
              </Text>
              <div className="bg-nude-cream rounded-lg p-8 max-w-md mx-auto">
                <Text weight="medium" className="mb-2">
                  {businessInfo.name}
                </Text>
                <Text className="text-text-storm mb-4">
                  Serving clients across Texas via telehealth.
                </Text>
                <Text className="text-nude-clay font-medium">
                  Call: {businessInfo.phone}
                </Text>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
