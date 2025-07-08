import { Heading } from '@/components/ui/typography/Heading'
import { Text } from '@/components/ui/typography/Text'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function TypographyGuide() {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto py-12 px-4">
          <Heading level={1}>Typography Style Guide</Heading>
          
          <section className="mt-12 space-y-8">
            <div>
              <Heading level={2}>Heading Hierarchy</Heading>
              <div className="space-y-4 mt-6 bg-nude-linen p-8 rounded-lg">
                <div className="border-b border-nude-sand pb-4">
                  <Heading level={1}>H1: Page Title (Playfair Display)</Heading>
                  <Text size="sm" color="muted" className="mt-2">60px desktop / 48px tablet / 36px mobile • Weight 400 • Line height 1.1</Text>
                </div>
                <div className="border-b border-nude-sand pb-4">
                  <Heading level={2}>H2: Section Title (Playfair Display)</Heading>
                  <Text size="sm" color="muted" className="mt-2">48px desktop / 36px tablet / 30px mobile • Weight 400 • Line height 1.2</Text>
                </div>
                <div className="border-b border-nude-sand pb-4">
                  <Heading level={3}>H3: Subsection (Inter)</Heading>
                  <Text size="sm" color="muted" className="mt-2">30px desktop / 24px tablet / 24px mobile • Weight 500 • Line height 1.3</Text>
                </div>
                <div className="border-b border-nude-sand pb-4">
                  <Heading level={4}>H4: Card Title (Inter)</Heading>
                  <Text size="sm" color="muted" className="mt-2">24px desktop / 20px tablet / 20px mobile • Weight 500 • Line height 1.4</Text>
                </div>
                <div className="border-b border-nude-sand pb-4">
                  <Heading level={5}>H5: Small Title (Inter)</Heading>
                  <Text size="sm" color="muted" className="mt-2">20px desktop / 18px tablet / 18px mobile • Weight 500 • Line height 1.4</Text>
                </div>
                <div>
                  <Heading level={6}>H6: Tiny Title (Inter)</Heading>
                  <Text size="sm" color="muted" className="mt-2">18px desktop / 16px tablet / 16px mobile • Weight 500 • Line height 1.5</Text>
                </div>
              </div>
            </div>
            
            <div>
              <Heading level={2}>Text Sizes</Heading>
              <div className="space-y-4 mt-6 bg-nude-cream p-8 rounded-lg">
                <div className="border-b border-nude-linen pb-4">
                  <Text size="xl">Extra Large Text (20px)</Text>
                  <Text size="sm" color="muted" className="mt-2">Used for intro paragraphs and emphasis • Line height 1.75</Text>
                </div>
                <div className="border-b border-nude-linen pb-4">
                  <Text size="lg">Large Text (18px)</Text>
                  <Text size="sm" color="muted" className="mt-2">Secondary emphasis • Line height 1.75</Text>
                </div>
                <div className="border-b border-nude-linen pb-4">
                  <Text size="base">Base Text (16px)</Text>
                  <Text size="sm" color="muted" className="mt-2">Default body text • Line height 1.625</Text>
                </div>
                <div className="border-b border-nude-linen pb-4">
                  <Text size="sm">Small Text (14px)</Text>
                  <Text size="sm" color="muted" className="mt-2">Supporting text, captions • Line height 1.5</Text>
                </div>
                <div>
                  <Text size="xs">Tiny Text (12px)</Text>
                  <Text size="sm" color="muted" className="mt-2">Legal text, metadata • Line height 1.5</Text>
                </div>
              </div>
            </div>
            
            <div>
              <Heading level={2}>Text Colors</Heading>
              <div className="space-y-4 mt-6">
                <div className="bg-nude-linen p-6 rounded-lg">
                  <Text color="charcoal" weight="medium">Charcoal (#1E293B) - Primary emphasis</Text>
                  <Text color="charcoal" className="mt-2">Used for H1, H2 headings and high-emphasis text</Text>
                </div>
                <div className="bg-nude-linen p-6 rounded-lg">
                  <Text color="storm" weight="medium">Storm (#475569) - Body text</Text>
                  <Text color="storm" className="mt-2">Default color for H3-H6 headings and primary body text</Text>
                </div>
                <div className="bg-nude-linen p-6 rounded-lg">
                  <Text color="slate" weight="medium">Slate (#64748B) - Secondary text</Text>
                  <Text color="slate" className="mt-2">Used for less important content and supporting text</Text>
                </div>
                <div className="bg-nude-linen p-6 rounded-lg">
                  <Text color="muted" weight="medium">Muted (#94A3B8) - Tertiary text</Text>
                  <Text color="muted" className="mt-2">Used for disabled states and very low emphasis content</Text>
                </div>
                <div className="bg-nude-clay p-6 rounded-lg">
                  <Text color="cream" weight="medium">Cream (#FAF5F0) - Light text</Text>
                  <Text color="cream" className="mt-2">Used on dark backgrounds for contrast</Text>
                </div>
              </div>
            </div>
            
            <div>
              <Heading level={2}>Font Weights</Heading>
              <div className="space-y-4 mt-6 bg-background-dove p-8 rounded-lg">
                <div className="border-b border-grey-blue-light pb-4">
                  <Text weight="normal">Normal (400) - Default weight</Text>
                  <Text size="sm" color="muted" className="mt-2">Used for body text and paragraphs</Text>
                </div>
                <div className="border-b border-grey-blue-light pb-4">
                  <Text weight="medium">Medium (500) - Subtle emphasis</Text>
                  <Text size="sm" color="muted" className="mt-2">Used for H3-H6 headings, buttons, and labels</Text>
                </div>
                <div>
                  <Text weight="semibold">Semibold (600) - Strong emphasis</Text>
                  <Text size="sm" color="muted" className="mt-2">Used for CTAs and important UI elements</Text>
                </div>
              </div>
            </div>
            
            <div>
              <Heading level={2}>Special Effects</Heading>
              <div className="mt-6 bg-nude-linen p-8 rounded-lg">
                <Heading level={1} className="mb-6">
                  Find <span className="gradient-text-base gradient-text-peace">Peace</span> and <span className="gradient-text-base gradient-text-purpose">Purpose</span>
                </Heading>
                <Text color="muted">Gradient text effect using colors #A67C52 → #C19B6F → #D4A574 with 20s animation</Text>
              </div>
            </div>
            
            <div>
              <Heading level={2}>Component Usage</Heading>
              <div className="mt-6 bg-background-dove p-8 rounded-lg">
                <Heading level={3} className="mb-4">Best Practices</Heading>
                <div className="space-y-3">
                  <Text>✅ Always use the Heading component for semantic headings</Text>
                  <Text>✅ Use the Text component for all paragraph and text content</Text>
                  <Text>✅ Maintain the heading hierarchy (don&apos;t skip levels)</Text>
                  <Text>✅ Use appropriate colors from the design system</Text>
                  <Text>❌ Don&apos;t use font-light (insufficient contrast)</Text>
                  <Text>❌ Don&apos;t create new font sizes outside the scale</Text>
                  <Text>❌ Don&apos;t use pure black (#000) - use text-charcoal instead</Text>
                </div>
              </div>
            </div>
            
            <div>
              <Heading level={2}>Code Examples</Heading>
              <div className="mt-6 space-y-6">
                <div className="bg-nude-cream p-6 rounded-lg">
                  <Heading level={3} className="mb-4">Heading Component</Heading>
                  <div className="bg-white p-4 rounded border border-nude-sand font-mono text-sm">
                    <pre>{`import { Heading } from '@/components/ui/typography/Heading'

<Heading level={2}>Section Title</Heading>
<Heading level={3} className="mb-4">Subsection with spacing</Heading>`}</pre>
                  </div>
                </div>
                
                <div className="bg-nude-cream p-6 rounded-lg">
                  <Heading level={3} className="mb-4">Text Component</Heading>
                  <div className="bg-white p-4 rounded border border-nude-sand font-mono text-sm">
                    <pre>{`import { Text } from '@/components/ui/typography/Text'

<Text size="lg" color="storm">Large body text</Text>
<Text weight="medium" className="mb-4">Medium weight text</Text>
<Text size="sm" color="muted" as="span">Small inline text</Text>`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}