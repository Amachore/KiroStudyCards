import { DeckEditor } from '@/components/decks/DeckEditor';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EditDeckPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: deck } = await supabase
    .from('decks')
    .select('*, cards(*)')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!deck) {
    redirect('/decks');
  }

  // Sort cards by order_index
  const sortedCards = (deck.cards || []).sort(
    (a: any, b: any) => a.order_index - b.order_index
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/decks" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Deck</h1>
          <p className="mt-1 text-gray-600">{deck.name}</p>
        </div>
      </div>

      <DeckEditor deck={{ ...deck, cards: sortedCards }} />
    </div>
  );
}
