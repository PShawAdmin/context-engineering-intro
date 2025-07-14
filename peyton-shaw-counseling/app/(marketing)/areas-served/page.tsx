import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { businessInfo } from '@/lib/constants';
import { generateMetaTags } from '@/lib/seo/utils';
import { targetKeywords } from '@/lib/seo/keywords';
import JsonLd from '@/components/seo/JsonLd';
import { generateWebPageSchema } from '@/lib/seo/schemas';
import { Card, CardBody } from '@heroui/card';
import { Button } from '@heroui/button';

export const metadata = generateMetaTags({
  title: 'Areas We Serve - Therapy Services',
  description: `Professional therapy services available to clients in ${businessInfo.areaServed.join(', ')}, TX. Convenient locations and online sessions for North Texas residents.`,
  keywords: [
    ...targetKeywords.locationVariations.primary.map(loc => `therapist ${loc}`),
    ...targetKeywords.locationVariations.secondary.slice(0, 2).map(loc => `counseling ${loc}`),
    'North Texas therapy',
    'DFW counseling services'
  ],
  path: '/areas-served'
});

// Area information with specific details
const areaDetails = [
  {
    name: 'Southlake',
    description: 'Our primary location serves the Southlake community with convenient access from Highway 114 and FM 1709. Known for its family-friendly atmosphere and excellent schools, Southlake residents value quality mental health services.',
    neighborhoods: ['Town Square', 'Timarron', 'Carillon', 'Westwyck Hills'],
    zipCodes: ['76092', '76126']
  },
  {
    name: 'Grapevine',
    description: 'Serving Grapevine\'s diverse community, from historic downtown to newer developments. Easy access for residents near Grapevine Mills and DFW Airport area.',
    neighborhoods: ['Downtown Historic District', 'Silver Lake', 'Grapevine Mills area', 'Dove Loop'],
    zipCodes: ['76051', '76099']
  },
  {
    name: 'Colleyville',
    description: 'Providing therapy services to Colleyville\'s close-knit community. Convenient for residents along Colleyville Boulevard and near the Colleyville Heritage High School area.',
    neighborhoods: ['Montclair Parc', 'The Estates of Colleyville', 'Wellington', 'Bransford'],
    zipCodes: ['76034']
  },
  {
    name: 'Keller',
    description: 'Supporting Keller families with accessible mental health services. Serving areas from Old Town Keller to newer developments along Highway 377.',
    neighborhoods: ['Hidden Lakes', 'The Highlands', 'Keller Town Center', 'Bear Creek'],
    zipCodes: ['76244', '76248']
  },
  {
    name: 'Westlake',
    description: 'Offering premium therapy services to Westlake residents. Convenient access for those near Westlake Academy and the Vaquero community.',
    neighborhoods: ['Vaquero', 'Glenwyck Farms', 'Stagecoach Hills'],
    zipCodes: ['76262', '76092']
  },
  {
    name: 'Trophy Club',
    description: 'Extending our services to Trophy Club\'s growing community. Easily accessible for residents near Byron Nelson High School and the Trophy Club Country Club area.',
    neighborhoods: ['The Highlands', 'Hogan\'s Glen', 'Trophy Club Country Club'],
    zipCodes: ['76262']
  }
];

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
        <section className="section-padding bg-gradient-to-b from-nude-linen to-background-dove">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <Heading level={1} className="mb-6">
                Therapy Services Across North Texas
              </Heading>
              <Text size="xl" className="mb-8">
                Conveniently serving clients throughout {businessInfo.areaServed.slice(0, -1).join(', ')}, 
                and {businessInfo.areaServed.slice(-1)[0]}. Whether you prefer in-person sessions at our 
                {' '}{businessInfo.address.addressLocality} location or online therapy from the comfort 
                of your home, we&apos;re here to support your mental health journey.
              </Text>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  as={Link}
                  href="/contact"
                  className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8"
                >
                  Schedule Your Appointment
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
                Our practice is proud to serve these North Texas communities, 
                providing accessible mental health care to teens and adults seeking 
                support for anxiety, depression, life transitions, and more.
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {areaDetails.map((area) => (
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
                Why Clients Choose Us Across North Texas
              </Heading>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Convenient Location
                  </Heading>
                  <Text>
                    Our {businessInfo.address.addressLocality} office is centrally located with easy 
                    access from major highways, making it convenient for clients throughout the area.
                  </Text>
                </div>
                
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Flexible Scheduling
                  </Heading>
                  <Text>
                    We offer both in-person and online therapy sessions to accommodate your schedule 
                    and preferences, including evening and weekend appointments.
                  </Text>
                </div>
                
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Specialized Care
                  </Heading>
                  <Text>
                    With expertise in anxiety, depression, life transitions, and relationship issues, 
                    we provide targeted support for the challenges you&apos;re facing.
                  </Text>
                </div>
                
                <div>
                  <Heading level={3} className="text-xl mb-3">
                    Teen & Adult Focus
                  </Heading>
                  <Text>
                    We understand the unique needs of both teenagers and adults, offering 
                    age-appropriate therapeutic approaches for each client.
                  </Text>
                </div>
              </div>

              <div className="text-center">
                <Text size="lg" className="mb-6">
                  No matter which community you call home in North Texas, quality mental health 
                  care is within reach. Contact us today to begin your journey toward healing.
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

        {/* Map Section Placeholder */}
        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="text-center">
              <Heading level={2} className="mb-4">
                Find Us in {businessInfo.address.addressLocality}
              </Heading>
              <Text className="mb-8 max-w-2xl mx-auto">
                Our office is conveniently located in {businessInfo.address.addressLocality}, TX, 
                with ample parking and a comfortable, private setting for your therapy sessions.
              </Text>
              <div className="bg-nude-cream rounded-lg p-8 max-w-md mx-auto">
                <Text weight="medium" className="mb-2">
                  {businessInfo.name}
                </Text>
                <Text className="text-text-storm mb-4">
                  {businessInfo.address.addressLocality}, {businessInfo.address.addressRegion} {businessInfo.address.postalCode}
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