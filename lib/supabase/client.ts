import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database';

// Validate environment variables at runtime (not during build)
function validateEnv() {
  if (typeof window === 'undefined') return; // Skip during SSR/build
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    console.error(
      '❌ Missing NEXT_PUBLIC_SUPABASE_URL environment variable. ' +
      'Please add it to your Vercel environment variables.'
    );
  }

  if (!supabaseAnonKey) {
    console.error(
      '❌ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable. ' +
      'Please add it to your Vercel environment variables.'
    );
  }
}

// Run validation in browser only
validateEnv();

export const createClient = () => {
  return createClientComponentClient<Database>();
};
