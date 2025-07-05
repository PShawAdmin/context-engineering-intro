import React from 'react'
import { cn } from '@heroui/react'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'serif' | 'sans'
  className?: string
  children: React.ReactNode
}

const headingStyles = {
  1: 'text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-text-charcoal',
  2: 'text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-text-charcoal',
  3: 'text-2xl md:text-3xl lg:text-4xl font-medium text-text-storm',
  4: 'text-xl md:text-2xl lg:text-3xl font-medium text-text-storm',
  5: 'text-lg md:text-xl lg:text-2xl font-medium text-text-storm',
  6: 'text-base md:text-lg lg:text-xl font-medium text-text-storm',
}

export const Heading: React.FC<HeadingProps> = ({ 
  level, 
  variant,
  className,
  children 
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  // Default variant based on heading level
  const defaultVariant = level <= 2 ? 'serif' : 'sans'
  const fontClass = (variant || defaultVariant) === 'serif' ? 'font-serif' : 'font-sans'
  
  return (
    <Tag className={cn(
      headingStyles[level],
      fontClass,
      className
    )}>
      {children}
    </Tag>
  )
}