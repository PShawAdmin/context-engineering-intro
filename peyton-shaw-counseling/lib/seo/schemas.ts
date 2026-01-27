import { SITE_CONFIG, SERVICES, FAQ_ITEMS, businessInfo, TESTIMONIALS } from '@/lib/constants';
import { Service, FAQItem } from '@/lib/types';

// MedicalBusiness Schema Generator
export function generateMedicalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peytonshawcounseling.com';
  const telehealthOnly = businessInfo.isTelehealthOnly;
  const hasTestimonials = TESTIMONIALS.length > 0;
  const averageRating = hasTestimonials
    ? TESTIMONIALS.reduce((sum, review) => sum + review.rating, 0) / TESTIMONIALS.length
    : null;
  
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    "name": businessInfo.name,
    "legalName": businessInfo.name,
    "alternateName": "Peyton Shaw Therapy",
    "description": "Telehealth-focused therapy for teens and adults across Texas. Evidence-based care for anxiety, depression, life transitions, and relationship stress.",
    "logo": `${siteUrl}${businessInfo.logo}`,
    "image": `${siteUrl}${businessInfo.logo}`,
    "url": businessInfo.url,
    "telephone": businessInfo.phone,
    "email": businessInfo.email,
    "priceRange": businessInfo.priceRange,
    ...(telehealthOnly
      ? {}
      : {
          "address": {
            "@type": "PostalAddress",
            ...businessInfo.address
          },
          "geo": {
            "@type": "GeoCoordinates",
            ...businessInfo.geo
          }
        }),
    "openingHours": businessInfo.openingHours,
    "openingHoursSpecification": businessInfo.openingHoursSpecification,
    "areaServed": telehealthOnly
      ? [
          {
            "@type": "State",
            "name": businessInfo.primaryServiceArea
          },
          ...businessInfo.areaServed.map(area => ({
            "@type": "City",
            "name": area,
            "containedInPlace": {
              "@type": "State",
              "name": "Texas"
            }
          }))
        ]
      : businessInfo.areaServed.map(area => ({
          "@type": "City",
          "name": area,
          "containedInPlace": {
            "@type": "State",
            "name": "Texas"
          }
        })),
    "sameAs": businessInfo.sameAs.filter(url => url && url !== ''),
    "founder": {
      "@id": `${siteUrl}/#therapist`
    },
    "employee": {
      "@id": `${siteUrl}/#therapist`
    },
    ...(hasTestimonials
      ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating ? averageRating.toFixed(1) : "5.0",
            "reviewCount": TESTIMONIALS.length.toString(),
            "bestRating": "5",
            "worstRating": "1"
          },
          "review": TESTIMONIALS.map(testimonial => ({
            "@type": "Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": testimonial.rating.toString(),
              "bestRating": "5",
              "worstRating": "1"
            },
            "author": {
              "@type": "Person",
              "name": testimonial.name
            },
            "reviewBody": testimonial.content,
            "datePublished": testimonial.date
          }))
        }
      : {}),
    "paymentAccepted": businessInfo.paymentAccepted,
    "currenciesAccepted": businessInfo.currenciesAccepted,
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
export function generateFAQSchema(faqItems: FAQItem[]) {
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

// Person Schema Generator for Therapist
export function generatePersonSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peytonshawcounseling.com';
  const telehealthOnly = businessInfo.isTelehealthOnly;
  
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#therapist`,
    "name": "Peyton Shaw",
    "givenName": "Peyton",
    "familyName": "Shaw",
    "jobTitle": "Licensed Professional Counselor",
    "worksFor": {
      "@type": "MedicalBusiness",
      "@id": `${siteUrl}/#organization`,
      "name": businessInfo.name
    },
    "hasCredential": businessInfo.licenseNumber
      ? {
          "@type": "EducationalOccupationalCredential",
          "name": "Licensed Professional Counselor",
          "credentialCategory": "Professional License",
          "identifier": businessInfo.licenseNumber,
          "issuedBy": {
            "@type": "Organization",
            "name": businessInfo.licenseIssuer
          }
        }
      : undefined,
    "description": "Licensed professional counselor providing telehealth-only care for teens and adults across Texas, with evidence-based support for anxiety, depression, life transitions, and relationship stress.",
    "image": `${siteUrl}${businessInfo.logo}`,
    "telephone": businessInfo.phone,
    "email": businessInfo.email,
    ...(telehealthOnly
      ? {}
      : {
          "address": {
            "@type": "PostalAddress",
            ...businessInfo.address
          }
        }),
    "sameAs": businessInfo.sameAs.filter(url => url && url !== ''),
    "knowsAbout": [
      "Cognitive Behavioral Therapy (CBT)",
      "Mindfulness-Based Therapy",
      "Person-Centered Therapy",
      "Anxiety Disorders",
      "Depression Treatment",
      "Life Transitions Counseling",
      "Teen Therapy",
      "Adult Therapy"
    ],
    "areaServed": telehealthOnly
      ? [
          {
            "@type": "State",
            "name": businessInfo.primaryServiceArea
          },
          ...businessInfo.areaServed.map(area => ({
            "@type": "City",
            "name": area
          }))
        ]
      : businessInfo.areaServed.map(area => ({
          "@type": "City",
          "name": area
        }))
  };
}

