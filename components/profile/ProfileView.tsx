'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { User as UserIcon, Mail, Calendar, Award } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ProfileViewProps {
  profile: any;
  userId: string;
}

export function ProfileView({ profile, userId }: ProfileViewProps) {
  const supabase = createClient();

  const { data: stats } = useQuery({
    queryKey: ['profile-stats', userId],
    queryFn: async () => {
      // Get deck count
      const { count: deckCount } = await supabase
        .from('decks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get total sessions
      const { data: sessions } = await supabase
        .from('study_sessions')
        .select('*')
        .eq('user_id', userId);

      const totalSessions = sessions?.length || 0;
      const totalCardsStudied = sessions?.reduce((sum, s) => sum + s.cards_reviewed, 0) || 0;
      const totalCorrect = sessions?.reduce((sum, s) => sum + s.correct_count, 0) || 0;
      const totalTime = sessions?.reduce((sum, s) => sum + s.duration_seconds, 0) || 0;

      return {
        deckCount: deckCount || 0,
        totalSessions,
        totalCardsStudied,
        totalCorrect,
        totalTime,
        averageAccuracy:
          totalCardsStudied > 0 ? Math.round((totalCorrect / totalCardsStudied) * 100) : 0,
      };
    },
  });

  return (
    <div className="space-y-6">
      {/* Profile Info Card */}
      <div className="card">
        <div className="flex items-start gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-100">
            <UserIcon className="h-12 w-12 text-primary-600" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile?.username}</h2>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{profile?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  Member since{' '}
                  {profile?.created_at
                    ? formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Decks</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats?.deckCount || 0}</p>
            </div>
            <div className="rounded-lg bg-primary-50 p-3">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Study Sessions</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats?.totalSessions || 0}</p>
            </div>
            <div className="rounded-lg bg-secondary-50 p-3">
              <Award className="h-8 w-8 text-secondary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cards Studied</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats?.totalCardsStudied || 0}
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-3">
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Accuracy</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats?.averageAccuracy || 0}%
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-3">
              <Award className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Study Time</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {Math.floor((stats?.totalTime || 0) / 60)}m
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-3">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Correct Answers</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">{stats?.totalCorrect || 0}</p>
            </div>
            <div className="rounded-lg bg-pink-50 p-3">
              <Award className="h-8 w-8 text-pink-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
