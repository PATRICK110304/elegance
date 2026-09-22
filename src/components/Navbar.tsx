import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation, type Locale } from '../i18n';

interface NavbarProps {
  onContactClick: (interest?: string) => void;
}

export default function Navbar({ onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale, setLocale, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav', 'properties'), href: '#properties' },
    { name: t('nav', 'services'), href: '#services' },
    { name: t('nav', 'about'), href: '#about' },
    { name: t('nav', 'insights'), href: '#insights' },
  ];

  return (
    <>
      <motion.nav
        id="global-navbar"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-dark/90 backdrop-blur-md py-4 border-b border-white/10 shadow-lg'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <a
            href="#"
            className="flex items-end space-x-2 group focus:outline-none"
            aria-label={t('nav', 'home')}
          >
            <div className="flex items-end space-x-0.5 h-10 pb-0.5">
              <motion.div
                className="w-1.5 bg-gold-400 rounded-t-sm"
                initial={{ height: 16 }}
                whileHover={{ height: 24 }}
                animate={{ height: 16 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              />
              <motion.div
                className="w-1.5 bg-gold-400 rounded-t-sm"
                initial={{ height: 24 }}
                whileHover={{ height: 36 }}
                animate={{ height: 24 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              />
              <motion.div
                className="w-1.5 bg-gold-400 rounded-t-sm"
                initial={{ height: 32 }}
                whileHover={{ height: 40 }}
                animate={{ height: 32 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-xl tracking-wider leading-none">
                NORTHLINE
              </span>
              <span className="text-[10px] font-semibold text-gold-400 tracking-[0.25em] leading-none mt-1">
                COMMERCIAL
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-gold-400 text-sm font-medium tracking-wide transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center rounded-md border border-white/10 p-0.5 text-[10px] font-bold tracking-widest" aria-label="Language selector">
              {(['fr', 'en'] as Locale[]).map((option) => (
                <button key={option} type="button" onClick={() => setLocale(option)} className={`rounded px-2 py-1 transition-colors ${locale === option ? 'bg-gold-400 text-brand-dark' : 'text-gray-400 hover:text-white'}`} aria-pressed={locale === option}>{option.toUpperCase()}</button>
              ))}
            </div>
            <button
              id="desktop-contact-btn"
              onClick={() => onContactClick()}
              className="border border-gold-400/80 text-gold-400 hover:text-brand-dark hover:bg-gold-400 font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-md transition-all cursor-pointer duration-300 focus:outline-none focus:ring-1 focus:ring-gold-400"
            >
              {t('nav', 'contact')}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors focus:outline-none"
              aria-label={isOpen ? t('nav', 'close') : t('nav', 'open')}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-brand-dark/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-gray-200 hover:text-gold-400 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 border-t border-white/10 flex flex-col space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400">
                    {(['fr', 'en'] as Locale[]).map((option) => <button key={option} type="button" onClick={() => setLocale(option)} className={locale === option ? 'text-gold-400' : 'text-gray-400'}>{option.toUpperCase()}</button>)}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Phone className="w-4 h-4 text-gold-400" />
                    <a href="tel:+2250500183920" className="hover:text-gold-400">+225 05 00 18 39 20</a>
                  </div>
                  <button
                    id="mobile-contact-btn"
                    onClick={() => {
                      setIsOpen(false);
                      onContactClick();
                    }}
                    className="w-full bg-gold-400 hover:bg-gold-500 text-brand-dark font-bold text-xs uppercase tracking-widest py-3 px-4 rounded-md text-center transition-all cursor-pointer"
                  >
                    {t('nav', 'contact')}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
