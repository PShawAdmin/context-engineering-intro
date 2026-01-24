import { Heading } from '@/components/ui/typography/Heading';
import { Text } from '@/components/ui/typography/Text';
import LinkButton from '@/components/ui/LinkButton';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  backgroundImage?: boolean;
  backgroundClassName?: string;
  showWave?: boolean;
  size?: 'tall' | 'standard';
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage = true,
  backgroundClassName,
  showWave = true,
  size = 'tall',
}: HeroProps) {
  const sectionBackgroundClassName =
    backgroundClassName ?? (backgroundImage ? 'bg-nude-linen' : 'bg-background-dove');
  const isStandard = size === 'standard';
  const sectionPaddingClassName = isStandard ? 'section-padding' : 'pb-24';
  const contentPaddingClassName = isStandard ? '' : 'py-24 md:py-32 lg:py-40';

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
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <Heading level={1} className="mb-6 text-balance">
            {title.split(' ').map((word, index) => (
              <span key={index}>
                {word === 'Peace' ? (
                  <span className="gradient-text-base gradient-text-peace">{word}</span>
                ) : word === 'Purpose' ? (
                  <span className="gradient-text-base gradient-text-purpose">{word}</span>
                ) : (
                  word
                )}
                {index < title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </Heading>
          <Text size="xl" weight="medium" className="md:text-2xl mb-4">
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
        </div>
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
