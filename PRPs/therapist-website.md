name: "Therapist Website with Calendly Integration - Complete Implementation PRP"
description: |

## Purpose
Build a fully functional, responsive therapist website for Peyton Shaw Counseling with HeroUI components, Next.js 14 framework, and secure Calendly integration to maximize client conversions through easy appointment booking.

## Core Principles
1. **Context is King**: Include ALL necessary documentation, examples, and caveats
2. **Validation Loops**: Provide executable tests/lints the AI can run and fix
3. **Information Dense**: Use keywords and patterns from the codebase
4. **Progressive Success**: Start simple, validate, then enhance
5. **Global rules**: Be sure to follow all rules in CLAUDE.md

---

## Goal
Build a modern, SEO-optimized therapy website that converts visitors into clients through:
- Professional, trustworthy design using HeroUI components
- Seamless Calendly appointment booking integration
- Mobile-first responsive design
- Fast performance and excellent SEO
- Secure implementation following 2025 best practices

## Why
- **Business value**: Convert more website visitors into therapy clients by reducing friction in appointment booking
- **User impact**: Help people in distress quickly find and book therapy services
- **Integration**: Syncs with therapist's existing Outlook calendar through Calendly
- **Problems solved**: 
  - Manual appointment scheduling inefficiency
  - Poor online visibility for local therapy services
  - Lack of professional web presence

## What
**User-visible behavior**:
- Clean, calming website with nature-inspired colors
- Easy navigation with clear CTAs for booking
- Embedded Calendly scheduler showing available times
- Contact form for inquiries
- Service pages explaining therapy offerings
- Mobile-responsive design

**Technical requirements**:
- Next.js 14 with App Router
- TypeScript for type safety
- HeroUI component library
- Tailwind CSS styling
- Secure Calendly API integration
- SEO optimization with meta tags
- Environment variable security

### Success Criteria
- [ ] Website loads in under 3 seconds
- [ ] Calendly booking widget functions correctly
- [ ] All pages are mobile-responsive
- [ ] Contact form sends emails successfully
- [ ] Lighthouse scores: Performance >90, SEO >95
- [ ] No exposed API tokens or security vulnerabilities

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://nextjs.org/docs/app
  why: Next.js 14 App Router documentation for project structure
  
- url: https://www.heroui.com/docs/guide/installation
  why: HeroUI setup and component documentation
  
- url: https://developer.calendly.com/
  why: Calendly API v2 documentation (v1 deprecating Aug 2025)
  section: How to display the scheduling page
  critical: Use OAuth or personal access tokens securely
  
- url: https://nextjs.org/blog/security-nextjs-server-components-actions
  why: 2025 security best practices for Next.js
  critical: Middleware no longer safe for auth, use Data Access Layer

- url: https://www.heroui.com/docs/components/navbar
  why: Navbar component implementation examples
  
- url: https://tailwindcss.com/docs/guides/nextjs
  why: Tailwind CSS setup with Next.js

- docfile: examples/Calendy Info/CalendyInformation.md
  why: Specific Calendly embed instructions

- docfile: examples/ContactForm/ContactFormExample.md
  why: HeroUI form component patterns

- docfile: examples/Navbar/NavExample.md
  why: HeroUI navbar implementation

- docfile: CLAUDE.md
  why: Project-specific requirements and constraints
```

### Current Codebase tree
```bash
/mnt/c/Users/james/PSC/context-engineering-intro/
├── CLAUDE.md                 # Project requirements
├── INITIAL.md               # Feature specification
├── examples/
│   ├── Calendy Info/
│   │   ├── CalendyInformation.md
│   │   └── Token            # Personal access token
│   ├── ContactForm/
│   │   └── ContactFormExample.md
│   └── Navbar/
│       └── NavExample.md
└── PRPs/
    └── therapist-website.md  # This file
