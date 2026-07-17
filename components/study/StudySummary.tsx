'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle, TrendingUp, Clock, Target } from 'lucide-react';
import type { StudySessionSummary } from '@/types';

interface StudySummaryProps {
  summary: StudySessionSummary;
  deckName: string;
}

export function StudySummary({ summary, deckName }: StudySummaryProps) {
  const router = useRouter();

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="card text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">Study Session Complete!</h1>
          <p className="mb-8 text-gray-600">Great work on {deckName}</p>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-primary-50 p-4">
              <TrendingUp className="mx-auto mb-2 h-8 w-8 text-primary-600" />
              <p className="text-sm font-medium text-gray-600">Cards Reviewed</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{summary.cardsReviewed}</p>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <Target className="mx-auto mb-2 h-8 w-8 text-green-600" />
              <p className="text-sm font-medium text-gray-600">Correct</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">{summary.correctCount}</p>
            </div>

            <div className="rounded-lg bg-secondary-50 p-4">
              <CheckCircle className="mx-auto mb-2 h-8 w-8 text-secondary-600" />
              <p className="text-sm font-medium text-gray-600">Accuracy</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {summary.accuracy.toFixed(0)}%
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <Clock className="mx-auto mb-2 h-8 w-8 text-blue-600" />
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatDuration(summary.duration)}
              </p>
            </div>
          </div>

          {/* Feedback Message */}
          <div className="mb-8 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 p-6">
            {summary.accuracy >= 90 ? (
              <>
                <p className="text-lg font-semibold text-gray-900">Outstanding! 🎉</p>
                <p className="mt-1 text-gray-600">
                  You've mastered this deck. Keep up the excellent work!
                </p>
              </>
            ) : summary.accuracy >= 70 ? (
              <>
                <p className="text-lg font-semibold text-gray-900">Great Progress! 🌟</p>
                <p className="mt-1 text-gray-600">
                  You're doing well. Review the missed cards to improve further.
                </p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold text-gray-900">Keep Practicing! 💪</p>
                <p className="mt-1 text-gray-600">
                  Learning takes time. Review this deck again to strengthen your knowledge.
                </p>
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => router.push(`/study/${summary.deckId}`)}
              className="btn-primary flex-1"
            >
              Study Again
            </button>
            <Link href="/dashboard" className="btn-secondary flex-1">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
