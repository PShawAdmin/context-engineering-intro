'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import ContactForm from '@/components/features/ContactForm';
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
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [indicatorReady, setIndicatorReady] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const categories = useMemo(() => ['all', ...Object.keys(groupedFAQs)], []);

  const filteredFAQs = useMemo(() => 
    selectedKey === 'all' 
      ? FAQ_ITEMS 
      : groupedFAQs[selectedKey] || [],
    [selectedKey]
  );

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeTab = tabRefs.current[selectedKey];
      const indicator = indicatorRef.current;
      const container = tabsContainerRef.current;

      if (!activeTab || !indicator || !container) {
        setIndicatorReady(false);
        return;
      }

      const activeRect = activeTab.getBoundingClientRect();
      const parentRect = container.parentElement?.getBoundingClientRect() ?? container.getBoundingClientRect();
      const leftOffset = activeRect.left - parentRect.left;

      indicator.style.width = `${activeRect.width}px`;
      indicator.style.transform = `translateX(${leftOffset}px)`;
      setIndicatorReady(true);
    };

    const raf = window.requestAnimationFrame(updateIndicator);
    window.addEventListener('resize', updateIndicator);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [selectedKey, categories]);

  const handleCategoryChange = (category: string) => {
    setSelectedKey(category);
    setOpenItems(new Set());
  };

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <>
      <Header />
      <JsonLd data={generateFAQSchema(FAQ_ITEMS)} />
      <main>
        <Hero
          title="Frequently Asked Questions"
          subtitle="Clear answers about therapy and how we work"
          description="If you do not see your question here, reach out any time."
          backgroundImage={false}
        />

        <section className="section-padding bg-background-cream bg-pattern-watercolor">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Category Tabs */}
              <div className="relative mb-8 rounded-2xl bg-nude-cream/60 border-b border-nude-sand/10 px-2" aria-label="FAQ categories">
                <div
                  ref={tabsContainerRef}
                  role="tablist"
                  className="relative flex gap-6 overflow-x-auto overflow-y-visible pb-3 pt-2"
                >
                  {categories.map((category) => {
                    const isActive = selectedKey === category;
                    const label = category === 'all' ? 'All Questions' : category;

                    return (
                      <button
                        key={category}
                        ref={(node) => {
                          tabRefs.current[category] = node;
                        }}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => handleCategoryChange(category)}
                        className={
                          isActive
                            ? 'relative !appearance-none !bg-transparent !border-0 !shadow-none !rounded-none px-0 py-0 text-text-charcoal font-medium whitespace-nowrap pb-3 tracking-[0.06em] text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude-clay/30'
                            : 'relative !appearance-none !bg-transparent !border-0 !shadow-none !rounded-none px-0 py-0 text-text-storm hover:text-text-charcoal transition-colors whitespace-nowrap pb-3 tracking-[0.06em] text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude-clay/30'
                        }
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
                <div
                  ref={indicatorRef}
                  aria-hidden="true"
                  className={`absolute left-0 bottom-5 h-px rounded-full bg-slate-300 transition-[transform,width,opacity] duration-500 ease-out ${indicatorReady ? 'opacity-30' : 'opacity-0'}`}
                  style={{ width: 0, transform: 'translateX(0px)' }}
                />
              </div>

              {/* FAQ Accordion */}
              <div className="mb-12 space-y-3">
                {filteredFAQs.map((item) => {
                  const isOpen = openItems.has(item.id);
                  const contentId = `faq-${item.id}`;
                  const buttonId = `faq-${item.id}-button`;

                  return (
                    <div key={item.id} className="border border-nude-sand/40 rounded-2xl bg-nude-cream/90 shadow-soft hover:shadow-clay transition-shadow overflow-hidden">
                      <button
                        id={buttonId}
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="w-full text-left px-5 py-5 flex items-start gap-3 hover:bg-nude-linen/50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-base font-medium text-text-charcoal/90 font-sans flex-1">{item.question}</span>
                        <span className={`ml-4 text-nude-clay transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </span>
                      </button>
                      {isOpen && (
                        <div
                          id={contentId}
                          role="region"
                          aria-labelledby={buttonId}
                          className="px-6 pb-5 text-text-storm leading-relaxed"
                        >
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Still Have Questions? */}
              <Card className="bg-nude-cream/90 border border-nude-sand/40 shadow-soft">
                <CardBody>
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-serif text-text-charcoal mb-4">
                      Still Have Questions?
                    </h2>
                    <p className="text-text-storm mb-6 max-w-2xl mx-auto">
                      If you did not find the answer you need, I am happy to help. Reach out with
                      questions about therapy, scheduling, or fit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        as={Link}
                        href="/contact"
                        className="bg-nude-clay hover:bg-nude-warm text-text-charcoal shadow-soft"
                        size="lg"
                      >
                        Book a Consultation
                      </Button>
                      <Button
                        as="a"
                        href={`mailto:peyton@peytonshawcounseling.com`}
                        variant="bordered"
                        className="border border-nude-sand/70 text-text-storm hover:bg-nude-cream/70"
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
        <section className="section-padding bg-background-linen bg-pattern-watercolor">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-serif text-text-charcoal mb-8 text-center">
                Additional Resources
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-nude-cream/90 border border-nude-sand/40 shadow-soft hover:shadow-clay transition-all">
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

                <Card className="bg-nude-cream/90 border border-nude-sand/40 shadow-soft hover:shadow-clay transition-all">
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

                <Card className="bg-nude-cream/90 border border-nude-sand/40 shadow-soft hover:shadow-clay transition-all">
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
        <section id="crisis" className="py-12 bg-background-cream border-t border-nude-sand/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-serif text-text-charcoal mb-4 text-center">
                Crisis Resources
              </h3>
              <div className="bg-nude-cream/90 rounded-2xl p-6 border border-nude-sand/40 shadow-soft">
                <p className="text-text-storm mb-4 text-center">
                  If you are experiencing a mental health emergency, please contact:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="font-semibold text-text-charcoal">Emergency Services</p>
                    <a href="tel:911" className="text-2xl font-semibold text-nude-warm hover:text-nude-clay">
                      911
                    </a>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-text-charcoal">Suicide & Crisis Lifeline</p>
                    <a href="tel:988" className="text-2xl font-semibold text-nude-warm hover:text-nude-clay">
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
