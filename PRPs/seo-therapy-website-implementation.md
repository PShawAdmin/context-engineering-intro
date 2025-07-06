# PRP: SEO Implementation for Peyton Shaw Counseling Website

## Overview
This PRP provides comprehensive implementation steps for optimizing the Peyton Shaw Counseling therapy website for search engines, focusing on technical SEO, schema markup, performance optimization, and analytics implementation. The goal is to achieve top rankings for therapy-related keywords in Southlake, TX while maintaining excellent Core Web Vitals scores.

## Context & Background

### Current State Analysis
The therapy website is built with Next.js 14 and has basic SEO implementation:
- ✅ Basic metadata in `/peyton-shaw-counseling/app/layout.tsx`
- ✅ Dynamic sitemap generation at `/peyton-shaw-counseling/app/sitemap.xml/route.ts`
- ✅ Robots.txt configured at `/peyton-shaw-counseling/public/robots.txt`
- ❌ No schema markup implementation
- ❌ No analytics or Core Web Vitals monitoring
- ❌ Limited performance optimizations

### Key Files to Reference
1. **Layout & Metadata**: `/peyton-shaw-counseling/app/layout.tsx`
2. **Homepage**: `/peyton-shaw-counseling/app/page.tsx`
3. **Services Page**: `/peyton-shaw-counseling/app/(marketing)/services/page.tsx`
4. **Constants**: `/peyton-shaw-counseling/lib/constants.ts`
5. **Sitemap**: `/peyton-shaw-counseling/app/sitemap.xml/route.ts`

### External Documentation References
1. **Next.js JSON-LD Guide**: https://nextjs.org/docs/app/guides/json-ld
2. **Schema.org MedicalBusiness**: https://schema.org/MedicalBusiness
3. **Google Analytics 4 in Next.js**: https://ospaarmann.medium.com/google-analytics-4-ga4-in-next-js-14-and-react-with-event-tracking-2ceabb00c59a
4. **Next.js Analytics Guide**: https://nextjs.org/docs/pages/guides/analytics
5. **Schema Markup Validation**: https://validator.schema.org/

## Implementation Blueprint

### Phase 1: Schema Markup Implementation

#### Task 1.1: Create Schema Utilities
```typescript
// Create: /peyton-shaw-counseling/lib/seo/schemas.ts
import { SITE_CONFIG, SERVICES } from '@/lib/constants';

// MedicalBusiness Schema Generator
export function generateMedicalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": SITE_CONFIG.name,
    "alternateName": "Peyton Shaw Therapy",
    "description": "Licensed therapist in Southlake, TX specializing in anxiety, depression & life transitions. In-person & online therapy.",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/peyton-shaw-professional.jpg`,
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[UPDATE_WITH_ACTUAL_ADDRESS]",
      "addressLocality": "Southlake",
      "addressRegion": "TX",
      "postalCode": "[UPDATE_WITH_ZIP]",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "[UPDATE_WITH_LAT]",
      "longitude": "[UPDATE_WITH_LONG]"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-14:00"
    ],
    "sameAs": [
      SITE_CONFIG.socialLinks.linkedin,
      SITE_CONFIG.socialLinks.facebook,
      SITE_CONFIG.socialLinks.instagram
    ].filter(Boolean),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Therapy Services",
      "itemListElement": SERVICES.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "MedicalTherapy",
          "name": service.title,
          "description": service.detailedDescription || service.description,
          "provider": {
            "@type": "Person",
            "name": "Peyton Shaw",
            "jobTitle": "Licensed Therapist"
          }
        },
        "price": service.price,
        "priceCurrency": "USD"
      }))
    },
    "medicalSpecialty": "Psychiatry",
    "availableService": SERVICES.map(service => ({
      "@type": "MedicalTherapy",
      "name": service.title,
      "description": service.description,
      "serviceType": "Mental Health Therapy"
    }))
  };
}

// FAQ Schema Generator
export function generateFAQSchema(faqItems: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
}

// Service Schema Generator
export function generateServiceSchema(service: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mental Health Therapy",
    "name": service.title,
    "description": service.detailedDescription || service.description,
    "provider": {
      "@type": "MedicalBusiness",
      "name": SITE_CONFIG.name,
      "telephone": SITE_CONFIG.phone
    },
    "areaServed": {
      "@type": "City",
      "name": "Southlake",
      "containedIn": {
        "@type": "State",
        "name": "Texas"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title,
      "itemListElement": [{
        "@type": "Offer",
        "price": service.price,
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }]
    }
  };
}

