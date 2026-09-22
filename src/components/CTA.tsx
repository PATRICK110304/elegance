import { motion } from 'motion/react';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface CTAProps {
  onContactClick: () => void;
}

export default function CTA({ onContactClick }: CTAProps) {
  return (
    <section id="cta" className="relative py-24 md:py-32 overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Tour commerciale premium à Abidjan"
          className="w-full h-full object-cover opacity-35 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-12"
        >
          <div className="max-w-2xl">
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase">
              SÉCURISEZ VOTRE PATRIMOINE
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white leading-tight mt-4">
              Prêt à trouver votre <br />
              prochain espace premium ?
            </h2>
            <p className="text-gray-300 text-sm md:text-base mt-6 leading-relaxed">
              Planifiez une visite confidentielle ou un briefing conseil avec nos spécialistes en immobilier d'entreprise à Abidjan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <button
              id="cta-contact-btn"
              onClick={() => onContactClick()}
              className="group bg-gold-400 hover:bg-gold-500 text-brand-dark font-bold text-sm px-8 py-4 rounded flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-gold-400/20 cursor-pointer"
            >
              <span>Nous contacter</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="tel:+2250500183920"
              className="border border-white/25 hover:border-white/50 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded text-center flex items-center justify-center space-x-2 transition-colors duration-300"
            >
              <PhoneCall className="w-4 h-4 text-gold-400" />
              <span>Appeler +225 05 00 18 39 20</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
