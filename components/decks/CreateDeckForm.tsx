'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Loader2, Plus, X } from 'lucide-react';

const deckSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  privacy: z.enum(['private', 'unlisted', 'public']),
});

type DeckFormData = z.infer<typeof deckSchema>;

const AVAILABLE_TAGS = [
  'Math',
  'Science',
  'Languages',
  'History',
  'Computer Science',
  'Medicine',
  'Business',
  'Art',
  'Music',
  'Other',
];

export function CreateDeckForm() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeckFormData>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      privacy: 'private',
    },
  });

  const onSubmit = async (data: DeckFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      const { data: deck, error: createError } = await supabase
        .from('decks')
        .insert({
          user_id: user.id,
          name: data.name,
          description: data.description || null,
          privacy: data.privacy,
          tags: selectedTags,
        })
        .select()
        .single();

      if (createError) throw createError;

      router.push(`/decks/${deck.id}/edit`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to create deck');
    } finally {
      setIsLoading(false);
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      addTag(customTag.trim());
      setCustomTag('');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Deck Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="input"
          placeholder="e.g., Spanish Vocabulary"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          rows={3}
          className="input"
          placeholder="What's this deck about?"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Subject Tags</label>
        <div className="mb-3 flex flex-wrap gap-2">
          {AVAILABLE_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => addTag(tag)}
              disabled={selectedTags.includes(tag) || selectedTags.length >= 5}
              className="rounded-full border border-gray-300 px-3 py-1 text-sm hover:border-primary-500 hover:bg-primary-50 disabled:opacity-50"
            >
              {tag}
            </button>
          ))}
        </div>

        {selectedTags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-sm text-white"
              >
                {tag}
                <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-200">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTag())}
            placeholder="Add custom tag"
            className="input flex-1"
            disabled={selectedTags.length >= 5}
          />
          <button
            type="button"
            onClick={handleAddCustomTag}
            disabled={!customTag.trim() || selectedTags.length >= 5}
            className="btn-secondary"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">Maximum 5 tags</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Privacy</label>
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input
              {...register('privacy')}
              type="radio"
              value="private"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <div className="font-medium text-gray-900">Private</div>
              <div className="text-sm text-gray-600">Only you can view this deck</div>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              {...register('privacy')}
              type="radio"
              value="unlisted"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <div className="font-medium text-gray-900">Unlisted</div>
              <div className="text-sm text-gray-600">Anyone with the link can view</div>
            </div>
          </label>
          <label className="flex items-center gap-3">
            <input
              {...register('privacy')}
              type="radio"
              value="public"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <div>
              <div className="font-medium text-gray-900">Public</div>
              <div className="text-sm text-gray-600">Visible in community browse</div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary flex-1"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="btn-primary flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Deck'
          )}
        </button>
      </div>
    </form>
  );
}
