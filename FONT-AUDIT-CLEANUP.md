# Font Audit & Cleanup Plan for Peyton Shaw Counseling Website

## Current State Analysis

### Font Inventory
1. **Inter (Sans-serif)** - Primary body font
   - Weights: 300, 400, 500, 600
   - Used for: Body text, navigation, buttons, forms
   - Loaded via: Google Fonts & Next.js font optimization

2. **Playfair Display (Serif)** - Display font
   - Weights: 400, 500, 600, 700
   - Used for: H1, H2 headings, hero text, section titles
   - Loaded via: Google Fonts

3. **Vujahday Script (Decorative)** - Accent font
   - Weights: Default only
   - Used for: Currently underutilized (utility class exists but minimal usage)
   - Loaded via: Google Fonts

### Identified Issues

#### 1. **Font Loading Redundancy**
- Inter is loaded twice (Google Fonts link + Next.js font import)
- This causes unnecessary network requests and potential FOUC (Flash of Unstyled Content)

#### 2. **Inconsistent Font Application**
- Some components may use inline styles or custom classes instead of the established typography system
- Potential mixing of font weights without clear hierarchy

#### 3. **Unused Font Resources**
- Vujahday Script is loaded but barely used (if at all)
- Loading unused fonts impacts performance

#### 4. **Typography Scale Issues**
- Need to verify consistent spacing and sizing across all pages
- Mobile responsiveness of typography needs review

## Cleanup Action Plan

### Phase 1: Audit & Documentation (Week 1)

#### Task 1.1: Complete Font Usage Audit
- [ ] Create a spreadsheet documenting every page/component
- [ ] List which fonts, weights, and sizes are used where
- [ ] Identify any inline font styles that break the system
- [ ] Screenshot examples of typography inconsistencies

#### Task 1.2: Performance Analysis
- [ ] Run Lighthouse audits on all pages
- [ ] Measure font loading times
- [ ] Identify render-blocking font resources
- [ ] Check for FOUC issues

#### Task 1.3: Content Hierarchy Review
- [ ] Map out the intended content hierarchy
- [ ] Document where each heading level should be used
- [ ] Create guidelines for when to use serif vs sans-serif

### Phase 2: Optimization & Standardization (Week 2)

#### Task 2.1: Font Loading Optimization
- [ ] Remove redundant Inter Google Fonts link
- [ ] Implement Next.js font optimization for all fonts
- [ ] Add font-display: swap for better perceived performance
- [ ] Consider variable fonts to reduce file size

```typescript
// Recommended approach in app/layout.tsx
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair'
})
```

#### Task 2.2: Remove Unused Fonts
- [ ] Remove Vujahday Script if not actively used
- [ ] Remove unused font weights
- [ ] Clean up related CSS classes

#### Task 2.3: Create Typography Components
- [ ] Build reusable typography components (Heading, Text, Label)
- [ ] Enforce consistent usage across the site
- [ ] Example structure:

```typescript
// components/Typography/Heading.tsx
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'serif' | 'sans'
  className?: string
  children: React.ReactNode
}

// components/Typography/Text.tsx
interface TextProps {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold'
  className?: string
  children: React.ReactNode
}
```

### Phase 3: Content Cleanup (Week 3)

#### Task 3.1: Establish Content Guidelines
- [ ] Create a style guide for content tone and voice
- [ ] Define when to use different heading levels
- [ ] Set character limits for different content types
- [ ] Create templates for common content patterns

#### Task 3.2: Content Audit & Rewrite
- [ ] Review all page content for consistency
- [ ] Rewrite overly clinical or confusing sections
- [ ] Ensure warm, professional tone throughout
- [ ] Optimize content length and readability

#### Task 3.3: SEO & Accessibility Review
- [ ] Ensure proper heading hierarchy (no skipped levels)
- [ ] Add descriptive, keyword-rich headings
- [ ] Check color contrast ratios
- [ ] Verify font sizes meet accessibility standards

### Phase 4: Implementation & Testing (Week 4)

#### Task 4.1: Systematic Updates
- [ ] Update each page/component to use new typography system
- [ ] Replace inline styles with utility classes
- [ ] Ensure mobile responsiveness
- [ ] Test on multiple devices and browsers

#### Task 4.2: Quality Assurance
- [ ] Visual regression testing
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Accessibility testing with screen readers

#### Task 4.3: Documentation
- [ ] Update CLAUDE.md with typography guidelines
- [ ] Create a visual style guide
- [ ] Document the typography component API
- [ ] Add examples of proper usage

## Typography System Recommendations

### Simplified Font Stack
```css
/* Primary: Modern, clean, highly readable */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;

/* Display: Elegant, trustworthy, professional */
--font-serif: 'Playfair Display', Georgia, serif;

/* Remove decorative fonts unless specifically needed */
```

### Type Scale (Mobile-First)
```css
/* Base: 16px */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### Font Weight System
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
/* Remove 700 if not needed */
```

### Usage Guidelines

#### Headings
- **H1**: Playfair Display, 48-60px, used once per page
- **H2**: Playfair Display, 36-48px, major sections
- **H3**: Inter, 24-30px, subsections
- **H4-H6**: Inter, 18-24px, minor headings

#### Body Text
- **Default**: Inter, 16px, normal weight
- **Emphasis**: Inter, 16px, medium weight
- **Small**: Inter, 14px, normal weight

#### Special Elements
- **Buttons**: Inter, 16px, medium weight
- **Navigation**: Inter, 16px, medium weight
- **Form Labels**: Inter, 14px, medium weight

## Success Metrics

### Performance
- [ ] Lighthouse performance score > 90
- [ ] Font load time < 500ms
- [ ] No FOUC on any page

### Consistency
- [ ] 100% of text using defined typography system
- [ ] No inline font styles
- [ ] Consistent hierarchy across all pages

### Accessibility
- [ ] WCAG AA compliance for all text
- [ ] Proper heading structure
- [ ] Readable on all devices

## Timeline

- **Week 1**: Complete audit and documentation
- **Week 2**: Implement optimizations and create components
- **Week 3**: Content cleanup and guidelines
- **Week 4**: Final implementation and testing
- **Week 5**: Review and sign-off

## Next Steps

1. Review and approve this plan
2. Begin Phase 1 audit immediately
3. Schedule weekly check-ins to track progress
4. Prepare staging environment for testing changes

---

*This document should be updated as work progresses and new issues are discovered.*