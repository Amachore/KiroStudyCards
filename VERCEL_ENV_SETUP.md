# 🚀 Vercel Environment Variables Setup

## ⚠️ IMPORTANT: You MUST add environment variables to Vercel

The build error happens because Vercel doesn't have your Supabase credentials.

---

## 📋 Step-by-Step Instructions

### 1️⃣ Go to Your Vercel Project

1. Visit: https://vercel.com
2. Select your project (flashcard-app / StudySpark)
3. Click **"Settings"** tab

### 2️⃣ Add Environment Variables

1. In Settings, click **"Environment Variables"** in the left sidebar
2. You'll see a form to add variables

### 3️⃣ Add NEXT_PUBLIC_SUPABASE_URL

**Key:**
```
NEXT_PUBLIC_SUPABASE_URL
```

**Value:**
```
https://jowldnmkorbngbixlwcc.supabase.co
```

**Environments:** Check ALL three:
- ✅ Production
- ✅ Preview  
- ✅ Development

Click **"Save"**

### 4️⃣ Add NEXT_PUBLIC_SUPABASE_ANON_KEY

**Key:**
```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Value:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd2xkbm1rb3JibmdiaXhsd2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODE3MDMsImV4cCI6MjA5OTg1NzcwM30.fD7noslw6xxH8jTFp2FzzMJ_E2kPd7djN9GfatWDy9A
```

**Environments:** Check ALL three:
- ✅ Production
- ✅ Preview
- ✅ Development

Click **"Save"**

### 5️⃣ Redeploy

After adding both variables:

1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** menu button
4. Select **"Redeploy"**
5. Wait for deployment to complete

---

## ✅ Verification

After redeployment, your site should:
- ✅ Build successfully
- ✅ Load without 500 errors
- ✅ Allow registration/login
- ✅ Show dashboard and decks

---

## 🖼️ Visual Guide

Your Vercel Environment Variables page should look like this:

```
Environment Variables

Name                              Value                    Environments
NEXT_PUBLIC_SUPABASE_URL         https://jowldnm...        Production, Preview, Development
NEXT_PUBLIC_SUPABASE_ANON_KEY    eyJhbGciOiJIUzI...       Production, Preview, Development
```

---

## 🆘 Still Getting Errors?

### Error: "Missing environment variables"

**Solution:**
- Make sure you clicked **"Save"** after adding each variable
- Check that you selected ALL three environments
- Redeploy after saving

### Error: "Build failed"

**Solution:**
- Check the build logs for specific errors
- Make sure both variables are added
- Try redeploying from a fresh commit

### Error: "Cannot connect to Supabase"

**Solution:**
- Double-check the URL and key are correct (no typos)
- Make sure there are no extra spaces in the values
- Verify your Supabase project is active

---

## 📱 Quick Copy-Paste

### Variable 1:
```
Key: NEXT_PUBLIC_SUPABASE_URL
Value: https://jowldnmkorbngbixlwcc.supabase.co
Environments: Production, Preview, Development
```

### Variable 2:
```
Key: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd2xkbm1rb3JibmdiaXhsd2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyODE3MDMsImV4cCI6MjA5OTg1NzcwM30.fD7noslw6xxH8jTFp2FzzMJ_E2kPd7djN9GfatWDy9A
Environments: Production, Preview, Development
```

---

## ⏱️ Expected Timeline

1. Add variables: **2 minutes**
2. Redeploy: **3-5 minutes**
3. Verify: **1 minute**

**Total: ~7 minutes** to fix!

---

**After following these steps, your app will deploy successfully! 🎉**
