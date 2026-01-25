'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import ContactForm from '@/components/features/ContactForm';
import { EmailButton } from '@/components/ui/EmailLink';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { FAQ_ITEMS } from '@/lib/constants';
import JsonLd from '@/components/seo/JsonLd';
import { generateFAQSchema } from '@/lib/seo/schemas';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';

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

  const filteredFAQs = useMemo(
    () => (selectedKey === 'all' ? FAQ_ITEMS : groupedFAQs[selectedKey] || []),
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
      const parentRect =
        container.parentElement?.getBoundingClientRect() ?? container.getBoundingClientRect();
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
      if (prev.has(id)) {
        return new Set();
      }
      return new Set([id]);
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
          showWave={false}
          size="standard"
        />

        <section className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-25"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto space-y-12">
              <div className="rounded-2xl border border-nude-linen bg-nude-cream/90 shadow-soft overflow-hidden">
                <div className="px-6 pt-5 pb-3">
                  <Text size="xs" color="muted" className="uppercase tracking-[0.25em]">
                    Browse by topic
                  </Text>
                  <div className="relative mt-3" aria-label="FAQ categories">
                    <div
                      ref={tabsContainerRef}
                      role="tablist"
                      className="relative flex gap-6 overflow-x-auto pb-0.5"
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
                                ? 'relative !appearance-none !bg-transparent !border-0 !shadow-none !rounded-none px-0 py-0 text-text-charcoal font-medium whitespace-nowrap pb-0.5 tracking-[0.06em] text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude-clay/30'
                                : 'relative !appearance-none !bg-transparent !border-0 !shadow-none !rounded-none px-0 py-0 text-text-storm hover:text-text-charcoal transition-colors whitespace-nowrap pb-0.5 tracking-[0.06em] text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude-clay/30'
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
                      className={`absolute left-0 bottom-0 h-px rounded-full bg-nude-sand/70 transition-[transform,width,opacity] duration-500 ease-out ${
                        indicatorReady ? 'opacity-60' : 'opacity-0'
                      }`}
                      style={{ width: 0, transform: 'translateX(0px)' }}
                    />
                  </div>
                </div>

                <div className="px-6 py-6">
                  <div className="space-y-3">
                    {filteredFAQs.map((item) => {
                      const isOpen = openItems.has(item.id);
                      const contentId = `faq-${item.id}`;
                      const buttonId = `faq-${item.id}-button`;

                      return (
                        <div
                          key={item.id}
                          className="border border-nude-linen rounded-2xl bg-background-pearl/70 shadow-soft hover:shadow-clay transition-shadow overflow-hidden"
                        >
                          <button
                            id={buttonId}
                            type="button"
                            onClick={() => toggleItem(item.id)}
                            aria-expanded={isOpen}
                            aria-controls={contentId}
                            className={`w-full text-left px-5 py-5 flex items-start gap-3 transition-colors ${
                              isOpen ? 'bg-grey-blue-lighter/60' : 'hover:bg-grey-blue-lighter/60'
                            }`}
                          >
                            <svg
                              className="w-5 h-5 text-nude-clay mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="text-base font-medium text-text-charcoal/90 font-sans flex-1">
                              {item.question}
                            </span>
                            <span
                              className={`ml-4 text-nude-clay transition-transform ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            >
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
                              className="px-6 pt-3 pb-5"
                            >
                              <Text size="sm" className="text-text-storm">
                                {item.answer}
                              </Text>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8">
                <div className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft px-6 py-8 text-center lg:text-left">
                  <Heading level={3} className="text-text-charcoal">
                    Still have questions?
                  </Heading>
                  <Text size="sm" className="mt-3 text-text-storm">
                    If you did not find the answer you need, I am happy to help. Reach out with
                    questions about therapy, scheduling, or fit.
                  </Text>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button
                      as={Link}
                      href="/contact"
                      className="bg-nude-clay hover:bg-nude-clay/90 text-white shadow-soft"
                      size="lg"
                    >
                      Book a Consultation
                    </Button>
                    <EmailButton
                      label="Send an Email"
                      variant="bordered"
                      className="border border-nude-sand/70 text-text-storm hover:bg-nude-cream/70"
                      size="lg"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft overflow-hidden">
                  <div className="border-b border-nude-linen/70 px-6 py-5">
                    <Heading level={3} className="text-text-charcoal">
                      Send a quick message
                    </Heading>
                    <Text size="sm" className="mt-2 text-text-storm">
                      We typically respond within one business day.
                    </Text>
                  </div>
                  <div className="px-6 pb-6 pt-5">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-background-dove relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-blob opacity-10"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center max-w-3xl mx-auto">
                <Heading level={2} className="text-text-charcoal">
                  Additional resources
                </Heading>
                <Text size="lg" className="mt-4">
                  Helpful links to prepare for your first session and find support outside of therapy.
                </Text>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft p-6 space-y-3">
                  <svg className="w-8 h-8 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <Heading level={4} className="text-text-charcoal">
                    Getting started guide
                  </Heading>
                  <Text size="sm" className="text-text-storm">
                    Learn what to expect in your first session and how to prepare.
                  </Text>
                  <Link href="/blog" className="text-nude-clay hover:underline text-sm font-medium">
                    Read Guide →
                  </Link>
                </div>

                <div className="rounded-2xl border border-nude-linen bg-nude-cream shadow-soft p-6 space-y-3">
                  <svg className="w-8 h-8 text-nude-clay" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <Heading level={4} className="text-text-charcoal">
                    Crisis resources
                  </Heading>
                  <Text size="sm" className="text-text-storm">
                    Emergency contacts and 24/7 support resources.
                  </Text>
                  <Link href="/crisis-resources" className="text-nude-clay hover:underline text-sm font-medium">
                    View Resources →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="crisis" className="section-padding bg-background-cream relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-watercolor opacity-20"></div>
          <div className="absolute inset-0 pattern-grain opacity-5"></div>
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl border border-red-200/70 bg-nude-cream shadow-soft px-6 py-8 text-center space-y-3">
                <Heading level={4} className="text-red-900">
                  If you&apos;re experiencing a mental health emergency
                </Heading>
                <Text size="sm" className="text-red-800">
                  Please call 911 or go to your nearest emergency room.
                </Text>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <Text size="sm" weight="medium" color="charcoal">
                      Emergency Services
                    </Text>
                    <a href="tel:911" className="text-2xl font-semibold text-nude-warm hover:text-nude-clay">
                      911
                    </a>
                  </div>
                  <div className="text-center">
                    <Text size="sm" weight="medium" color="charcoal">
                      Suicide & Crisis Lifeline
                    </Text>
                    <a href="tel:988" className="text-2xl font-semibold text-nude-warm hover:text-nude-clay">
                      988
                    </a>
                  </div>
                </div>
                <Text size="sm" className="text-text-storm">
                  Crisis Text Line: Text HOME to <span className="font-semibold">741741</span>
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
