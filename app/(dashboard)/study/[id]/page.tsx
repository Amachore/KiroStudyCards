import { StudyMode } from '@/components/study/StudyMode';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function StudyPage({ params }: { params: { id: string } }) {
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
    .or(`user_id.eq.${user.id},privacy.eq.public,privacy.eq.unlisted`)
    .single();

  if (!deck) {
    redirect('/decks');
  }

  // Sort cards by order_index
  const sortedCards = (deck.cards || []).sort(
    (a: any, b: any) => a.order_index - b.order_index
  );

  if (sortedCards.length === 0) {
    redirect(`/decks/${deck.id}/edit`);
  }

  return <StudyMode deck={{ ...deck, cards: sortedCards }} userId={user.id} />;
}
