'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { Button } from '@heroui/button';
import Link from 'next/link';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if the banner has been dismissed in this session
    const isDismissed = sessionStorage.getItem('announcementDismissed');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcementDismissed', 'true');
  };

  useLayoutEffect(() => {
    const root = document.documentElement;

    const updateBannerHeight = () => {
      if (!isVisible || !bannerRef.current || window.scrollY > 0) {
        root.style.setProperty('--announcement-height', '0px');
        return;
      }

      const { height } = bannerRef.current.getBoundingClientRect();
      root.style.setProperty('--announcement-height', `${Math.round(height)}px`);
    };

    updateBannerHeight();

    if (!isVisible) {
      return;
    }

    const handleScroll = () => updateBannerHeight();
    const handleResize = () => updateBannerHeight();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (bannerRef.current && 'ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(updateBannerHeight);
      resizeObserver.observe(bannerRef.current);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      resizeObserver?.disconnect();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={bannerRef}
      className="bg-nude-clay text-text-charcoal relative animate-slide-down shadow-soft"
    >
      <div className="relative">
        <div className="container mx-auto px-12 sm:px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 bg-nude-sand/30 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="text-sm sm:text-base font-medium text-center">
                <span className="font-semibold">Now accepting new clients.</span>
                <Link href="/contact" className="underline ml-1 sm:ml-2 hover:no-underline inline-block font-semibold">
                  Book a consultation
                </Link>
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-text-charcoal/70 hover:text-text-charcoal transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
