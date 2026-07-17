'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import type { Card } from '@/types';

interface CardListItemProps {
  card: Card;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export function CardListItem({ card, index, isSelected, onSelect, onDelete }: CardListItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={clsx(
        'flex items-center gap-2 rounded-lg border p-3 transition-colors',
        isSelected
          ? 'border-primary-500 bg-primary-50'
          : 'border-gray-200 bg-white hover:border-gray-300',
        isDragging && 'opacity-50'
      )}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing"
      >
        <GripVertical className="h-5 w-5" />
      </button>

      <button onClick={onSelect} className="flex-1 text-left">
        <div className="text-sm font-medium text-gray-900">Card {index + 1}</div>
        <div className="line-clamp-1 text-xs text-gray-600">
          {card.front || 'Empty front side'}
        </div>
      </button>

      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-600"
        title="Delete card"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
