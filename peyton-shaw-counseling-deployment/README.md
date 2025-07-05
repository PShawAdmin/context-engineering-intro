# Peyton Shaw Counseling - Production Deployment

This folder contains the production-ready build of the Peyton Shaw Counseling website.

## Deployment Instructions

### For Standard Node.js Hosting (VPS, Cloud Server, etc.)

1. Upload all files in this folder to your server
2. Install dependencies: `npm install --production`
3. Set up environment variables in `.env.local`:
   ```
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_verified_sender_email
   SENDGRID_TO_EMAIL=recipient_email
   NEXT_PUBLIC_CALENDLY_URL=your_calendly_url
   ```
4. Start the server: `npm start`
5. The site will run on port 3000 by default

### For Static Hosting (Limited functionality)

If your host only supports static files, you'll need to export the site:
1. Run `npm run build` followed by `npx next export`
2. Upload the contents of the `out` folder
3. Note: API routes (contact form) won't work with static hosting

### Important Files

- `.next/` - Built Next.js application
- `public/` - Static assets (images, PDFs, etc.)
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration
- `.env.local` - Environment variables (create from .env.example)

### Post-Deployment

1. Test the contact form
2. Verify Calendly widget loads
3. Check all pages render correctly
4. Ensure HTTPS is enabled