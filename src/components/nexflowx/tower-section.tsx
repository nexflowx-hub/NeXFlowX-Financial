'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/lib/language-context';

const statusConfig = {
  available: { class: 'status-available' },
  limited: { class: 'status-limited' },
  critical: { class: 'status-critical' },
};

export function TowerSection() {
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
            {t.tower.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.tower.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        {/* Dashboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-xl border border-[#333F4D] bg-[#1F2833] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-[#00FF66]">
                  {t.tower.headers.map(
                    (header) => (
                      <th
                        key={header}
                        className="px-5 py-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#00FF66] whitespace-nowrap"
                        style={{
                          fontFamily: 'var(--nx-font-heading)',
                          backgroundColor: 'rgba(0,255,102,0.05)',
                        }}
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {t.tower.routes.map((route, i) => {
                  const sc = statusConfig[route.status as keyof typeof statusConfig];
                  return (
                    <motion.tr
                      key={route.country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="border-b border-[#333F4D] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4 text-white text-sm whitespace-nowrap" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                        {route.country}
                      </td>
                      <td className="px-5 py-4 text-white text-sm whitespace-nowrap" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                        {route.method}
                      </td>
                      <td className="px-5 py-4">
                        <span className={sc.class}>
                          {route.statusLabel}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-white text-sm whitespace-nowrap" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                        {route.provider}{' '}
                        <span className="text-[#C5C6C7] text-xs">({route.note})</span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Live Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center gap-3 px-4 py-3 rounded-lg border border-[#333F4D] bg-[#151A22]"
        >
          <div className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
          <span className="text-xs text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-mono)' }}>
            {t.tower.ticker}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
