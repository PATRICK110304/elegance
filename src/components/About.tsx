import { motion } from 'motion/react';
import { ArrowRight, Trophy, Sparkles, Building2 } from 'lucide-react';

interface AboutProps {
  onContactClick: () => void;
}

export default function About({ onContactClick }: AboutProps) {
  const stats = [
    {
      id: 'stat-1',
      icon: Trophy,
      value: '10+',
      label: "Ans d'expérience",
    },
    {
      id: 'stat-2',
      icon: Sparkles,
      value: '80+',
      label: 'Projets réussis',
    },
    {
      id: 'stat-3',
      icon: Building2,
      value: '250k+',
      label: 'm² gérés',
    },
  ];

  return (
    <section
      id="about"
      className="bg-brand-dark py-20 md:py-28 text-white border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4">
              EXCELLENCE PIONNIÈRE
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-6">
              Notre vision, votre <br className="hidden sm:inline" />
              avantage stratégique
            </h2>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10">
              Depuis plus de dix ans, Northline Commercial définit la référence en courtage immobilier d'entreprise premium en Côte d'Ivoire. Nous combinons une connaissance fine du marché abidjanais, des insights structurels et un réseau d'investisseurs pour sécuriser des espaces qui accélèrent la croissance de votre entreprise.
            </p>

            <div className="w-full border-y border-white/10 py-8 mb-10">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div key={stat.id} className="flex flex-col items-start">
                      <div className="flex items-center space-x-1.5 mb-1 text-gold-400">
                        <StatIcon className="w-4 h-4 shrink-0" />
                        <span className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
                          {stat.value}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-400 font-medium leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              id="about-cta-btn"
              onClick={() => onContactClick()}
              className="group bg-gold-400 hover:bg-gold-500 text-brand-dark font-bold text-xs uppercase tracking-widest py-4 px-8 rounded transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-lg shadow-gold-400/10"
            >
              <span>Devenir partenaire</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="group relative"
          >
            <div className="absolute -inset-4 border border-gold-400/20 rounded-lg -z-10 transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-gold-400/40" />

            <div className="relative h-80 md:h-[500px] lg:h-[550px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Immeuble commercial premium à Abidjan – Northline Commercial"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/10" />

              <div className="absolute bottom-6 left-6 right-6 bg-brand-dark/90 backdrop-blur-md border border-white/10 p-5 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-gold-400 uppercase">
                    CAPITAL EN VEDETTE
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight mt-0.5">
                    One Northline Plaza, Plateau – Abidjan
                  </div>
                </div>
                <div className="h-2 w-2 rounded-full bg-gold-400 animate-ping" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
