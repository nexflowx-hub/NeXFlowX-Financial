'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShoppingCart, Search, Route, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const stepIcons = [ShoppingCart, Search, Route, CheckCircle2];

export function EngineSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="engine" className="relative py-24 sm:py-32" ref={ref}>
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
            {t.engine.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.engine.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2">
            <div className="w-full h-full bg-[#333F4D] rounded-full" />
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
              className="absolute top-0 left-0 h-full bg-[#00FF66] rounded-full"
              style={{ boxShadow: '0 0 10px rgba(0,255,102,0.5)' }}
            />
          </div>

          <div className="grid grid-cols-4 gap-8 relative">
            {t.engine.steps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                  className={`flex flex-col items-center text-center ${i % 2 === 0 ? 'mt-0' : 'mt-24'}`}
                >
                  {/* Node */}
                  <div className="relative z-10 mb-8">
                    <div className="w-14 h-14 rounded-full border-4 border-[#00FF66] bg-[#0B0C10] flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.3)]">
                      <div className="w-5 h-5 rounded-full bg-[#00FF66]" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="p-5 rounded-xl border border-[#333F4D] bg-[#151A22] hover:border-[#00FF66] hover:shadow-[0_0_25px_rgba(0,255,102,0.15)] transition-all duration-300"
                  >
                    <div
                      className="text-sm text-[#00FF66] font-bold mb-2"
                      style={{ fontFamily: 'var(--nx-font-mono)' }}
                    >
                      {step.num}. {step.title}
                    </div>
                    <p className="text-sm text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-body)' }}>
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {t.engine.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-3 border-[#00FF66] bg-[#0B0C10] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,102,0.3)] flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#00FF66]" />
                  </div>
                  {i < t.engine.steps.length - 1 && (
                    <div className="w-[2px] flex-grow bg-[#333F4D] mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div
                    className="text-xs text-[#00FF66] font-bold mb-1"
                    style={{ fontFamily: 'var(--nx-font-mono)' }}
                  >
                    {step.num}. {step.title}
                  </div>
                  <p className="text-sm text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-body)' }}>
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
