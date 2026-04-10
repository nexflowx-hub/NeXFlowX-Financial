'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '@/lib/language-context';

interface NodeCardData {
  flag: string;
  name: string;
  status: 'green' | 'yellow';
  tags: { label: string; type: 'local' | 'std' | 'warn' | 'pend' }[];
  note?: string;
}

interface GlobalCard {
  flag: string;
  name: string;
  tags: { label: string; type: 'local' | 'pend' }[];
  opacity?: number;
}

const europeNodes: NodeCardData[] = [
  {
    flag: '🇵🇹', name: 'Portugal', status: 'green',
    tags: [
      { label: 'MBWay', type: 'local' }, { label: 'Multibanco', type: 'local' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Revolut', type: 'std' }, { label: 'SEPA', type: 'std' }, { label: 'Transf.', type: 'std' },
    ],
    note: 'pt',
  },
  {
    flag: '🇪🇸', name: 'Espanha', status: 'yellow',
    tags: [
      { label: '⚠ Bizum', type: 'warn' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Revolut', type: 'std' }, { label: 'SEPA', type: 'std' }, { label: 'Transf.', type: 'std' },
    ],
  },
  {
    flag: '🇫🇷', name: 'França', status: 'green',
    tags: [
      { label: 'Cartes Bancaires', type: 'local' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Revolut', type: 'std' }, { label: 'SEPA', type: 'std' },
      { label: 'Klarna', type: 'std' }, { label: 'Transf.', type: 'std' },
    ],
  },
  {
    flag: '🇳🇱', name: 'P. Baixos', status: 'green',
    tags: [
      { label: 'iDEAL', type: 'local' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Revolut', type: 'std' }, { label: 'SEPA', type: 'std' },
      { label: 'Klarna', type: 'std' },
    ],
    note: 'nl',
  },
  {
    flag: '🇧🇪', name: 'Bélgica', status: 'green',
    tags: [
      { label: 'Bancontact', type: 'local' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Revolut', type: 'std' }, { label: 'SEPA', type: 'std' },
    ],
  },
  {
    flag: '🇬🇧', name: 'Reino Unido', status: 'green',
    tags: [
      { label: 'Pay by Bank', type: 'local' }, { label: 'Bacs', type: 'local' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Revolut', type: 'std' }, { label: 'Klarna', type: 'std' },
    ],
  },
  {
    flag: '🇦🇹', name: 'Áustria', status: 'green',
    tags: [
      { label: 'EPS', type: 'local' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Klarna', type: 'std' }, { label: 'SEPA', type: 'std' },
    ],
  },
  {
    flag: '🇵🇱', name: 'Polónia', status: 'yellow',
    tags: [
      { label: 'BLIK', type: 'local' }, { label: '⚠ P24 off', type: 'warn' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'SEPA', type: 'std' },
    ],
  },
  {
    flag: '🇩🇪', name: 'Alemanha', status: 'green',
    tags: [
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Klarna', type: 'std' }, { label: 'SEPA', type: 'std' },
    ],
  },
  {
    flag: '🇮🇹', name: 'Itália', status: 'green',
    tags: [
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' }, { label: 'Amazon', type: 'std' },
      { label: 'Klarna', type: 'std' }, { label: 'SEPA', type: 'std' },
    ],
  },
  {
    flag: '🇨🇭', name: 'Suíça', status: 'yellow',
    tags: [
      { label: '⚠ TWINT pend', type: 'warn' },
      { label: 'Cartão', type: 'std' }, { label: 'Apple', type: 'std' },
      { label: 'Google', type: 'std' },
    ],
  },
];

const globalNodes: GlobalCard[] = [
  { flag: '🇧🇷', name: 'Brasil', tags: [{ label: 'PIX', type: 'local' }] },
  { flag: '🇺🇸', name: 'EUA', tags: [{ label: 'ACH Debit', type: 'local' }] },
  { flag: '🇰🇷', name: 'Coreia S.', tags: [{ label: 'KR Cards', type: 'local' }] },
  { flag: '🇨🇳', name: 'China', tags: [{ label: 'Alipay (n/q)', type: 'pend' }, { label: 'WeChat (pend)', type: 'pend' }], opacity: 0.7 },
  { flag: '🇮🇳', name: 'Índia', tags: [{ label: 'UPI (pend)', type: 'pend' }], opacity: 0.7 },
];

const summaryDotColors: Record<string, string> = {
  green: 'bg-[#00FF66] shadow-[0_0_8px_#00FF66]',
  yellow: 'bg-[#FF9F0A] shadow-[0_0_8px_#FF9F0A]',
};

function NodeCard({ node, index, isInView, nodeNotes }: { node: NodeCardData; index: number; isInView: boolean; nodeNotes: { pt: string; nl: string } }) {
  const statusColor = node.status === 'green' ? '#00FF66' : '#FF9F0A';
  const borderAccent = node.status === 'green'
    ? 'border-t-[#00FF66] shadow-[inset_0_1px_0_0_#00FF66]'
    : 'border-t-[#FF9F0A] shadow-[inset_0_1px_0_0_#FF9F0A]';

  const noteText = node.note ? nodeNotes[node.note as keyof typeof nodeNotes] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
      whileHover={{ borderColor: statusColor }}
      className={`p-3 rounded-lg border border-[#333F4D] bg-[#151A22] border-t-2 flex flex-col gap-2 transition-all duration-200 hover:shadow-lg ${borderAccent}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">{node.flag}</span>
        <h4
          className="text-white flex-grow font-semibold"
          style={{ fontFamily: 'var(--nx-font-heading)', fontSize: '13px' }}
        >
          {node.name}
        </h4>
        <div
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{
            backgroundColor: statusColor,
            boxShadow: `0 0 8px ${statusColor}`,
          }}
        />
      </div>
      <div className="flex flex-wrap gap-1">
        {node.tags.map((tag) => (
          <span key={tag.label} className={`node-tag ${tag.type}`}>
            {tag.label}
          </span>
        ))}
      </div>
      {noteText && (
        <div
          className="text-[9px] text-[#C5C6C7] mt-auto border-t border-dashed border-[#333F4D] pt-1.5 italic"
        >
          👉 {noteText}
        </div>
      )}
    </motion.div>
  );
}

export function NodesSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="nodes" className="relative py-24 sm:py-32" ref={ref}>
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
            {t.nodes.title}{' '}
            <span className="text-[#00FF66]" style={{ textShadow: '0 0 10px rgba(0,255,102,0.2)' }}>
              {t.nodes.highlight}
            </span>
          </h2>
          <div className="w-20 h-1 bg-[#00FF66] rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* Europe Nodes Grid */}
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-sm font-semibold text-white mb-4 uppercase tracking-wider border-b border-[#333F4D] pb-2"
              style={{ fontFamily: 'var(--nx-font-mono)' }}
            >
              📍 {t.nodes.zoneEuro}
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
              {europeNodes.map((node, i) => (
                <NodeCard key={node.name} node={node} index={i} isInView={isInView} nodeNotes={t.nodes.nodeNotes} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Executive Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-lg border border-[#00FF66] bg-[#1F2833] shadow-[0_0_15px_rgba(0,255,102,0.05)]"
            >
              <h3
                className="text-sm font-bold text-[#00FF66] mb-3"
                style={{ fontFamily: 'var(--nx-font-mono)' }}
              >
                🧠 {t.nodes.summaryTitle}
              </h3>
              <p className="text-[13px] font-semibold text-white mb-3" style={{ fontFamily: 'var(--nx-font-body)' }}>
                🌍 {t.nodes.summarySubtitle}
              </p>
              <ul className="space-y-2 text-[11px] text-[#C5C6C7]">
                {t.nodes.summaryItems.map((item) => (
                  <li key={item.strong} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${summaryDotColors[item.color]} flex-shrink-0`} />
                    <span><strong className="text-white">{item.strong}</strong> {item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Global Coverage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <h3
                className="text-sm font-semibold text-white mb-3 uppercase tracking-wider border-b border-[#333F4D] pb-2"
                style={{ fontFamily: 'var(--nx-font-mono)' }}
              >
                🌎 {t.nodes.outsideEurope}
              </h3>
              <div className="space-y-2">
                {globalNodes.map((node) => (
                  <div
                    key={node.name}
                    className="flex items-center gap-2 p-2 rounded-md bg-[#151A22] border border-[#333F4D]"
                    style={{ opacity: node.opacity || 1 }}
                  >
                    <span className="text-sm">{node.flag}</span>
                    <h4
                      className="text-white text-xs font-semibold flex-grow"
                      style={{ fontFamily: 'var(--nx-font-heading)' }}
                    >
                      {node.name}
                    </h4>
                    <div className="flex gap-1">
                      {node.tags.map((tag) => (
                        <span key={tag.label} className={`node-tag ${tag.type}`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
