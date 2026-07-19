'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CardEditor } from './CardEditor';
import { CardListItem } from './CardListItem';
import { Plus, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { DeckWithCards, Card } from '@/types';

export function DeckEditor({ deck }: { deck: DeckWithCards }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const [cards, setCards] = useState<Card[]>(deck.cards || []);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(
    cards.length > 0 ? cards[0].id : null
  );
  const [isSaving, setIsSaving] = useState(false);

  const selectedCard = cards.find((c) => c.id === selectedCardId);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCards((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addCard = () => {
    const newCard: Card = {
      id: `temp-${Date.now()}`,
      deck_id: deck.id,
      front: '',
      back: '',
      front_image_url: null,
      back_image_url: null,
      difficulty: null,
      order_index: cards.length,
      created_at: new Date().toISOString(),
    };
    setCards([...cards, newCard]);
    setSelectedCardId(newCard.id);
  };

  const updateCard = (cardId: string, updates: Partial<Card>) => {
    setCards(cards.map((c) => (c.id === cardId ? { ...c, ...updates } : c)));
  };

  const deleteCard = (cardId: string) => {
    const newCards = cards.filter((c) => c.id !== cardId);
    setCards(newCards);
    if (selectedCardId === cardId) {
      setSelectedCardId(newCards.length > 0 ? newCards[0].id : null);
    }
  };

  const saveCards = async () => {
    setIsSaving(true);
    try {
      // Separate new cards from existing cards
      const newCards = cards.filter((c) => c.id.startsWith('temp-'));
      const existingCards = cards.filter((c) => !c.id.startsWith('temp-'));

      // Delete cards that are no longer in the list
      const currentCardIds = existingCards.map((c) => c.id);
      const { data: allCardsData } = await supabase
        .from('cards')
        .select('id')
        .eq('deck_id', deck.id);

      const allCards = allCardsData as any[];
      const cardsToDelete =
        allCards?.filter((c) => !currentCardIds.includes(c.id)).map((c) => c.id) || [];

      if (cardsToDelete.length > 0) {
        await supabase.from('cards').delete().in('id', cardsToDelete);
      }

      // Insert new cards
      if (newCards.length > 0) {
        const { data: insertedCards } = await supabase
          .from('cards')
          .insert(
            newCards.map((c, index) => ({
              deck_id: deck.id,
              front: c.front,
              back: c.back,
              front_image_url: c.front_image_url,
              back_image_url: c.back_image_url,
              difficulty: c.difficulty,
              order_index: existingCards.length + index,
            })) as any
          )
          .select();

        // Update local state with real IDs
        if (insertedCards) {
          const updatedCards = [...existingCards];
          newCards.forEach((tempCard, index) => {
            updatedCards.push(insertedCards[index]);
          });
          setCards(updatedCards);
        }
      }

      // Update existing cards with new order and content
      if (existingCards.length > 0) {
        await Promise.all(
          existingCards.map((card, index) =>
            (supabase
              .from('cards')
              .update({
                front: card.front,
                back: card.back,
                front_image_url: card.front_image_url,
                back_image_url: card.back_image_url,
                difficulty: card.difficulty,
                order_index: index,
              })
              .eq('id', card.id) as any)
          )
        );
      }

      // Update deck's updated_at timestamp
      await supabase
        .from('decks')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', deck.id);

      queryClient.invalidateQueries({ queryKey: ['decks'] });
      router.refresh();
    } catch (error) {
      console.error('Failed to save cards:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Card List Sidebar */}
      <div className="card lg:col-span-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Cards ({cards.length})</h2>
          <button onClick={addCard} className="btn-primary flex items-center gap-1 text-sm">
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {cards.map((card, index) => (
                <CardListItem
                  key={card.id}
                  card={card}
                  index={index}
                  isSelected={selectedCardId === card.id}
                  onSelect={() => setSelectedCardId(card.id)}
                  onDelete={() => deleteCard(card.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {cards.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            <p>No cards yet</p>
            <button onClick={addCard} className="btn-primary mt-3">
              Add First Card
            </button>
          </div>
        )}
      </div>

      {/* Card Editor */}
      <div className="card lg:col-span-2">
        {selectedCard ? (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Edit Card</h2>
              <button
                onClick={saveCards}
                disabled={isSaving}
                className="btn-primary flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save All'}
              </button>
            </div>
            <CardEditor card={selectedCard} onUpdate={(updates) => updateCard(selectedCard.id, updates)} />
          </>
        ) : (
          <div className="flex h-64 items-center justify-center text-gray-500">
            <p>Select a card to edit or add a new one</p>
          </div>
        )}
      </div>
    </div>
  );
}
