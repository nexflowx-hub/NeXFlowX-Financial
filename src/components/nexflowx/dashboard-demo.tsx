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
  const [iframeReady, setIframeReady] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const openDashboard = () => {
    setIsOpen(true);
    setShowIframe(true);
  };

  return (
    <>
      {/* Nav Button */}
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

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-5xl h-[90vh] max-h-[800px] rounded-2xl border border-[#333F4D] bg-[#0B0C10] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#333F4D] bg-[#1F2833] flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00FF66]/15 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-[#00FF66]" />
                  </div>
                  <div>
                    <h3
                      className="text-base font-bold text-white"
                      style={{ fontFamily: 'var(--nx-font-heading)' }}
                    >
                      {t.dashboard.title}
                    </h3>
                    <p className="text-xs text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                      demo-dashboard.nexflowx.tech
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333F4D] text-sm text-[#C5C6C7] hover:text-[#00FF66] hover:border-[#00FF66]/50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.dashboard.openExternal}</span>
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-[#C5C6C7] hover:bg-[#333F4D] hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Credentials Bar */}
              <div className="flex items-center gap-4 px-6 py-3 border-b border-[#333F4D] bg-[#151A22] flex-shrink-0 overflow-x-auto">
                <span className="text-xs text-[#C5C6C7] whitespace-nowrap" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                  {t.dashboard.credentials}:
                </span>
                <div className="flex items-center gap-3">
                  {/* Username */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0B0C10] border border-[#333F4D]">
                    <span className="text-xs text-[#00FF66]" style={{ fontFamily: 'var(--nx-font-mono)' }}>user:</span>
                    <span className="text-xs text-white font-semibold" style={{ fontFamily: 'var(--nx-font-mono)' }}>{DEMO_USER}</span>
                    <button
                      onClick={() => copyToClipboard(DEMO_USER, 'user')}
                      className="text-[#C5C6C7] hover:text-[#00FF66] transition-colors"
                    >
                      {copied === 'user' ? <Check className="w-3 h-3 text-[#00FF66]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  {/* Password */}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0B0C10] border border-[#333F4D]">
                    <span className="text-xs text-[#00FF66]" style={{ fontFamily: 'var(--nx-font-mono)' }}>pass:</span>
                    <span className="text-xs text-white font-semibold" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                      {showPass ? DEMO_PASS : '••••••••••••'}
                    </span>
                    <button
                      onClick={() => setShowPass(!showPass)}
                      className="text-[#C5C6C7] hover:text-[#00FF66] transition-colors"
                    >
                      {showPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(DEMO_PASS, 'pass')}
                      className="text-[#C5C6C7] hover:text-[#00FF66] transition-colors"
                    >
                      {copied === 'pass' ? <Check className="w-3 h-3 text-[#00FF66]" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* iframe Content */}
              <div className="flex-grow relative bg-[#151A22]">
                {!iframeReady && showIframe && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-10 h-10 border-2 border-[#00FF66] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <p className="text-sm text-[#C5C6C7]" style={{ fontFamily: 'var(--nx-font-mono)' }}>
                        {t.dashboard.loading}
                      </p>
                    </div>
                  </div>
                )}

                {showIframe && (
                  <iframe
                    src={DEMO_URL}
                    className="absolute inset-0 w-full h-full border-0"
                    title="NeXFlowX Dashboard Demo"
                    onLoad={() => setIframeReady(true)}
                    allow="clipboard-read; clipboard-write"
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  />
                )}

                {/* Fallback message if iframe blocked */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
                  style={{ opacity: iframeReady ? 0 : 1, pointerEvents: iframeReady ? 'none' : 'auto' }}
                >
                  {/* This is behind the loader, shows only if iframe never loads */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
