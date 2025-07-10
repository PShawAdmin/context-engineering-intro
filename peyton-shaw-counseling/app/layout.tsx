import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import AnnouncementBanner from '@/components/layout/AnnouncementBanner'
import { inter, fontVariables } from '@/lib/fonts'
import JsonLd from '@/components/seo/JsonLd'
import { generateMedicalBusinessSchema } from '@/lib/seo/schemas'
import AnalyticsProvider from '@/components/analytics/AnalyticsProvider'

export const metadata: Metadata = {
  title: {
    default: 'Peyton Shaw Counseling - Professional Therapy Services in Southlake',
    template: '%s | Peyton Shaw Counseling'
  },
  description: 'Professional therapy services in Southlake, TX. Specializing in individual therapy, anxiety, depression, and life transitions. Book your appointment online.',
  keywords: ['therapy', 'counseling', 'Southlake', 'Texas', 'mental health', 'psychotherapy', 'anxiety', 'depression'],
  authors: [{ name: 'Peyton Shaw' }],
  creator: 'Peyton Shaw Counseling',
  publisher: 'Peyton Shaw Counseling',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Peyton Shaw Counseling - Professional Therapy Services',
    description: 'Professional therapy services in Southlake, TX. Book your appointment online.',
    url: '/',
    siteName: 'Peyton Shaw Counseling',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peyton Shaw Counseling',
    description: 'Professional therapy services in Southlake, TX.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
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
      </body>
    </html>
  )
}