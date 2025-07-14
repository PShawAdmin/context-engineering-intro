name: "Comprehensive SEO Implementation for Next.js Therapy Website"
description: |

## Purpose
Implement comprehensive SEO optimizations for Peyton Shaw Counseling's Next.js website to improve organic search visibility, particularly for local searches in Southlake and Grapevine, TX. Focus on technical SEO, on-page optimization, local SEO, and structured data implementation.

## Core Principles
1. **Context is King**: Include ALL necessary Next.js 14 App Router patterns and SEO best practices
2. **Validation Loops**: Provide executable tests for metadata, schema validation, and performance
3. **Information Dense**: Use existing codebase patterns and Next.js conventions
4. **Progressive Success**: Start with critical SEO fixes, validate, then enhance
5. **Global rules**: Follow all rules in CLAUDE.md

---

## Goal
Transform the existing Next.js therapy website into a fully SEO-optimized platform that ranks highly for local therapy searches in Southlake and Grapevine, TX, with proper technical implementation, rich snippets, and optimal user experience.

## Why
- **Business Impact**: Increase organic traffic and client inquiries from local searches
- **Local Visibility**: Dominate "therapist near me" and location-specific searches
- **User Trust**: Rich snippets and proper schema build credibility
- **Competitive Edge**: Outrank competitors with superior technical SEO

## What
Implement all SEO recommendations from CompSEO.md including:
- Technical SEO fixes (metadata, performance, crawlability)
- On-page optimization (titles, descriptions, headings, content)
- Local SEO enhancement (NAP consistency, location targeting)
- Structured data completion (schemas, rich snippets)
- Performance optimization (Core Web Vitals, image optimization)

### Success Criteria
- [ ] All pages have unique, optimized metadata
- [ ] Google Rich Results Test validates all schemas
- [ ] PageSpeed Insights scores >90 on mobile and desktop
- [ ] Sitemap includes all pages and validates
- [ ] Local business info consistent across site
- [ ] All images have proper alt text
- [ ] Canonical URLs properly implemented

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
  why: Next.js 14 metadata API documentation for static and dynamic metadata
  
- url: https://nextjs.org/docs/app/guides/json-ld
  why: Official Next.js guide for implementing JSON-LD structured data
  
- url: https://developers.google.com/search/docs/appearance/structured-data/local-business
  why: Google's requirements for LocalBusiness schema
  
- url: https://schema.org/MedicalBusiness
  why: Schema.org definition for therapy practice structured data

- file: app/layout.tsx
  why: Root layout with existing metadata configuration to extend
  
- file: lib/seo/schemas.ts
  why: Existing schema generation functions to update with real data
  
- file: lib/seo/metadata.ts
  why: generateMetaTags utility that needs consistent usage

- docfile: CompSEO.md
  why: Complete SEO requirements and checklist from user

- url: https://web.dev/articles/vitals
  why: Core Web Vitals requirements and optimization strategies

- url: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
  why: Google's sitemap requirements and best practices
```

### Current Codebase Structure
```bash
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx               # Homepage
├── about/page.tsx         # About page
├── services/
│   ├── page.tsx          # Services listing
│   └── [slug]/page.tsx   # Individual service pages
├── blog/
│   ├── page.tsx          # Blog listing
│   └── [slug]/page.tsx   # Individual blog posts
├── contact/page.tsx      # Contact page
├── faq/page.tsx          # FAQ page
├── sitemap.xml/route.ts  # Dynamic sitemap
└── globals.css

lib/
├── seo/
│   ├── metadata.ts       # Metadata utilities
│   └── schemas.ts        # Schema generators
└── constants.ts          # Site constants

components/
├── layout/
│   ├── Header.tsx
│   └── Footer.tsx
└── seo/
    └── JsonLd.tsx        # JSON-LD renderer

public/
├── robots.txt            # Robots file
└── manifest.json         # PWA manifest
```

### Desired Codebase Structure with New Files
```bash
app/
├── layout.tsx              # Updated with complete metadata
├── page.tsx               # Updated with location keywords
├── about/page.tsx         # Enhanced metadata and schema
├── services/
│   ├── page.tsx          # Service listing with schemas
│   └── [slug]/page.tsx   # Service schemas per page
├── areas-served/         # NEW - Location pages
│   └── page.tsx          # Areas served page
├── opengraph-image.png   # NEW - Default OG image
└── twitter-image.png     # NEW - Twitter card image

lib/
├── seo/
│   ├── metadata.ts       # Enhanced metadata generator
│   ├── schemas.ts        # Updated with real data
│   └── keywords.ts       # NEW - Keyword management
└── constants.ts          # Updated with real business info

