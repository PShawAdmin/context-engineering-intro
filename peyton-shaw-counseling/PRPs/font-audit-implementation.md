# Font Audit Implementation PRP

## Overview
Implement typography standardization across the Peyton Shaw Counseling website based on the comprehensive font audit document. This will ensure consistent, professional typography that maintains the therapeutic and calming aesthetic.

## Context & Requirements

### Key Files & References
- **Font Audit Document**: `/FONT_AUDIT.md` - Contains all typography standards
- **Typography Components**: `/components/ui/typography/` - Existing Heading, Text, Label components
- **Font Loading**: `/lib/fonts.ts` - Next.js font optimization setup
- **Global Styles**: `/app/globals.css` - Base typography styles
- **Tailwind Config**: `/tailwind.config.js` - Font family mappings

### Current State Analysis
1. **Good foundation exists**: Typography components are already built and functional
2. **Vujahday Script is used**: Currently serves as the PSC brand font (not unused)
3. **Main issues identified**:
   - Color inconsistencies: `text-grey-storm` vs `text-text-storm`
   - Direct Tailwind classes used instead of typography components
   - No test coverage for typography
   - Some duplicate styles between globals.css and components

## Implementation Plan

### Phase 1: Fix Color Inconsistencies

#### Task 1.1: Standardize Text Colors
Replace all instances of incorrect color classes with correct ones:

**Files to update**:
```
/app/page.tsx - 3 instances of text-grey-storm
/components/layout/Hero.tsx - 1 instance
/components/features/Testimonials.tsx - 3 instances  
/components/features/ServiceCard.tsx - 3 instances
```

**Search and replace pattern**:
```
Find: text-grey-storm
Replace: text-text-storm
```

### Phase 2: Replace Direct Tailwind with Components

#### Task 2.1: Audit Component Usage
Search for direct typography classes and replace with components:

**Common patterns to find and replace**:
```tsx
// Find patterns like:
<h2 className="text-4xl font-serif">Title</h2>
<p className="text-lg text-grey-storm">Content</p>

// Replace with:
<Heading level={2}>Title</Heading>
<Text size="lg" color="storm">Content</Text>
```

**Priority components to check**:
- `/app/page.tsx` - Homepage sections
- `/app/about/page.tsx` - About page content
- `/app/services/page.tsx` - Service descriptions
- `/app/contact/page.tsx` - Contact form
- All components in `/components/features/`
- All components in `/components/layout/`

#### Task 2.2: Update Typography Component Styles
Ensure components match the font audit specifications:

```typescript
// Update Heading.tsx to ensure exact sizes match audit
const headingStyles = {
  1: 'text-4xl md:text-5xl lg:text-6xl font-normal leading-tight text-text-charcoal',
  2: 'text-3xl md:text-4xl lg:text-5xl font-normal leading-tight text-text-charcoal',
  3: 'text-2xl md:text-2xl lg:text-3xl font-medium leading-snug text-text-storm',
  4: 'text-xl md:text-xl lg:text-2xl font-medium leading-normal text-text-storm',
  5: 'text-lg md:text-lg lg:text-xl font-medium leading-normal text-text-storm',
  6: 'text-base md:text-base lg:text-lg font-medium leading-relaxed text-text-storm'
}
```

### Phase 3: Add Typography Tests

#### Task 3.1: Create Typography Component Tests
Create test files for each typography component:

```typescript
// __tests__/components/ui/typography/Heading.test.tsx
import { render } from '@testing-library/react'
import Heading from '@/components/ui/typography/Heading'

describe('Heading Component', () => {
  it('renders h1 with correct classes', () => {
    const { container } = render(<Heading level={1}>Test</Heading>)
    const h1 = container.querySelector('h1')
    expect(h1).toHaveClass('font-serif', 'text-text-charcoal')
  })
  
  it('renders h3 with Inter font', () => {
    const { container } = render(<Heading level={3}>Test</Heading>)
    const h3 = container.querySelector('h3')
    expect(h3).toHaveClass('font-sans', 'text-text-storm')
  })
})
```

