'use client';

import { useEffect, useRef } from 'react';

type ParallaxPatternProps = {
  className?: string;
  speed?: number;
  maxOffset?: number;
};

export default function ParallaxPattern({
  className = '',
  speed = 0.12,
  maxOffset = 24,
}: ParallaxPatternProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let ticking = false;

    const update = () => {
      const target = elementRef.current;
      if (!target) return;

      if (window.innerWidth < 768) {
        target.style.transform = '';
        return;
      }

      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      if (!viewportHeight) return;

      const center = rect.top + rect.height / 2;
      const distance = center - viewportHeight / 2;
      const offset = Math.max(-maxOffset, Math.min(maxOffset, -distance * speed));
      target.style.transform = `translate3d(0, ${offset}px, 0)`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    };

    element.style.willChange = 'transform';
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      element.style.willChange = '';
      element.style.transform = '';
    };
  }, [speed, maxOffset]);

  return <div ref={elementRef} className={className} aria-hidden="true" />;
}
