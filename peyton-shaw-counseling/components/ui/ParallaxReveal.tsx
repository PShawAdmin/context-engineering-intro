'use client';

import { useEffect, useRef } from 'react';

type ParallaxRevealProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  maxOffset?: number;
  fromOpacity?: number;
  fromOffset?: number;
  fromX?: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeOut = (value: number) => 1 - Math.pow(1 - value, 2);

export default function ParallaxReveal({
  children,
  className = '',
  speed = 0.08,
  maxOffset = 18,
  fromOpacity = 0.2,
  fromOffset = 14,
  fromX = 0,
}: ParallaxRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = '';
      return;
    }

    let ticking = false;

    const update = () => {
      const target = elementRef.current;
      if (!target) return;

      if (window.innerWidth < 768) {
        target.style.opacity = '1';
        target.style.transform = '';
        return;
      }

      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      if (!viewportHeight) return;

      const start = viewportHeight * 0.9;
      const end = viewportHeight * 0.2;
      const rawProgress = (start - rect.top) / (start - end);
      const easedProgress = easeOut(clamp(rawProgress, 0, 1));

      const center = rect.top + rect.height / 2;
      const distance = center - viewportHeight / 2;
      const parallaxOffset = clamp(-distance * speed, -maxOffset, maxOffset);

      const translateY = (1 - easedProgress) * fromOffset + parallaxOffset;
      const translateX = (1 - easedProgress) * fromX;
      const opacity = fromOpacity + (1 - fromOpacity) * easedProgress;

      target.style.opacity = `${opacity}`;
      target.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    element.style.willChange = 'transform, opacity';
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      element.style.willChange = '';
      element.style.transform = '';
      element.style.opacity = '';
    };
  }, [speed, maxOffset, fromOpacity, fromOffset, fromX]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
