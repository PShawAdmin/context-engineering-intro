import { SITE_CONFIG, SERVICES, FAQ_ITEMS } from '@/lib/constants';
import { Service, FAQItem } from '@/lib/types';

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

// Service Schema Generator
export function generateServiceSchema(service: Service) {
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

// Person Schema Generator for Therapist
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Peyton Shaw",
    "jobTitle": "Licensed Professional Counselor",
    "worksFor": {
      "@type": "MedicalBusiness",
      "name": SITE_CONFIG.name
    },
    "description": "Licensed therapist specializing in anxiety, depression, and life transitions",
    "image": `${process.env.NEXT_PUBLIC_SITE_URL}/images/peyton-shaw-professional.jpg`,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Southlake",
      "addressRegion": "TX",
      "addressCountry": "US"
    }
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
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/images/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "image": image ? `${process.env.NEXT_PUBLIC_SITE_URL}${image}` : undefined
  };
}