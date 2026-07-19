'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FlashCard } from './FlashCard';
import { StudySummary } from './StudySummary';
import { ArrowLeft, ArrowRight, Shuffle, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { DeckWithCards, Card, StudySessionSummary } from '@/types';

interface StudyModeProps {
  deck: DeckWithCards;
  userId: string | null;
  isGuest?: boolean;
}

export function StudyMode({ deck, userId, isGuest = false }: StudyModeProps) {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>(deck.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCards, setReviewedCards] = useState<Set<string>>(new Set());
  const [correctCards, setCorrectCards] = useState<Set<string>>(new Set());
  const [startTime] = useState(Date.now());
  const [showSummary, setShowSummary] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((reviewedCards.size / cards.length) * 100).toFixed(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showSummary) return;

      switch (e.key) {
        case ' ':
        case 'Enter':
          e.preventDefault();
          setIsFlipped(!isFlipped);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlePrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleNext();
          break;
        case 'Escape':
          e.preventDefault();
          handleExit();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFlipped, currentIndex, showSummary]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handleSelfAssessment = (correct: boolean) => {
    const cardId = currentCard.id;
    const newReviewed = new Set(reviewedCards);
    newReviewed.add(cardId);
    setReviewedCards(newReviewed);

    if (correct) {
      const newCorrect = new Set(correctCards);
      newCorrect.add(cardId);
      setCorrectCards(newCorrect);

      // Move to next card
      if (currentIndex < cards.length - 1) {
        handleNext();
      } else {
        // Finished all cards
        finishSession();
      }
    } else {
      // Add card to end of queue for review
      const newCards = [...cards];
      const cardToReview = newCards[currentIndex];
      newCards.splice(currentIndex, 1);
      newCards.push(cardToReview);
      setCards(newCards);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsShuffled(true);
  };

  const finishSession = async () => {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const accuracy = correctCards.size / reviewedCards.size;

    // Save study session (only for authenticated users)
    if (!isGuest && userId) {
      const supabase = createClient();
      await supabase.from('study_sessions').insert({
        user_id: userId,
        deck_id: deck.id,
        cards_reviewed: reviewedCards.size,
        correct_count: correctCards.size,
        duration_seconds: duration,
      } as any);
    }

    setShowSummary(true);
  };

  const handleExit = () => {
    if (reviewedCards.size > 0) {
      const confirmed = window.confirm(
        'Are you sure you want to exit? Your progress will be saved.'
      );
      if (confirmed) {
        finishSession();
      }
    } else {
      router.push('/dashboard');
    }
  };

  if (showSummary) {
    const summary: StudySessionSummary = {
      deckId: deck.id,
      cardsReviewed: reviewedCards.size,
      correctCount: correctCards.size,
      accuracy: (correctCards.size / reviewedCards.size) * 100,
      duration: Math.floor((Date.now() - startTime) / 1000),
      completedAt: new Date().toISOString(),
    };

    return <StudySummary summary={summary} deckName={deck.name} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Header */}
      <div className="border-b bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleExit}
              className="text-gray-600 hover:text-gray-900"
              title="Exit (Esc)"
            >
              <X className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{deck.name}</h1>
              <p className="text-sm text-gray-600">
                Card {currentIndex + 1} of {cards.length}
              </p>
            </div>
          </div>

          <button
            onClick={handleShuffle}
            disabled={isShuffled}
            className="btn-secondary flex items-center gap-2 text-sm"
            title="Shuffle cards"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mx-auto mt-4 max-w-5xl">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-1 text-center text-xs text-gray-600">
            {reviewedCards.size} reviewed • {correctCards.size} correct
          </p>
        </div>
      </div>

      {/* Flash Card */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl">
          <FlashCard
            card={currentCard}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped(!isFlipped)}
          />

          {/* Self-Assessment (shown when flipped) */}
          {isFlipped && (
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => handleSelfAssessment(false)}
                className="btn-secondary px-8 py-3 text-lg"
              >
                Review Again
              </button>
              <button
                onClick={() => handleSelfAssessment(true)}
                className="btn-primary px-8 py-3 text-lg"
              >
                Got It! ✓
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t bg-white px-4 py-4 shadow-sm sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            title="Previous (←)"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <p className="text-sm text-gray-600">
            Press <kbd className="rounded bg-gray-100 px-2 py-1 font-mono text-xs">Space</kbd> to
            flip
          </p>

          <button
            onClick={handleNext}
            disabled={currentIndex === cards.length - 1}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50"
            title="Next (→)"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
