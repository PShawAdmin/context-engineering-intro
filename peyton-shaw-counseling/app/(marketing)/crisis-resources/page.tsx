'use client'

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/layout/Hero';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Button } from '@heroui/button';
import Link from 'next/link';

interface ResourceCategory {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
}

interface Resource {
  name: string;
  phone?: string;
  phoneLabel?: string;
  text?: string;
  website?: string;
  linkLabel?: string;
  hours?: string;
  description: string;
  isEmergency?: boolean;
}

const crisisResources: ResourceCategory[] = [
  {
    id: 'immediate',
    title: 'Immediate Crisis Support',
    description: 'For urgent mental health emergencies and immediate support',
    resources: [
      {
        name: '911 Emergency Services',
        phone: '911',
        description: 'For immediate life-threatening emergencies',
        hours: '24/7',
        isEmergency: true
      },
      {
        name: '988 Suicide & Crisis Lifeline',
        phone: '988',
        text: 'Call or text 988 (24/7)',
        website: 'https://988lifeline.org',
        description: 'Free, confidential crisis support for people in emotional distress or suicidal crisis. For Spanish by text: text AYUDA to 988.',
        hours: '24/7',
        isEmergency: true
      },
      {
        name: 'Crisis Text Line',
        text: 'Text "HOME" to 741741',
        website: 'https://www.crisistextline.org',
        description: 'Free, 24/7 text support for those in crisis',
        hours: '24/7',
        isEmergency: true
      }
    ]
  },
  {
    id: 'mental-health',
    title: 'Mental Health & Recovery (Non-Crisis)',
    description: 'Support lines and recovery resources (these are not emergency crisis hotlines). For immediate danger or urgent crisis support, use 988 or 911.',
    resources: [
      {
        name: 'SAMHSA National Helpline',
        phone: '1-800-662-4357',
        website: 'https://www.samhsa.gov/find-help/national-helpline',
        description: 'Treatment referral and information service for mental health and substance use disorders',
        hours: '24/7, 365 days a year'
      },
      {
        name: 'NAMI Helpline',
        phone: '1-800-950-6264',
        text: 'Text "NAMI" to 62640',
        website: 'https://www.nami.org/help',
        description: 'National Alliance on Mental Illness provides support, information, and referrals',
        hours: 'Monday-Friday, 10 AM - 10 PM ET'
      },
      {
        name: 'Mental Health America',
        website: 'https://mhanational.org/crisisresources',
        description: 'Comprehensive mental health resources and screening tools',
        hours: 'Online resources available 24/7'
      },
      {
        name: 'Alcoholics Anonymous',
        phone: '1-212-870-3400',
        website: 'https://www.aa.org/find-aa',
        linkLabel: 'Find local meetings',
        description: 'Recovery support and meeting information (non-crisis)',
        hours: 'Varies by location'
      },
      {
        name: 'Narcotics Anonymous',
        phone: '1-818-773-9999',
        website: 'https://na.org/meetingsearch/',
        linkLabel: 'Find local meetings',
        description: 'Recovery support and meeting information (non-crisis)',
        hours: 'Varies by location'
      }
    ]
  },
  {
    id: 'specific-populations',
    title: 'Specialized Support Services',
    description: 'Crisis resources for specific populations and situations',
    resources: [
      {
        name: 'Veterans Crisis Line',
        phone: '988',
        phoneLabel: 'Dial 988, then Press 1',
        text: 'Text 838255',
        website: 'https://www.veteranscrisisline.net/get-help-now/chat/',
        linkLabel: 'Chat online',
        description: 'Confidential support for Veterans and their loved ones. Dial 988, then Press 1.',
        hours: '24/7'
      },
      {
        name: 'LGBTQ National Hotline',
        phone: '1-888-843-4564',
        website: 'https://www.lgbthotline.org',
        description: 'Support for LGBTQ individuals and their families',
        hours: 'Mon-Fri: 11 AM - 8 PM PT; Sat: 9 AM - 2 PM PT'
      },
      {
        name: 'National Teen Dating Abuse Helpline',
        phone: '1-866-331-9474',
        text: 'Text "LOVEIS" to 22522',
        website: 'https://www.loveisrespect.org',
        description: 'Support for young people experiencing dating abuse',
        hours: '24/7'
      },
      {
        name: 'National Domestic Violence Hotline',
        phone: '1-800-799-7233',
        text: 'Text "START" to 88788',
        website: 'https://www.thehotline.org',
        description: 'Confidential support for those experiencing domestic violence',
        hours: '24/7'
      }
    ]
  },
  {
    id: 'local-texas',
    title: 'Texas & Local Resources',
    description: 'Crisis resources specific to Texas and the DFW area',
    resources: [
      {
        name: 'North Texas Behavioral Health Authority',
        phone: '1-866-260-8000',
        website: 'https://www.ntbha.org',
        description: 'Local mental health crisis services for North Texas',
        hours: '24/7 Crisis Hotline'
      },
      {
        name: 'MHMR of Tarrant County - Crisis Services',
        phone: '1-800-866-2465',
        text: 'Call or text 1-800-866-2465',
        website: 'https://www.mhmrtarrant.org',
        description: 'Crisis services for Tarrant County. Main/services (non-crisis): 817-335-3022.',
        hours: '24/7'
      },
      {
        name: 'Dallas Metrocare Services',
        phone: '214-743-1215',
        website: 'https://www.metrocareservices.org',
        description: "Having a mental health crisis? Call Metrocare's 24/7 hotline: (214) 743-1215.",
        hours: '24/7'
      }
    ]
  }
];

