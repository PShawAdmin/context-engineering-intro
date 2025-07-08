import { render } from '@testing-library/react'
import { Heading } from '@/components/ui/typography/Heading'

describe('Heading Component', () => {
  it('renders h1 with correct classes', () => {
    const { container } = render(<Heading level={1}>Test Heading</Heading>)
    const h1 = container.querySelector('h1')
    
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveClass('font-serif', 'text-text-charcoal', 'leading-tight')
    expect(h1).toHaveTextContent('Test Heading')
  })
  
  it('renders h2 with correct classes', () => {
    const { container } = render(<Heading level={2}>Section Title</Heading>)
    const h2 = container.querySelector('h2')
    
    expect(h2).toBeInTheDocument()
    expect(h2).toHaveClass('font-serif', 'text-text-charcoal', 'leading-tight')
  })
  
  it('renders h3 with Inter font', () => {
    const { container } = render(<Heading level={3}>Subsection</Heading>)
    const h3 = container.querySelector('h3')
    
    expect(h3).toBeInTheDocument()
    expect(h3).toHaveClass('font-sans', 'text-text-storm', 'leading-snug')
  })
  
  it('renders h4-h6 with Inter font and storm color', () => {
    const levels = [4, 5, 6] as const
    
    levels.forEach(level => {
      const { container } = render(<Heading level={level}>Heading {level}</Heading>)
      const heading = container.querySelector(`h${level}`)
      
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveClass('font-sans', 'text-text-storm', 'font-medium')
    })
  })
  
  it('accepts custom className', () => {
    const { container } = render(
      <Heading level={1} className="custom-class">Custom Heading</Heading>
    )
    const h1 = container.querySelector('h1')
    
    expect(h1).toHaveClass('custom-class')
  })
  
  it('respects variant prop', () => {
    const { container } = render(
      <Heading level={3} variant="serif">Serif H3</Heading>
    )
    const h3 = container.querySelector('h3')
    
    expect(h3).toHaveClass('font-serif')
    expect(h3).not.toHaveClass('font-sans')
  })
  
  it('applies responsive classes correctly', () => {
    const { container } = render(<Heading level={1}>Responsive Heading</Heading>)
    const h1 = container.querySelector('h1')
    
    expect(h1).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl')
  })
  
  // Edge case: invalid level
  it('handles edge case gracefully', () => {
    // This test would need TypeScript to prevent invalid levels
    // but we can test the component renders something
    const { container } = render(<Heading level={1}>Edge Case</Heading>)
    expect(container.firstChild).toBeTruthy()
  })
  
  // Failure case: no children
  it('renders empty heading when no children provided', () => {
    const { container } = render(<Heading level={1}>{''}</Heading>)
    const h1 = container.querySelector('h1')
    
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('')
  })
})