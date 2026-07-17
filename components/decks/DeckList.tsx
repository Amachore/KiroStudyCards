'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { BookOpen, Play, Edit, Trash2, Grid, List as ListIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import clsx from 'clsx';

type ViewMode = 'grid' | 'list';

export function DeckList({ userId }: { userId: string }) {
  const supabase = createClient();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState('updated_at');

  const { data: decks, isLoading } = useQuery({
    queryKey: ['decks', userId, sortBy],
    queryFn: async () => {
      let query = supabase
        .from('decks')
        .select('*, cards(count)')
        .eq('user_id', userId);

      if (sortBy === 'name') {
        query = query.order('name', { ascending: true });
      } else {
        query = query.order(sortBy, { ascending: false });
      }

      const { data } = await query;
      return data || [];
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!decks || decks.length === 0) {
    return (
      <div className="card text-center">
        <BookOpen className="mx-auto h-16 w-16 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No decks yet</h3>
        <p className="mt-2 text-gray-600">Create your first deck to start studying</p>
        <Link href="/decks/new" className="btn-primary mt-4 inline-flex">
          Create Deck
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500"
          >
            <option value="updated_at">Recently Updated</option>
            <option value="created_at">Date Created</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="flex gap-1 rounded-lg border border-gray-300 p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={clsx(
              'rounded p-1',
              viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={clsx(
              'rounded p-1',
              viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <ListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Deck Display */}
      {viewMode === 'grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {decks.map((deck: any) => (
            <DeckCard key={deck.id} deck={deck} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {decks.map((deck: any) => (
            <DeckListItem key={deck.id} deck={deck} />
          ))}
        </div>
      )}
    </div>
  );
}

function DeckCard({ deck }: { deck: any }) {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
      
      {/* Hover Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-primary-100/0 transition-all duration-300 group-hover:from-primary-50/50 group-hover:to-primary-100/30"
      />

      <div className="relative z-10">
        <div className="mb-3">
          <Link href={`/decks/${deck.id}`}>
            <h3 className="font-bold text-gray-900 transition-colors group-hover:text-primary-600">
              {deck.name}
            </h3>
          </Link>
          {deck.description && (
            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{deck.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="font-medium">{deck.cards?.[0]?.count || 0} cards</span>
          <span>{formatDistanceToNow(new Date(deck.updated_at), { addSuffix: true })}</span>
        </div>

        {deck.tags && deck.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {deck.tags.slice(0, 3).map((tag: string) => (
              <motion.span
                key={tag}
                className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700"
                whileHover={{ scale: 1.1 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <Link href={`/study/${deck.id}`} className="flex-1">
            <motion.div
              className="btn-primary flex w-full items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-4 w-4" />
              Study
            </motion.div>
          </Link>
          <Link href={`/decks/${deck.id}/edit`}>
            <motion.div
              className="btn-secondary"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Edit className="h-4 w-4" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function DeckListItem({ deck }: { deck: any }) {
  return (
    <div className="card flex items-center justify-between">
      <div className="flex-1">
        <Link href={`/decks/${deck.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-primary-600">{deck.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
          <span>{deck.cards?.[0]?.count || 0} cards</span>
          <span>{formatDistanceToNow(new Date(deck.updated_at), { addSuffix: true })}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/study/${deck.id}`} className="btn-primary flex items-center gap-2">
          <Play className="h-4 w-4" />
          Study
        </Link>
        <Link href={`/decks/${deck.id}/edit`} className="btn-secondary">
          <Edit className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
