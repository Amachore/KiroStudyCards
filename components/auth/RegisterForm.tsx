'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Quick test account creation - uses anonymous auth to bypass email
  const createTestAccount = async () => {
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      
      // Try anonymous sign-in first (no email needed!)
      const { data: anonData, error: anonError } = await supabase.auth.signInAnonymously();
      
      if (!anonError && anonData.user) {
        // Anonymous auth worked - redirect to dashboard
        router.push('/dashboard');
        router.refresh();
        return;
      }

      // Fallback to email-based test account if anonymous fails
      const testEmail = `test_${Date.now()}@studyspark.local`;
      const testPassword = 'test123456';

      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
        options: {
          data: {
            username: `test_${Date.now()}`,
          },
          emailRedirectTo: undefined,
        },
      });

      if (signUpError) {
        // If we get rate limit error, show helpful message
        if (signUpError.message?.includes('rate') || signUpError.message?.includes('limit')) {
          setError(
            '⚠️ Email rate limit reached. Please:\n' +
            '1. Go to Supabase Dashboard\n' +
            '2. Authentication → Providers → Email\n' +
            '3. Disable "Confirm email"\n' +
            '4. Try again, or just login if you already have an account'
          );
        } else {
          throw signUpError;
        }
        return;
      }

      // Try to sign in immediately
      if (authData.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword,
        });

        if (!signInError) {
          router.push('/dashboard');
          router.refresh();
        } else {
          setError('Account created but needs email confirmation. Please check Supabase settings.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create test account');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      
      // Sign up with auto-confirm option
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
          },
          emailRedirectTo: undefined, // Disable email confirmation redirect
        },
      });

      if (signUpError) throw signUpError;

      // If user is created, sign in immediately (for development)
      if (authData.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (signInError) {
          // If sign-in fails, show a friendly message
          setError('Account created! Please check your email to confirm, then log in.');
          setTimeout(() => router.push('/login'), 2000);
          return;
        }

        // Success - redirect to dashboard
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      if (err.message?.includes('rate limit')) {
        setError('Too many sign-up attempts. Please wait a few minutes or try logging in if you already have an account.');
      } else {
        setError(err.message || 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
      )}

      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          {...register('username')}
          type="text"
          id="username"
          className="input"
          placeholder="johndoe"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="input"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          className="input"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          className="input"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Quick Test Account Button */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">For testing</span>
        </div>
      </div>

      <button
        type="button"
        onClick={createTestAccount}
        disabled={isLoading}
        className="btn-secondary w-full disabled:opacity-50"
      >
        🚀 Create Test Account (Instant)
      </button>
    </form>
  );
}