```

### Desired Codebase tree with files to be added
```bash
peyton-shaw-counseling/
├── .env.local               # Environment variables (never commit)
├── .env.example             # Example environment template
├── .gitignore              # Include .env files
├── README.md               # Setup instructions
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.js      # Tailwind + HeroUI config
├── next.config.js          # Next.js configuration
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── providers.tsx       # HeroUI provider wrapper
│   ├── globals.css         # Global styles
│   ├── (marketing)/        # Public routes group
│   │   ├── about/
│   │   │   └── page.tsx    # About page
│   │   ├── services/
│   │   │   ├── page.tsx    # Services overview
│   │   │   └── [service]/
│   │   │       └── page.tsx # Individual service pages
│   │   ├── faq/
│   │   │   └── page.tsx    # FAQ page
│   │   ├── contact/
│   │   │   └── page.tsx    # Contact with Calendly
│   │   └── blog/
│   │       ├── page.tsx    # Blog listing
│   │       └── [slug]/
│   │           └── page.tsx # Blog posts
│   └── api/
│       └── contact/
│           └── route.ts     # Contact form handler
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Form.tsx
│   ├── layout/             # Layout components
│   │   ├── Header.tsx      # Navigation
│   │   ├── Footer.tsx      # Footer
│   │   └── Hero.tsx        # Hero sections
│   └── features/           # Feature components
│       ├── CalendlyWidget.tsx
│       ├── ContactForm.tsx
│       ├── ServiceCard.tsx
│       └── Testimonials.tsx
├── lib/
│   ├── calendly-dal.ts     # Calendly Data Access Layer
│   ├── email.ts            # Email sending utilities
│   └── constants.ts        # Site constants
└── public/
    ├── images/             # Optimized images
    └── favicon.ico         # Site favicon
```

### Known Gotchas & Library Quirks
```typescript
// CRITICAL: Calendly V1 API deprecating August 27, 2025 - use V2
// CRITICAL: Never expose CALENDLY_ACCESS_TOKEN to client
// CRITICAL: Middleware no longer safe for auth in Next.js 2025
// CRITICAL: HeroUI requires 'use client' for interactive components
// CRITICAL: Use server-only package for secure modules
// CRITICAL: react-calendly requires client component wrapper

// HeroUI setup requires wrapping app with provider
// Tailwind v4 compatibility - use latest HeroUI docs
// Next.js Image component required for optimization
// Environment variables without NEXT_PUBLIC_ stay server-side
```

## Implementation Blueprint

### Data models and structure

```typescript
// lib/types.ts - Core type definitions
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  price?: string;
}

export interface Testimonial {
  id: string;
  name: string; // First name only for privacy
  content: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// lib/constants.ts - Site configuration
export const SITE_CONFIG = {
  name: 'Peyton Shaw Counseling',
  tagline: 'Professional Therapy Services in Southlake',
  phone: '(XXX) XXX-XXXX',
  email: 'peyton@peytonshawcounseling.com',
  address: 'Southlake, TX',
  calendlyUrl: process.env.CALENDLY_SCHEDULING_URL || '',
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Individual Therapy',
    slug: 'individual-therapy',
    description: 'One-on-one sessions tailored to your needs',
    duration: '50 minutes',
  },
  // Add more services
];
```

### List of tasks to be completed in order

```yaml
Task 1: Project Setup and Configuration
CREATE package.json:
  - Dependencies: next@latest, react, react-dom, typescript, @heroui/react, framer-motion
  - Dev dependencies: @types/react, @types/node, tailwindcss, autoprefixer, postcss, eslint, eslint-config-next
  - Scripts: dev, build, start, lint, typecheck

CREATE tsconfig.json:
  - MIRROR pattern from: Next.js TypeScript starter
  - MODIFY compilerOptions for strict mode
  - INCLUDE app directory paths

CREATE tailwind.config.js:
  - INJECT HeroUI plugin configuration
  - ADD content paths including HeroUI node_modules
  - CONFIGURE nature-inspired color palette

CREATE .env.example:
  - DOCUMENT all required environment variables
  - INCLUDE setup instructions

Task 2: Core Layout and Providers
CREATE app/providers.tsx:
  - IMPLEMENT HeroUIProvider wrapper
  - MARK as 'use client'
  - FOLLOW pattern from HeroUI docs

CREATE app/layout.tsx:
  - IMPLEMENT root layout with providers
  - ADD metadata for SEO
  - INCLUDE font optimization

CREATE app/globals.css:
  - IMPORT Tailwind directives
  - ADD custom CSS variables for theming

Task 3: Navigation and Layout Components
CREATE components/layout/Header.tsx:
  - IMPLEMENT responsive navbar using HeroUI
  - MIRROR pattern from: examples/Navbar/NavExample.md
  - ADD mobile menu toggle
  - INCLUDE "Book Appointment" CTA

CREATE components/layout/Footer.tsx:
  - ADD contact information
  - INCLUDE quick links
  - ADD privacy policy link

