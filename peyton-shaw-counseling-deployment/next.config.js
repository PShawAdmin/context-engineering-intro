/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['calendly.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@heroui/react'],
  },
}

module.exports = nextConfig