# SendGrid Setup Guide for Peyton Shaw Counseling

## ✅ Current Status
Your SendGrid integration is **fully configured and working**! 
- API Key: Valid and active
- Sender Email: `no-reply@peytonshawcounseling.com` (verified)
- Test Email: Successfully sent

## 📋 Complete SendGrid Setup Instructions

### 1. Create/Verify SendGrid Account
1. Go to [SendGrid](https://sendgrid.com)
2. Sign up for a free account or log in to your existing account
3. Complete email verification

### 2. Domain Authentication (Recommended)
1. Navigate to **Settings → Sender Authentication**
2. Click **Authenticate Your Domain**
3. Add `peytonshawcounseling.com` as your domain
4. Follow the DNS setup instructions provided by SendGrid
5. Verify domain authentication

### 3. Verify Sender Identity
1. Go to **Settings → Sender Authentication → Single Sender Verification**
2. Click **Create New Sender**
3. Fill in the form:
   - From Name: `Peyton Shaw Counseling`
   - From Email: `no-reply@peytonshawcounseling.com`
   - Reply To: `peyton@peytonshawcounseling.com`
   - Company Address: Your business address
4. Click **Create**
5. Check the email and verify the sender

### 4. Generate New API Key
1. Go to **Settings → API Keys**
2. Click **Create API Key**
3. Give it a name: `Contact Form - Production`
4. Select **Restricted Access**
5. Enable these permissions:
   - **Mail Send** → Full Access
   - **Mail Settings** → Read Access (optional)
   - **Tracking** → Read Access (optional)
6. Click **Create & View**
7. **COPY THE API KEY IMMEDIATELY** (you won't see it again!)

### 5. Update Your Environment
Replace the API key in `.env.local`:
```
SENDGRID_API_KEY=your_new_api_key_here
```

### 6. Test the Configuration
Run the test script:
```bash
node scripts/test-email.js
```

### 7. Send a Test Email
Uncomment the test email section in `scripts/test-email.js` and run it again to send a test email.

## 🔧 Troubleshooting

### Common Issues:
1. **401 Unauthorized**: API key is invalid or revoked
2. **403 Forbidden**: API key lacks required permissions
3. **Sender not verified**: You need to verify the sender email address

### Email Not Arriving?
- Check spam/junk folder
- Verify sender authentication
- Check SendGrid dashboard for bounces/blocks
- Ensure your domain has proper SPF/DKIM records

## 📧 Email Configuration Details

The website is configured to:
- Send form submissions to: `peyton@peytonshawcounseling.com`
- Send emails from: `no-reply@peytonshawcounseling.com`
- Auto-reply to users who submit the form

## 🚀 Going Live Checklist

- [ ] Generate new SendGrid API key with proper permissions
- [ ] Update `.env.local` with the new API key
- [ ] Verify sender email address
- [ ] Authenticate domain (recommended)
- [ ] Test contact form thoroughly
- [ ] Monitor SendGrid dashboard for delivery issues

## 📊 SendGrid Dashboard

Monitor your email activity at:
- [SendGrid Activity Feed](https://app.sendgrid.com/email_activity)
- [SendGrid Statistics](https://app.sendgrid.com/statistics)

## 💡 Tips

1. Start with a free SendGrid account (100 emails/day)
2. Use domain authentication for better deliverability
3. Monitor your sender reputation
4. Set up email templates for consistent branding
5. Enable click tracking to see engagement

## 🔐 Security Notes

- Never commit API keys to Git
- Use environment variables for all sensitive data
- Rotate API keys periodically
- Monitor for unusual activity

Need help? Check the [SendGrid docs](https://docs.sendgrid.com) or contact their support.