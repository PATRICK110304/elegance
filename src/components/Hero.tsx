import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { useTranslation } from '../i18n';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  onVideoClick: () => void;
}

const HERO_POSTER =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=60&w=1200&auto=format&fit=crop';
const HERO_VIDEO =
  'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/real_estate_bg_hero_1.mp4';

export default function Hero({ onExploreClick, onContactClick, onVideoClick }: HeroProps) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  // Load video only when hero is near viewport (saves bandwidth on first paint)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo || !videoRef.current) return;
    videoRef.current.play().catch(() => {
      /* autoplay may be blocked — poster remains */
    });
  }, [shouldLoadVideo]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-brand-dark text-white pt-20"
    >
      {/* Poster always visible for LCP; video loads when near viewport */}
      <img
        src={HERO_POSTER}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {shouldLoadVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={HERO_POSTER}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 hero-gradient z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-dark/95 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full py-16 md:py-24">
        <div className="max-w-3xl">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4"
          >
            {t('hero', 'kicker')}
          </motion.p>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight text-white mb-6"
          >
            {t('hero', 'title')} <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold-300">
              {t('hero', 'highlight')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
          >
            {t('hero', 'body')}
          </motion.p>

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="group bg-gold-400 hover:bg-gold-500 text-brand-dark font-bold text-sm px-8 py-4 rounded flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20 cursor-pointer"
            >
              <span>{t('hero', 'explore')}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              id="hero-video-btn"
              onClick={onVideoClick}
              className="group flex items-center justify-center space-x-2 text-white hover:text-gold-400 text-sm font-semibold py-4 px-6 transition-colors duration-300 cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-gold-400 transition-transform duration-300 group-hover:scale-110" />
              <span>{t('hero', 'video')}</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
