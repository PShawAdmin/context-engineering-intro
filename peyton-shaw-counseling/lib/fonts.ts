import { Inter, Playfair_Display, Vujahday_Script } from 'next/font/google'

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

export const vujahday = Vujahday_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vujahday',
  display: 'swap',
  preload: true,
  fallback: ['cursive']
})

// Export font class names for Tailwind
export const fontVariables = `${inter.variable} ${playfair.variable} ${vujahday.variable}`