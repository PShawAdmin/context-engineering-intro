/** @type {import('next').NextConfig} */
const path = require('path');

const tracingRoot = process.env.NEXT_PRIVATE_OUTPUT_TRACE_ROOT
  ? path.resolve(process.env.NEXT_PRIVATE_OUTPUT_TRACE_ROOT)
  : __dirname;

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'calendly.com' },
      { protocol: 'https', hostname: '**.calendly.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  outputFileTracingRoot: tracingRoot,
  turbopack: {
    root: tracingRoot,
  },
  experimental: {
    optimizePackageImports: ['@heroui/react'],
  },
  // Generate unique build ID for cache busting
  generateBuildId: async () => {
    // Use timestamp + random string for uniqueness
    return `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  },
  // Asset prefix for Cloudflare compatibility
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  // Webpack configuration to handle chunk loading
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.output.publicPath = '/_next/';
    }
    return config;
  },
  // Add proper caching headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
        ],
      },
      // Force no-cache for HTML pages to prevent stale content
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/:path((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 's-maxage=1, stale-while-revalidate=86400',
          },
        ],
      },
      // Static assets can be cached
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2037 23:55:55 GMT',
          },
        ],
      },
      // Images can be cached
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2037 23:55:55 GMT',
          },
        ],
      },
      // Static images in public folder
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2037 23:55:55 GMT',
          },
        ],
      },
      // Other static assets (favicon, etc)
      {
        source: '/:path*.{ico,png,jpg,jpeg,gif,webp,svg}',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Expires',
            value: 'Thu, 31 Dec 2037 23:55:55 GMT',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'peytonshawcounseling.com',
          },
        ],
        destination: 'https://www.peytonshawcounseling.com/:path*',
        permanent: true,
      },
      {
        source: '/services/individual-therapy/',
        destination: '/services#service-individual-therapy',
        permanent: true,
      },
      {
        source: '/services/individual-therapy',
        destination: '/services#service-individual-therapy',
        permanent: true,
      },
      {
        source: '/services/anxiety-stress-management/',
        destination: '/services#service-anxiety-stress-management',
        permanent: true,
      },
      {
        source: '/services/anxiety-stress-management',
        destination: '/services#service-anxiety-stress-management',
        permanent: true,
      },
      {
        source: '/services/depression-treatment/',
        destination: '/services#service-depression-treatment',
        permanent: true,
      },
      {
        source: '/services/depression-treatment',
        destination: '/services#service-depression-treatment',
        permanent: true,
      },
      {
        source: '/services/life-transitions/',
        destination: '/services#service-life-transitions',
        permanent: true,
      },
      {
        source: '/services/life-transitions',
        destination: '/services#service-life-transitions',
        permanent: true,
      },
      {
        source: '/services/relationship-issues/',
        destination: '/services#service-relationship-issues',
        permanent: true,
      },
      {
        source: '/services/relationship-issues',
        destination: '/services#service-relationship-issues',
        permanent: true,
      },
      {
        source: '/services/self-esteem-personal-growth/',
        destination: '/services#service-self-esteem-personal-growth',
        permanent: true,
      },
      {
        source: '/services/self-esteem-personal-growth',
        destination: '/services#service-self-esteem-personal-growth',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
