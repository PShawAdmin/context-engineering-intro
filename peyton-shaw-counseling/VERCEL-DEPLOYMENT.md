# Vercel Deployment Guide for Peyton Shaw Counseling

## Quick Deploy Steps

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub, GitLab, or email

### 2. Deploy from GitHub (Recommended)
1. Push your code to GitHub if not already done
2. In Vercel dashboard, click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

### 3. Set Environment Variables
In Vercel project settings > Environment Variables, add:
- `SENDGRID_API_KEY` - Your SendGrid API key
- `SENDGRID_FROM_EMAIL` - Verified sender email
- `SENDGRID_TO_EMAIL` - Where to receive contact form submissions
- `NEXT_PUBLIC_CALENDLY_URL` - Your Calendly scheduling link

### 4. Connect Custom Domain
1. Go to project Settings > Domains
2. Add your domain (e.g., peytonshawcounseling.com)
3. Choose how to add:
   - **Option A**: Update DNS at your domain registrar
     - Add CNAME record: `www` → `cname.vercel-dns.com`
     - Add A record: `@` → `76.76.21.21`
   - **Option B**: Transfer nameservers to Vercel (easier)

### 5. SSL Certificate
- Vercel automatically provisions SSL certificates
- HTTPS is enabled by default

## Alternative: Deploy via CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. In your project directory:
   ```bash
   vercel
   ```

3. Follow prompts to link/create project

4. For production deploy:
   ```bash
   vercel --prod
   ```

## Post-Deployment Checklist

- [ ] Test contact form functionality
- [ ] Verify Calendly widget loads
- [ ] Check all pages load correctly
- [ ] Confirm custom domain works
- [ ] Test on mobile devices
- [ ] Verify SSL certificate (https://)

## Updating the Site

- **Via GitHub**: Push changes to main branch (auto-deploys)
- **Via CLI**: Run `vercel --prod` after changes

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs