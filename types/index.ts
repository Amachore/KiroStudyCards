import { Database } from './database';

export type Deck = Database['public']['Tables']['decks']['Row'];
export type Card = Database['public']['Tables']['cards']['Row'];
export type StudySession = Database['public']['Tables']['study_sessions']['Row'];
export type User = Database['public']['Tables']['users']['Row'];

export type DeckWithCards = Deck & {
  cards: Card[];
};

export type DeckWithStats = Deck & {
  card_count: number;
  last_studied: string | null;
  total_sessions: number;
};

export type PrivacyLevel = 'private' | 'unlisted' | 'public';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface StudyProgress {
  currentIndex: number;
  reviewedCards: Set<string>;
  correctCards: Set<string>;
  isFlipped: boolean;
}

export interface StudySessionSummary {
  deckId: string;
  cardsReviewed: number;
  correctCount: number;
  accuracy: number;
  duration: number;
  completedAt: string;
}
