import React from 'react'
import { cn } from '@heroui/react'

interface LabelProps {
  htmlFor?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export const Label: React.FC<LabelProps> = ({ 
  htmlFor,
  required = false,
  className,
  children 
}) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={cn(
        'font-sans text-sm font-medium text-text-storm block mb-1',
        className
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  )
}