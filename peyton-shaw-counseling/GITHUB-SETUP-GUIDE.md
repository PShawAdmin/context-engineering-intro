# Complete GitHub Setup Guide for Peyton Shaw Counseling Website

## Part 1: Create GitHub Account (5 minutes)

1. **Go to GitHub**
   - Open your browser and go to: https://github.com
   - Click the "Sign up" button (top right)

2. **Fill out the form**
   - Enter your email address
   - Create a password (save this somewhere!)
   - Choose a username (e.g., "peyton-shaw" or "pshawcounseling")
   - Verify you're human (puzzle/captcha)
   - Click "Create account"

3. **Verify your email**
   - Check your email inbox
   - Click the verification link GitHub sent you
   - You're now logged into GitHub!

## Part 2: Create a Repository (5 minutes)

1. **Start a new repository**
   - Click the green "New" button (or the "+" icon → "New repository")
   
2. **Set up your repository**
   - Repository name: `peyton-shaw-counseling`
   - Description: "Professional counseling website"
   - Keep it "Public" (free)
   - DON'T check any boxes below
   - Click "Create repository"

3. **You'll see a page with instructions - IGNORE THEM for now**
   - We'll use GitHub Desktop instead (much easier!)

## Part 3: Install GitHub Desktop (5 minutes)

1. **Download GitHub Desktop**
   - Go to: https://desktop.github.com/
   - Click "Download for Windows"
   - Run the installer when downloaded

2. **Sign in to GitHub Desktop**
   - Open GitHub Desktop
   - Click "Sign in to GitHub.com"
   - It will open your browser - click "Authorize"
   - Go back to GitHub Desktop

## Part 4: Upload Your Project (10 minutes)

1. **Clone your repository**
   - In GitHub Desktop, click "Clone a repository"
   - Select your `peyton-shaw-counseling` repository
   - Choose where to save it (e.g., Documents folder)
   - Click "Clone"

2. **Copy your project files**
   - Open File Explorer
   - Navigate to: `C:\Users\james\PSC\context-engineering-intro\peyton-shaw-counseling`
   - Select ALL files and folders EXCEPT:
     - `.git` folder (if visible)
     - `node_modules` folder
     - `.next` folder
   - Copy them (Ctrl+C)

3. **Paste into GitHub folder**
   - Navigate to where you cloned the repository (e.g., Documents/peyton-shaw-counseling)
   - Paste all files (Ctrl+V)
   - Wait for files to copy

4. **Commit and push your files**
   - Go back to GitHub Desktop
   - You'll see all your files listed as changes
   - At bottom left:
     - Summary: "Initial website upload"
     - Description: "Complete Peyton Shaw Counseling website"
   - Click "Commit to main"
   - Click "Push origin" button (top right)

## Part 5: Connect to Vercel (5 minutes)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel

2. **Import your project**
   - Click "Add New Project"
   - You'll see your `peyton-shaw-counseling` repository
   - Click "Import"

3. **Configure project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: Leave as-is
   - Click "Deploy"

4. **Add environment variables**
   - After deploy, go to Settings → Environment Variables
   - Add these (click "Add" for each):
     ```
     SENDGRID_API_KEY = (your sendgrid key)
     SENDGRID_FROM_EMAIL = (your email)
     SENDGRID_TO_EMAIL = (where to receive messages)
     NEXT_PUBLIC_CALENDLY_URL = (your calendly link)
     ```
   - Click "Save"

## Part 6: Add Your Domain (10 minutes)

1. **In Vercel project**
   - Go to Settings → Domains
   - Type your domain: `peytonshawcounseling.com`
   - Click "Add"

2. **Update your domain DNS**
   - Vercel will show you exactly what to add
   - Log into your domain provider (GoDaddy, Namecheap, etc.)
   - Add the DNS records Vercel shows you

## Troubleshooting Tips

**"Git not found" error?**
- Just use GitHub Desktop - no command line needed!

**Files too large?**
- Make sure you didn't copy `node_modules` folder
- Delete it if you did, then push again

**Can't see `.git` folder?**
- That's OK! Windows hides it by default
- Just copy everything else

**Vercel build failing?**
- Check environment variables are set
- Make sure all files uploaded properly

## Making Future Updates

1. Edit files on your computer
2. Open GitHub Desktop
3. Write what you changed in summary
4. Click "Commit to main"
5. Click "Push origin"
6. Vercel auto-deploys in ~1 minute!

## Need Help?

- GitHub Desktop guide: https://docs.github.com/desktop
- Vercel support: https://vercel.com/help
- Can't figure it out? Consider hiring a developer for 1 hour to help set up

---

Remember: You only need to do the setup ONCE. After that, updates are just:
1. Change files
2. Commit in GitHub Desktop
3. Push
4. Done!