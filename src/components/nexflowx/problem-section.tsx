'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Unlink, Plug, TrendingDown, Eye } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const problemIcons = [Unlink, Plug, TrendingDown, Eye];

const statusColors: Record<string, string> = {
  DOWN: '#FF3B30',
  SLOW: '#FF9F0A',
  NONE: '#FF3B30',
};

export function ProblemSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="problema" className="relative py-24 sm:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--nx-font-heading)', letterSpacing: '-0.03em' }}
          >
            {t.problem.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.problem.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Problems */}
          <div className="space-y-8">
            {t.problem.items.map((problem, i) => {
              const Icon = problemIcons[i];
              return (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                  className="flex gap-5 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-[#333F4D] bg-[#151A22] flex items-center justify-center group-hover:border-[#00FF66] group-hover:shadow-[0_0_20px_rgba(0,255,102,0.15)] transition-all duration-300">
                    <Icon className="w-6 h-6 text-[#00FF66]" />
                  </div>
                  <div>
                    <h3
                      className="text-lg font-semibold text-white mb-1"
                      style={{ fontFamily: 'var(--nx-font-heading)' }}
                    >
                      {problem.title}
                    </h3>
                    <p className="text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-body)' }}>
                      {problem.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="highlight-quote"
            >
              {t.problem.quote}
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl border border-[#333F4D] bg-[#1F2833] p-8 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF3B30] via-[#FF9F0A] to-[#FF3B30]" />

              {/* Animated broken network visual */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#FF3B30] animate-pulse" />
                  <span className="text-sm font-mono text-[#FF3B30]">{t.problem.alert}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  {t.problem.providers.map((provider) => (
                    <div
                      key={provider.label}
                      className="p-3 rounded-lg border border-[#333F4D] bg-[#151A22] text-center"
                    >
                      <div className="text-xs text-[#C5C6C7] mb-2" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                        {provider.label}
                      </div>
                      <div
                        className="text-sm font-bold"
                        style={{ color: statusColors[provider.status] || '#FF3B30', fontFamily: 'var(--nx-font-mono)' }}
                      >
                        {provider.status}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-[#151A22] border border-[#FF3B30]/30">
                  <div className="text-xs text-[#C5C6C7] mb-2" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                    {t.problem.revenueLabel}
                  </div>
                  <div className="text-2xl font-bold text-[#FF3B30]" style={{ fontFamily: 'var(--nx-font-heading)' }}>
                    {t.problem.revenueValue}
                    <span className="text-sm text-[#C5C6C7] font-normal ml-2">{t.problem.revenueUnit}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[#333F4D] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '78%' } : {}}
                      transition={{ delay: 1, duration: 1.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-[#FF9F0A] to-[#FF3B30]"
                    />
                  </div>
                  <div className="text-xs text-[#FF9F0A] mt-1" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                    {t.problem.routesCompromised}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
