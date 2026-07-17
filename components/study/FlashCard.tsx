'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Card } from '@/types';

interface FlashCardProps {
  card: Card;
  isFlipped: boolean;
  onFlip: () => void;
}

export function FlashCard({ card, isFlipped, onFlip }: FlashCardProps) {
  return (
    <div 
      className="relative aspect-[3/2] w-full cursor-pointer"
      style={{ perspective: '2000px' }}
      onClick={onFlip}
    >
      {/* Ambient Shadow - moves with card */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-black/20 blur-3xl"
        initial={false}
        animate={{ 
          scale: isFlipped ? 0.95 : 0.98,
          y: isFlipped ? 25 : 20,
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      />

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 0.98 : 1,
        }}
        transition={{ 
          duration: 0.4, 
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{ transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Front */}
        <motion.div
          className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-10 shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
          initial={false}
          animate={{
            boxShadow: isFlipped 
              ? '0 10px 30px rgba(0,0,0,0.1)' 
              : '0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100/50 to-primary-200/30" />
          
          {/* Subtle Paper Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E')"
            }} 
          />

          {/* Top Edge Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-300/50 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 w-full flex-1 overflow-auto">
            <div className="prose prose-xl mx-auto max-w-none text-center prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.front}</ReactMarkdown>
            </div>
          </div>
          
          {/* Bottom Hint */}
          <motion.div 
            className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium text-gray-400"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: [0.6, 0.4, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-lg">↻</span>
            <span>Click or press Space to reveal</span>
          </motion.div>

          {/* Corner Accent */}
          <div className="absolute bottom-0 right-0 h-32 w-32 rounded-tl-full bg-gradient-to-tl from-primary-200/20 to-transparent" />
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white p-10 shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          initial={false}
          animate={{
            boxShadow: !isFlipped 
              ? '0 10px 30px rgba(0,0,0,0.1)' 
              : '0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1)',
          }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-amber-100/50 to-amber-200/30" />
          
          {/* Subtle Paper Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03]" 
            style={{
              backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E')"
            }} 
          />

          {/* Top Edge Highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

          {/* Difficulty Badge */}
          {card.difficulty && (
            <motion.div 
              className="absolute top-6 right-6 z-20"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-lg ${
                  card.difficulty === 'easy'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : card.difficulty === 'medium'
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white'
                    : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {card.difficulty}
              </span>
            </motion.div>
          )}
          
          {/* Content */}
          <div className="relative z-10 w-full flex-1 overflow-auto">
            <div className="prose prose-xl mx-auto max-w-none text-center prose-headings:text-gray-900 prose-p:text-gray-800 prose-strong:text-gray-900">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{card.back}</ReactMarkdown>
            </div>
          </div>

          {/* Corner Accent */}
          <div className="absolute bottom-0 left-0 h-32 w-32 rounded-tr-full bg-gradient-to-tr from-amber-200/20 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}