### Phase 4: Documentation & Style Guide

#### Task 4.1: Create Typography Documentation Page
Create `/app/style-guide/typography/page.tsx`:

```tsx
import Heading from '@/components/ui/typography/Heading'
import Text from '@/components/ui/typography/Text'

export default function TypographyGuide() {
  return (
    <div className="container mx-auto py-12">
      <Heading level={1}>Typography Style Guide</Heading>
      
      <section className="mt-12">
        <Heading level={2}>Heading Hierarchy</Heading>
        <div className="space-y-4 mt-6">
          <Heading level={1}>H1: Page Title (Playfair Display)</Heading>
          <Heading level={2}>H2: Section Title (Playfair Display)</Heading>
          <Heading level={3}>H3: Subsection (Inter)</Heading>
          {/* ... continue for all levels */}
        </div>
      </section>
      
      <section className="mt-12">
        <Heading level={2}>Text Sizes</Heading>
        <div className="space-y-4 mt-6">
          <Text size="xl">Extra Large Text (20px)</Text>
          <Text size="lg">Large Text (18px)</Text>
          <Text size="base">Base Text (16px)</Text>
          <Text size="sm">Small Text (14px)</Text>
          <Text size="xs">Tiny Text (12px)</Text>
        </div>
      </section>
    </div>
  )
}
```

## Validation Steps

### Automated Checks
```bash
# 1. Build the project to catch TypeScript errors
npm run build

# 2. Run linting to ensure code quality
npm run lint

# 3. Check for remaining color inconsistencies
grep -r "text-grey-storm" --include="*.tsx" --include="*.ts" ./app ./components

# 4. Verify no direct heading classes remain
grep -r "text-4xl.*font-serif\|text-5xl.*font-serif\|text-6xl.*font-serif" --include="*.tsx" ./app ./components

# 5. Run tests (once created)
npm test
```

### Manual Validation Checklist
1. [ ] Visit each page and verify typography hierarchy
2. [ ] Check mobile responsiveness for all text elements
3. [ ] Verify PSC brand font (Vujahday Script) appears only in logo/brand text
4. [ ] Confirm gradient text animation works on "Peace" and "Purpose"
5. [ ] Test color contrast with browser DevTools
6. [ ] Verify all links have proper hover states

## Implementation Order

1. **Fix color inconsistencies** (30 mins)
   - Simple find/replace operation
   - Low risk, high impact

2. **Update existing typography components** (1 hour)
   - Ensure they match audit specifications exactly
   - Update line heights and responsive breakpoints

3. **Replace direct Tailwind usage** (3-4 hours)
   - Component by component replacement
   - Test each component after updates

4. **Add test coverage** (2 hours)
   - Create test files for typography components
   - Add visual regression tests if possible

5. **Create style guide page** (1 hour)
   - Document all typography patterns
   - Serve as reference for future development

## Gotchas & Considerations

1. **Don't remove Vujahday Script** - It's the PSC brand font, not unused
2. **Preserve gradient animations** - Special effect for "Peace" and "Purpose"
3. **Check dark mode** - Ensure text colors work on dark backgrounds
4. **Test real devices** - Not just browser DevTools for mobile
5. **Maintain semantic HTML** - Don't skip heading levels

## Success Criteria

- All text colors use the correct Tailwind classes
- No direct typography Tailwind classes in components
- Typography components used consistently
- All pages follow the defined hierarchy
- Test coverage for typography components
- Style guide page documenting all patterns

## External References

- [Tailwind Typography Plugin](https://tailwindcss.com/docs/typography-plugin)
- [Next.js Font Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Typography Best Practices](https://www.smashingmagazine.com/2020/07/css-techniques-legibility/)

## Confidence Score: 9/10

This PRP has high confidence because:
- Clear, specific tasks with file locations
- Existing components to build upon
- Simple find/replace for many fixes
- Clear validation steps
- Comprehensive context provided

The only uncertainty is around potential edge cases in complex components, but the validation steps should catch these.