Task 4: Home Page Implementation
CREATE app/page.tsx:
  - IMPLEMENT hero section with tagline
  - ADD services overview cards
  - INCLUDE testimonials section
  - ADD prominent booking CTA

CREATE components/layout/Hero.tsx:
  - DESIGN calming hero with nature imagery
  - ADD clear value proposition
  - INCLUDE booking button

Task 5: Service Pages
CREATE app/(marketing)/services/page.tsx:
  - LIST all therapy services
  - USE ServiceCard components
  - ADD CTAs for booking

CREATE components/features/ServiceCard.tsx:
  - DESIGN service display cards
  - INCLUDE duration and description
  - ADD "Learn More" links

CREATE app/(marketing)/services/[service]/page.tsx:
  - IMPLEMENT dynamic service pages
  - ADD detailed descriptions
  - INCLUDE booking widget

Task 6: Secure Calendly Integration
CREATE lib/calendly-dal.ts:
  - IMPLEMENT Data Access Layer
  - USE server-only module
  - SECURE token handling
  - FETCH user scheduling URL

CREATE components/features/CalendlyWidget.tsx:
  - MARK as 'use client'
  - IMPLEMENT InlineWidget from react-calendly
  - ACCEPT only public URL prop
  - NO access to tokens

CREATE app/(marketing)/contact/page.tsx:
  - FETCH scheduling URL server-side
  - PASS to CalendlyWidget
  - ADD fallback contact info

Task 7: Contact Form Implementation
CREATE components/features/ContactForm.tsx:
  - USE HeroUI Form components
  - MIRROR pattern from: examples/ContactForm/ContactFormExample.md
  - ADD client-side validation
  - IMPLEMENT loading states

CREATE app/api/contact/route.ts:
  - IMPLEMENT POST handler
  - VALIDATE input data
  - SEND email via service
  - RETURN success/error response

CREATE lib/email.ts:
  - SETUP email service (SendGrid/Resend)
  - IMPLEMENT send function
  - ADD error handling

Task 8: Additional Pages
CREATE app/(marketing)/about/page.tsx:
  - ADD therapist bio and photo
  - INCLUDE credentials
  - ADD personal approach section

CREATE app/(marketing)/faq/page.tsx:
  - IMPLEMENT accordion component
  - ADD common questions
  - INCLUDE insurance/payment info

Task 9: SEO and Performance
MODIFY all pages:
  - ADD metadata exports
  - INCLUDE Open Graph tags
  - ADD structured data

CREATE public/robots.txt:
  - ALLOW all crawlers
  - REFERENCE sitemap

CREATE app/sitemap.ts:
  - GENERATE dynamic sitemap
  - INCLUDE all pages

Task 10: Testing and Validation
CREATE .env.local:
  - ADD all required tokens
  - TEST configuration

RUN validation commands:
  - npm run typecheck
  - npm run lint
  - npm run build
  - Lighthouse audit
```

### Per task pseudocode

```typescript
// Task 1: Project Setup
// package.json critical setup
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "typecheck": "tsc --noEmit",
    "lint": "next lint"
  }
}

// Task 2: Providers Implementation
// app/providers.tsx
'use client'
import {HeroUIProvider} from '@heroui/react'

export function Providers({children}: {children: React.ReactNode}) {
  // PATTERN: Wrap entire app with HeroUI
  // GOTCHA: Must be client component
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  )
}

// Task 6: Secure Calendly DAL
// lib/calendly-dal.ts
import 'server-only' // CRITICAL: Prevent client import

