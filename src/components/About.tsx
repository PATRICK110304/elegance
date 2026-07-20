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
      value: '20+',
      label: 'Years of Experience',
    },
    {
      id: 'stat-2',
      icon: Sparkles,
      value: '150+',
      label: 'Successful Projects',
    },
    {
      id: 'stat-3',
      icon: Building2,
      value: '5M+',
      label: 'Sq. Ft. Managed',
    },
  ];

  return (
    <section
      id="about"
      className="bg-brand-dark py-20 md:py-28 text-white border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            {/* Kicker */}
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase mb-4">
              PIONEERING EXCELLENCE
            </span>

            {/* Title */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mb-6">
              Our Vision, Your <br className="hidden sm:inline" />
              Strategic Advantage
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-10">
              For over two decades, Northline Commercial has defined the gold standard in premium commercial real estate brokerage. We integrate deep market intelligence, structural insights, and a global network of investment partnerships to secure architectural statements that drive high-performance corporate growth.
            </p>

            {/* Stats Grid with Top and Bottom Borders */}
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

            {/* CTA Button */}
            <button
              id="about-cta-btn"
              onClick={() => onContactClick()}
              className="group bg-gold-400 hover:bg-gold-500 text-brand-dark font-bold text-xs uppercase tracking-widest py-4 px-8 rounded transition-all duration-300 flex items-center space-x-2 cursor-pointer shadow-lg shadow-gold-400/10"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="group relative"
          >
            {/* Visual Frame Border */}
            <div className="absolute -inset-4 border border-gold-400/20 rounded-lg -z-10 transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-gold-400/40" />
            
            {/* Image Container */}
            <div className="relative h-80 md:h-[500px] lg:h-[550px] rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
                alt="Northline Commercial architectural masterpiece"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Fade out dark overlay on group-hover */}
              <div className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/10" />
              
              {/* Subtle visual badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-brand-dark/90 backdrop-blur-md border border-white/10 p-5 rounded-lg flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-gold-400 uppercase">
                    FEATURED CAPITAL
                  </div>
                  <div className="text-sm font-bold text-white tracking-tight mt-0.5">
                    One Northline Plaza, New York
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
