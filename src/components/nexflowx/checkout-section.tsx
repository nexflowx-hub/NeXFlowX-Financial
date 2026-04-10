'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, Shield, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const featureIcons = [Check, Shield, Zap];

export function CheckoutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 sm:py-32" ref={ref}>
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
            {t.checkout.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.checkout.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-[280px] rounded-3xl border-4 border-[#1F2833] bg-[#151A22] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,255,102,0.1)]"
            >
              {/* Phone Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="w-8 h-1 rounded-full bg-[#333F4D]" />
                <div
                  className="text-xs font-bold text-[#00FF66]"
                  style={{ fontFamily: 'var(--nx-font-heading)' }}
                >
                  NeXFlowX Pay
                </div>
                <div className="w-8 h-1 rounded-full bg-[#333F4D]" />
              </div>

              {/* Amount */}
              <div className="text-center py-6 rounded-xl bg-[#1F2833] mb-4">
                <div className="text-sm text-[#C5C6C7] mb-1">{t.checkout.mockup.total}</div>
                <div
                  className="text-3xl font-bold text-white"
                  style={{ fontFamily: 'var(--nx-font-heading)' }}
                >
                  €249.90
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                {[
                  { name: 'MBWay', flag: '🇵🇹', active: true, local: true },
                  { name: 'Visa •••• 4242', flag: '💳', active: false },
                  { name: 'Apple Pay', flag: '🍎', active: false },
                  { name: 'iDEAL', flag: '🇳🇱', active: false, local: true },
                ].map((method) => (
                  <motion.div
                    key={method.name}
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                      method.active
                        ? 'border border-[#00FF66] bg-[#00FF66]/10'
                        : 'border border-[#333F4D] bg-[#151A22] hover:border-[#00FF66]/50'
                    }`}
                  >
                    <span className="text-lg">{method.flag}</span>
                    <span className="text-sm text-white flex-grow" style={{ fontFamily: 'var(--nx-font-body)' }}>
                      {method.name}
                    </span>
                    {method.local && (
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-semibold">
                        {t.checkout.mockup.local}
                      </span>
                    )}
                    {method.active && (
                      <div className="w-4 h-4 rounded-full border-2 border-[#00FF66] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#00FF66]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Pay Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 py-3 rounded-xl bg-[#00FF66] text-center cursor-pointer"
              >
                <span className="text-[#0B0C10] font-bold text-sm" style={{ fontFamily: 'var(--nx-font-heading)' }}>
                  {t.checkout.mockup.payNow}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3
              className="text-2xl font-semibold text-white mb-4"
              style={{ fontFamily: 'var(--nx-font-heading)' }}
            >
              {t.checkout.heading}
            </h3>
            <p className="text-[#C5C6C7] mb-8" style={{ fontFamily: 'var(--nx-font-body)' }}>
              {t.checkout.desc}
            </p>

            <div className="space-y-6">
              {t.checkout.features.map((feature, i) => {
                const Icon = featureIcons[i];
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#00FF66]" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1" style={{ fontFamily: 'var(--nx-font-body)' }}>
                        {feature.title}
                      </h4>
                      <p className="text-sm text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-body)' }}>
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="highlight-quote"
            >
              {t.checkout.quote}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
