# PRP: Font Audit and Cleanup Implementation

## Feature Description
Implement a comprehensive font system cleanup for Peyton Shaw Counseling website to resolve performance issues, remove redundant font loading, establish consistent typography components, and improve overall user experience.

## Context and Background

### Current State Analysis
The website currently has mixed font loading patterns causing performance and consistency issues:
- **Redundant Loading**: Inter font loaded via both `next/font` and Google Fonts `<link>` tags
- **Inline Styles**: Hard-coded font-family styles in Header.tsx (line 125), Footer.tsx (line 38), and page.tsx (line 150)
- **Unused Resources**: Vujahday Script font loaded but barely used
- **Performance Impact**: Google Fonts link tags cause render-blocking

### Existing Codebase References
- **Font Configuration**: `tailwind.config.js` lines 112-117
- **Font Loading**: `app/layout.tsx` lines 2, 7, 62-64
- **Typography Styles**: `app/globals.css` lines 90-117, 174-178
- **Inline Style Usage**: Search for `style={{ fontFamily:` across components

### Documentation Resources
- **Next.js Font Optimization**: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- **Variable Fonts Guide**: https://web.dev/articles/variable-fonts
- **Web Font Performance**: https://www.zachleat.com/web/comprehensive-webfonts/
- **WCAG Typography Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html
- **Tailwind Typography Plugin**: https://tailwindcss.com/docs/typography-plugin

## Implementation Blueprint

### Phase 1: Font Configuration Module

```typescript
// lib/fonts.ts - Centralized font configuration
import { Inter, Playfair_Display } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif']
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
  fallback: ['Georgia', 'serif']
})

// Export font class names for Tailwind
export const fontVariables = `${inter.variable} ${playfair.variable}`
```

### Phase 2: Typography Components

```typescript
// components/ui/typography/index.ts
export { Heading } from './Heading'
export { Text } from './Text'
export { Label } from './Label'

// components/ui/typography/Heading.tsx
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'serif' | 'sans'
  className?: string
  children: React.ReactNode
}

// Pattern follows existing component structure in components/ui/
```

### Phase 3: Update Font Loading
1. Remove Google Fonts `<link>` tags from layout.tsx
2. Import font configuration from lib/fonts.ts
3. Apply font variables to body className

### Phase 4: Component Migration
Replace all inline font styles with Tailwind classes:
- `style={{ fontFamily: "'Vujahday Script', cursive" }}` → Remove entirely
- Use `font-serif` or `font-sans` Tailwind classes

### Phase 5: CSS Cleanup
1. Remove `.font-vujahday` class from globals.css
2. Update typography hierarchy to use CSS variables
3. Remove `!important` flags

## Detailed Task List

### Setup Tasks
1. Create `lib/fonts.ts` configuration module
2. Update `app/layout.tsx` to use centralized font loading
3. Remove Google Fonts `<link>` tags
4. Update `tailwind.config.js` font family configuration

### Component Tasks
5. Create `components/ui/typography/` directory structure
6. Implement `Heading.tsx` component with proper variants
7. Implement `Text.tsx` component with size variants
8. Implement `Label.tsx` component for forms
9. Create `components/ui/typography/index.ts` barrel export

### Migration Tasks
10. Update `components/layout/Header.tsx` - remove inline styles
11. Update `components/layout/Footer.tsx` - remove inline styles
12. Update `app/page.tsx` - remove inline styles
13. Audit all pages in `app/` directory for font usage
14. Update all components to use new typography components

### Cleanup Tasks
15. Remove Vujahday Script font loading
16. Remove `.font-vujahday` class from globals.css
17. Update CSS to use font CSS variables
18. Remove unused font weights from configuration

### Testing Tasks
19. Create visual regression tests for typography
20. Test font loading performance
21. Verify no FOUC on all pages
22. Cross-browser testing (Chrome, Safari, Firefox, Edge)
23. Mobile responsiveness testing

### Documentation Tasks
24. Update CLAUDE.md with typography guidelines
25. Create typography usage examples
26. Document font performance improvements
27. Add font system to README.md

## Validation Gates

```bash
# 1. TypeScript compilation
npm run build

# 2. Linting checks
npm run lint

# 3. Check for inline styles (should return no results)
grep -r "style={{.*fontFamily" app/ components/ --include="*.tsx" --include="*.jsx"

# 4. Verify font loading optimization
# Run in browser console on production build
performance.getEntriesByType('resource').filter(e => e.name.includes('fonts.googleapis.com')).length === 0

# 5. Lighthouse performance audit
# Should achieve > 90 performance score
npx lighthouse http://localhost:3000 --only-categories=performance --output=json --output-path=./lighthouse-report.json

# 6. Check for removed Vujahday references
grep -r "Vujahday" app/ components/ lib/ --include="*.tsx" --include="*.css" --include="*.js"

# 7. Verify font CSS variables
# Check that CSS variables are properly set
grep -r "var(--font-" app/globals.css
```

## Error Handling Strategy

### Font Loading Failures
- Implement fallback fonts in font configuration
- Use `font-display: swap` to show content immediately
- Monitor font loading with performance observers

### Component Migration
- Create migration checklist for each component
- Use TypeScript to catch type errors during migration
- Implement incremental migration approach

### Testing Failures
- Screenshot comparison for visual regression
- Fallback to system fonts if custom fonts fail
- Error boundaries for typography components

## Known Gotchas

1. **Next.js Font Variable Names**: Must use `variable` property in font config
2. **Tailwind Font Classes**: Need to update `tailwind.config.js` to use CSS variables
3. **FOUC Prevention**: Ensure `display: 'swap'` is set on all fonts
4. **Safari Font Rendering**: Test thoroughly on Safari for font weight rendering
5. **Mobile Font Scaling**: Use relative units (rem) for all font sizes

## Success Criteria

1. ✅ All fonts loaded via `next/font` (no Google Fonts links)
2. ✅ Zero inline font-family styles
3. ✅ Lighthouse performance score > 90
4. ✅ No FOUC on any page load
5. ✅ All text using typography components
6. ✅ Font load time < 500ms
7. ✅ TypeScript compilation passes
8. ✅ All linting checks pass

## Additional Resources

### Example Implementations
- Vercel Commerce Typography: https://github.com/vercel/commerce/tree/main/components/ui
- Shadcn Typography System: https://ui.shadcn.com/docs/components/typography
- Next.js Font Examples: https://github.com/vercel/next.js/tree/canary/examples/with-next-font

### Performance Testing Tools
- Web Page Test: https://www.webpagetest.org/
- Font Loading Monitor: https://fontfaceobserver.com/
- Chrome DevTools Font Tab: chrome://inspect → Network → Font

## Notes for AI Implementation

- Follow existing component patterns in `components/ui/` directory
- Use HeroUI components where applicable (project uses @heroui/react)
- Maintain consistency with existing Tailwind classes
- Reference `CLAUDE.md` for project-specific guidelines
- All components should be TypeScript with proper interfaces
- Follow mobile-first responsive design principles
- Ensure all changes maintain the "professional yet warm" tone required for therapy website

---

**Confidence Score: 9/10**

This PRP provides comprehensive context with specific file references, clear implementation steps, and executable validation gates. The only point deducted is for the lack of existing tests to reference, requiring test creation from scratch.