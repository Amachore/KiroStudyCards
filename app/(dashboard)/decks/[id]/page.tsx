import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Edit, Play, Share2, LogIn } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default async function DeckViewPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Allow viewing public/unlisted decks without authentication
  const { data: deckData } = await supabase
    .from('decks')
    .select('*, cards(*)')
    .eq('id', params.id)
    .single();

  if (!deckData) {
    redirect('/');
  }

  const deck = deckData as any;
  
  // Check if user can view this deck
  const isOwner = user && deck.user_id === user.id;
  const isPublic = deck.privacy === 'public' || deck.privacy === 'unlisted';
  
  // Only redirect if deck is private and user is not the owner
  if (deck.privacy === 'private' && !isOwner) {
    redirect('/login?redirect=/decks/' + params.id);
  }

  const sortedCards = (deck.cards || []).sort(
    (a: any, b: any) => a.order_index - b.order_index
  );

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{deck.name}</h1>
          {deck.description && <p className="mt-1 text-gray-600">{deck.description}</p>}
        </div>
      </div>

      {/* Guest Banner - Show if not logged in */}
      {!user && (
        <div className="rounded-xl border-2 border-primary-200 bg-primary-50 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-primary-900">
                👋 You're browsing as a guest
              </h3>
              <p className="text-sm text-primary-700">
                Sign in to create your own decks, track progress, and save your study sessions!
              </p>
            </div>
            <Link
              href={`/register?redirect=/decks/${params.id}`}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <LogIn className="h-4 w-4" />
              Sign Up Free
            </Link>
          </div>
        </div>
      )}

      {/* Deck Info Card */}
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div>
              <span className="font-medium">{sortedCards.length}</span> cards
            </div>
            <div>
              Updated {formatDistanceToNow(new Date(deck.updated_at), { addSuffix: true })}
            </div>
            <div>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  deck.privacy === 'private'
                    ? 'bg-gray-100 text-gray-700'
                    : deck.privacy === 'public'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {deck.privacy}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/study/${deck.id}`} className="btn-primary flex items-center gap-2">
              <Play className="h-4 w-4" />
              Study Now
            </Link>
            {isOwner && (
              <Link href={`/decks/${deck.id}/edit`} className="btn-secondary flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Link>
            )}
          </div>
        </div>

        {deck.tags && deck.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {deck.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Cards Preview */}
      <div className="card">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Cards Preview</h2>
        {sortedCards.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p>No cards yet</p>
            {isOwner && (
              <Link href={`/decks/${deck.id}/edit`} className="btn-primary mt-3 inline-flex">
                Add Cards
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedCards.slice(0, user ? sortedCards.length : 3).map((card: any, index: number) => (
              <div key={card.id} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Card {index + 1}</span>
                  {card.difficulty && (
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold uppercase ${
                        card.difficulty === 'easy'
                          ? 'bg-green-100 text-green-700'
                          : card.difficulty === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {card.difficulty}
                    </span>
                  )}
                </div>
                <p className="text-gray-900">{card.front}</p>
              </div>
            ))}
            
            {/* Show preview limit message for guests */}
            {!user && sortedCards.length > 3 && (
              <div className="rounded-lg border-2 border-dashed border-primary-300 bg-primary-50/50 p-6 text-center">
                <p className="mb-3 text-sm font-medium text-primary-900">
                  🔒 {sortedCards.length - 3} more cards available
                </p>
                <Link
                  href={`/register?redirect=/decks/${params.id}`}
                  className="btn-primary inline-flex"
                >
                  Sign Up to View All Cards
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
