'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Unlock, Shield, Activity } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const tileIcons = [TrendingUp, Unlock, Shield, Activity];

export function DeliverSection() {
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
            {t.deliver.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.deliver.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        {/* Tiles Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {t.deliver.tiles.map((tile, i) => {
            const Icon = tileIcons[i];
            return (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, borderColor: '#00FF66' }}
                className="group p-6 rounded-xl border border-[#333F4D] bg-[#151A22] flex flex-col transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,255,102,0.15)]"
              >
                <Icon
                  className="w-10 h-10 text-[#00FF66] mb-4"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,102,0.3))' }}
                />
                <h3
                  className="text-xl font-semibold text-white mb-3"
                  style={{ fontFamily: 'var(--nx-font-heading)' }}
                >
                  {tile.title}
                </h3>
                <p className="text-sm text-[#C5C6C7] flex-grow" style={{ fontFamily: 'var(--nx-font-body)' }}>
                  {tile.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Big Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: 'var(--nx-font-heading)' }}
          >
            {t.deliver.statement[0]}
            <br />
            <span
              className="text-[#00FF66]"
              style={{ textShadow: '0 0 20px rgba(0,255,102,0.3)' }}
            >
              {t.deliver.statement[1]}
            </span>
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
