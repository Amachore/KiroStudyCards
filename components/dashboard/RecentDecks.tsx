'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { BookOpen, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function RecentDecks({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data: decks, isLoading } = useQuery({
    queryKey: ['recent-decks', userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('decks')
        .select('*, cards(count)')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })
        .limit(6);

      return data || [];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Recent Decks</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              <div className="mt-2 h-3 w-full rounded bg-gray-100"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!decks || decks.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Your Decks</h2>
        <div className="card text-center">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No decks yet</h3>
          <p className="mt-2 text-gray-600">Create your first deck to start studying</p>
          <Link href="/decks/new" className="btn-primary mt-4 inline-flex">
            Create Deck
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Recent Decks</h2>
        <Link href="/decks" className="text-sm text-primary-600 hover:text-primary-700">
          View all
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {decks.map((deck: any) => (
          <div key={deck.id} className="card group hover:shadow-lg">
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <Link href={`/decks/${deck.id}`}>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600">
                    {deck.name}
                  </h3>
                </Link>
                {deck.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{deck.description}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{deck.cards?.[0]?.count || 0} cards</span>
              <span>{formatDistanceToNow(new Date(deck.updated_at), { addSuffix: true })}</span>
            </div>

            {deck.tags && deck.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {deck.tags.slice(0, 3).map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <Link
              href={`/study/${deck.id}`}
              className="btn-primary mt-4 flex w-full items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              Study Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