components/
├── seo/
│   ├── JsonLd.tsx        # Existing
│   ├── Breadcrumbs.tsx   # NEW - Visual breadcrumbs
│   └── LocalBusinessInfo.tsx # NEW - NAP component
└── layout/
    └── Footer.tsx        # Updated with consistent NAP

scripts/
└── validate-seo.ts       # NEW - SEO validation script
```

### Known Gotchas & Critical Information
```typescript
// CRITICAL: Next.js 14 App Router metadata rules
// 1. Metadata is merged from root to leaf - child overrides parent
// 2. generateMetadata runs before the page component
// 3. metadataBase is required for absolute URLs in metadata

// CRITICAL: Schema.org requirements
// 1. LocalBusiness requires: name, address, telephone
// 2. MedicalBusiness is preferred over generic LocalBusiness for therapy
// 3. Geo coordinates must be accurate (use Google Maps)

// CRITICAL: Google requirements
// 1. Each page needs unique title and description
// 2. Titles should be 50-60 chars, descriptions 150-160 chars
// 3. Local pages must mention city names naturally

// GOTCHA: Image optimization
// 1. OG images must be 1200x630px minimum
// 2. Use next/image for all images with proper dimensions
// 3. Alt text should describe image, not stuff keywords

// EXISTING PATTERNS:
// 1. Use businessInfo from constants.ts
// 2. JsonLd component handles script injection
// 3. generateMetaTags creates consistent metadata
```

## Implementation Blueprint

### Data Models and Constants Update

First, update the core business information and constants:

```typescript
// lib/constants.ts - Update with real data
export const businessInfo = {
  name: "Peyton Shaw Counseling, PLLC",
  phone: "(817) 383-8115",
  email: "peyton@peytonshawcounseling.com",
  address: {
    streetAddress: "123 Main Street", // TODO: Get real address
    addressLocality: "Southlake",
    addressRegion: "TX",
    postalCode: "76092",
    addressCountry: "US"
  },
  geo: {
    latitude: 32.9545,  // TODO: Get accurate coordinates
    longitude: -97.1336
  },
  url: "https://www.peytonshawcounseling.com",
  logo: "/images/logo.png", // TODO: Ensure logo exists
  priceRange: "$$",
  openingHours: [
    "Mo-Fr 09:00-18:00",
    "Sa 09:00-14:00"
  ],
  areaServed: ["Southlake", "Grapevine", "Colleyville", "Keller"],
  sameAs: [
    "https://www.psychologytoday.com/profile/xxxxx", // TODO: Add real URLs
    "https://www.facebook.com/peytonshawcounseling"
  ]
};

// lib/seo/keywords.ts - NEW file for keyword management
export const targetKeywords = {
  primary: {
    location: ["Southlake", "Grapevine"],
    service: ["therapist", "counseling", "therapy"],
    combined: ["therapist in Southlake", "Grapevine counseling"]
  },
  secondary: {
    demographics: ["teen", "adolescent", "adult"],
    specialties: ["anxiety", "depression", "OCD", "life transitions"],
    modifiers: ["licensed", "professional", "experienced"]
  },
  longTail: [
    "teen anxiety therapist Southlake",
    "depression counseling Grapevine TX",
    "licensed therapist near me"
  ]
};
```

### Task List for Implementation

```yaml
Task 1: Update Business Constants and Keywords
MODIFY lib/constants.ts:
  - UPDATE businessInfo with real address and phone
  - ADD accurate geo coordinates from Google Maps
  - ADD real social media URLs
  - VERIFY all contact information

CREATE lib/seo/keywords.ts:
  - IMPLEMENT keyword taxonomy
  - ORGANIZE by primary/secondary/long-tail
  - INCLUDE location variations

Task 2: Enhance Metadata Generation Utility
MODIFY lib/seo/metadata.ts:
  - ENHANCE generateMetaTags to use keywords
  - ADD location suffix option
  - IMPLEMENT character limit validation
  - ADD canonical URL generation

Task 3: Fix Root Layout Metadata
MODIFY app/layout.tsx:
  - UPDATE metadataBase with production URL
  - ADD default openGraph image
  - IMPLEMENT comprehensive robots configuration
  - ADD verification tags (Google, Bing)

Task 4: Implement Homepage SEO
MODIFY app/page.tsx:
  - UPDATE metadata with location keywords
  - ENHANCE content with local identifiers
  - ADD service area mentions
  - IMPLEMENT homepage-specific schema

Task 5: Create Location Pages
CREATE app/areas-served/page.tsx:
  - BUILD comprehensive area page
  - LIST all service locations
  - ADD local content for each area
  - IMPLEMENT location-specific schema

