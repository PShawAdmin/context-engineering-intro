import { Metadata } from 'next';
import { businessInfo } from '../constants';

interface GenerateMetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  path?: string;
  includeLocation?: boolean;
  ogType?: 'website' | 'article' | 'profile';
}

/**
 * Enforce character limits for SEO optimization
 * Google typically displays 50-60 chars for title, 150-160 for description
 */
function enforceCharLimit(text: string, limit: number): string {
  if (text.length <= limit) return text;
  
  // Try to cut at last complete word before limit
  const truncated = text.substring(0, limit);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace > limit - 10) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  path = '',
  includeLocation = true,
  ogType = 'website'
}: GenerateMetaTagsProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peytonshawcounseling.com';
  
  // Add location suffix for local SEO
  const locationSuffix = includeLocation 
    ? ` | ${businessInfo.address.addressLocality}, TX`
    : '';
  
  // Apply character limits
  const finalTitle = enforceCharLimit(
    `${title}${locationSuffix} | ${businessInfo.name}`,
    60
  );
  
  const finalDescription = enforceCharLimit(description, 160);
  
  // Generate canonical URL
  const canonical = `${siteUrl}${path}`;
  
  // Default images if not provided
  const defaultOgImage = '/opengraph-image.png';
  const defaultTwitterImage = '/twitter-image.png';
  const ogImage = image || defaultOgImage;
  const twitterImage = image || defaultTwitterImage;
  
  return {
    title: finalTitle,
    description: finalDescription,
    keywords: keywords?.join(', '),
    authors: [{ name: 'Peyton Shaw' }],
    creator: 'Peyton Shaw',
    publisher: businessInfo.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      siteName: businessInfo.name,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: `${businessInfo.name} - Professional Therapy Services`
        }
      ],
      locale: 'en_US',
      type: ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage}`],
      creator: '@peytonshaw', // TODO: Update with actual Twitter handle if available
    },
    alternates: {
      canonical,
    },
    other: {
      'geo.region': 'US-TX',
      'geo.placename': businessInfo.address.addressLocality,
      'geo.position': `${businessInfo.geo.latitude};${businessInfo.geo.longitude}`,
      'ICBM': `${businessInfo.geo.latitude}, ${businessInfo.geo.longitude}`,
    },
  };
}

// Generate structured data for search results
export function generateSearchAction() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Helper to generate canonical URL
export function getCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peytonshawcounseling.com';
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${normalizedPath}`;
}

// Helper to generate page title with template
export function generatePageTitle(pageTitle: string, includeLocation = false): string {
  const location = includeLocation ? ` ${businessInfo.address.addressLocality}, TX |` : '';
  return `${pageTitle} |${location} ${businessInfo.name}`;
}

// Generate JSON-LD structured data wrapper
export function generateJsonLd(data: any): string {
  return JSON.stringify(data);
}

// Helper to create location-aware page descriptions
export function createLocationDescription(
  baseDescription: string,
  includeAreaServed = false
): string {
  const location = `${businessInfo.address.addressLocality} and ${businessInfo.areaServed[1]}`;
  const areaServed = includeAreaServed 
    ? ` Serving ${businessInfo.areaServed.slice(0, 4).join(', ')}.`
    : '';
    
  return `${baseDescription} Located in ${location}, TX.${areaServed}`;
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): any {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peytonshawcounseling.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }))
  };
}