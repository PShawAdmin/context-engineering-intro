import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { EmailLink } from '@/components/ui/EmailLink';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms governing the use of the Peyton Shaw Counseling website and contact form.',
};

const LAST_UPDATED = 'March 2025';

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Terms of Service"
          subtitle="Guidelines for using this website"
          description="By accessing this site, you agree to these terms."
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
                <Heading level={3}>Overview</Heading>
                <Text>
                  These Terms of Service (&quot;Terms&quot;) govern your use of the Peyton Shaw Counseling
                  website. By accessing or using the site, you agree to these Terms. If you do not agree,
                  please do not use the site.
                </Text>
                <Text size="sm" color="muted">
                  Last updated: {LAST_UPDATED}
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Use of the website</Heading>
                <Text>
                  You may use this site for lawful, personal purposes. You agree not to misuse the site,
                  attempt to gain unauthorized access, or interfere with the site&apos;s operation.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>No medical advice or emergency services</Heading>
                <Text>
                  Content on this website is for informational purposes only and does not create a
                  therapist-client relationship. The website is not an emergency service. If you are
                  experiencing a crisis, call 911 or go to your nearest emergency room.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Contact form and communication</Heading>
                <Text>
                  If you submit the contact form, you agree to provide accurate information. Please do
                  not submit sensitive health information through the website. We will use the information
                  you provide to respond to your inquiry.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Appointments and services</Heading>
                <Text>
                  Scheduling, fees, cancellation policies, and treatment terms are provided separately
                  as part of the intake and informed consent process. The website does not guarantee the
                  availability of services.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Intellectual property</Heading>
                <Text>
                  All content on this site, including text, graphics, and branding, is owned by or licensed
                  to Peyton Shaw Counseling and is protected by applicable laws. You may not copy, reproduce,
                  or distribute content without written permission.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Third-party links</Heading>
                <Text>
                  This site may include links to third-party websites. We do not control those sites and
                  are not responsible for their content, policies, or practices.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Disclaimer of warranties</Heading>
                <Text>
                  This site is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We make no warranties,
                  express or implied, about the site&apos;s accuracy, reliability, or availability.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Limitation of liability</Heading>
                <Text>
                  To the fullest extent permitted by law, Peyton Shaw Counseling is not liable for any
                  indirect, incidental, or consequential damages arising from your use of the website.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Changes to these terms</Heading>
                <Text>
                  We may update these Terms from time to time. Changes will be posted on this page with an
                  updated date.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Governing law</Heading>
                <Text>
                  These Terms are governed by the laws of the State of Texas, without regard to conflict of
                  law principles.
                </Text>
              </div>

              <div className="rounded-2xl border border-nude-linen bg-background-dove/80 shadow-soft p-6 md:p-8 space-y-3">
                <Heading level={3}>Contact</Heading>
                <Text>If you have questions about these Terms, please contact us:</Text>
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
