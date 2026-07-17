export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          username: string;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          username: string;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          username?: string;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      decks: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          tags: string[];
          privacy: 'private' | 'unlisted' | 'public';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          description?: string | null;
          tags?: string[];
          privacy?: 'private' | 'unlisted' | 'public';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          description?: string | null;
          tags?: string[];
          privacy?: 'private' | 'unlisted' | 'public';
          created_at?: string;
          updated_at?: string;
        };
      };
      cards: {
        Row: {
          id: string;
          deck_id: string;
          front: string;
          back: string;
          front_image_url: string | null;
          back_image_url: string | null;
          difficulty: 'easy' | 'medium' | 'hard' | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          deck_id: string;
          front: string;
          back: string;
          front_image_url?: string | null;
          back_image_url?: string | null;
          difficulty?: 'easy' | 'medium' | 'hard' | null;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          deck_id?: string;
          front?: string;
          back?: string;
          front_image_url?: string | null;
          back_image_url?: string | null;
          difficulty?: 'easy' | 'medium' | 'hard' | null;
          order_index?: number;
          created_at?: string;
        };
      };
      study_sessions: {
        Row: {
          id: string;
          user_id: string;
          deck_id: string;
          cards_reviewed: number;
          correct_count: number;
          duration_seconds: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          deck_id: string;
          cards_reviewed: number;
          correct_count: number;
          duration_seconds: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          deck_id?: string;
          cards_reviewed?: number;
          correct_count?: number;
          duration_seconds?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      privacy_level: 'private' | 'unlisted' | 'public';
      difficulty_level: 'easy' | 'medium' | 'hard';
    };
  };
}