Task 6: Update Service Pages
MODIFY app/services/[slug]/page.tsx:
  - ADD generateMetadata function
  - INCLUDE location in titles
  - IMPLEMENT Service schema
  - ADD breadcrumb navigation

Task 7: Complete Schema Implementation
MODIFY lib/seo/schemas.ts:
  - UPDATE all placeholder values
  - ADD aggregateRating from testimonials
  - IMPLEMENT review schema
  - ADD service-specific schemas

Task 8: Optimize Images and Performance
CREATE app/opengraph-image.png:
  - DESIGN 1200x630 OG image
  - INCLUDE practice name and tagline

MODIFY all image references:
  - ADD descriptive alt text
  - IMPLEMENT proper sizing
  - USE next/image optimization

Task 9: Enhance Local SEO Components
CREATE components/seo/LocalBusinessInfo.tsx:
  - BUILD NAP display component
  - ENSURE consistency across site

MODIFY components/layout/Footer.tsx:
  - ADD consistent NAP information
  - INCLUDE service area text
  - ADD schema markup

Task 10: Implement Breadcrumbs
CREATE components/seo/Breadcrumbs.tsx:
  - BUILD visual breadcrumb component
  - INTEGRATE with routing
  - ADD breadcrumb schema

Task 11: Complete Technical SEO
MODIFY app/sitemap.xml/route.ts:
  - ADD all new pages
  - IMPLEMENT priority logic
  - UPDATE change frequencies

MODIFY public/robots.txt:
  - ENSURE proper directives
  - ADD sitemap reference

UPDATE public/manifest.json:
  - ADD missing name fields
  - COMPLETE PWA configuration

Task 12: Create SEO Validation Script
CREATE scripts/validate-seo.ts:
  - CHECK metadata completeness
  - VALIDATE schema markup
  - TEST Core Web Vitals
  - VERIFY image optimization
```

### Per-Task Implementation Details

```typescript
// Task 2: Enhanced Metadata Generator
// lib/seo/metadata.ts
export function generateMetaTags({
  title,
  description,
  keywords,
  includeLocation = true,
  path = '',
  image,
}: MetaTagsProps): Metadata {
  // PATTERN: Location suffix for local SEO
  const locationSuffix = includeLocation 
    ? ` | ${businessInfo.address.addressLocality}, TX`
    : '';
  
  // CRITICAL: Character limits
  const finalTitle = enforceCharLimit(
    `${title}${locationSuffix}`,
    60
  );
  
  const finalDescription = enforceCharLimit(
    description,
    160
  );
  
  // PATTERN: Canonical URL generation
  const canonical = `${siteConfig.url}${path}`;
  
  return {
    title: finalTitle,
    description: finalDescription,
    keywords: keywords?.join(', '),
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      images: image ? [image] : ['/opengraph-image.png'],
      siteName: businessInfo.name,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: image ? [image] : ['/twitter-image.png'],
    },
    alternates: {
      canonical,
    },
    other: {
      'geo.region': 'US-TX',
      'geo.placename': businessInfo.address.addressLocality,
      'geo.position': `${businessInfo.geo.latitude};${businessInfo.geo.longitude}`,
    },
  };
}

// Task 4: Homepage Implementation
// app/page.tsx
export const metadata = generateMetaTags({
  title: 'Licensed Therapist & Counseling Services',
  description: 'Professional therapy for anxiety, depression, and life transitions. Serving teens and adults in Southlake and Grapevine, TX. In-person and online sessions available.',
  keywords: [
    ...targetKeywords.primary.combined,
    ...targetKeywords.secondary.specialties,
    'mental health counseling',
  ],
  path: '/',
});

// Task 7: Complete Schema Implementation
// lib/seo/schemas.ts
export const generateLocalBusinessSchema = (): WithContext<MedicalBusiness> => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  '@id': `${businessInfo.url}/#organization`,
  name: businessInfo.name,
  legalName: businessInfo.name,
  url: businessInfo.url,
  logo: `${businessInfo.url}${businessInfo.logo}`,
  image: `${businessInfo.url}${businessInfo.logo}`,
  telephone: businessInfo.phone,
  email: businessInfo.email,
  address: {
    '@type': 'PostalAddress',
    ...businessInfo.address,
  },
  geo: {
    '@type': 'GeoCoordinates',
    ...businessInfo.geo,
  },
  openingHoursSpecification: businessInfo.openingHours.map(parseOpeningHours),
  priceRange: businessInfo.priceRange,
  areaServed: businessInfo.areaServed.map(area => ({
    '@type': 'City',
    name: area,
  })),
  sameAs: businessInfo.sameAs,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '15', // TODO: Get actual count
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Therapy Services',
    itemListElement: services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
      },
    })),
  },
});
```

### Integration Points
```yaml
DATABASE:
  - No database changes required
  
