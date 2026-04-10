'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language-context';
import type { Locale } from '@/lib/translations';

const locales: { code: Locale; label: string; flag: string }[] = [
  { code: 'pt', label: 'PT', flag: '🇵🇹' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

export function Navigation() {
  const { locale, t, setLocale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [langOpen, setLangOpen] = useState(false);

  const navItems = [
    { label: t.nav.problema, href: '#problema' },
    { label: t.nav.solucao, href: '#analogia' },
    { label: t.nav.engine, href: '#engine' },
    { label: t.nav.coverage, href: '#coverage' },
    { label: t.nav.liveNodes, href: '#nodes' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = navItems.map(item => item.href.slice(1));
      for (const id of ids.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const currentLocale = locales.find(l => l.code === locale) || locales[0];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0C10]/90 backdrop-blur-xl border-b border-[#333F4D]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2.5 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/nexflowx-logo-nav.png"
                alt="NeXFlowX"
                className="h-9 w-9 object-contain"
                style={{ filter: 'drop-shadow(0 0 8px rgba(0,255,102,0.3))' }}
              />
              <span
                className="text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: 'var(--nx-font-heading)' }}
              >
                NeXFlow<span className="text-[#00FF66]">X</span>
              </span>
            </motion.div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.href.slice(1)
                      ? 'text-[#00FF66] bg-[#00FF66]/10'
                      : 'text-[#C5C6C7] hover:text-white hover:bg-white/5'
                  }`}
                  style={{ fontFamily: 'var(--nx-font-body)' }}
                >
                  {item.label}
                </button>
              ))}

              {/* Language Switcher */}
              <div className="relative ml-2">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#333F4D] hover:border-[#00FF66]/50 transition-colors text-sm"
                >
                  <span>{currentLocale.flag}</span>
                  <span className="text-[#C5C6C7]">{currentLocale.label}</span>
                </button>
                <AnimatePresence>
                  {langOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute top-full mt-1 right-0 py-1 rounded-lg border border-[#333F4D] bg-[#151A22] shadow-xl min-w-[100px]"
                    >
                      {locales.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => { setLocale(l.code); setLangOpen(false); }}
                          className={`flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-white/5 transition-colors ${
                            locale === l.code ? 'text-[#00FF66]' : 'text-[#C5C6C7]'
                          }`}
                        >
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Button
                onClick={() => scrollTo('#nodes')}
                className="ml-2 bg-[#00FF66] text-[#0B0C10] font-semibold hover:bg-[#00FF66]/90 rounded-lg"
                style={{ fontFamily: 'var(--nx-font-body)' }}
              >
                {t.nav.ctaBtn}
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0B0C10]/95 backdrop-blur-xl pt-20 px-6 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="text-left px-4 py-3 rounded-lg text-lg font-medium text-[#C5C6C7] hover:text-[#00FF66] hover:bg-[#00FF66]/10 transition-all"
                  style={{ fontFamily: 'var(--nx-font-body)' }}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex gap-2 px-4 py-3">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLocale(l.code); }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-all ${
                      locale === l.code
                        ? 'border-[#00FF66] bg-[#00FF66]/10 text-[#00FF66]'
                        : 'border-[#333F4D] text-[#C5C6C7] hover:border-[#00FF66]/50'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>

              <Button
                onClick={() => scrollTo('#nodes')}
                className="mt-2 bg-[#00FF66] text-[#0B0C10] font-semibold hover:bg-[#00FF66]/90 rounded-lg h-12"
              >
                {t.nav.ctaBtn}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
