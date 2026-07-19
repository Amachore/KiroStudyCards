'use client';

import { useQuery } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { BookOpen, Brain, Target, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardStats({ userId }: { userId: string }) {
  const supabase = createClient();

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats', userId],
    queryFn: async () => {
      // Get deck count
      const { count: deckCount } = await supabase
        .from('decks')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      // Get total cards studied
      const { data: sessionsData } = await supabase
        .from('study_sessions')
        .select('cards_reviewed')
        .eq('user_id', userId);

      const sessions = sessionsData as any[];
      const totalCardsStudied = sessions?.reduce((sum, s) => sum + s.cards_reviewed, 0) || 0;

      // Get recent sessions for streak
      const { data: recentSessionsData } = await supabase
        .from('study_sessions')
        .select('created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(30);

      const recentSessions = recentSessionsData as any[];
      const streak = calculateStreak(recentSessions || []);

      // Calculate accuracy
      const totalReviewed = sessions?.reduce((sum, s) => sum + s.cards_reviewed, 0) || 0;
      const totalCorrect = sessions?.reduce((sum, s) => sum + s.correct_count, 0) || 0;
      const accuracy = totalReviewed > 0 ? Math.round((totalCorrect / totalReviewed) * 100) : 0;

      return {
        deckCount: deckCount || 0,
        cardsStudied: totalCardsStudied,
        streak,
        accuracy,
      };
    },
  });

  const statCards = [
    {
      label: 'Total Decks',
      value: stats?.deckCount || 0,
      icon: BookOpen,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      label: 'Cards Studied',
      value: stats?.cardsStudied || 0,
      icon: Brain,
      color: 'text-secondary-600',
      bgColor: 'bg-secondary-50',
      gradient: 'from-secondary-500 to-secondary-600',
    },
    {
      label: 'Study Streak',
      value: `${stats?.streak || 0} days`,
      icon: Flame,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      gradient: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Accuracy',
      value: `${stats?.accuracy || 0}%`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradient: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <motion.div 
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient Accent Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient}`} />
              
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <motion.p 
                    className="mt-2 text-3xl font-bold text-gray-900"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: index * 0.1 + 0.2 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
                
                <motion.div 
                  className={`rounded-xl ${stat.bgColor} p-3 transition-transform duration-300 group-hover:scale-110`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </motion.div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`absolute inset-0 opacity-0 bg-gradient-to-br ${stat.bgColor} transition-opacity duration-300 group-hover:opacity-20`}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function calculateStreak(sessions: { created_at: string }[]): number {
  if (sessions.length === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = sessions
    .map((s) => {
      const date = new Date(s.created_at);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    })
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort((a, b) => b - a);

  let streak = 0;
  let currentDate = today.getTime();

  for (const date of dates) {
    if (date === currentDate) {
      streak++;
      currentDate -= 24 * 60 * 60 * 1000; // Go back one day
    } else if (date < currentDate) {
      break;
    }
  }

  return streak;
}
