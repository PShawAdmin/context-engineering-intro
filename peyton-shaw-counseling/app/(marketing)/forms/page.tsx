'use client'

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Button } from '@heroui/react';
import { Tabs, Tab } from '@heroui/react';
import { Chip } from '@heroui/react';
import Link from 'next/link';
import { PRACTICE_FORMS, NEW_CLIENT_PACKET, FORM_CATEGORIES } from '@/lib/forms-data';

export default function FormsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadingForm, setDownloadingForm] = useState<string | null>(null);

  const filteredForms = selectedCategory === 'all'
    ? PRACTICE_FORMS
    : PRACTICE_FORMS.filter(form => form.category === selectedCategory);

  const handleDownload = async (formId: string, fileName: string) => {
    setDownloadingForm(formId);
    
    try {
      // Fetch the PDF from our API
      const response = await fetch(`/api/forms/${formId}`);
      
      if (!response.ok) {
        const error = await response.json();
        console.error('Download error:', error);
        alert(error.message || 'Failed to download form. Please try again.');
        setDownloadingForm(null);
        return;
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setDownloadingForm(null);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download form. Please try again.');
      setDownloadingForm(null);
    }
  };

  const handleDownloadPacket = () => {
    NEW_CLIENT_PACKET.forEach((form, index) => {
      setTimeout(() => {
        handleDownload(form.id, form.fileName);
      }, index * 500);
    });
  };

  return (
    <>
      <Header />
      <main>
        <div className="relative">
          <Hero
            title="Forms & Documents"
            subtitle="Download and complete therapy forms at your convenience"
            description="Please complete all required forms before your first appointment. This helps us make the most of our time together."
            primaryAction={{
              label: "Download New Client Packet",
              href: "#download-packet"
            }}
            backgroundImage={false}
          />
          {/* Docs.png overlay */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: 'url(/docs.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>

        {/* Quick Info Section */}
        <section className="py-8 bg-nude-linen -mt-[1px]">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white border border-nude-sand">
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-nude-sand/30 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-xl font-medium text-text-charcoal mb-2">New Client? Start Here</h2>
                      <p className="text-text-storm mb-4">
                        Download our complete new client packet to save time at your first appointment. 
                        Forms can be completed digitally or printed and filled out by hand.
                      </p>
                      <Button
                        id="download-packet"
                        size="lg"
                        className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium"
                        onPress={handleDownloadPacket}
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download Complete New Client Packet
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Forms Section */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              {/* Category Tabs */}
              <Tabs
                aria-label="Form Categories"
                selectedKey={selectedCategory}
                onSelectionChange={(key) => setSelectedCategory(key.toString())}
                variant="underlined"
                classNames={{
                  base: "w-full",
                  tabList: "gap-6 w-full relative rounded-none p-0 border-b border-nude-sand/30",
                  cursor: "w-full bg-nude-clay h-0.5 bottom-0",
                  tab: "max-w-fit px-0 h-12 data-[hover-unselected=true]:opacity-70",
                  tabContent: "text-text-storm font-medium transition-all group-data-[selected=true]:text-nude-clay group-data-[selected=true]:font-semibold"
                }}
                className="mb-8"
              >
                <Tab key="all" title="All Forms" />
                {FORM_CATEGORIES.map((category) => (
                  <Tab key={category.id} title={category.title} />
                ))}
              </Tabs>

              {/* Forms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredForms.map((form) => (
                  <Card key={form.id} className="hover:shadow-medium transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-text-charcoal flex items-center gap-2">
                            {form.title}
                            {form.required && (
                              <Chip size="sm" className="bg-red-100 text-red-700">
                                Required
                              </Chip>
                            )}
                          </h3>
                          <p className="text-sm text-text-storm mt-1">{form.description}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          <svg className="w-8 h-8 text-nude-sand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </CardHeader>
                    <CardBody className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-text-light">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {form.pages} {form.pages === 1 ? 'page' : 'pages'}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Updated {new Date(form.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                        <Button
                          variant="flat"
                          size="sm"
                          className="text-nude-clay hover:bg-nude-clay/10"
                          onPress={() => handleDownload(form.id, form.fileName)}
                          isLoading={downloadingForm === form.id}
                        >
                          {downloadingForm === form.id ? 'Preparing...' : 'Download PDF'}
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-serif text-text-charcoal mb-8 text-center">
                How to Complete & Submit Forms
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white">
                  <CardBody className="text-center py-8">
                    <div className="w-16 h-16 bg-nude-linen rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-text-charcoal mb-2">1. Download Forms</h3>
                    <p className="text-sm text-text-storm">
                      Download the forms you need. New clients should download the complete packet.
                    </p>
                  </CardBody>
                </Card>
                
                <Card className="bg-white">
                  <CardBody className="text-center py-8">
                    <div className="w-16 h-16 bg-nude-linen rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-text-charcoal mb-2">2. Complete Forms</h3>
                    <p className="text-sm text-text-storm">
                      Fill out forms digitally or print and complete by hand. Take your time.
                    </p>
                  </CardBody>
                </Card>
                
                <Card className="bg-white">
                  <CardBody className="text-center py-8">
                    <div className="w-16 h-16 bg-nude-linen rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-text-charcoal mb-2">3. Submit Securely</h3>
                    <p className="text-sm text-text-storm">
                      Email completed forms or bring printed copies to your first appointment.
                    </p>
                  </CardBody>
                </Card>
              </div>
              
              <Card className="mt-8 bg-nude-linen border border-nude-sand">
                <CardBody>
                  <h3 className="text-lg font-medium text-text-charcoal mb-3">Secure Submission Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-text-charcoal">Email (Preferred)</p>
                        <p className="text-sm text-text-storm">
                          Send completed forms to{' '}
                          <a href="mailto:forms@peytonshawcounseling.com" className="text-nude-clay hover:text-nude-warm underline">
                            forms@peytonshawcounseling.com
                          </a>
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <p className="font-medium text-text-charcoal">In Person</p>
                        <p className="text-sm text-text-storm">
                          Bring completed forms to your first appointment
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="font-medium text-text-charcoal">Client Portal</p>
                        <p className="text-sm text-text-storm">
                          Coming soon - Secure upload through our client portal
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Privacy Notice */}
        <section className="py-12 bg-nude-linen">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif text-text-charcoal mb-4">Your Privacy is Protected</h3>
              <p className="text-text-storm mb-6 max-w-2xl mx-auto">
                All information you provide is kept strictly confidential and protected under HIPAA regulations. 
                We use secure, encrypted methods for handling your personal health information.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium"
                >
                  Questions? Contact Us
                </Button>
                <Button
                  as={Link}
                  href="/faq"
                  variant="bordered"
                  size="lg"
                  className="border-2 border-grey-charcoal text-grey-charcoal hover:bg-background-dove"
                >
                  View FAQ
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