export default function CrisisResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [indicatorReady, setIndicatorReady] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const categories = useMemo(
    () => [
      { id: 'all', label: 'All Resources' },
      ...crisisResources.map((category) => ({ id: category.id, label: category.title })),
    ],
    []
  );

  const filteredResources = selectedCategory === 'all' 
    ? crisisResources 
    : crisisResources.filter(cat => cat.id === selectedCategory);

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const activeTab = tabRefs.current[selectedCategory];
      const indicator = indicatorRef.current;
      const container = tabsContainerRef.current;

      if (!activeTab || !indicator || !container) {
        setIndicatorReady(false);
        return;
      }

      const leftOffset = activeTab.offsetLeft - container.scrollLeft;
      indicator.style.width = `${activeTab.offsetWidth}px`;
      indicator.style.transform = `translateX(${leftOffset}px)`;
      setIndicatorReady(true);
    };

    const ensureTabVisible = () => {
      const activeTab = tabRefs.current[selectedCategory];
      const container = tabsContainerRef.current;

      if (!activeTab || !container) {
        return;
      }

      if (container.scrollWidth > container.clientWidth) {
        const padding = 12;
        const activeRect = activeTab.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const leftDelta = activeRect.left - containerRect.left - padding;
        const rightDelta = activeRect.right - containerRect.right + padding;

        if (leftDelta < 0) {
          container.scrollBy({ left: leftDelta, behavior: 'smooth' });
        } else if (rightDelta > 0) {
          container.scrollBy({ left: rightDelta, behavior: 'smooth' });
        }
      }
    };

    const container = tabsContainerRef.current;
    const raf = window.requestAnimationFrame(() => {
      ensureTabVisible();
      updateIndicator();
    });
    window.addEventListener('resize', updateIndicator);
    container?.addEventListener('scroll', updateIndicator, { passive: true });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateIndicator);
      container?.removeEventListener('scroll', updateIndicator);
    };
  }, [selectedCategory, categories]);

  const handleCopyNumber = (number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <>
      <Header />
      <main>
        {/* Emergency Banner */}
        <div className="bg-red-600 text-white py-4">
          <div className="container text-center">
            <p className="text-lg font-medium">
              If you are experiencing a life-threatening emergency, please call{' '}
              <a href="tel:911" className="font-bold underline">911</a> immediately
            </p>
          </div>
        </div>

        <Hero
          title="Crisis Resources"
          subtitle="Support is available 24/7"
          description="If you are experiencing a mental health crisis or emergency, these resources provide immediate support and professional assistance."
          primaryAction={{
            label: "Call 988 Crisis Line",
            href: "tel:988"
          }}
          secondaryAction={{
            label: "Text Crisis Line",
            href: "sms:741741?body=HOME"
          }}
          backgroundImage={false}
        />

        {/* Quick Access Emergency Numbers */}
        <section className="relative pt-8 pb-16 -mt-[1px]">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-50 via-red-50/70 to-transparent"></div>
          
          <div className="container relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="bg-white border-2 border-red-200">
                <CardBody className="text-center py-6">
                  <h3 className="text-lg font-medium text-text-charcoal mb-2">Emergency</h3>
                  <a href="tel:911" className="text-3xl font-bold text-red-600 hover:text-red-700">
                    911
                  </a>
                  <p className="text-sm text-text-storm mt-2">Life-threatening emergencies</p>
                </CardBody>
              </Card>
              
              <Card className="bg-white border-2 border-nude-clay">
                <CardBody className="text-center py-6">
                  <h3 className="text-lg font-medium text-text-charcoal mb-2">Crisis Lifeline</h3>
                  <a href="tel:988" className="text-3xl font-bold text-nude-clay hover:text-nude-warm">
                    988
                  </a>
                  <p className="text-sm text-text-storm mt-2">Mental health crisis support</p>
                </CardBody>
              </Card>
              
              <Card className="bg-white border-2 border-primary-300">
                <CardBody className="text-center py-6">
                  <h3 className="text-lg font-medium text-text-charcoal mb-2">Crisis Text</h3>
                  <a href="sms:741741?body=HOME" className="text-2xl font-bold text-primary-500 hover:text-primary-600">
                    741741
                  </a>
                  <p className="text-sm text-text-storm mt-2">Text HOME for support</p>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Resources Section */}
        <section className="section-padding">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              {/* Category Tabs */}
              <div className="mb-8">
                <div className="relative" aria-label="Resource categories">
                  <div
                    ref={tabsContainerRef}
                    role="tablist"
                    className="relative flex gap-6 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                  >
                    {categories.map((category) => {
                      const isActive = selectedCategory === category.id;

                      return (
                        <button
                          key={category.id}
                          ref={(node) => {
                            tabRefs.current[category.id] = node;
                          }}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => setSelectedCategory(category.id)}
                          className={
                            isActive
                              ? 'relative !appearance-none !bg-transparent !border-0 !shadow-none !rounded-none px-0 py-0 text-text-charcoal font-medium whitespace-nowrap pb-0.5 tracking-[0.06em] text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude-clay/30'
                              : 'relative !appearance-none !bg-transparent !border-0 !shadow-none !rounded-none px-0 py-0 text-text-storm hover:text-text-charcoal transition-colors whitespace-nowrap pb-0.5 tracking-[0.06em] text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nude-clay/30'
                          }
                        >
                          {category.label}
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

              {/* Resources Grid */}
              {filteredResources.map((category) => (
                <div key={category.id} className="mb-12">
                  <h2 className="text-2xl font-serif text-text-charcoal mb-3">{category.title}</h2>
                  <p className="text-text-storm mb-6">{category.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.resources.map((resource, index) => (
                      <Card 
                        key={index} 
                        className={`${resource.isEmergency ? 'border-2 border-red-200 bg-red-50/50' : 'border border-slate-200'} hover:shadow-medium transition-all`}
                      >
                        <CardHeader className="pb-2">
                          <h3 className="text-lg font-medium text-text-charcoal flex items-center gap-2">
                            {resource.name}
                            {resource.isEmergency && (
                              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                                24/7 Emergency
                              </span>
                            )}
                          </h3>
                        </CardHeader>
                        <CardBody className="pt-2">
                          <p className="text-sm text-text-storm mb-4">{resource.description}</p>
                          
                          <div className="space-y-2">
                            {resource.phone && (
                              <div className="flex items-center justify-between">
                                <a 
                                  href={`tel:${resource.phone.replace(/\D/g, '')}`}
                                  className="flex items-center gap-2 text-nude-clay hover:text-nude-warm font-medium"
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                  {resource.phoneLabel ?? resource.phone}
                                </a>
                                <Button
                                  size="sm"
                                  variant="light"
                                  onPress={() => handleCopyNumber(resource.phone!)}
                                  className="text-xs"
                                >
                                  {copiedNumber === resource.phone ? 'Copied!' : 'Copy'}
                                </Button>
                              </div>
                            )}
                            
                            {resource.text && (
                              <div className="flex items-center gap-2 text-sm text-text-storm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                {resource.text}
                              </div>
                            )}
                            
                            {resource.website && (
                              <a 
                                href={resource.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                                {resource.linkLabel ?? 'Visit Website'}
                              </a>
                            )}
                            
                            {resource.hours && (
                              <div className="flex items-center gap-2 text-sm text-text-light">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {resource.hours}
                              </div>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Self-Care and Coping Strategies */}
        <section className="section-padding bg-background-dove">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-serif text-text-charcoal mb-8 text-center">
                While You Wait for Help
              </h2>
              <p className="text-lg text-text-storm text-center mb-10">
                If you&apos;re waiting for support or need immediate coping strategies, these techniques may help:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white">
                  <CardBody>
                    <h3 className="text-lg font-medium text-text-charcoal mb-3">Grounding Techniques</h3>
                    <ul className="space-y-2 text-sm text-text-storm">
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Hold an ice cube or splash cold water on your face</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Focus on slow, deep breathing (4 counts in, 6 counts out)</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
                
                <Card className="bg-white">
                  <CardBody>
                    <h3 className="text-lg font-medium text-text-charcoal mb-3">Safety Planning</h3>
                    <ul className="space-y-2 text-sm text-text-storm">
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Remove or secure any means of self-harm</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Call a trusted friend or family member</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Go to a safe, public place if alone</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
                
                <Card className="bg-white">
                  <CardBody>
                    <h3 className="text-lg font-medium text-text-charcoal mb-3">Distraction Activities</h3>
                    <ul className="space-y-2 text-sm text-text-storm">
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Listen to calming music or nature sounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Take a warm shower or bath</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Write in a journal or draw</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
                
                <Card className="bg-white">
                  <CardBody>
                    <h3 className="text-lg font-medium text-text-charcoal mb-3">Reaching Out</h3>
                    <ul className="space-y-2 text-sm text-text-storm">
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Text a crisis line if calling feels too difficult</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Join an online support group or forum</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-nude-clay mt-1">•</span>
                        <span>Use a mental health app for immediate support</span>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Important Reminders */}
        <section className="section-padding bg-nude-linen">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif text-text-charcoal mb-8">
                Important Reminders
              </h2>
              <div className="space-y-6 text-lg text-text-storm">
                <p>
                  <strong className="text-text-charcoal">You are not alone.</strong> Many people experience mental health crises, and help is available.
                </p>
                <p>
                  <strong className="text-text-charcoal">Your feelings are valid.</strong> Whatever you&apos;re experiencing, it&apos;s real and it matters.
                </p>
                <p>
                  <strong className="text-text-charcoal">Recovery is possible.</strong> With the right support, things can and do get better.
                </p>
                <p>
                  <strong className="text-text-charcoal">Asking for help is brave.</strong> Reaching out takes courage and is the first step toward healing.
                </p>
              </div>
              
              <div className="mt-12">
                <Button
                  as={Link}
                  href="/contact"
                  size="lg"
                  className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-10"
                >
                  Book a Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Safety */}
        <section className="py-12 bg-slate-100">
          <div className="container text-center">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-soft p-8">
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="mb-4 text-lg font-medium text-text-charcoal">
                Remember: If you are in immediate danger, please call{' '}
                <a href="tel:911" className="font-bold text-red-600 underline">911</a>
              </p>
              <div className="border-t border-slate-200 pt-4 mt-4">
                <p className="text-text-storm">
                  This page contains crisis resources only. For non-emergency therapy services,{' '}
                  <Link href="/contact" className="text-nude-clay hover:text-nude-warm underline font-medium">
                    please contact me directly
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
