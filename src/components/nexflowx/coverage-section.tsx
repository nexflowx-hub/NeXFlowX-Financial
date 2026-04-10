'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface MapNode {
  label: string;
  x: number;
  y: number;
  status: 'active' | 'critical' | 'warning' | 'highlight';
  pulse?: boolean;
}

interface MapConnection {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
  critical?: boolean;
}

const connections: MapConnection[] = [
  { x1: '15%', y1: '75%', x2: '28%', y2: '72%' },
  { x1: '28%', y1: '72%', x2: '40%', y2: '50%', critical: true },
  { x1: '40%', y1: '50%', x2: '45%', y2: '40%' },
  { x1: '45%', y1: '40%', x2: '48%', y2: '32%' },
  { x1: '40%', y1: '50%', x2: '50%', y2: '55%' },
  { x1: '50%', y1: '55%', x2: '55%', y2: '70%' },
  { x1: '40%', y1: '50%', x2: '30%', y2: '30%' },
  { x1: '48%', y1: '32%', x2: '58%', y2: '38%' },
  { x1: '48%', y1: '32%', x2: '30%', y2: '30%' },
  { x1: '58%', y1: '38%', x2: '65%', y2: '50%' },
  { x1: '58%', y1: '38%', x2: '75%', y2: '35%' },
  { x1: '65%', y1: '50%', x2: '55%', y2: '70%' },
];

const mapNodes: MapNode[] = [
  { label: 'PT (MBWay)', x: 15, y: 75, status: 'active' },
  { label: 'ES (Bizum)', x: 28, y: 72, status: 'critical', pulse: true },
  { label: 'FR', x: 40, y: 50, status: 'active' },
  { label: 'UK', x: 30, y: 30, status: 'active' },
  { label: 'BE', x: 45, y: 40, status: 'active' },
  { label: 'NL (iDEAL)', x: 48, y: 32, status: 'highlight', pulse: true },
  { label: 'DE', x: 58, y: 38, status: 'active' },
  { label: 'CH', x: 50, y: 55, status: 'warning' },
  { label: 'IT', x: 55, y: 70, status: 'active' },
  { label: 'AT', x: 65, y: 50, status: 'active' },
  { label: 'PL', x: 75, y: 35, status: 'warning' },
];

const pointIcons = [MapPin, MapPin, AlertTriangle];

const dotColors: Record<string, string> = {
  active: 'bg-[#00FF66] shadow-[0_0_10px_#00FF66]',
  critical: 'bg-[#FF3B30] shadow-[0_0_15px_#FF3B30]',
  warning: 'bg-[#FF9F0A]',
  highlight: 'bg-[#00FF66] shadow-[0_0_10px_#00FF66]',
};

const labelColors: Record<string, string> = {
  active: 'text-white border-white/10',
  critical: 'text-[#FF3B30] border-[#FF3B30]/30',
  warning: 'text-[#FF9F0A]',
  highlight: 'text-[#00FF66] border-[#00FF66]/30',
};

export function CoverageSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="coverage" className="relative py-24 sm:py-32" ref={ref}>
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
            {t.coverage.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.coverage.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <p className="text-[#C5C6C7] mb-8" style={{ fontFamily: 'var(--nx-font-body)' }}>
              {t.coverage.intro}
            </p>

            <div className="space-y-6">
              {t.coverage.points.map((point, i) => {
                const Icon = point.critical ? AlertTriangle : MapPin;
                return (
                  <motion.div
                    key={point.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex gap-4"
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center ${
                        point.critical
                          ? 'border-[#FF3B30]/30 bg-[#FF3B30]/10'
                          : 'border-[#333F4D] bg-[#151A22]'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${point.critical ? 'text-[#FF3B30]' : 'text-[#00FF66]'}`} />
                    </div>
                    <div>
                      <span className="text-white font-semibold" style={{ fontFamily: 'var(--nx-font-body)' }}>
                        {point.text}
                      </span>{' '}
                      <span className="text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-body)' }}>
                        {point.desc}
                      </span>
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
              {t.coverage.quote}
            </motion.div>
          </motion.div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative aspect-[4/3] lg:aspect-auto lg:h-[480px]"
          >
            <div
              className="absolute inset-0 rounded-xl border border-[#333F4D] bg-[#1F2833] overflow-hidden"
              style={{ boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,255,102,0.03)' }}
            >
              {/* Grid overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* SVG Connections */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                {connections.map((conn, i) => (
                  <line
                    key={i}
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={conn.critical ? 'rgba(255,59,48,0.4)' : 'rgba(0,255,102,0.25)'}
                    strokeWidth={conn.critical ? 2 : 1.5}
                    strokeDasharray={conn.critical ? '6 6' : '4 4'}
                    className="dash-animate"
                  />
                ))}
              </svg>

              {/* Map Nodes */}
              {mapNodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.06 }}
                  className="absolute flex flex-col items-center gap-1 z-[2]"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${dotColors[node.status]} ${
                      node.pulse ? 'pulse-dot' : ''
                    }`}
                  />
                  <span
                    className={`text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded border bg-black/60 whitespace-nowrap ${
                      labelColors[node.status]
                    }`}
                    style={{ fontFamily: 'var(--nx-font-mono)' }}
                  >
                    {node.label}
                  </span>
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex gap-4 z-[3]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#00FF66]" />
                  <span className="text-[10px] text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-mono)' }}>{t.coverage.legend.active}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF9F0A]" />
                  <span className="text-[10px] text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-mono)' }}>{t.coverage.legend.warning}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                  <span className="text-[10px] text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-mono)' }}>{t.coverage.legend.critical}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
