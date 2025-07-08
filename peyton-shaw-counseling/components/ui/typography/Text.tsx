import React from 'react'
import { cn } from '@heroui/react'

interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'normal' | 'medium' | 'semibold'
  color?: 'charcoal' | 'storm' | 'slate' | 'muted' | 'cream' | 'white'
  as?: 'p' | 'span' | 'div'
  className?: string
  children: React.ReactNode
}

const sizeStyles = {
  xs: 'text-xs leading-normal', // 12px, line-height: 1.5
  sm: 'text-sm leading-normal', // 14px, line-height: 1.5
  base: 'text-base leading-relaxed', // 16px, line-height: 1.625
  lg: 'text-lg leading-loose', // 18px, line-height: 1.75
  xl: 'text-xl leading-loose', // 20px, line-height: 1.75
}

const weightStyles = {
  normal: 'font-normal', // 400
  medium: 'font-medium', // 500
  semibold: 'font-semibold', // 600
}

const colorStyles = {
  charcoal: 'text-text-charcoal',
  storm: 'text-text-storm',
  slate: 'text-grey-storm',
  muted: 'text-grey-blue',
  cream: 'text-nude-cream',
  white: 'text-white',
}

export const Text: React.FC<TextProps> = ({ 
  size = 'base',
  weight = 'normal',
  color = 'storm',
  as: Component = 'p',
  className,
  children 
}) => {
  return (
    <Component className={cn(
      'font-sans',
      sizeStyles[size],
      weightStyles[weight],
      colorStyles[color],
      className
    )}>
      {children}
    </Component>
  )
}