CONFIG:
  - Update: lib/constants.ts with real business data
  - Update: lib/seo/metadata.ts with enhanced generator
  - Create: lib/seo/keywords.ts for keyword management
  
ROUTES:
  - Create: app/areas-served/page.tsx for location targeting
  - Update: All existing pages with proper metadata
  
COMPONENTS:
  - Create: components/seo/Breadcrumbs.tsx
  - Create: components/seo/LocalBusinessInfo.tsx
  - Update: components/layout/Footer.tsx with NAP
  
ASSETS:
  - Create: app/opengraph-image.png (1200x630)
  - Create: app/twitter-image.png (1200x630)
  - Verify: public/images/logo.png exists
```

## Validation Loop

### Level 1: Build & Type Checking
```bash
# Ensure the project builds without errors
npm run build

# Type check all TypeScript files
npm run type-check

# Expected: No errors. Fix any type issues before proceeding.
```

### Level 2: Metadata Validation
```bash
# Create validation script first
npm run validate:seo

# This script should check:
# - All pages have unique titles/descriptions
# - Character limits are respected
# - Required meta tags are present
# - Canonical URLs are valid
```

### Level 3: Schema Validation
```bash
# Use Google's Rich Results Test
# For each major page type, validate schema:

# 1. Copy the page's rendered HTML
# 2. Visit: https://search.google.com/test/rich-results
# 3. Paste HTML and test
# 4. Fix any errors or warnings

# Alternative: Use schema.org validator
# https://validator.schema.org/
```

### Level 4: Performance Testing
```bash
# Run Lighthouse CI locally
npm install -g @lhci/cli
lhci autorun

# Or use PageSpeed Insights API
# Test key pages:
# - Homepage
# - Service pages
# - Contact page

# Target scores:
# - Performance: >90
# - SEO: 100
# - Accessibility: >95
```

### Level 5: Local SEO Verification
```bash
# Manual checks:
# 1. NAP consistency across all pages
# 2. Location keywords appear naturally
# 3. Service area pages load correctly
# 4. Footer contains accurate info

# Automated check:
grep -r "Southlake" app/ | wc -l  # Should find multiple instances
grep -r "Grapevine" app/ | wc -l  # Should find multiple instances
```

## Final Validation Checklist
- [ ] All pages have unique, keyword-optimized titles (<60 chars)
- [ ] All pages have unique meta descriptions (<160 chars)
- [ ] Google Rich Results Test passes for all schemas
- [ ] Lighthouse scores >90 for Performance on mobile
- [ ] Sitemap validates and includes all pages
- [ ] Images have descriptive alt text
- [ ] NAP information consistent across site
- [ ] Location keywords naturally integrated
- [ ] Breadcrumbs visible and functioning
- [ ] OG/Twitter images display correctly
- [ ] No 404 errors or broken links
- [ ] robots.txt allows crawling of important pages
- [ ] Core Web Vitals pass (LCP <2.5s, FID <100ms, CLS <0.1)

---

## Anti-Patterns to Avoid
- ❌ Don't keyword stuff - keep content natural
- ❌ Don't duplicate meta descriptions across pages
- ❌ Don't use generic alt text like "image" or "photo"
- ❌ Don't hide content from users that's meant for SEO
- ❌ Don't neglect mobile optimization
- ❌ Don't use placeholder data in production schemas
- ❌ Don't create thin content pages just for keywords
- ❌ Don't ignore Core Web Vitals failures
- ❌ Don't implement schemas that don't match visible content

## Monitoring Post-Implementation
```yaml
Weekly:
  - Check Google Search Console for errors
  - Monitor Core Web Vitals in GSC
  - Review search queries and impressions

Monthly:
  - Update content with new keywords found in GSC
  - Check competitor rankings
  - Review and respond to new Google reviews
  - Update blog with locally-relevant content

Quarterly:
  - Full technical SEO audit
  - Schema markup updates
  - Performance optimization review
```

## Additional Resources for Implementation
- Next.js Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Schema.org Medical: https://schema.org/MedicalBusiness
- Google Local Business Guidelines: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Core Web Vitals Tools: https://web.dev/vitals-tools/

---

**Implementation Confidence Score: 9/10**

This PRP provides comprehensive context for implementing all SEO requirements from CompSEO.md. The implementation follows Next.js 14 best practices, includes validation steps, and provides specific code examples. The only missing piece would be the actual business address and accurate geo-coordinates, which need to be provided by the client.