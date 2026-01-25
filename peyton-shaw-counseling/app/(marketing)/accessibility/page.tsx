import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { EmailLink } from '@/components/ui/EmailLink';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Accessibility',
  description:
    'Our commitment to providing an accessible experience for all visitors to the Peyton Shaw Counseling website.',
};

const LAST_UPDATED = 'March 2025';

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Accessibility"
          subtitle="We are committed to an inclusive experience"
          description="If you encounter any barriers, please let us know."
          backgroundImage={false}
          showWave={false}
          size="standard"
        />

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="rounded-2xl border border-nude-linen bg-nude-cream/90 shadow-soft p-6 md:p-8 space-y-4">
                <Heading level={3}>Our commitment</Heading>
                <Text>
                  Peyton Shaw Counseling is committed to providing a website that is accessible to the
                  widest possible audience, regardless of technology or ability. We aim to make our
                  website as easy to use and understand as possible.
                </Text>
                <Text size="sm" color="muted">
                  Last updated: {LAST_UPDATED}
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Accessibility standards</Heading>
                <Text>
                  We strive to align with the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.
                  While we work toward meeting these standards, some content may not fully conform.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Measures we take</Heading>
                <ul className="list-disc pl-6 space-y-2 text-text-storm">
                  <li>
                    <Text as="span" size="sm">
                      Clear headings, structure, and readable typography.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Sufficient color contrast for key text and UI elements.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Keyboard navigation for interactive components.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Alternative text for important images where appropriate.
                    </Text>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Compatibility</Heading>
                <Text>
                  Our site is designed to work with modern browsers and assistive technologies. We
                  recommend keeping your browser and assistive tools updated for the best experience.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Limitations and alternatives</Heading>
                <Text>
                  Some third-party content or embedded tools may not fully conform to accessibility
                  standards. If you encounter a barrier, we will do our best to provide the information
                  in an alternative format.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Feedback</Heading>
                <Text>
                  We welcome feedback on the accessibility of this website. If you experience any issues
                  or need assistance, please contact us and we will respond as quickly as possible.
                </Text>
              </div>

              <div className="rounded-2xl border border-nude-linen bg-background-dove/80 shadow-soft p-6 md:p-8 space-y-3">
                <Heading level={3}>Contact</Heading>
                <Text>If you need help or want to report an accessibility issue, reach out to us:</Text>
                <div className="space-y-2 text-text-storm">
                  <Text as="span" size="sm" className="block">
                    {SITE_CONFIG.name}
                  </Text>
                  <EmailLink className="block text-sm text-text-storm hover:text-nude-clay transition-colors" />
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="block text-sm text-text-storm hover:text-nude-clay transition-colors"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
