import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'StudySpark - Master Any Subject with Smart Flashcards',
  description: 'Study smarter with spaced repetition and beautiful flash cards. Transform how you learn. By Vaughn.',
  keywords: ['flashcards', 'study', 'learning', 'education', 'spaced repetition', 'StudySpark'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
