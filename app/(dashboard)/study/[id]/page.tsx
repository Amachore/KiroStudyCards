import { StudyMode } from '@/components/study/StudyMode';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default async function StudyPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow studying public/unlisted decks without authentication
  const { data: deckData } = await supabase
    .from('decks')
    .select('*, cards(*)')
    .eq('id', params.id)
    .single();

  if (!deckData) {
    redirect('/');
  }

  const deck = deckData as any;
  
  // Check access permissions
  const isOwner = user && deck.user_id === user.id;
  const isPublic = deck.privacy === 'public' || deck.privacy === 'unlisted';
  
  // Only block if deck is private and user is not the owner
  if (deck.privacy === 'private' && !isOwner) {
    redirect('/login?redirect=/study/' + params.id);
  }

  // Sort cards by order_index
  const sortedCards = (deck.cards || []).sort(
    (a: any, b: any) => a.order_index - b.order_index
  );

  if (sortedCards.length === 0) {
    redirect(`/decks/${deck.id}`);
  }

  // Guest users can study but won't have progress saved
  return (
    <div className="relative">
      {/* Guest Study Banner */}
      {!user && (
        <div className="mx-auto mb-4 max-w-4xl">
          <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-amber-900">Studying as a guest</p>
                  <p className="text-sm text-amber-700">
                    Your progress won't be saved. Sign up to track your study sessions!
                  </p>
                </div>
              </div>
              <Link
                href={`/register?redirect=/study/${params.id}`}
                className="btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <LogIn className="h-4 w-4" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
      
      <StudyMode 
        deck={{ ...deck, cards: sortedCards }} 
        userId={user?.id || null} 
        isGuest={!user}
      />
    </div>
  );
}
