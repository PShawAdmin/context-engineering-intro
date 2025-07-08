import { render } from '@testing-library/react'
import { Text } from '@/components/ui/typography/Text'

describe('Text Component', () => {
  it('renders with default props', () => {
    const { container } = render(<Text>Default text</Text>)
    const p = container.querySelector('p')
    
    expect(p).toBeInTheDocument()
    expect(p).toHaveClass('font-sans', 'text-base', 'font-normal', 'text-text-storm')
    expect(p).toHaveTextContent('Default text')
  })
  
  it('renders different sizes correctly', () => {
    const sizes = ['xs', 'sm', 'base', 'lg', 'xl'] as const
    
    sizes.forEach(size => {
      const { container } = render(<Text size={size}>Size {size}</Text>)
      const p = container.querySelector('p')
      
      expect(p).toHaveClass(`text-${size}`)
    })
  })
  
  it('renders different weights correctly', () => {
    const weights = ['normal', 'medium', 'semibold'] as const
    
    weights.forEach(weight => {
      const { container } = render(<Text weight={weight}>Weight {weight}</Text>)
      const p = container.querySelector('p')
      
      expect(p).toHaveClass(`font-${weight}`)
    })
  })
  
  it('renders different colors correctly', () => {
    const { container: charcoal } = render(<Text color="charcoal">Charcoal</Text>)
    expect(charcoal.querySelector('p')).toHaveClass('text-text-charcoal')
    
    const { container: storm } = render(<Text color="storm">Storm</Text>)
    expect(storm.querySelector('p')).toHaveClass('text-text-storm')
    
    const { container: muted } = render(<Text color="muted">Muted</Text>)
    expect(muted.querySelector('p')).toHaveClass('text-grey-blue')
    
    const { container: cream } = render(<Text color="cream">Cream</Text>)
    expect(cream.querySelector('p')).toHaveClass('text-nude-cream')
  })
  
  it('renders as different HTML elements', () => {
    const { container: span } = render(<Text as="span">Span text</Text>)
    expect(span.querySelector('span')).toBeInTheDocument()
    
    const { container: div } = render(<Text as="div">Div text</Text>)
    expect(div.querySelector('div')).toBeInTheDocument()
  })
  
  it('applies custom className', () => {
    const { container } = render(
      <Text className="custom-class italic">Custom styled text</Text>
    )
    const p = container.querySelector('p')
    
    expect(p).toHaveClass('custom-class', 'italic')
  })
  
  it('applies line-height based on size', () => {
    const { container: xs } = render(<Text size="xs">XS text</Text>)
    expect(xs.querySelector('p')).toHaveClass('leading-normal')
    
    const { container: lg } = render(<Text size="lg">LG text</Text>)
    expect(lg.querySelector('p')).toHaveClass('leading-loose')
    
    const { container: base } = render(<Text size="base">Base text</Text>)
    expect(base.querySelector('p')).toHaveClass('leading-relaxed')
  })
  
  // Edge case: multiple children
  it('renders multiple children correctly', () => {
    const { container } = render(
      <Text>
        <strong>Bold</strong> and <em>italic</em> text
      </Text>
    )
    const p = container.querySelector('p')
    
    expect(p).toBeInTheDocument()
    expect(p?.querySelector('strong')).toBeInTheDocument()
    expect(p?.querySelector('em')).toBeInTheDocument()
  })
  
  // Failure case: no children
  it('renders empty when no children provided', () => {
    const { container } = render(<Text>{''}</Text>)
    const p = container.querySelector('p')
    
    expect(p).toBeInTheDocument()
    expect(p).toHaveTextContent('')
  })
})