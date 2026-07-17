# FlashCard - Study Smarter

A modern, web-based flash card study platform built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- 🎯 **Smart Flash Cards** - Create beautiful flash cards with markdown support
- 👥 **Collaboration** - Share decks with friends or explore community creations
- 📊 **Progress Tracking** - Monitor your learning with detailed stats and analytics
- ✨ **Beautiful Design** - Enjoy a delightful, distraction-free studying experience
- 📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⌨️ **Keyboard Shortcuts** - Navigate efficiently with keyboard controls

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Styling:** Tailwind CSS
- **State Management:** Zustand + React Query
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion
- **Drag & Drop:** dnd-kit
- **Markdown:** React Markdown + remark-gfm

## Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier available)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API to get your credentials
3. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Migrations

In your Supabase project dashboard:

1. Go to the SQL Editor
2. Copy the contents of `supabase/migrations/20260717000000_initial_schema.sql`
3. Paste and run the SQL

This will create:
- Users table
- Decks table
- Cards table
- Study sessions table
- Row-level security policies
- Indexes for performance

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
flashcard-app/
├── app/                      # Next.js App Router pages
│   ├── (auth)/              # Authentication pages (login, register)
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── dashboard/       # Main dashboard
│   │   ├── decks/          # Deck management
│   │   ├── study/          # Study mode
│   │   └── profile/        # User profile
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── providers.tsx       # React Query provider
├── components/              # React components
│   ├── auth/               # Auth forms
│   ├── dashboard/          # Dashboard components
│   ├── decks/              # Deck management components
│   ├── study/              # Study mode components
│   ├── profile/            # Profile components
│   └── ui/                 # Reusable UI components
├── lib/                     # Utility libraries
│   └── supabase/           # Supabase client setup
├── types/                   # TypeScript type definitions
├── hooks/                   # Custom React hooks
├── utils/                   # Utility functions
├── supabase/               # Supabase configuration
│   └── migrations/         # Database migrations
└── middleware.ts           # Next.js middleware for auth
```

## Key Features Guide

### Creating a Deck

1. Go to Dashboard
2. Click "Create Deck"
3. Fill in deck name, description, and tags
4. Choose privacy setting (Private, Unlisted, or Public)
5. Click "Create Deck"

### Adding Cards

1. Open a deck and click "Edit"
2. Click "Add" to create a new card
3. Enter front (question) and back (answer)
4. Supports markdown formatting
5. Optionally set difficulty level
6. Drag to reorder cards
7. Click "Save All" when done

### Studying

1. Open a deck and click "Study Now"
2. Click card or press Space to flip
3. After viewing answer, mark as "Got It" or "Review Again"
4. Use arrow keys to navigate
5. Press Esc to exit
6. View summary when session complete

### Keyboard Shortcuts (Study Mode)

- `Space` / `Enter` - Flip card
- `←` - Previous card
- `→` - Next card
- `Esc` - Exit study mode

## Database Schema

### Users
- User profiles linked to Supabase auth
- Username, email, avatar

### Decks
- Name, description, tags
- Privacy levels (private, unlisted, public)
- Owner relationship

### Cards
- Front and back content (markdown)
- Optional images
- Difficulty tags
- Order index for sorting

### Study Sessions
- Tracks each study session
- Cards reviewed, correct count
- Duration and timestamp

## Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Optional (for admin features)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

## Security Features

- Row-level security (RLS) policies
- JWT-based authentication
- HTTPS enforced in production
- Input validation with Zod
- XSS prevention via sanitized markdown
- Rate limiting ready

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Vercel will automatically:
- Build your Next.js app
- Set up edge functions
- Configure CDN
- Enable automatic HTTPS

### Database Backups

Supabase provides automatic daily backups. For production:
- Enable point-in-time recovery
- Set up monitoring and alerts
- Review security policies regularly

## Contributing

This is a learning project built from a PRD. Feel free to:
- Add new features
- Improve UI/UX
- Fix bugs
- Optimize performance

## License

MIT License - feel free to use this project for learning or production.

## Support

For issues or questions:
1. Check the Supabase documentation
2. Review Next.js 14 App Router docs
3. Open an issue in the repository

---

Built with ❤️ using Next.js, Supabase, and Tailwind CSS
