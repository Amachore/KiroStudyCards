import { RegisterForm } from '@/components/auth/RegisterForm';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <BookOpen className="h-10 w-10 text-primary-600" />
            <span className="text-3xl font-bold text-gray-900">FlashCard</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">Start learning smarter today</p>
        </div>

        <div className="card">
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