export async function getSchedulingUrl() {
  // PATTERN: Server-only token access
  const token = process.env.CALENDLY_ACCESS_TOKEN
  if (!token) throw new Error('Calendly token not configured')
  
  // GOTCHA: Use v2 API endpoints
  const response = await fetch('https://api.calendly.com/users/me', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  
  // PATTERN: Return minimal DTO
  const data = await response.json()
  return data.resource.scheduling_url
}

// Task 7: Contact Form API
// app/api/contact/route.ts
export async function POST(request: Request) {
  // PATTERN: Validate all inputs
  const body = await request.json()
  const { name, email, message } = body
  
  // VALIDATION: Check required fields
  if (!name || !email || !message) {
    return Response.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }
  
  // PATTERN: Use email service
  try {
    await sendEmail({
      to: process.env.CONTACT_EMAIL!,
      subject: `New inquiry from ${name}`,
      text: message,
      replyTo: email
    })
    
    return Response.json({ success: true })
  } catch (error) {
    // ERROR: Log but don't expose details
    console.error('Email send failed:', error)
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
```

### Integration Points
```yaml
DATABASE:
  - None required for MVP (static content)
  - Future: Add CMS for dynamic content
  
CONFIG:
  - add to: .env.local
  - CALENDLY_ACCESS_TOKEN="[token from examples/Calendy Info/Token]"
  - CALENDLY_SCHEDULING_URL="[from API response]"
  - CONTACT_EMAIL="peyton@peytonshawcounseling.com"
  - SENDGRID_API_KEY="[email service key]"
  
ROUTES:
  - All routes in app directory
  - Use route groups for organization
  - API routes in app/api
  
SECURITY:
  - Never expose tokens to client
  - Use server components for API calls
  - Validate all user inputs
  - Sanitize contact form data
```

## Validation Loop

### Level 1: Syntax & Style
```bash
# Run these FIRST - fix any errors before proceeding
npm run typecheck              # TypeScript validation
npm run lint                   # ESLint checks

# Expected: No errors. If errors, READ the error and fix.
```

### Level 2: Build Validation
```bash
# Ensure project builds successfully
npm run build

# Expected: Successful build with no errors
# Common issues: 
# - Missing 'use client' directives
# - Server/client component mismatches
# - Missing environment variables
```

### Level 3: Component Testing
```bash
# Start development server
npm run dev

# Test each component:
# 1. Navigate to each page
# 2. Check responsive design (mobile/tablet/desktop)
# 3. Test interactive elements:
#    - Navigation menu toggle
#    - Contact form submission
#    - Calendly widget loading

# Expected behaviors:
# - All pages load without errors
# - Navigation works on all devices
# - Forms show validation messages
# - Calendly widget displays available times
```

### Level 4: Integration Testing
```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'

# Expected: {"success": true}
# If error: Check email service configuration

# Test Calendly integration
# 1. Navigate to /contact
# 2. Calendly widget should load
# 3. Should show available appointment slots
# 4. Clicking slot should open booking modal
```

### Level 5: Performance & SEO
```bash
# Run Lighthouse audit
# 1. Open Chrome DevTools
# 2. Go to Lighthouse tab
# 3. Run audit for:
#    - Performance
#    - Accessibility  
#    - Best Practices
#    - SEO

# Expected scores:
# - Performance: >90
# - Accessibility: >95
# - Best Practices: >95
# - SEO: >95

# Common issues to fix:
# - Image optimization (use next/image)
# - Missing meta descriptions
# - Low contrast ratios
# - Missing alt text
```

## Final Validation Checklist
- [ ] All TypeScript checks pass: `npm run typecheck`
- [ ] No linting errors: `npm run lint`
- [ ] Production build succeeds: `npm run build`
- [ ] All pages load correctly in dev
- [ ] Mobile responsive design works
- [ ] Calendly widget loads and functions
- [ ] Contact form sends emails
- [ ] No API tokens exposed in client code
- [ ] Environment variables documented
- [ ] README includes setup instructions
- [ ] Lighthouse scores meet targets
- [ ] Site deployed successfully

---

## Anti-Patterns to Avoid
- ❌ Don't expose CALENDLY_ACCESS_TOKEN in client components
- ❌ Don't use NEXT_PUBLIC_ prefix for sensitive tokens
- ❌ Don't skip 'use client' for interactive HeroUI components
- ❌ Don't hardcode sensitive information
- ❌ Don't use Calendly v1 API (deprecating 2025)
- ❌ Don't forget mobile-first design
- ❌ Don't skip SEO meta tags
- ❌ Don't use unoptimized images
- ❌ Don't collect health information in forms (HIPAA)
- ❌ Don't skip input validation

## Additional Resources
- HeroUI Components: https://www.heroui.com/docs/components/overview
- Next.js App Router: https://nextjs.org/docs/app
- Calendly API: https://developer.calendly.com/api-docs/
- React Calendly: https://www.npmjs.com/package/react-calendly

## Quality Score
**Confidence Level: 9/10**

This PRP provides comprehensive context for implementing a therapist website with:
- Complete technical specifications
- Security best practices for 2025
- Clear implementation steps
- Validation procedures
- All necessary documentation links

The score is 9/10 (not 10) because:
- Email service choice (SendGrid vs others) may need adjustment
- Specific therapy services content needs client input
- Color palette specifics need design refinement

With this PRP, an AI agent should successfully implement the website in one pass.