import { CreateDeckForm } from '@/components/decks/CreateDeckForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewDeckPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/decks" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Deck</h1>
          <p className="mt-1 text-gray-600">Add cards and organize your study materials</p>
        </div>
      </div>

      <div className="card">
        <CreateDeckForm />
      </div>
    </div>
  );
}
