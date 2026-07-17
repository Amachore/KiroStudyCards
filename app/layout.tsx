import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'FlashCard - Study Smarter',
  description: 'A modern flash card study platform for students and lifelong learners',
  keywords: ['flashcards', 'study', 'learning', 'education', 'spaced repetition'],
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