// Breadcrumb Schema Generator
export function generateBreadcrumbSchema(items: Array<{name: string, url: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}
```

#### Task 1.2: Create Schema Component
```typescript
// Create: /peyton-shaw-counseling/components/seo/JsonLd.tsx
'use client';

export interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}
```

#### Task 1.3: Update Root Layout with Organization Schema
```typescript
// Update: /peyton-shaw-counseling/app/layout.tsx
// Add after imports:
import JsonLd from '@/components/seo/JsonLd';
import { generateMedicalBusinessSchema } from '@/lib/seo/schemas';

// In the RootLayout component, add after <body> tag:
<JsonLd data={generateMedicalBusinessSchema()} />
```

#### Task 1.4: Add Schema to Service Pages
```typescript
// Update: /peyton-shaw-counseling/app/(marketing)/services/[service]/page.tsx
// Add schema implementation to generateMetadata and page component
```

#### Task 1.5: Add FAQ Schema
```typescript
// Update: /peyton-shaw-counseling/app/(marketing)/faq/page.tsx
// Import and add FAQ schema
```

### Phase 2: Analytics & Core Web Vitals Implementation

#### Task 2.1: Install Analytics Dependencies
```bash
npm install @next/third-parties@latest
```

#### Task 2.2: Create Analytics Components
```typescript
// Create: /peyton-shaw-counseling/components/analytics/GoogleAnalytics.tsx
'use client';

import { GoogleAnalytics as GA } from '@next/third-parties/google';

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID not found');
    return null;
  }
  
  return <GA gaId={measurementId} />;
}
```

#### Task 2.3: Create Web Vitals Reporter
```typescript
// Create: /peyton-shaw-counseling/lib/analytics/web-vitals.ts
export function sendToGoogleAnalytics(metric: any) {
  const { id, name, value, label } = metric;
  
  // Ensure gtag is available
  if (typeof window === 'undefined' || !window.gtag) return;
  
  // Send to Google Analytics
  window.gtag('event', name, {
    event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    event_label: id,
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    non_interaction: true,
  });
}
```

#### Task 2.4: Create Analytics Provider
```typescript
// Create: /peyton-shaw-counseling/components/analytics/AnalyticsProvider.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { sendToGoogleAnalytics } from '@/lib/analytics/web-vitals';
import GoogleAnalytics from './GoogleAnalytics';

export default function AnalyticsProvider() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === 'production') {
      sendToGoogleAnalytics(metric);
    } else {
      console.log('Web Vital:', metric);
    }
  });
  
  return <GoogleAnalytics />;
}
```

#### Task 2.5: Add Analytics to Root Layout
```typescript
// Update: /peyton-shaw-counseling/app/layout.tsx
// Add AnalyticsProvider before closing </body> tag
```

### Phase 3: Performance Optimizations

#### Task 3.1: Update Next.js Config for Performance
```javascript
// Update: /peyton-shaw-counseling/next.config.js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  experimental: {
    optimizeCss: true,
  },
  // Add Brotli compression
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf|css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

#### Task 3.2: Create SEO Utilities
```typescript
// Create: /peyton-shaw-counseling/lib/seo/utils.ts
export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
}: {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peytonshawcounseling.com';
  
  return {
    title,
    description,
    keywords: keywords?.join(', '),
    openGraph: {
      title,
      description,
      url: url || siteUrl,
      siteName: 'Peyton Shaw Counseling',
      images: image ? [{ url: `${siteUrl}${image}` }] : undefined,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [`${siteUrl}${image}`] : undefined,
    },
    alternates: {
      canonical: url || siteUrl,
    },
  };
}
```

#### Task 3.3: Optimize Homepage Metadata
```typescript
// Update: /peyton-shaw-counseling/app/page.tsx
// Add enhanced metadata
export const metadata = generateMetaTags({
  title: 'Therapist in Southlake TX | Peyton Shaw Counseling - Anxiety & Depression Help',
  description: 'Licensed therapist in Southlake, TX specializing in anxiety, depression & life transitions. In-person & online therapy. Accepting new patients. Book today.',
  keywords: ['therapist southlake tx', 'counseling services southlake', 'anxiety therapist near me', 'depression treatment southlake texas'],
  image: '/images/peyton-shaw-professional.jpg',
});
```

