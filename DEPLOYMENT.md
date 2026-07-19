# 🚀 Deployment Guide - StudySpark

## Prerequisites

✅ Node.js installed (v18 or later)
✅ Supabase account and project created
✅ Vercel account (for deployment)

---

## 1️⃣ Local Development Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment Variables

Your `.env.local` file should contain:

```env
NEXT_PUBLIC_SUPABASE_URL=https://jowldnmkorbngbixlwcc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd2xkbm1rb3JibmdiaXhsd2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODE3MDMsImV4cCI6MjA5OTg1NzcwM30.fD7noslw6xxH8jTFp2FzzMJ_E2kPd7djN9GfatWDy9A
```

⚠️ **Important**: No spaces after the `=` sign!

### Step 3: Set Up Database Schema

1. Go to Supabase Dashboard: https://app.supabase.com
2. Select your project: `jowldnmkorbngbixlwcc`
3. Navigate to **SQL Editor**
4. Run the migration file: `supabase/migrations/20260717000000_initial_schema.sql`

### Step 4: Disable Email Confirmation (Development)

For easier testing:

1. Supabase Dashboard → **Authentication** → **Providers** → **Email**
2. Toggle **"Confirm email"** OFF
3. Save

### Step 5: Run the Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

---

## 2️⃣ Vercel Deployment

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - StudySpark flashcard app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables in Vercel

**CRITICAL**: Add these in Vercel Dashboard:

1. Go to your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables for **Production**, **Preview**, and **Development**:

```
NEXT_PUBLIC_SUPABASE_URL
Value: https://jowldnmkorbngbixlwcc.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd2xkbm1rb3JibmdiaXhsd2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODE3MDMsImV4cCI6MjA5OTg1NzcwM30.fD7noslw6xxH8jTFp2FzzMJ_E2kPd7djN9GfatWDy9A
```

### Step 4: Deploy

Click **"Deploy"** and wait for the build to complete.

---

## 3️⃣ Post-Deployment Setup

### Enable Email Confirmation (Production)

1. Supabase Dashboard → **Authentication** → **Providers** → **Email**
2. Toggle **"Confirm email"** ON
3. Configure email templates (optional)

### Set Up Custom Domain (Optional)

1. Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Follow DNS configuration instructions

### Configure Supabase Auth URLs

1. Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel domain to **"Site URL"**:
   ```
   https://your-app.vercel.app
   ```
3. Add to **"Redirect URLs"**:
   ```
   https://your-app.vercel.app/**
   ```

---

## 4️⃣ Verification Checklist

After deployment, test these flows:

- [ ] Landing page loads without errors
- [ ] Browse page shows public decks
- [ ] Guest can view a public deck
- [ ] Guest can study a public deck (with banner)
- [ ] Register creates a new account
- [ ] Login works with credentials
- [ ] Dashboard loads with user stats
- [ ] Create new deck works
- [ ] Edit deck works
- [ ] Study mode saves progress
- [ ] Profile shows correct stats

---

## 5️⃣ Troubleshooting

### Error: "Missing NEXT_PUBLIC_SUPABASE_URL"

**Fix**: Add environment variables to Vercel:
1. Vercel Dashboard → Settings → Environment Variables
2. Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Redeploy

### Error: "500 Internal Server Error"

**Check**:
1. Vercel build logs for specific errors
2. Environment variables are set correctly
3. Supabase database schema is applied
4. RLS policies are configured

### Error: "Email rate limit reached"

**Fix**:
1. Use the "Create Test Account" button on register page
2. Or disable email confirmation in Supabase (see above)

### Database Connection Issues

**Verify**:
1. Supabase project is running
2. Environment variables are correct (no spaces!)
3. RLS policies allow access
4. Network isn't blocking Supabase

---

## 6️⃣ Environment Variables Reference

### Required Variables

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key | Supabase Dashboard → Settings → API |

### Optional Variables

| Variable | Description | Usage |
|----------|-------------|-------|
| `SUPABASE_SERVICE_ROLE_KEY` | Admin key for server operations | Server-side admin tasks (not needed for MVP) |

---

## 7️⃣ Security Best Practices

### ✅ DO:
- Use Row Level Security (RLS) in Supabase
- Keep service role key secret (never expose client-side)
- Enable email confirmation in production
- Use HTTPS (automatic with Vercel)
- Validate user input
- Rate limit API endpoints

### ❌ DON'T:
- Commit `.env.local` to Git (it's in `.gitignore`)
- Share your anon key publicly (it's safe for client-side, but still be careful)
- Share your service role key anywhere
- Disable RLS in production
- Skip input validation

---

## 8️⃣ Monitoring & Maintenance

### Vercel Analytics
- Enable Analytics in Vercel Dashboard
- Monitor page views and performance

### Supabase Monitoring
- Check Auth logs for failed logins
- Monitor database usage
- Review API usage

### Error Tracking
- Use Vercel's error logs
- Set up Sentry (optional)

---

## 9️⃣ Rollback Strategy

If something goes wrong:

1. **Vercel**: Click "Redeploy" on a previous successful deployment
2. **Database**: Use Supabase's backup feature
3. **Code**: Revert Git commit and push

---

## 🆘 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Project Issues**: Check GitHub Issues or create a new one

---

## ✅ Quick Deploy Checklist

```
[ ] Code pushed to GitHub
[ ] Vercel project created
[ ] Environment variables added to Vercel
[ ] Supabase database schema applied
[ ] Supabase auth URLs configured
[ ] Test account created
[ ] All features tested in production
[ ] Custom domain configured (optional)
[ ] Monitoring set up
[ ] Email confirmation enabled (production)
```

---

**Your app is now production-ready! 🎉**

Share your link: `https://your-app.vercel.app`
