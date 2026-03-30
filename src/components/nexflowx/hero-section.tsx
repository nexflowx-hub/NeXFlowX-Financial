'use client';

import { motion } from 'framer-motion';
import { AnimatedNetwork } from './animated-network';
import { ArrowDown, Globe, Zap, Shield, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const statIcons = [Globe, Zap, Shield, BarChart3];

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 grid-bg"
          style={{
            opacity: 0.08,
            backgroundImage:
              'linear-gradient(#333F4D 1px, transparent 1px), linear-gradient(90deg, #333F4D 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-[#00FF66] opacity-[0.03] blur-[120px]" />
        <AnimatedNetwork />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#333F4D] bg-[#151A22] mb-6"
              style={{ fontFamily: 'var(--nx-font-mono)' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
              <span className="text-sm text-[#C5C6C7]">{t.hero.badge}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
              style={{ fontFamily: 'var(--nx-font-heading)', letterSpacing: '-0.03em' }}
            >
              NeXFlow
              <span className="text-[#00FF66]" style={{ textShadow: '0 0 30px rgba(0,255,102,0.3)' }}>
                X
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl sm:text-2xl text-[#00FF66] mb-4"
              style={{ fontFamily: 'var(--nx-font-mono)', fontWeight: 500 }}
            >
              {t.hero.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="highlight-quote"
            >
              {t.hero.quote}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
              style={{ fontFamily: 'var(--nx-font-mono)' }}
            >
              <p className="text-sm text-[#C5C6C7]">
                {t.hero.subQuote}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {t.hero.stats.map((stat, i) => {
              const Icon = statIcons[i];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: '#00FF66' }}
                  className="p-6 rounded-xl border border-[#333F4D] bg-[#151A22]/80 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,102,0.15)]"
                >
                  <Icon className="w-8 h-8 text-[#00FF66] mb-3" style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,102,0.3))' }} />
                  <div
                    className="text-3xl sm:text-4xl font-bold text-white mb-1"
                    style={{ fontFamily: 'var(--nx-font-heading)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-body)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#C5C6C7] uppercase tracking-widest" style={{ fontFamily: 'var(--nx-font-mono)' }}>
            {t.hero.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-4 h-4 text-[#00FF66]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
