# FlashCard App - Complete Setup Guide

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js 18+ installed
- ✅ npm or yarn package manager
- ✅ A Supabase account (sign up at [supabase.com](https://supabase.com))

## Step-by-Step Setup

### 1. Install Node.js (If Not Already Installed)

If you don't have Node.js:
- Download from [nodejs.org](https://nodejs.org/)
- Install the LTS (Long Term Support) version
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Install Project Dependencies

```bash
cd flashcard-app
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- Supabase client
- Tailwind CSS
- React Query
- Framer Motion
- And more...

### 3. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in:
   - **Name:** FlashCard (or your preferred name)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose closest to your location
4. Wait for project to be created (~2 minutes)

### 4. Get Supabase Credentials

1. In your Supabase project dashboard, click the gear icon (Settings)
2. Go to **API** section
3. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (the public/anon key)

### 5. Configure Environment Variables

1. In the `flashcard-app` directory, copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and add your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 6. Set Up Database

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Open the file `supabase/migrations/20260717000000_initial_schema.sql`
4. Copy ALL the contents
5. Paste into the SQL Editor
6. Click "Run" or press `Ctrl/Cmd + Enter`

You should see "Success. No rows returned" - this is correct!

### 7. Verify Database Setup

1. In Supabase, go to **Table Editor**
2. You should see these tables:
   - ✅ users
   - ✅ decks
   - ✅ cards
   - ✅ study_sessions

### 8. Start Development Server

```bash
npm run dev
```

You should see:
```
> flashcard-app@0.1.0 dev
> next dev

  ▲ Next.js 14.2.5
  - Local:        http://localhost:3000

✓ Ready in 2.5s
```

### 9. Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. Click "Get Started" or "Sign Up"
3. Create an account with:
   - Username
   - Email
   - Password (min 8 chars, 1 uppercase, 1 number)
4. You should be redirected to the dashboard!

## Troubleshooting

### "Node is not recognized"
- Make sure Node.js is installed
- Restart your terminal after installation
- Check if Node is in your PATH

### "Failed to fetch from Supabase"
- Verify `.env.local` has correct credentials
- Check if Supabase project is running
- Make sure you're using the **anon public** key, not the service role key

### "Auth error" or "Unauthorized"
- Verify database migration was run successfully
- Check if RLS policies were created
- Go to Supabase > Authentication > Policies to verify

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

### Port 3000 already in use
- Kill the process using port 3000
- Or start on a different port: `npm run dev -- -p 3001`

## Optional: Configure Email (Production)

For production, configure email in Supabase:

1. Go to **Authentication** > **Email Templates**
2. Customize the email templates
3. Go to **Settings** > **Auth**
4. Configure SMTP settings (or use Supabase's default)

## Next Steps

Once everything is running:

1. **Create your first deck**
   - Click "Create Deck"
   - Add a name and description
   - Add some cards

2. **Try study mode**
   - Click "Study Now" on a deck
   - Use keyboard shortcuts (Space, arrows)
   - Complete a session to see stats

3. **Explore features**
   - View your profile and stats
   - Try different privacy settings
   - Add markdown to cards

## Development Tips

### Hot Reload
- Changes to code will auto-refresh the browser
- Database changes require server restart

### Debugging
- Check browser console for frontend errors
- Check terminal for backend errors
- Use Supabase logs for database issues

### Code Quality
```bash
# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

Your app will be live in minutes!

### Update Database for Production

1. In Supabase, go to **Settings** > **Auth**
2. Add your Vercel domain to "Site URL"
3. Add to "Redirect URLs"

## Security Checklist

- ✅ Environment variables are in `.env.local` (not committed)
- ✅ `.env.local` is in `.gitignore`
- ✅ Using HTTPS in production
- ✅ Row-level security enabled
- ✅ Service role key is kept secret

## Support

If you encounter issues:

1. Check this guide again
2. Review error messages carefully
3. Check Supabase dashboard logs
4. Review the README.md for feature documentation

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Query Documentation](https://tanstack.com/query)

---

Happy studying! 🎉
