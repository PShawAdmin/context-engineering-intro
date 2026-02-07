import Image from 'next/image';
import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import LinkButton from '@/components/ui/LinkButton';
import type { ReactNode } from 'react';

type HeroImage = {
  src: string;
  alt: string;
  priority?: boolean;
  objectPosition?: string;
};

interface HeroProps {
  title: string;
  subtitle: string;
  description?: ReactNode;
  subtitleSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  subtitleClassName?: string;
  layout?: 'centered' | 'split';
  heroImage?: HeroImage;
  highlights?: string[];
  highlightsHeading?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  ctaNote?: ReactNode;
  backgroundImage?: boolean;
  backgroundClassName?: string;
  showWave?: boolean;
  size?: 'tall' | 'standard';
}

export default function Hero({
  title,
  subtitle,
  description,
  subtitleSize = 'xl',
  subtitleClassName = 'md:text-2xl mb-4',
  primaryAction,
  secondaryAction,
  ctaNote,
  backgroundImage = true,
  backgroundClassName,
  showWave = true,
  size = 'tall',
  layout = 'centered',
  heroImage,
  highlights = [],
  highlightsHeading = 'What to expect',
}: HeroProps) {
  const sectionBackgroundClassName =
    backgroundClassName ?? (backgroundImage ? 'bg-nude-linen' : 'bg-background-dove');
  const isStandard = size === 'standard';
  const isSplitLayout = layout === 'split';
  const hasHeroImage = isSplitLayout && !!heroImage;
  const hasHighlights = isSplitLayout && highlights.length > 0;
  const hasSideContent = hasHeroImage || hasHighlights;
  const splitItemsAlignmentClassName = hasHeroImage ? 'lg:items-center' : 'lg:items-start';
  const sectionPaddingClassName = isStandard
    ? 'section-padding'
    : isSplitLayout
      ? 'pb-14 md:pb-16 lg:pb-20'
      : 'pb-24';
  const contentPaddingClassName = isStandard
    ? ''
    : isSplitLayout
      ? 'py-16 md:py-20 lg:py-24'
      : 'py-24 md:py-32 lg:py-40';
  const titleWords = title.split(' ');

  return (
    <section
      className={`relative overflow-hidden ${sectionBackgroundClassName} ${sectionPaddingClassName}`}
    >
      {/* Background decoration with organic shapes */}
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0 hero-aurora"></div>
          <div className="absolute inset-0 z-0 pattern-grain opacity-10"></div>
        </>
      )}

      <div className={`relative z-10 container mx-auto px-4 ${contentPaddingClassName}`}>
        {isSplitLayout ? (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="p-0">
              <div
                className={`grid gap-8 md:gap-10 ${hasSideContent ? `lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] ${splitItemsAlignmentClassName}` : ''}`}
              >
                <div className="text-center lg:text-left">
                  <Heading level={1} className="mb-6 text-balance">
                    {titleWords.map((word, index) => (
                      <span key={index}>
                        {word === 'Peace' ? (
                          <span className="gradient-text-base gradient-text-peace">{word}</span>
                        ) : word === 'Purpose' ? (
                          <span className="gradient-text-base gradient-text-purpose">{word}</span>
                        ) : (
                          word
                        )}
                        {index < titleWords.length - 1 && ' '}
                      </span>
                    ))}
                  </Heading>
                  <Text
                    size={subtitleSize}
                    weight="medium"
                    className={`${subtitleClassName} max-w-3xl mx-auto lg:mx-0`}
                  >
                    {subtitle}
                  </Text>
                  {description && (
                    <Text size="lg" className="mt-4 mb-8 max-w-2xl mx-auto lg:mx-0">
                      {description}
                    </Text>
                  )}
                  {(primaryAction || secondaryAction) && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10">
                      {primaryAction && (
                        <LinkButton
                          href={primaryAction.href}
                          size="lg"
                          className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8 py-3 text-lg shadow-clay hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                        >
                          {primaryAction.label}
                        </LinkButton>
                      )}
                      {secondaryAction && (
                        <LinkButton
                          href={secondaryAction.href}
                          variant="bordered"
                          size="lg"
                          className="border-2 border-grey-charcoal text-grey-charcoal hover:bg-background-dove font-medium px-8 py-3 text-lg hover:shadow-soft transition-all duration-200"
                        >
                          {secondaryAction.label}
                        </LinkButton>
                      )}
                    </div>
                  )}
                  {ctaNote && (
                    <Text
                      size="sm"
                      as="div"
                      className="mt-4 text-text-storm/80 text-center lg:text-left"
                    >
                      {ctaNote}
                    </Text>
                  )}
                </div>
                {hasHeroImage && heroImage ? (
                  <aside className="rounded-3xl">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] shadow-[0_24px_60px_-36px_rgba(30,41,59,0.62)]">
                      <Image
                        src={heroImage.src}
                        alt={heroImage.alt}
                        fill
                        priority={heroImage.priority}
                        sizes="(min-width: 1024px) 34vw, 100vw"
                        className="object-cover"
                        style={
                          heroImage.objectPosition
                            ? { objectPosition: heroImage.objectPosition }
                            : undefined
                        }
                      />
                    </div>
                  </aside>
                ) : hasHighlights ? (
                  <aside className="rounded-3xl border border-grey-blue-lighter/80 bg-background-pearl/85 p-6 md:p-8 shadow-soft">
                    <Text
                      size="sm"
                      weight="medium"
                      className="uppercase tracking-[0.16em] text-text-slate/80"
                    >
                      {highlightsHeading}
                    </Text>
                    <ul className="mt-5 space-y-4">
                      {highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-nude-clay shrink-0"></span>
                          <Text size="base" className="leading-relaxed">
                            {highlight}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Heading level={1} className="mb-6 text-balance">
              {titleWords.map((word, index) => (
                <span key={index}>
                  {word === 'Peace' ? (
                    <span className="gradient-text-base gradient-text-peace">{word}</span>
                  ) : word === 'Purpose' ? (
                    <span className="gradient-text-base gradient-text-purpose">{word}</span>
                  ) : (
                    word
                  )}
                  {index < titleWords.length - 1 && ' '}
                </span>
              ))}
            </Heading>
            <Text size={subtitleSize} weight="medium" className={subtitleClassName}>
              {subtitle}
            </Text>
            {description && (
              <Text size="lg" className="mb-8 max-w-2xl mx-auto">
                {description}
              </Text>
            )}
            {(primaryAction || secondaryAction) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                {primaryAction && (
                  <LinkButton
                    href={primaryAction.href}
                    size="lg"
                    className="bg-nude-clay hover:bg-nude-clay/90 text-white font-medium px-8 py-3 text-lg shadow-clay hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200"
                  >
                    {primaryAction.label}
                  </LinkButton>
                )}
                {secondaryAction && (
                  <LinkButton
                    href={secondaryAction.href}
                    variant="bordered"
                    size="lg"
                    className="border-2 border-grey-charcoal text-grey-charcoal hover:bg-background-dove font-medium px-8 py-3 text-lg hover:shadow-soft transition-all duration-200"
                  >
                    {secondaryAction.label}
                  </LinkButton>
                )}
              </div>
            )}
            {ctaNote && (
              <Text size="sm" as="div" className="mt-4 text-text-storm/80">
                {ctaNote}
              </Text>
            )}
          </div>
        )}
      </div>

      {/* Smooth rolling wave divider - responsive */}
      {showWave && (
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-32 lg:h-40 overflow-hidden">
          <div className="absolute bottom-0 w-[200%] h-full animate-rolling-wave">
            {/* Mobile wave - subtle */}
            <svg 
              viewBox="0 0 2880 150" 
              className="absolute bottom-0 w-full h-full block sm:hidden"
              preserveAspectRatio="none"
            >
              <path 
                d="M0,100 C240,50 480,130 720,100 C960,50 1200,130 1440,100 C1680,50 1920,130 2160,100 C2400,50 2640,130 2880,100 L2880,150 L0,150 Z" 
                fill="#E2E8F0"
              />
            </svg>
            
            {/* Tablet wave - medium */}
            <svg 
              viewBox="0 0 2880 150" 
              className="absolute bottom-0 w-full h-full hidden sm:block lg:hidden"
              preserveAspectRatio="none"
            >
              <path 
                d="M0,85 C240,20 480,140 720,85 C960,20 1200,140 1440,85 C1680,20 1920,140 2160,85 C2400,20 2640,140 2880,85 L2880,150 L0,150 Z" 
                fill="#E2E8F0"
              />
            </svg>
            
            {/* Desktop wave - dramatic */}
            <svg 
              viewBox="0 0 2880 150" 
              className="absolute bottom-0 w-full h-full hidden lg:block"
              preserveAspectRatio="none"
            >
              <path 
                d="M0,75 C240,0 480,150 720,75 C960,0 1200,150 1440,75 C1680,0 1920,150 2160,75 C2400,0 2640,150 2880,75 L2880,150 L0,150 Z" 
                fill="#E2E8F0"
              />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
