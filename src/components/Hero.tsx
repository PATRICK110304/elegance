import { motion } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export default function Hero({ onExploreClick, onContactClick }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden bg-brand-dark text-white pt-20"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      >
        <source
          src="https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/real_estate_bg_hero_1.mp4"
          type="video/mp4"
        />
        Votre navigateur ne prend pas en charge la balise vidéo.
      </video>

      {/* Dual Gradient Overlays */}
      <div className="absolute inset-0 hero-gradient z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-brand-dark/95 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Kicker */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4"
          >
            ESPACES PREMIUM. EMPLACEMENTS PRIMES.
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display font-bold text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight text-white mb-6"
          >
            Des espaces qui <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gold-300">
              inspirent le succès
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-2xl"
          >
            Northline Commercial est la principale société de conseil et de courtage spécialisée dans les espaces de travail d'entreprise de classe A, les installations logistiques de pointe et les domaines commerciaux haut de gamme sur mesure. Nous faisons le lien entre une architecture d'élite et des opportunités d'affaires inégalées.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            {/* Primary CTA */}
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="group bg-gold-400 hover:bg-gold-500 text-brand-dark font-bold text-sm px-8 py-4 rounded flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20 cursor-pointer"
            >
              <span>Explorer les biens</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <button
              id="hero-video-btn"
              onClick={onContactClick}
              className="group flex items-center justify-center space-x-2 text-white hover:text-gold-400 text-sm font-semibold py-4 px-6 transition-colors duration-300 cursor-pointer"
            >
              <PlayCircle className="w-5 h-5 text-gold-400 transition-transform duration-300 group-hover:scale-110" />
              <span>Regarder la visite vidéo</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
