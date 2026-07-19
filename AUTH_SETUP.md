# 🔐 Authentication Setup Guide

## Problem: "Email Rate Limit Reached"

This happens because Supabase sends confirmation emails, and there's a rate limit on how many emails can be sent.

---

## ✅ Quick Solutions

### Option 1: Use Test Account Button (EASIEST)
1. Go to `/register`
2. Click **"🚀 Create Test Account (Instant)"** button
3. You'll be logged in immediately with a test account
4. No email confirmation needed!

### Option 2: Disable Email Confirmation in Supabase (RECOMMENDED)

**Steps:**
1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project: `jowldnmkorbngbixlwcc`
3. Navigate to: **Authentication** → **Providers** → **Email**
4. Find **"Confirm email"** setting
5. **Toggle it OFF**
6. Click **Save**

Now all sign-ups work instantly without email confirmation!

### Option 3: Use Existing Account

If you already created an account but can't confirm it:
1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Find your user
3. Click the **"..."** menu
4. Select **"Confirm email"**
5. Now you can log in!

---

## 🎯 Updated Features

### Relaxed Password Requirements
- **Before**: 8 characters, 1 uppercase, 1 number
- **After**: Just 6 characters minimum
- Much easier for testing!

### Auto Sign-In After Registration
- The app now tries to sign you in immediately after registration
- Even if email confirmation is required, you'll get a friendly message

### Better Error Messages
- Clear message if you hit the rate limit
- Suggestions to try logging in if account already exists

---

## 🧪 Development Tips

### Create Multiple Test Accounts
Click the test account button multiple times to create different test users. Each one gets a unique email like `test1234567890@studyspark.local`.

### Reset Rate Limits
If you hit the rate limit:
1. Wait 15-30 minutes, OR
2. Go to Supabase Dashboard → **Authentication** → **Rate Limits**
3. Increase the limits or disable them for development

### Disable All Email Auth (Optional)
If you want to completely skip emails:
1. Supabase Dashboard → **Authentication** → **Settings**
2. Set **"Enable email confirmations"** to OFF
3. Set **"Enable email change confirmations"** to OFF
4. Set **"Enable password recovery"** to OFF (optional)

---

## 🚀 Quick Start Commands

```bash
# Start the dev server
npm run dev

# Visit the app
http://localhost:3000

# Register page
http://localhost:3000/register

# Click "Create Test Account" button - done!
```

---

## 📧 For Production

**Remember to re-enable email confirmation before deploying to production!**

1. Supabase Dashboard → **Authentication** → **Providers** → **Email**
2. **Enable "Confirm email"**
3. Set up proper email templates
4. Configure SMTP settings (optional)

---

## 🆘 Troubleshooting

### Still getting rate limit errors?
- Use the **"Create Test Account"** button instead
- Wait 30 minutes for rate limits to reset
- Check Supabase logs for specific errors

### Can't log in after creating account?
- Email might not be confirmed
- Manually confirm in Supabase Dashboard
- Or use test account feature

### Want to use your real email?
- Disable email confirmation in Supabase
- Use a different email provider (Gmail, etc.)
- Set up custom SMTP in Supabase

---

Happy testing! 🎉
