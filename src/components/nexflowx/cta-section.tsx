'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import { DashboardDemo } from './dashboard-demo';

export function CTASection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 sm:py-32" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Background glow */}
          <div className="absolute inset-0 -m-20 rounded-full bg-[#00FF66] opacity-[0.03] blur-[100px]" />

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 relative"
            style={{ fontFamily: 'var(--nx-font-heading)', letterSpacing: '-0.03em' }}
          >
            {t.cta.title1}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 20px rgba(0,255,102,0.3)' }}>
              {t.cta.highlight}
            </span>
            {t.cta.title2}
          </h2>

          <p
            className="text-lg text-[#C5C6C7] mb-10 max-w-2xl mx-auto relative"
            style={{ fontFamily: 'var(--nx-font-body)' }}
          >
            {t.cta.desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative">
            <Button
              size="lg"
              className="bg-[#00FF66] text-[#0B0C10] font-bold hover:bg-[#00FF66]/90 rounded-xl h-12 px-8 text-base"
              style={{ fontFamily: 'var(--nx-font-heading)' }}
            >
              {t.cta.demoBtn}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <DashboardDemo />
            <Button
              variant="outline"
              size="lg"
              className="border-[#333F4D] text-white hover:bg-[#1F2833] hover:border-[#00FF66] rounded-xl h-12 px-8 text-base"
              style={{ fontFamily: 'var(--nx-font-heading)' }}
            >
              {t.cta.docBtn}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
