'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Eye, EyeOff, Monitor, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const DEMO_URL = 'https://demo-dashboard.nexflowx.tech';
const DEMO_USER = 'NeXFlowX';
const DEMO_PASS = 'Nex123456789*';

export function DashboardDemo() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const openDashboard = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openDashboard}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-[#0B0C10] font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(0,255,102,0.3)]"
        style={{ fontFamily: 'var(--nx-font-body)' }}
      >
        <Monitor className="w-4 h-4" />
        <span className="hidden sm:inline">{t.dashboard.navBtn}</span>
      </motion.button>

      {/* Floating Window Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex"
          >
            {/* Semi-transparent backdrop — click to close */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsOpen(false)}
            />

            {/* Floating Window — mimics a desktop window */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex flex-col
                         w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]
                         sm:w-[calc(100vw-3rem)] sm:h-[calc(100vh-3rem)]
                         md:w-[calc(100vw-4rem)] md:h-[calc(100vh-2.5rem)]
                         lg:w-[calc(100vw-6rem)]
                         rounded-2xl border border-[#333F4D]/80 bg-[#0B0C10] overflow-hidden
                         shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_60px_rgba(0,255,102,0.08)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ===== Window Title Bar ===== */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#333F4D] bg-[#1F2833] flex-shrink-0">
                {/* Left: Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="/nexflowx-logo-nav.png"
                    alt=""
                    className="w-6 h-6 object-contain flex-shrink-0"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,102,0.3))' }}
                  />
                  <div className="min-w-0">
                    <h3
                      className="text-sm font-bold text-white truncate"
                      style={{ fontFamily: 'var(--nx-font-heading)' }}
                    >
                      {t.dashboard.title}
                    </h3>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {/* External link */}
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#333F4D] text-xs text-[#C5C6C7] hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="hidden md:inline">{t.dashboard.openExternal}</span>
                  </a>

                  {/* Credentials */}
                  <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#151A22] border border-[#333F4D]">
                    <span className="text-[10px] text-[#00FF66]" style={{ fontFamily: 'var(--nx-font-mono)' }}>user:</span>
                    <span className="text-[10px] text-white font-semibold" style={{ fontFamily: 'var(--nx-font-mono)' }}>{DEMO_USER}</span>
                    <button onClick={() => copyToClipboard(DEMO_USER, 'user')} className="text-[#C5C6C7] hover:text-[#00FF66] transition-colors">
                      {copied === 'user' ? <Check className="w-2.5 h-2.5 text-[#00FF66]" /> : <Copy className="w-2.5 h-2.5" />}
                    </button>
                    <span className="text-[#333F4D]">|</span>
                    <span className="text-[10px] text-[#00FF66]" style={{ fontFamily: 'var(--nx-font-mono)' }}>pass:</span>
                    <span className="text-[10px] text-white font-semibold" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                      {showPass ? DEMO_PASS : '••••••••••'}
                    </span>
                    <button onClick={() => setShowPass(!showPass)} className="text-[#C5C6C7] hover:text-[#00FF66] transition-colors">
                      {showPass ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                    </button>
                    <button onClick={() => copyToClipboard(DEMO_PASS, 'pass')} className="text-[#C5C6C7] hover:text-[#00FF66] transition-colors">
                      {copied === 'pass' ? <Check className="w-2.5 h-2.5 text-[#00FF66]" /> : <Copy className="w-2.5 h-2.5" />}
                    </button>
                  </div>

                  {/* Close */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-[#C5C6C7] hover:bg-[#FF3B30]/20 hover:text-[#FF3B30] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* ===== Mobile Credentials (visible only on small screens) ===== */}
              <div className="flex sm:hidden items-center gap-3 px-4 py-2 border-b border-[#333F4D] bg-[#151A22] flex-shrink-0 text-[10px] overflow-x-auto" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                <span className="text-[#C5C6C7] whitespace-nowrap">{t.dashboard.credentials}:</span>
                <span className="text-[#00FF66]">user:</span>
                <span className="text-white font-semibold">{DEMO_USER}</span>
                <button onClick={() => copyToClipboard(DEMO_USER, 'user')} className="text-[#C5C6C7] hover:text-[#00FF66]">
                  {copied === 'user' ? <Check className="w-2.5 h-2.5 text-[#00FF66]" /> : <Copy className="w-2.5 h-2.5" />}
                </button>
                <span className="text-[#00FF66]">pass:</span>
                <span className="text-white font-semibold">{showPass ? DEMO_PASS : '••••••••••'}</span>
                <button onClick={() => setShowPass(!showPass)} className="text-[#C5C6C7] hover:text-[#00FF66]">
                  {showPass ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                </button>
                <button onClick={() => copyToClipboard(DEMO_PASS, 'pass')} className="text-[#C5C6C7] hover:text-[#00FF66]">
                  {copied === 'pass' ? <Check className="w-2.5 h-2.5 text-[#00FF66]" /> : <Copy className="w-2.5 h-2.5" />}
                </button>
              </div>

              {/* ===== iframe Content (takes ALL remaining space) ===== */}
              <div className="flex-grow relative bg-[#0a0b0e]">
                <iframe
                  src={DEMO_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  title="NeXFlowX Dashboard Demo"
                  allow="clipboard-read; clipboard-write"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
