# Cloudflare Configuration for Peyton Shaw Counseling

## Required Cloudflare Settings

### 1. DNS Settings
- Set DNS records to "Proxied" (orange cloud ON)
- A Record: @ → Your Vercel IP
- CNAME Record: www → cname.vercel-dns.com

### 2. Page Rules (in order of priority)
Create these page rules in your Cloudflare dashboard:

#### Rule 1: API Routes
- URL: `*peytonshawcounseling.com/api/*`
- Settings:
  - Cache Level: Bypass
  - Always Online: OFF

#### Rule 2: Static Assets
- URL: `*peytonshawcounseling.com/_next/static/*`
- Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year

#### Rule 3: Images
- URL: `*peytonshawcounseling.com/_next/image/*`
- Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 month
  - Browser Cache TTL: 1 year

#### Rule 4: Main Pages
- URL: `*peytonshawcounseling.com/*`
- Settings:
  - Cache Level: Standard
  - Edge Cache TTL: 1 hour
  - Always Online: ON

### 3. Caching Settings
Go to Caching → Configuration:
- Caching Level: Standard
- Browser Cache TTL: Respect Existing Headers
- Crawler Hints: ON
- Always Online™: ON

### 4. Network Settings
- HTTP/3 (with QUIC): ON
- 0-RTT Connection Resumption: ON
- gRPC: ON
- WebSockets: ON

### 5. Speed → Optimization
- Auto Minify: OFF (Next.js already minifies)
- Brotli: ON
- Early Hints: ON
- Rocket Loader™: OFF (can break React)

### 6. Scrape Shield
- Email Address Obfuscation: ON
- Server-side Excludes: OFF
- Hotlink Protection: OFF

## Deployment Process

1. **Deploy to Vercel first**
2. **Wait 2-3 minutes for propagation**
3. **Purge Cloudflare cache**:
   - Go to Caching → Configuration
   - Click "Purge Everything"
4. **Test in incognito/private mode**

## Troubleshooting

### White Screen / Chunk Loading Errors
1. Purge Cloudflare cache
2. Check Page Rules are in correct order
3. Verify Rocket Loader is OFF
4. Clear browser cache

### Mobile Issues
1. Check if "Mobile Redirect" is OFF
2. Ensure "Mirage" is OFF (deprecated)
3. Test with mobile browser cache cleared

### Build Issues
1. Always increment build ID (automatic with our config)
2. Deploy during low-traffic hours
3. Use Cloudflare's "Development Mode" during testing

## Environment Variables (add to Vercel)

```
NEXT_PUBLIC_SITE_URL=https://www.peytonshawcounseling.com
NEXT_PUBLIC_ASSET_PREFIX=
```

## Monitoring

Set up Cloudflare Analytics alerts for:
- 4xx errors spike
- 5xx errors spike
- Origin response time > 3s

## Cache Purge API (optional)

Create a deploy hook to auto-purge cache:
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```