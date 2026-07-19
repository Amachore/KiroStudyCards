'use client';

import Link from 'next/link';
import { BookOpen, Users, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="absolute top-0 z-20 w-full border-b border-white/10 bg-transparent backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="h-8 w-8 text-white" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white">
                  StudySpark
                </span>
                <span className="text-xs font-medium italic text-white/70">
                  by Vaughn
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/browse" className="text-white/90 transition-colors hover:text-white">
                Browse Decks
              </Link>
              <Link href="/login" className="text-white/90 transition-colors hover:text-white">
                Log In
              </Link>
              <Link 
                href="/register" 
                className="rounded-lg bg-white px-5 py-2.5 font-semibold text-primary-600 transition-all hover:bg-white/90"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Cinematic Full-Bleed */}
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-primary-900/95" />
          <div 
            className="h-full w-full bg-cover bg-center opacity-40"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80')",
              filter: 'blur(0.5px)',
            }}
          />
          {/* Subtle Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E')"
          }} />
        </div>

        {/* Content - Bottom Left Positioned */}
        <div className="relative z-10 flex min-h-[85vh] items-end px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              {/* Small Label */}
              <div className="mb-4 inline-block rounded-full border border-primary-300/30 bg-primary-400/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="text-sm font-medium text-primary-200">Study Platform for Modern Learners</span>
              </div>
              
              {/* Giant Statement Headline */}
              <h1 className="mb-6 font-bold leading-[0.95] tracking-tight text-white">
                <span className="block text-6xl sm:text-7xl lg:text-8xl">Master Any</span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl">Subject</span>
              </h1>
              
              {/* Supporting Text */}
              <p className="mb-10 max-w-2xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
                Study smarter with spaced repetition and beautiful flash cards. 
                Transform how you learn with our distraction-free platform.
              </p>
              
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-6">
                <Link 
                  href="/register" 
                  className="group relative overflow-hidden rounded-xl border-2 border-white bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
                >
                  Start Learning Free
                </Link>
                <Link
                  href="#features"
                  className="group flex items-center gap-2 text-lg font-medium text-white transition-colors hover:text-primary-200"
                >
                  <span className="border-b-2 border-white/40 pb-0.5 group-hover:border-primary-200">
                    See how it works
                  </span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Gradient Fade to Next Section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Trust Bar - Mini Minimalist */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-8 text-sm font-medium uppercase tracking-wider text-gray-500">
            Trusted by students at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60 grayscale transition-all hover:opacity-80">
            <div className="text-2xl font-bold text-gray-700">MIT</div>
            <div className="text-2xl font-bold text-gray-700">Stanford</div>
            <div className="text-2xl font-bold text-gray-700">Harvard</div>
            <div className="text-2xl font-bold text-gray-700">Southville</div>
            <div className="text-2xl font-bold text-gray-700">Oxford</div>
            <div className="text-2xl font-bold text-gray-700">Cambridge</div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="relative bg-white px-4 py-24 sm:px-6 lg:px-8">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E')"
        }} />
        
        <div className="relative mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-5xl font-bold tracking-tight text-gray-900">
            Everything You Need
          </h2>
          <p className="mb-16 text-center text-xl text-gray-600">
            Powerful features designed for effective learning
          </p>
          
          {/* Bento Grid Layout */}
          <div className="grid gap-6 md:grid-cols-6 lg:gap-8">
            {/* Large Feature - Spaced Repetition */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 p-8 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:col-span-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative z-10">
                <motion.div 
                  className="mb-4 inline-flex rounded-xl bg-white/20 p-3 backdrop-blur-sm"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <TrendingUp className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="mb-3 text-3xl font-bold text-white">
                  Smart Spaced Repetition
                </h3>
                <p className="mb-6 max-w-lg text-lg text-primary-50">
                  Our algorithm optimizes review timing based on your performance, 
                  ensuring you remember what you learn for the long term.
                </p>
                <div className="flex gap-2">
                  <motion.span 
                    className="rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    AI-Powered
                  </motion.span>
                  <motion.span 
                    className="rounded-full bg-white/20 px-3 py-1 text-sm text-white backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    Adaptive
                  </motion.span>
                </div>
              </div>
              {/* Decorative Element */}
              <motion.div 
                className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>

            {/* Progress Tracking */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-primary-300 hover:shadow-xl md:col-span-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div 
                className="mb-4 inline-flex rounded-xl bg-primary-50 p-3"
                whileHover={{ scale: 1.1, rotate: 15 }}
              >
                <TrendingUp className="h-6 w-6 text-primary-600" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                Visualize your learning journey with detailed stats and insights
              </p>
              {/* Mini Chart Visualization */}
              <div className="mt-6 flex items-end justify-between gap-1">
                {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                  <motion.div 
                    key={i}
                    className="w-full rounded-t bg-gradient-to-t from-primary-500 to-primary-400"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Collaborative Learning */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-secondary-300 hover:shadow-xl md:col-span-3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div 
                className="mb-4 inline-flex rounded-xl bg-secondary-50 p-3"
                whileHover={{ scale: 1.1, rotate: -15 }}
              >
                <Users className="h-6 w-6 text-secondary-600" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Collaborative Learning
              </h3>
              <p className="mb-4 text-gray-600">
                Share decks with friends and discover community-created content
              </p>
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-primary-400 to-secondary-400"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  />
                ))}
                <motion.div 
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-sm font-semibold text-gray-600"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  whileHover={{ scale: 1.2 }}
                >
                  +5k
                </motion.div>
              </div>
            </motion.div>

            {/* Rich Content Support */}
            <motion.div 
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-8 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-gray-300 hover:shadow-xl md:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.div 
                className="mb-4 inline-flex rounded-xl bg-white p-3 shadow-sm"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="h-6 w-6 text-primary-600" />
              </motion.div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Rich Content Support
              </h3>
              <p className="mb-4 text-gray-600">
                Markdown, images, code blocks, and more
              </p>
              {/* Code Block Example */}
              <motion.div 
                className="rounded-lg bg-gray-900 p-4 font-mono text-xs text-green-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div>{'function learn() {'}</div>
                <div className="pl-4">{'  return "knowledge";'}</div>
                <div>{'}'}</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mini Minimalist */}
      <section className="relative overflow-hidden bg-primary-600 px-4 py-32 sm:px-6 lg:px-8">
        {/* Subtle Radial Vignette */}
        <div className="absolute inset-0 bg-gradient-radial from-primary-600 via-primary-600 to-primary-800 opacity-50" />
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary-200">
            Ready to Start?
          </p>
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Join 10,000+ Active Learners
          </h2>
          <p className="mb-12 text-xl text-primary-100">
            Free forever. No credit card required.
          </p>
          <Link 
            href="/register" 
            className="inline-block rounded-xl border-2 border-white bg-transparent px-10 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary-600"
          >
            Create Free Account
          </Link>
          <p className="mt-8 text-sm text-primary-300">
            Used by students at MIT, Stanford, Harvard, Southville, and more
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary-600" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">StudySpark</span>
                <span className="text-xs font-medium italic text-gray-600">by Vaughn</span>
              </div>
            </div>
            <p className="text-gray-600">&copy; 2026 StudySpark. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
