import React from 'react'
import { cn } from '@heroui/react'

interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold'
  color?: 'charcoal' | 'storm' | 'granite' | 'muted' | 'white'
  as?: 'p' | 'span' | 'div'
  className?: string
  children: React.ReactNode
}

const sizeStyles = {
  xs: 'text-xs', // 12px
  sm: 'text-sm', // 14px
  base: 'text-base', // 16px
  lg: 'text-lg', // 18px
  xl: 'text-xl', // 20px
}

const weightStyles = {
  light: 'font-light', // 300
  normal: 'font-normal', // 400
  medium: 'font-medium', // 500
  semibold: 'font-semibold', // 600
}

const colorStyles = {
  charcoal: 'text-text-charcoal',
  storm: 'text-text-storm',
  granite: 'text-text-granite',
  muted: 'text-gray-600',
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