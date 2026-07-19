'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, LayoutDashboard, Library, User, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Decks', href: '/decks', icon: Library },
  { name: 'Profile', href: '/profile', icon: User },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/70 backdrop-blur-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/dashboard" className="group flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="h-8 w-8 text-primary-600" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-primary-600">
                  StudySpark
                </span>
                <span className="text-xs font-medium italic text-gray-600">
                  by Vaughn
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex md:gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative"
                  >
                    <motion.div
                      className={clsx(
                        'flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200',
                        isActive
                          ? 'text-primary-700'
                          : 'text-gray-600 hover:text-gray-900'
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className={clsx(
                        'h-4 w-4 transition-transform duration-200',
                        isActive && 'scale-110'
                      )} />
                      {item.name}
                      
                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 -z-10 rounded-xl bg-primary-50"
                          layoutId="activeNav"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </motion.div>
                    
                    {/* Bottom Active Bar */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-5 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400"
                        layoutId="activeBar"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sign Out Button */}
          <motion.button
            onClick={handleSignOut}
            className="group flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </motion.button>
        </div>
      </div>
      
      {/* Subtle Bottom Shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </motion.nav>
  );
}
