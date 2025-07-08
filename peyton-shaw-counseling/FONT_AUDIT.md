# 🎨 Typography & Font Audit - Peyton Shaw Counseling

## Executive Summary

This document outlines the typography standardization plan for the Peyton Shaw Counseling website. The goal is to establish a cohesive, polished typographic system that maintains the professional and calming aesthetic while ensuring consistency across all pages.

---

## 🔤 Font Family Standards

### Primary Fonts

| Font Type | Font Family | Usage | CSS Variable |
|-----------|-------------|-------|--------------|
| **Serif** | Playfair Display | H1, H2 headings only | `--font-playfair` |
| **Sans-serif** | Inter | Body text, H3-H6, UI elements | `--font-inter` |
| **Script** | *TBD - PSC Brand Font* | PSC logo text only | `--font-psc` |

### Font Loading
- All fonts loaded via Next.js font optimization
- Subset: 'latin' for performance
- Display: 'swap' for better perceived performance

---

## 📏 Typography Scale

### Heading Hierarchy

| Element | Font | Desktop | Tablet | Mobile | Weight | Line Height |
|---------|------|---------|--------|---------|---------|-------------|
| **H1** | Playfair | 60px (6xl) | 48px (5xl) | 36px (4xl) | 400 | 1.1 |
| **H2** | Playfair | 48px (5xl) | 36px (4xl) | 30px (3xl) | 400 | 1.2 |
| **H3** | Inter | 30px (3xl) | 24px (2xl) | 24px (2xl) | 500 | 1.3 |
| **H4** | Inter | 24px (2xl) | 20px (xl) | 20px (xl) | 500 | 1.4 |
| **H5** | Inter | 20px (xl) | 18px (lg) | 18px (lg) | 500 | 1.4 |
| **H6** | Inter | 18px (lg) | 16px (base) | 16px (base) | 500 | 1.5 |

### Body Text Sizes

| Type | Size Class | Pixels | Usage | Line Height |
|------|------------|--------|-------|-------------|
| **Large** | text-xl | 20px | Intro paragraphs, emphasis | 1.75 |
| **Medium** | text-lg | 18px | Secondary emphasis | 1.75 |
| **Base** | text-base | 16px | Default body text | 1.625 |
| **Small** | text-sm | 14px | Supporting text, captions | 1.5 |
| **Tiny** | text-xs | 12px | Legal, metadata | 1.5 |

---

## 🎨 Color Standards

### Text Colors

| Color Name | Hex Value | Usage | Tailwind Class |
|------------|-----------|-------|----------------|
| **Charcoal** | #1E293B | H1, H2, primary emphasis | `text-text-charcoal` |
| **Storm** | #475569 | H3-H6, primary body text | `text-text-storm` |
| **Slate** | #64748B | Secondary text | `text-grey-storm` |
| **Muted** | #94A3B8 | Tertiary, disabled states | `text-grey-blue` |
| **Cream** | #FAF5F0 | Text on dark backgrounds | `text-nude-cream` |

### Special Text Effects

1. **Gradient Text** (Peace & Purpose)
   - Colors: #A67C52 → #C19B6F → #D4A574
   - Animation: 20s linear shimmer
   - Drop shadow: 2px 4px rgba(0,0,0,0.15)

2. **Link Styles**
   - Default: `text-nude-clay`
   - Hover: `text-nude-clay/80`
   - Underline decoration on hover

---

## ⚖️ Font Weight Standards

| Weight | Value | Usage | Class |
|--------|-------|-------|-------|
| **Light** | 300 | *Deprecated - do not use* | `font-light` |
| **Normal** | 400 | Body text, paragraphs | `font-normal` |
| **Medium** | 500 | H3-H6, buttons, labels | `font-medium` |
| **Semibold** | 600 | Strong emphasis, CTAs | `font-semibold` |
| **Bold** | 700 | *Reserved for special cases* | `font-bold` |

---

## 📐 Implementation Guidelines

### 1. **Use Typography Components**
```tsx
// ✅ Preferred
<Heading level={2}>About Our Services</Heading>
<Text size="lg" color="storm">Professional therapy services...</Text>

// ❌ Avoid
<h2 className="text-4xl font-serif">About Our Services</h2>
<p className="text-lg text-grey-storm">Professional therapy services...</p>
```

### 2. **Consistent Spacing**
- Headings: Use consistent margin-bottom (mb-4 to mb-8)
- Paragraphs: mb-4 between paragraphs
- Sections: Maintain rhythm with section-padding utility

### 3. **Responsive Design**
- Always include responsive variants
- Test on mobile devices
- Maintain readability at all sizes

---

## 🔧 Action Items

### Phase 1: Immediate Fixes
- [ ] Standardize all instances of `text-grey-storm` to `text-text-storm`
- [ ] Replace direct Tailwind typography classes with components
- [ ] Remove unused Vujahday Script font loading
- [ ] Ensure all H1/H2 use Playfair Display consistently

### Phase 2: Enhancement
- [ ] Implement custom PSC brand font for logo text
- [ ] Create Typography style guide page
- [ ] Add typography unit tests
- [ ] Document any exceptions to standards

### Phase 3: Optimization
- [ ] Audit and optimize font loading performance
- [ ] Consider variable fonts for Inter
- [ ] Implement font-display strategies
- [ ] Add fallback font stacks

---

## 📋 Component Checklist

Track typography updates across components:

### Layout Components
- [ ] Header.tsx - Navigation text
- [ ] Footer.tsx - Footer text and links
- [ ] Hero.tsx - Hero titles and subtitles
- [ ] Navigation.tsx - Menu items

### Page Components  
- [ ] HomePage - All sections
- [ ] AboutPage - Bio and content
- [ ] ServicesPage - Service descriptions
- [ ] ContactPage - Form labels and content
- [ ] BlogPage - Article typography

### Feature Components
- [ ] ServiceCard - Titles and descriptions
- [ ] Testimonials - Quotes and attribution
- [ ] FAQ - Questions and answers
- [ ] Forms - Labels and helper text

---

## 🚫 Typography Don'ts

1. **Don't mix font families** within the same content block
2. **Don't use font-light** - insufficient contrast
3. **Don't create new font sizes** - use the defined scale
4. **Don't use pure black (#000)** - use text-charcoal
5. **Don't skip heading levels** - maintain H1→H2→H3 hierarchy
6. **Don't override line-height** without good reason

---

## ✅ Typography Do's

1. **Do use semantic HTML** - H1 for page titles, H2 for sections
2. **Do maintain contrast ratios** - WCAG AA minimum
3. **Do test on real devices** - not just browser DevTools  
4. **Do use the Text component** for consistent styling
5. **Do consider context** - larger text for older audiences
6. **Do preserve the PSC brand font** for logo/brand elements

---

## 🔍 Validation Checklist

Before marking typography as complete:

- [ ] All headings follow the defined hierarchy
- [ ] Body text is consistently sized and colored
- [ ] Links are clearly distinguishable
- [ ] Text remains readable on all backgrounds
- [ ] Mobile typography is appropriately scaled
- [ ] No orphaned typography styles remain
- [ ] Components use standardized classes
- [ ] Special effects (gradients) work across browsers

---

## 📚 References

- [Tailwind Typography](https://tailwindcss.com/docs/font-size)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)

---

*Last Updated: ${new Date().toLocaleDateString()}*
*Version: 1.0*