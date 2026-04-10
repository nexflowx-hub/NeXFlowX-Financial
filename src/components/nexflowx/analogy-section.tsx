'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Warehouse, Route, Globe, Satellite } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const rowIcons = [Warehouse, Route, Globe, Satellite];

export function AnalogySection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="analogia" className="relative py-24 sm:py-32" ref={ref}>
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
            {t.analogy.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.analogy.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        {/* Table */}
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
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-[#00FF66]"
                    style={{
                      fontFamily: 'var(--nx-font-heading)',
                      backgroundColor: 'rgba(0,255,102,0.05)',
                    }}
                  >
                    {t.analogy.leftHeader}
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-[#00FF66]"
                    style={{
                      fontFamily: 'var(--nx-font-heading)',
                      backgroundColor: 'rgba(0,255,102,0.05)',
                    }}
                  >
                    {t.analogy.rightHeader}
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.analogy.rows.map((row, i) => {
                  const Icon = rowIcons[i];
                  return (
                    <motion.tr
                      key={row.left}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="border-b border-[#333F4D] last:border-b-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-[#C5C6C7] flex-shrink-0" />
                          <span className="text-white" style={{ fontFamily: 'var(--nx-font-body)' }}>
                            {row.left}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[#00FF66] font-semibold" style={{ fontFamily: 'var(--nx-font-body)' }}>
                          {row.right}
                        </span>
                        {row.sub && (
                          <span className="text-[#C5C6C7] text-sm ml-2">{row.sub}</span>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-block px-8 py-5 rounded-xl border-b-4 border-[#00FF66] bg-[#1F2833] shadow-[0_0_30px_rgba(0,255,102,0.1)]"
            style={{ fontFamily: 'var(--nx-font-heading)', maxWidth: '600px' }}
          >
            <p className="text-xl sm:text-2xl font-medium text-white">
              {t.analogy.quote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
