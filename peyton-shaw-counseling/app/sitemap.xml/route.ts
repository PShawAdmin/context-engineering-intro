import { SERVICES, businessInfo } from '@/lib/constants';
import { LOCATIONS } from '@/lib/locations';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || businessInfo.url;
  
  // Static pages
  const staticPages = [
    { url: baseUrl, priority: '1.0', changefreq: 'weekly' },
    { url: `${baseUrl}/about`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/services`, priority: '0.9', changefreq: 'monthly' },
    { url: `${baseUrl}/contact`, priority: '0.9', changefreq: 'monthly' },
    { url: `${baseUrl}/areas-served`, priority: '0.8', changefreq: 'monthly' },
    { url: `${baseUrl}/faq`, priority: '0.7', changefreq: 'monthly' },
    { url: `${baseUrl}/blog`, priority: '0.6', changefreq: 'weekly' },
    { url: `${baseUrl}/crisis-resources`, priority: '0.5', changefreq: 'yearly' },
    { url: `${baseUrl}/privacy`, priority: '0.3', changefreq: 'yearly' },
    { url: `${baseUrl}/terms`, priority: '0.3', changefreq: 'yearly' },
    { url: `${baseUrl}/accessibility`, priority: '0.3', changefreq: 'yearly' },
  ];
  
  // Dynamic service pages
  const servicePages = SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  // Location pages
  const locationPages = LOCATIONS.map((location) => ({
    url: `${baseUrl}/areas-served/${location.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }));
  
  const allPages = [...staticPages, ...servicePages, ...locationPages];
  const currentDate = new Date().toISOString();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
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
