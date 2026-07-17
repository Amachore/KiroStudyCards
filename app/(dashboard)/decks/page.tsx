import { DeckList } from '@/components/decks/DeckList';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function DecksPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Decks</h1>
          <p className="mt-1 text-gray-600">Manage and organize your study decks</p>
        </div>
        <Link href="/decks/new" className="btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Deck
        </Link>
      </div>

      <DeckList userId={user?.id!} />
    </div>
  );
}
