'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {Card, CardHeader, CardBody} from '@heroui/card';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import { TESTIMONIALS } from '@/lib/constants';

const STAR_PATH =
  'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

type StarRatingProps = {
  rating: number;
  className?: string;
  starClassName?: string;
};

function StarIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d={STAR_PATH} />
    </svg>
  );
}

function StarRating({ rating, className = '', starClassName = 'w-5 h-5' }: StarRatingProps) {
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const roundedRating = Math.round(safeRating * 2) / 2;
  const maxStars = 5;

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`Rated ${roundedRating.toFixed(1)} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }).map((_, index) => {
        const fill = clamp(roundedRating - index, 0, 1);
        return (
          <span key={index} className="relative inline-flex">
            <StarIcon className={`${starClassName} text-nude-sand/40`} />
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <StarIcon className={`${starClassName} text-nude-clay`} />
            </span>
          </span>
        );
      })}
    </div>
  );
}

type GoogleReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  profile_photo_url: string;
  author_url: string;
};

type GoogleReviewsResponse = {
  name: string | null;
  rating: number | null;
  user_ratings_total: number | null;
  url: string | null;
  reviews: GoogleReview[];
};

export default function Testimonials() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [isHydrated, setIsHydrated] = useState(false);
  const [summary, setSummary] = useState<GoogleReviewsResponse>({
    name: null,
    rating: null,
    user_ratings_total: null,
    url: null,
    reviews: [],
  });
  const reviewUrl = process.env.NEXT_PUBLIC_REVIEW_URL || '';
  const manualReviews: GoogleReview[] = TESTIMONIALS.map((testimonial) => ({
    author_name: testimonial.name,
    rating: testimonial.rating,
    relative_time_description: testimonial.date || 'Client testimonial',
    text: testimonial.content,
    time: testimonial.date ? Math.floor(Date.parse(testimonial.date) / 1000) : 0,
    profile_photo_url: '',
    author_url: '',
  }));

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        const response = await fetch('/api/google-reviews');
        if (!response.ok) {
          throw new Error('Failed to load Google reviews.');
        }
        const data = (await response.json()) as GoogleReviewsResponse;
        if (!isMounted) return;
        setSummary({
          name: data.name,
          rating: data.rating,
          user_ratings_total: data.user_ratings_total,
          url: data.url,
          reviews: (data.reviews || []).slice(0, 3),
        });
        setStatus('ready');
      } catch (error) {
        if (!isMounted) return;
        setStatus('error');
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const renderReviewStars = (rating: number) => {
    if (!isHydrated) {
      return (
        <div className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} className="w-5 h-5 text-nude-sand/40" />
          ))}
        </div>
      );
    }

    return <StarRating rating={rating} />;
  };

  const hasGoogleReviews = status === 'ready' && summary.reviews.length > 0;
  const hasManualReviews = manualReviews.length > 0;
  const hasReviews = hasGoogleReviews || hasManualReviews;
  const reviewsToShow = hasGoogleReviews ? summary.reviews : manualReviews;
  const reviewCount = reviewsToShow.length;
  const gridColumnsClass =
    reviewCount >= 3 ? 'md:grid-cols-3' : reviewCount === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1';
  const containerWidthClass =
    reviewCount >= 3 ? 'max-w-6xl' : reviewCount === 2 ? 'max-w-5xl' : 'max-w-3xl';
  const fallbackSpanClass = reviewCount >= 3 ? 'md:col-span-3' : '';

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
          {!hasGoogleReviews && (
            <Text size="lg" className="md:text-xl max-w-3xl mx-auto">
              Thoughtful feedback from clients
            </Text>
          )}
          {!hasGoogleReviews && reviewUrl && (
            <div className="mt-4">
              <Link
                href={reviewUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-medium text-nude-clay hover:text-grey-charcoal transition-colors"
              >
                Leave a review
              </Link>
            </div>
          )}
        </div>

        <div className={`grid grid-cols-1 ${gridColumnsClass} gap-8 ${containerWidthClass} mx-auto`}>
          {hasReviews ? (
            reviewsToShow.map((review, index) => (
            <Card 
              key={`${review.author_name}-${review.time || index}`} 
              className="bg-nude-cream border border-nude-linen hover:border-nude-sand shadow-soft hover:shadow-clay hover:transform hover:-translate-y-1 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4 pt-6 px-6">
                <div className="flex items-center gap-3">
                  {/* Star Rating */}
                  {renderReviewStars(review.rating)}
                  <Text size="sm" weight="medium" as="span">{review.rating.toFixed(1)}</Text>
                </div>
              </CardHeader>
              <CardBody className="px-6 pb-6 flex flex-col h-full">
                <blockquote className="mb-6">
                  <Text className="italic">
                    &quot;{review.text}&quot;
                  </Text>
                </blockquote>
                <div className="border-t border-nude-linen pt-4 mt-auto">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nude-sand to-grey-blue-light flex items-center justify-center">
                        <Text size="sm" weight="semibold" color="charcoal" as="span">
                          {review.author_name.charAt(0).toUpperCase()}
                        </Text>
                      </div>
                      <div>
                        <Text weight="medium" color="charcoal">
                          {review.author_name}
                        </Text>
                        <Text size="sm">
                          {review.relative_time_description || 'Google review'}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
            ))
          ) : (
            <Card className={`bg-nude-cream border border-nude-linen shadow-soft ${fallbackSpanClass}`}>
              <CardBody className="px-8 py-10 text-center">
                <Text size="lg" weight="medium" color="charcoal">
                  {status === 'loading' ? 'Loading reviews...' : 'Reviews are not available yet.'}
                </Text>
                <Text size="sm" className="mt-2">
                  {reviewUrl
                    ? 'If you have worked with us, we would appreciate a review.'
                    : 'Check back soon or contact us with any questions.'}
                </Text>
                {reviewUrl && (
                  <Link
                    href={reviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center mt-4 text-sm font-medium text-nude-clay hover:text-grey-charcoal transition-colors"
                  >
                    Leave a review
                  </Link>
                )}
              </CardBody>
            </Card>
          )}
        </div>

        {hasGoogleReviews && summary.rating && summary.user_ratings_total && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-text-storm">
            <StarRating rating={summary.rating} />
            <span>•</span>
            <span>{summary.user_ratings_total} reviews</span>
            {summary.url && (
              <>
                <span>•</span>
                <Link
                  href={summary.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-nude-clay hover:text-grey-charcoal transition-colors"
                >
                  Read on Google
                </Link>
              </>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
