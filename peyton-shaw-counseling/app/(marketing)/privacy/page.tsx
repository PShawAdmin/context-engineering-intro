import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { EmailLink } from '@/components/ui/EmailLink';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Learn how Peyton Shaw Counseling collects, uses, and protects information when you visit our website or contact us.',
};

const LAST_UPDATED = 'March 2025';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Privacy Policy"
          subtitle="How we collect, use, and protect your information"
          description="This policy applies to information collected on this website and through our contact form."
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
                  Peyton Shaw Counseling, PLLC (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your
                  privacy. This Privacy Policy explains what information we collect, how we use it,
                  and the choices you have when you visit our website or submit a form.
                </Text>
                <Text size="sm" color="muted">
                  Last updated: {LAST_UPDATED}
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Information we collect</Heading>
                <Text>
                  We collect information you choose to share and limited technical information about
                  how the site is used.
                </Text>
                <ul className="list-disc pl-6 space-y-2 text-text-storm">
                  <li>
                    <Text as="span" size="sm">
                      Contact form details, such as your name, email address, phone number (optional),
                      and the message you submit.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Communications you send us directly by email or phone.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Usage data such as pages viewed, approximate location, browser type, and device
                      information. We use analytics tools to understand how the site is used.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Security data such as IP address for rate limiting and abuse prevention.
                    </Text>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Heading level={3}>How we use information</Heading>
                <ul className="list-disc pl-6 space-y-2 text-text-storm">
                  <li>
                    <Text as="span" size="sm">
                      Respond to inquiries and provide information about services.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Improve the website experience, performance, and content.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Maintain security, prevent spam, and enforce rate limits.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Comply with legal obligations and resolve disputes if needed.
                    </Text>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Heading level={3}>How we share information</Heading>
                <Text>
                  We do not sell your personal information. We may share information with trusted
                  service providers who help operate the website and respond to inquiries.
                </Text>
                <ul className="list-disc pl-6 space-y-2 text-text-storm">
                  <li>
                    <Text as="span" size="sm">
                      Email delivery providers (such as SendGrid or Resend) to send and receive contact
                      form messages.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Analytics providers (such as Google Analytics) to understand site traffic and
                      improve performance.
                    </Text>
                  </li>
                  <li>
                    <Text as="span" size="sm">
                      Hosting and infrastructure providers that store and serve the website.
                    </Text>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Cookies and analytics</Heading>
                <Text>
                  We use cookies and similar technologies to measure site usage and improve our
                  services. You can control cookies through your browser settings and opt out of
                  analytics where available.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Sensitive information</Heading>
                <Text>
                  Please do not submit sensitive health information through the website contact form.
                  If you become a client, you will receive a separate Notice of Privacy Practices that
                  explains how protected health information is handled.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Data retention</Heading>
                <Text>
                  We keep contact submissions and communications for as long as needed to respond to
                  your inquiry, maintain business records, or meet legal requirements. Security logs
                  are retained for a limited period.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Security</Heading>
                <Text>
                  We use reasonable administrative, technical, and physical safeguards to protect your
                  information. No method of transmission or storage is 100% secure.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Children&apos;s privacy</Heading>
                <Text>
                  This website is not directed to children under 13, and we do not knowingly collect
                  personal information from children.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Your choices</Heading>
                <Text>
                  You may contact us to request updates or deletion of information you have submitted.
                  You can also disable cookies through your browser settings.
                </Text>
              </div>

              <div className="space-y-4">
                <Heading level={3}>Changes to this policy</Heading>
                <Text>
                  We may update this Privacy Policy from time to time. Changes will be posted on this
                  page with an updated date.
                </Text>
              </div>

              <div className="rounded-2xl border border-nude-linen bg-background-dove/80 shadow-soft p-6 md:p-8 space-y-3">
                <Heading level={3}>Contact</Heading>
                <Text>
                  If you have questions about this Privacy Policy, please contact us:
                </Text>
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
