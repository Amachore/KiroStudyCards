import { createClient } from '@/lib/supabase/server';
import { ProfileView } from '@/components/profile/ProfileView';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-gray-600">Manage your account and view your stats</p>
      </div>

      <ProfileView profile={profile} userId={user.id} />
    </div>
  );
}
