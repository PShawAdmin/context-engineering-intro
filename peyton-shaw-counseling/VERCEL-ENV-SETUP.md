# Setting Up Environment Variables in Vercel

## Quick Fix for Your Deployment Error

The error happened because the `vercel.json` was looking for secrets. Here's how to fix it:

### Step 1: Go to Environment Variables
1. In your Vercel dashboard, click on your project
2. Click "Settings" tab (top navigation)
3. Click "Environment Variables" (left sidebar)

### Step 2: Add Your Variables
Click "Add" and create each of these:

1. **SENDGRID_API_KEY**
   - Key: `SENDGRID_API_KEY`
   - Value: (paste your SendGrid API key)
   - Environment: Select all (Production, Preview, Development)

2. **SENDGRID_FROM_EMAIL**
   - Key: `SENDGRID_FROM_EMAIL`
   - Value: (your verified SendGrid email, e.g., noreply@peytonshawcounseling.com)
   - Environment: Select all

3. **SENDGRID_TO_EMAIL**
   - Key: `SENDGRID_TO_EMAIL`
   - Value: (where you want to receive contact form emails)
   - Environment: Select all

4. **NEXT_PUBLIC_CALENDLY_URL**
   - Key: `NEXT_PUBLIC_CALENDLY_URL`
   - Value: (your Calendly link, e.g., https://calendly.com/peyton-shaw)
   - Environment: Select all

### Step 3: Redeploy
1. After adding all variables, go to "Deployments" tab
2. Find your latest deployment
3. Click the three dots menu → "Redeploy"
4. Click "Redeploy" in the popup

## Don't Have These Values Yet?

**SendGrid API Key:**
- Sign up at sendgrid.com (free tier available)
- Go to Settings → API Keys → Create API Key
- Give it "Full Access"
- Copy the key (you only see it once!)

**SendGrid Verified Email:**
- In SendGrid: Settings → Sender Authentication
- Verify a single sender (your email)
- Use this email for SENDGRID_FROM_EMAIL

**Calendly URL:**
- Your public scheduling link from Calendly
- Usually looks like: https://calendly.com/your-username

## Testing After Setup

1. Visit your site's contact page
2. Submit a test message
3. Check if you receive the email
4. Test the Calendly widget loads

If contact form doesn't work, double-check:
- SendGrid email is verified
- API key has correct permissions
- TO_EMAIL is valid