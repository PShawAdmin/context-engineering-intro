'use client'

import {Card, CardHeader, CardBody} from '@heroui/card';
import { TESTIMONIALS } from '@/lib/constants';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';

export default function Testimonials() {
  return (
    <section className="section-padding bg-background-dove relative overflow-hidden">
      {/* Elegant pattern overlay */}
      <div className="absolute inset-0 bg-pattern-watercolor opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 pattern-grain opacity-5"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Heading level={2} className="mb-4">
            What Clients Say
          </Heading>
          <Text size="lg" className="md:text-xl max-w-3xl mx-auto">
            Hear from individuals who have found support and growth through our therapy sessions
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="bg-nude-cream border border-nude-linen hover:border-nude-sand shadow-soft hover:shadow-clay hover:transform hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4 pt-6 px-6">
                <div className="flex items-center gap-3">
                  {/* Star Rating */}
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-nude-clay"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <Text size="sm" weight="medium" as="span">{testimonial.rating}.0</Text>
                </div>
              </CardHeader>
              <CardBody className="px-6 pb-6">
                <blockquote className="mb-6">
                  <Text className="italic">
                    &quot;{testimonial.content}&quot;
                  </Text>
                </blockquote>
                <div className="border-t border-nude-linen pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nude-sand to-grey-blue-light flex items-center justify-center">
                        <Text size="sm" weight="semibold" color="charcoal" as="span">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </Text>
                      </div>
                      <div>
                        <Text weight="medium" color="charcoal">
                          {testimonial.name}
                        </Text>
                        {testimonial.date && (
                          <Text size="sm">
                            {testimonial.date}
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-text-storm">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <Text weight="medium" as="span">100% Confidential</Text>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <Text weight="medium" as="span">Insurance Accepted</Text>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-nude-clay opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <Text weight="medium" as="span">Evidence-Based Approach</Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}