// Article Schema Generator for Blog Posts
export function generateArticleSchema({
  title,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url
}: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}${businessInfo.logo}`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "image": image ? `${process.env.NEXT_PUBLIC_SITE_URL}${image}` : undefined
  };
}

// WebPage Schema Generator
export function generateWebPageSchema({
  name,
  description,
  breadcrumb,
  url
}: {
  name: string;
  description: string;
  breadcrumb?: Array<{name: string, url: string}>;
  url?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peytonshawcounseling.com';
  const pageUrl = url ? `${siteUrl}${url}` : siteUrl;
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    "url": pageUrl,
    "name": name,
    "description": description,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": SITE_CONFIG.name,
      "description": "Telehealth-only therapy for teens and adults across Texas",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    "breadcrumb": breadcrumb ? generateBreadcrumbSchema(breadcrumb) : undefined,
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${siteUrl}/images/peyton-shaw-professional.jpg`
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };
}

// Service Schema Generator for individual therapy services
export function generateServiceSchema(service: Service) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peytonshawcounseling.com';
  const hasTestimonials = TESTIMONIALS.length > 0;
  const averageRating = hasTestimonials
    ? TESTIMONIALS.reduce((sum, review) => sum + review.rating, 0) / TESTIMONIALS.length
    : null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/services/${service.slug}#service`,
    "serviceType": service.title,
    "name": `${service.title} (Telehealth in ${businessInfo.primaryServiceArea})`,
    "description": service.detailedDescription || service.description,
    "provider": {
      "@type": "Person",
      "@id": `${siteUrl}/#therapist`,
      "name": "Peyton Shaw"
    },
    "areaServed": businessInfo.isTelehealthOnly
      ? [
          {
            "@type": "State",
            "name": businessInfo.primaryServiceArea
          },
          ...businessInfo.areaServed.map(area => ({
            "@type": "City",
            "name": area
          }))
        ]
      : businessInfo.areaServed.map(area => ({
          "@type": "City",
          "name": area
        })),
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${siteUrl}/services/${service.slug}`,
      "servicePhone": businessInfo.phone,
      "serviceSmsNumber": businessInfo.phone
    },
    "offers": {
      "@type": "Offer",
      "price": service.price?.replace('$', '') || '150',
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": service.price?.replace('$', '') || '150',
        "priceCurrency": "USD",
        "unitText": "per session",
        "billingDuration": service.duration || '50 minutes'
      }
    },
    ...(hasTestimonials && averageRating
      ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating.toFixed(1),
            "reviewCount": TESTIMONIALS.length.toString(),
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      : {}),
    "potentialAction": {
      "@type": "BookAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/contact`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "result": {
        "@type": "Reservation",
        "name": `${service.title} Session`
      }
    }
  };
}
