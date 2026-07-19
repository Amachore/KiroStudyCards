import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Database } from '@/types/database';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  
  // Validate environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables in middleware');
    return NextResponse.redirect(new URL('/error?message=configuration', req.url));
  }

  const supabase = createMiddlewareClient<Database>({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Only these routes require strict authentication (write/modify actions)
  const strictAuthRoutes = [
    '/dashboard',
    '/decks/new',
    '/decks/[id]/edit',
    '/profile',
  ];
  
  // Check if current path requires strict auth
  const requiresStrictAuth = strictAuthRoutes.some((route) => {
    if (route.includes('[id]')) {
      // Handle dynamic routes like /decks/[id]/edit
      const pattern = route.replace('[id]', '[^/]+');
      return new RegExp(`^${pattern}`).test(req.nextUrl.pathname);
    }
    return req.nextUrl.pathname.startsWith(route);
  });

  // Redirect to login only for strict auth routes
  if (requiresStrictAuth && !session) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Gently redirect authenticated users away from auth pages
  const authRoutes = ['/login', '/register'];
  const isAuthRoute = authRoutes.some((route) => req.nextUrl.pathname === route);

  if (isAuthRoute && session) {
    const redirect = req.nextUrl.searchParams.get('redirect');
    return NextResponse.redirect(new URL(redirect || '/dashboard', req.url));
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/decks/:path*',
    '/study/:path*',
    '/profile/:path*',
    '/login',
    '/register',
  ],
};
