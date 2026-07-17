import { createClient } from '@/lib/supabase/server';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { RecentDecks } from '@/components/dashboard/RecentDecks';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-600">Welcome back! Ready to study?</p>
        </div>
        <Link href="/decks/new" className="btn-primary flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create Deck
        </Link>
      </div>

      <DashboardStats userId={user?.id!} />
      <RecentDecks userId={user?.id!} />
    </div>
  );
}
