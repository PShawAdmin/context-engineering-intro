'use client'

import { Metadata } from 'next';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import ContactForm from '@/components/features/ContactForm';
import {Accordion, AccordionItem} from '@heroui/react';
import {Tabs, Tab} from '@heroui/react';
import {Card, CardBody} from '@heroui/react';
import {Button} from '@heroui/react';
import Link from 'next/link';
import { FAQ_ITEMS } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import { generateFAQSchema } from '@/lib/seo/schemas';

// Group FAQ items by category
const groupedFAQs = FAQ_ITEMS.reduce((acc, item) => {
  const category = item.category || 'General';
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(item);
  return acc;
}, {} as Record<string, typeof FAQ_ITEMS>);

export default function FAQPage() {
  const [selectedKey, setSelectedKey] = useState<string>('all');
  const [expandedKeys, setExpandedKeys] = useState(new Set<string>());

  const filteredFAQs = useMemo(() => 
    selectedKey === 'all' 
      ? FAQ_ITEMS 
      : groupedFAQs[selectedKey] || [],
    [selectedKey]
  );

  // Reset expanded keys when filter changes
  useEffect(() => {
    setExpandedKeys(new Set<string>());
  }, [selectedKey]);

  const handleTabChange = (key: React.Key) => {
    setSelectedKey(key.toString());
  };

  const handleAccordionChange = (keys: any) => {
    if (typeof keys === 'string' && keys === 'all') {
      setExpandedKeys(new Set(filteredFAQs.map(item => item.id)));
    } else if (keys instanceof Set) {
      setExpandedKeys(new Set(Array.from(keys)));
    } else if (Array.isArray(keys)) {
      setExpandedKeys(new Set(keys));
    } else {
      setExpandedKeys(new Set());
    }
  };




  return (
    <>
      <Header />
      <JsonLd data={generateFAQSchema(FAQ_ITEMS)} />
      <main>
        <Hero
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about therapy and my practice"
          description="Can't find what you're looking for? Feel free to reach out directly."
          backgroundImage={false}
        />

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Category Tabs */}
              <Tabs 
                aria-label="FAQ Categories"
                selectedKey={selectedKey}
                onSelectionChange={handleTabChange}
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
                <Tab key="all" title="All Questions" />
                {Object.keys(groupedFAQs).map((category) => (
                  <Tab key={category} title={category} />
                ))}
              </Tabs>

              {/* FAQ Accordion */}
              <Accordion 
                variant="bordered"
                selectionMode="multiple"
                selectedKeys={Array.from(expandedKeys)}
                onSelectionChange={handleAccordionChange}
                className="mb-12"
              >
                {filteredFAQs.map((item) => (
                  <AccordionItem
                    key={item.id}
                    aria-label={item.question}
                    title={
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-nude-clay mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-base font-normal font-sans">{item.question}</span>
                      </div>
                    }
                    classNames={{
                      trigger: "px-4 py-4 hover:bg-background-dove transition-colors",
                      title: "font-normal text-base",
                      content: "px-8 pb-4 text-text-storm"
                    }}
                  >
                    <div className="text-text-storm">
                      {item.answer}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Still Have Questions? */}
              <Card className="bg-nude-linen border border-nude-sand">
                <CardBody>
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-serif text-text-charcoal mb-4">
                      Still Have Questions?
                    </h2>
                    <p className="text-text-storm mb-6 max-w-2xl mx-auto">
                      If you couldn&apos;t find the answer you were looking for, I&apos;m here to help. 
                      Feel free to reach out with any questions about therapy, my approach, or 
                      how to get started.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        as={Link}
                        href="/contact"
                        className="bg-nude-clay hover:bg-nude-clay/90 text-white"
                        size="lg"
                      >
                        Schedule a Consultation
                      </Button>
                      <Button
                        as="a"
                        href={`mailto:peyton@peytonshawcounseling.com`}
                        variant="bordered"
                        className="border-2 border-grey-charcoal text-grey-charcoal hover:bg-background-dove"
                        size="lg"
                      >
                        Send an Email
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Quick Contact Form */}
              <div className="mt-16">
                <h2 className="text-2xl font-serif text-text-charcoal mb-8 text-center">
                  Or Send a Quick Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="py-16 bg-background-dove">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-text-charcoal mb-8 text-center">
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white hover:shadow-medium transition-shadow">
                  <CardBody>
                    <svg className="w-8 h-8 text-nude-clay mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-lg font-semibold text-text-charcoal mb-2">
                      Getting Started Guide
                    </h3>
                    <p className="text-sm text-text-storm mb-4">
                      Learn what to expect in your first session and how to prepare.
                    </p>
                    <Link href="/blog" className="text-nude-clay hover:underline text-sm font-medium">
                      Read Guide →
                    </Link>
                  </CardBody>
                </Card>

                <Card className="bg-white hover:shadow-medium transition-shadow">
                  <CardBody>
                    <svg className="w-8 h-8 text-nude-clay mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-text-charcoal mb-2">
                      Forms & Documents
                    </h3>
                    <p className="text-sm text-text-storm mb-4">
                      Download intake forms and review practice policies.
                    </p>
                    <Link href="/forms" className="text-nude-clay hover:underline text-sm font-medium">
                      Access Forms →
                    </Link>
                  </CardBody>
                </Card>

                <Card className="bg-white hover:shadow-medium transition-shadow">
                  <CardBody>
                    <svg className="w-8 h-8 text-nude-clay mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-text-charcoal mb-2">
                      Crisis Resources
                    </h3>
                    <p className="text-sm text-text-storm mb-4">
                      Emergency contacts and 24/7 support resources.
                    </p>
                    <Link href="/crisis-resources" className="text-nude-clay hover:underline text-sm font-medium">
                      View Resources →
                    </Link>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Crisis Resources */}
        <section id="crisis" className="py-8 bg-red-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-semibold text-red-900 mb-4 text-center">
                Crisis Resources
              </h3>
              <div className="bg-white rounded-lg p-6">
                <p className="text-red-800 mb-4 text-center">
                  If you are experiencing a mental health emergency, please contact:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-semibold text-text-charcoal">Emergency Services</p>
                    <a href="tel:911" className="text-2xl font-bold text-red-600 hover:text-red-700">
                      911
                    </a>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-text-charcoal">Suicide & Crisis Lifeline</p>
                    <a href="tel:988" className="text-2xl font-bold text-red-600 hover:text-red-700">
                      988
                    </a>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-text-storm">
                    Crisis Text Line: Text HOME to <span className="font-semibold">741741</span>
                  </p>
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