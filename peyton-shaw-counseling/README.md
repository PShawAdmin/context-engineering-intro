# Peyton Shaw Counseling Website

A modern, responsive therapy website built with Next.js 14, TypeScript, HeroUI components, and Calendly integration.

## Features

- 🎨 Professional, calming design with nature-inspired colors
- 📱 Fully responsive (mobile, tablet, desktop)
- 📅 Integrated Calendly appointment booking
- 📧 Contact form with email notifications
- 🔒 Secure implementation with environment variables
- ⚡ Fast performance with Next.js App Router
- 🔍 SEO optimized

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: HeroUI (formerly NextUI)
- **Booking**: Calendly API v2
- **Email**: SendGrid or Resend
- **Animation**: Framer Motion

## Project Structure

```
peyton-shaw-counseling/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx          # Home page
│   ├── providers.tsx     # HeroUI provider wrapper
│   ├── globals.css       # Global styles
│   ├── (marketing)/      # Public pages route group
│   │   ├── about/
│   │   ├── services/
│   │   ├── faq/
│   │   ├── contact/
│   │   └── blog/
│   └── api/              # API routes
│       └── contact/      # Contact form handler
├── components/
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities and helpers
│   ├── calendly-dal.ts   # Calendly Data Access Layer
│   ├── email.ts          # Email service
│   └── constants.ts      # Site configuration
└── public/               # Static assets
```

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager
- Calendly account with API access
- Email service account (SendGrid or Resend)

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd peyton-shaw-counseling
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Configure environment variables:
```bash
# Copy the example environment file
cp .env.example .env.local
```

4. Edit `.env.local` and add your credentials:
   - `CALENDLY_ACCESS_TOKEN`: Your Calendly personal access token
   - `CONTACT_EMAIL`: Email address for form submissions
   - `SENDGRID_API_KEY` or `RESEND_API_KEY`: Email service API key
   - `NEXT_PUBLIC_SITE_URL`: Your production URL

### Getting Calendly Access Token

1. Log into your Calendly account
2. Go to [Calendly Integrations](https://calendly.com/integrations/api_webhooks)
3. Generate a personal access token
4. Copy the token to your `.env.local` file

### Setting Up Google Reviews Integration

The site can display your actual Google Business Profile reviews. Choose one of these methods:

#### Method 1: Google Places API (Recommended - Simpler)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable the "Places API" for your project
4. Create credentials (API Key)
5. Restrict the API key to your domain for security
6. Find your Google Place ID:
   - Go to [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
   - Search for your business
   - Copy the Place ID
7. Add to `.env.local`:
   ```
   GOOGLE_PLACES_API_KEY=your_api_key
   GOOGLE_PLACE_ID=your_place_id
   NEXT_PUBLIC_GOOGLE_PLACE_ID=your_place_id
   ```

#### Method 2: Google Business Profile API (Advanced - More Features)

1. Set up OAuth 2.0 in Google Cloud Console
2. Get access to Google Business Profile API
3. Obtain account ID and location ID
4. Generate OAuth access token
5. Add credentials to `.env.local`

**Note**: If Google Reviews are not configured, the site will display sample testimonials instead.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Production Deployment

### Build

```bash
npm run build
```

### Deploy

The site can be deployed to any platform that supports Next.js:

- **Vercel** (recommended): Push to GitHub and connect to Vercel
- **Netlify**: Use the Next.js adapter
- **AWS**: Deploy with Amplify or custom EC2
- **Other**: Any Node.js hosting platform

### Environment Variables

Ensure all environment variables are set in your hosting platform:
- Set them in Vercel/Netlify dashboard
- Use platform-specific secret management
- Never commit `.env.local` to version control

## Security Notes

- Calendly access token is kept server-side only
- All API calls use the Data Access Layer pattern
- Contact form includes validation and rate limiting
- No health information is collected (HIPAA compliance)

## Performance

Target Lighthouse scores:
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >95

## Support

For issues or questions:
- Check the [troubleshooting guide](#troubleshooting)
- Open an issue in the repository
- Contact the development team

## License

© 2025 Peyton Shaw Counseling. All rights reserved.