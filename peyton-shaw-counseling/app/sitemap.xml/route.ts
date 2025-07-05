import { SERVICES } from '@/lib/constants';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://peytonshawcounseling.com';
  
  // Static pages
  const staticPages = [
    { url: baseUrl, priority: '1.0' },
    { url: `${baseUrl}/about`, priority: '0.8' },
    { url: `${baseUrl}/services`, priority: '0.9' },
    { url: `${baseUrl}/contact`, priority: '0.9' },
    { url: `${baseUrl}/faq`, priority: '0.7' },
    { url: `${baseUrl}/blog`, priority: '0.6' },
  ];
  
  // Dynamic service pages
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    priority: '0.8',
  }));
  
  const allPages = [...staticPages, ...servicePages];
  const currentDate = new Date().toISOString().split('T')[0];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}