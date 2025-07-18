import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'
import { inter, fontVariables } from '@/lib/fonts'
import JsonLd from '@/components/seo/JsonLd'
import { generateMedicalBusinessSchema } from '@/lib/seo/schemas'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'
import { businessInfo } from '@/lib/constants'
import { targetKeywords } from '@/lib/seo/keywords'
import { SpeedInsights } from '@vercel/speed-insights/next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.peytonshawcounseling.com'

export const metadata: Metadata = {
  title: {
    default: `${businessInfo.name} - Licensed Therapist in ${businessInfo.address.addressLocality}, TX`,
    template: `%s | ${businessInfo.name} - ${businessInfo.address.addressLocality}, TX`
  },
  description: `Professional therapy services for anxiety, depression, and life transitions. Serving teens and adults in ${businessInfo.areaServed.slice(0, 3).join(', ')}, TX. In-person and online sessions available. Book today.`,
  keywords: [
    ...targetKeywords.primary.combined,
    ...targetKeywords.secondary.specialties.slice(0, 5),
    'mental health counseling',
    'licensed therapist Texas'
  ].join(', '),
  authors: [{ name: 'Peyton Shaw' }],
  creator: businessInfo.name,
  publisher: businessInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${businessInfo.name} - Licensed Therapist in ${businessInfo.address.addressLocality}, TX`,
    description: `Professional therapy for anxiety, depression & life transitions. Serving ${businessInfo.areaServed[0]} & ${businessInfo.areaServed[1]}, TX. Book your session today.`,
    url: siteUrl,
    siteName: businessInfo.name,
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: `${businessInfo.name} - Professional Therapy Services`
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${businessInfo.name} - Therapy in ${businessInfo.address.addressLocality}, TX`,
    description: `Licensed therapist serving ${businessInfo.areaServed[0]} & ${businessInfo.areaServed[1]}. Specializing in anxiety, depression & life transitions.`,
    images: ['/twitter-image.png'],
    creator: '@peytonshaw', // TODO: Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '', // TODO: Add to env vars
    // Note: Bing verification should be added as meta tag in head if needed
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
      }
    ],
  },
  other: {
    'geo.region': 'US-TX',
    'geo.placename': businessInfo.address.addressLocality,
    'geo.position': `${businessInfo.geo.latitude};${businessInfo.geo.longitude}`,
    'ICBM': `${businessInfo.geo.latitude}, ${businessInfo.geo.longitude}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${fontVariables} overflow-x-hidden`}>
        <JsonLd data={generateMedicalBusinessSchema()} />
        <Providers>
          <AnnouncementBanner />
          {children}
        </Providers>
        <AnalyticsProvider />
        <SpeedInsights />
      </body>
    </html>
  )
}