### Phase 4: Blog Implementation

#### Task 4.1: Create Blog Structure
```bash
# Create blog directories
mkdir -p /peyton-shaw-counseling/app/(marketing)/blog/[slug]
mkdir -p /peyton-shaw-counseling/content/blog
```

#### Task 4.2: Create Blog Post Type
```typescript
// Create: /peyton-shaw-counseling/lib/types/blog.ts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  keywords: string[];
  category: string;
  readingTime: number;
  image?: string;
}
```

#### Task 4.3: Create Blog Utilities
```typescript
// Create: /peyton-shaw-counseling/lib/blog/utils.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/lib/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  // Implementation for reading markdown files
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Implementation for getting single post
}
```

### Phase 5: Environment Configuration

#### Task 5.1: Update Environment Variables
```bash
# Add to .env.local:
NEXT_PUBLIC_SITE_URL=https://peytonshawcounseling.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## Validation Gates

### 1. Schema Validation
```bash
# Test schema implementation
npm run build && npm run start

# Visit https://validator.schema.org/ and test:
# - Homepage schema
# - Service page schemas
# - FAQ page schema
```

### 2. Performance Testing
```bash
# Run Lighthouse CI
npx lighthouse https://localhost:3000 --view

# Check Core Web Vitals scores:
# - LCP < 2.5s
# - FID < 100ms
# - CLS < 0.1
```

### 3. SEO Validation
```bash
# Build and analyze
npm run build

# Check build output for:
# - Static HTML generation
# - Proper meta tags
# - Sitemap generation
```

### 4. TypeScript Validation
```bash
# Type checking
npm run typecheck

# Linting
npm run lint
```

### 5. Analytics Validation
```javascript
// Test in browser console:
// 1. Check if gtag is loaded
window.gtag

// 2. Check GA Debug View
// Navigate to GA4 > Configure > DebugView
```

## Error Handling Strategy

### Schema Errors
- Wrap schema generation in try-catch blocks
- Provide fallback schemas for critical pages
- Log errors to monitoring service

### Analytics Errors
- Check for gtag availability before sending events
- Implement retry logic for failed analytics calls
- Graceful degradation if GA fails to load

### Performance Issues
- Monitor build times and optimize as needed
- Use dynamic imports for heavy components
- Implement progressive enhancement

## Implementation Order

1. **Week 1 - Foundation**
   - [ ] Schema markup implementation (Tasks 1.1-1.5)
   - [ ] Environment configuration (Task 5.1)
   - [ ] Basic performance optimizations (Tasks 3.1-3.3)

2. **Week 2 - Analytics & Monitoring**
   - [ ] Google Analytics setup (Tasks 2.1-2.5)
   - [ ] Core Web Vitals monitoring
   - [ ] Testing and validation

3. **Week 3 - Content & Enhancement**
   - [ ] Blog implementation (Tasks 4.1-4.3)
   - [ ] Advanced schema markup
   - [ ] Performance fine-tuning

## Success Metrics

1. **Technical SEO Score**: 95+ on SEO analysis tools
2. **Core Web Vitals**: All metrics in "Good" range
3. **Schema Validation**: 100% pass rate
4. **Analytics Implementation**: Events firing correctly
5. **TypeScript**: No type errors
6. **Build Performance**: < 30s build time

## Additional Resources

- **Next.js SEO Checklist**: https://nextjs.org/learn/seo/introduction-to-seo
- **GA4 Event Reference**: https://support.google.com/analytics/answer/9267735
- **Schema Testing Tool**: https://search.google.com/test/rich-results
- **Web Vitals Chrome Extension**: https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma

## Notes for Implementation

1. Always test schema markup with Google's Rich Results Test
2. Monitor Core Web Vitals in GA4 custom reports
3. Use Next.js built-in Image component for all images
4. Implement incremental static regeneration for blog posts
5. Consider edge runtime for better performance

## Confidence Score: 9/10

This PRP provides comprehensive context and clear implementation steps. The only variable is the actual content creation for blog posts, which requires domain expertise. All technical implementations are well-documented with fallback strategies.