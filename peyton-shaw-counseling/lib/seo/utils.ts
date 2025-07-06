import { Metadata } from 'next';

interface GenerateMetaTagsProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function generateMetaTags({
  title,
  description,
  keywords,
  image,
  url,
}: GenerateMetaTagsProps): Metadata {
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
export function generatePageTitle(pageTitle: string): string {
  return `${pageTitle} | Peyton Shaw Counseling`;
}