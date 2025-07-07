import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers)
  
  // Add custom headers to help debug
  requestHeaders.set('x-pathname', request.nextUrl.pathname)
  requestHeaders.set('x-origin', request.nextUrl.origin)
  
  // Create response with modified headers
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin')
  
  // Cloudflare-friendly cache headers
  if (request.nextUrl.pathname === '/' || 
      request.nextUrl.pathname.endsWith('.html') ||
      (!request.nextUrl.pathname.includes('.') && !request.nextUrl.pathname.startsWith('/_next'))) {
    // Use s-maxage for Cloudflare edge caching
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=86400')
    response.headers.set('CDN-Cache-Control', 'max-age=60')
    response.headers.set('Vercel-CDN-Cache-Control', 'max-age=60')
  }
  
  // Add Cloudflare cache tag for easier purging
  response.headers.set('Cache-Tag', 'psc-website')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}