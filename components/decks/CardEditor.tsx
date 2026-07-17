'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Eye, EyeOff } from 'lucide-react';
import type { Card } from '@/types';

interface CardEditorProps {
  card: Card;
  onUpdate: (updates: Partial<Card>) => void;
}

export function CardEditor({ card, onUpdate }: CardEditorProps) {
  const [showFrontPreview, setShowFrontPreview] = useState(false);
  const [showBackPreview, setShowBackPreview] = useState(false);

  return (
    <div className="space-y-6">
      {/* Front Side */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Front (Question) <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowFrontPreview(!showFrontPreview)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {showFrontPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showFrontPreview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {showFrontPreview ? (
          <div className="min-h-[120px] rounded-lg border border-gray-300 bg-gray-50 p-4">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {card.front || '*No content*'}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <textarea
            value={card.front}
            onChange={(e) => onUpdate({ front: e.target.value })}
            rows={5}
            className="input font-mono text-sm"
            placeholder="Enter the question or prompt (supports markdown)"
          />
        )}
        <p className="mt-1 text-xs text-gray-500">
          Supports markdown: **bold**, *italic*, `code`, lists, etc.
        </p>
      </div>

      {/* Back Side */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Back (Answer) <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setShowBackPreview(!showBackPreview)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            {showBackPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showBackPreview ? 'Edit' : 'Preview'}
          </button>
        </div>

        {showBackPreview ? (
          <div className="min-h-[160px] rounded-lg border border-gray-300 bg-gray-50 p-4">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {card.back || '*No content*'}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <textarea
            value={card.back}
            onChange={(e) => onUpdate({ back: e.target.value })}
            rows={7}
            className="input font-mono text-sm"
            placeholder="Enter the answer or explanation (supports markdown)"
          />
        )}
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Difficulty (Optional)</label>
        <div className="flex gap-2">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => onUpdate({ difficulty: card.difficulty === level ? null : level })}
              className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium capitalize transition-colors ${
                card.difficulty === level
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-primary-500 hover:bg-primary-50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Character Counts */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          Front: {card.front.length}/500 characters
        </span>
        <span>
          Back: {card.back.length}/1000 characters
        </span>
      </div>
    </div>
  );
}
