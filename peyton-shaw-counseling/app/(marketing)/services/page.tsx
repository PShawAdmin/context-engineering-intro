import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import ServiceCard from '@/components/features/ServiceCard';
import { SERVICES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Therapy Services',
  description: 'Explore our comprehensive therapy services including individual therapy, anxiety management, depression treatment, and more.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <Hero
          title="Therapy Services"
          subtitle="Compassionate, Professional Support for Your Mental Health Journey"
          description="Explore our range of therapy services designed to help you overcome challenges, develop coping strategies, and achieve emotional well-being."
          primaryAction={{
            label: "Book a Consultation",
            href: "/contact"
          }}
          backgroundImage={false}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Personalized Therapy for Every Need
              </h2>
              <p className="text-lg text-gray-600">
                Each person&apos;s journey is unique. I offer a variety of therapeutic approaches 
                tailored to address your specific concerns and help you achieve your personal goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Insurance and Payment Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Insurance and Payment
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Insurance
                  </h3>
                  <p className="text-gray-600 mb-4">
                    I am currently an out-of-network provider. I can provide you with a 
                    superbill that you can submit to your insurance company for potential 
                    reimbursement.
                  </p>
                  <p className="text-gray-600">
                    Please check with your insurance provider about your out-of-network 
                    mental health benefits before scheduling.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Payment Options
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Payment is due at the time of service. I accept:
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Credit/Debit Cards
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      HSA/FSA Cards
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Cash or Check
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Take the first step towards better mental health. Schedule your initial 
              consultation today and let&apos;s discuss how I can support you.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              Book Your First Session
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}