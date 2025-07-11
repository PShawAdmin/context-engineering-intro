/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['calendly.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
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
        ],
      },
    ];
  },
}

module.exports = nextConfig