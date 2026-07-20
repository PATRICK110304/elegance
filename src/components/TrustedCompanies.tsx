import { motion } from 'motion/react';
import { Hexagon, Target, Triangle, Mountain, Shield, Zap } from 'lucide-react';

export default function TrustedCompanies() {
  const partners = [
    { icon: Hexagon, name: 'VORTEX' },
    { icon: Target, name: 'HORIZON' },
    { icon: Triangle, name: 'APEX GROUP' },
    { icon: Mountain, name: 'SUMMIT CO' },
    { icon: Shield, name: 'FORTRESS' },
    { icon: Zap, name: 'VOLTAIC' },
  ];

  return (
    <section
      id="partners"
      className="bg-white py-16 border-b border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Kicker */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-gray-400 mb-10"
        >
          TRUSTED BY INDUSTRY LEADERS & GLOBAL CORPORATIONS
        </motion.p>

        {/* Partners Row with smooth transition */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16 transition-all duration-500 opacity-60 grayscale hover:opacity-100 hover:grayscale-0"
        >
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={index}
                className="group flex items-center space-x-2 text-gray-500 transition-colors duration-300 hover:text-brand-dark"
              >
                <IconComponent className="w-5 h-5 text-gray-400 transition-colors duration-300 group-hover:text-gold-400" />
                <span className="font-display font-bold text-sm tracking-widest text-gray-400 group-hover:text-brand-dark transition-colors duration-300">
                  {partner.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
