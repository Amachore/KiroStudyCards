import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { Search, BookOpen, Users, Play } from 'lucide-react';

export default async function BrowsePage() {
  const supabase = createClient();
  
  // Fetch public decks
  const { data: publicDecks } = await supabase
    .from('decks')
    .select('*, cards(count)')
    .eq('privacy', 'public')
    .order('created_at', { ascending: false })
    .limit(20);

  const decks = (publicDecks || []) as any[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-primary-600" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  StudySpark
                </span>
                <span className="text-xs font-medium italic text-gray-600">
                  by Vaughn
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-700 transition-colors hover:text-gray-900">
                Log In
              </Link>
              <Link href="/register" className="btn-primary">
                Sign Up Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
            Browse Community Decks
          </h1>
          <p className="text-xl text-primary-100">
            Discover and study from thousands of public flashcard decks
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {decks.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
            <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No public decks yet</h3>
            <p className="mt-2 text-gray-600">
              Be the first to create and share a public deck!
            </p>
            <Link href="/register" className="btn-primary mt-6 inline-flex">
              Create Your First Deck
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {decks.map((deck) => (
              <Link
                key={deck.id}
                href={`/decks/${deck.id}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Gradient Accent */}
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary-500 to-secondary-500" />

                <div className="mb-3">
                  <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                    {deck.name}
                  </h3>
                  {deck.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {deck.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">
                    {deck.cards?.[0]?.count || 0} cards
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Public
                  </span>
                </div>

                {deck.tags && deck.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {deck.tags.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-primary-50 px-2 py-1 text-xs font-semibold text-primary-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2">
                  <div className="btn-primary flex w-full items-center justify-center gap-2 text-sm">
                    <Play className="h-4 w-4" />
                    Study Now
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
