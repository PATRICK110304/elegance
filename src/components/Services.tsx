import { motion } from 'motion/react';
import { Key, FileSignature, Briefcase, HardHat, ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n';

interface ServicesProps {
  onContactClick: (interest?: string) => void;
}

export default function Services({ onContactClick }: ServicesProps) {
  const { t } = useTranslation();
  const services = [
    {
      id: 'srv-1',
      icon: Key,
      title: t('services', 's1Title'),
      description: t('services', 's1Desc'),
    },
    {
      id: 'srv-2',
      icon: FileSignature,
      title: t('services', 's2Title'),
      description: t('services', 's2Desc'),
    },
    {
      id: 'srv-3',
      icon: Briefcase,
      title: t('services', 's3Title'),
      description: t('services', 's3Desc'),
    },
    {
      id: 'srv-4',
      icon: HardHat,
      title: t('services', 's4Title'),
      description: t('services', 's4Desc'),
    },
  ];

  return (
    <section id="services" className="bg-gray-50 py-20 md:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-gold-400 uppercase block mb-3">
            {t('services', 'kicker')}
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-gray-900 leading-tight">
            {t('services', 'title')}
          </h2>
          <div className="w-12 h-1 bg-gold-400 mx-auto mt-4" />
          <p className="text-gray-600 text-sm md:text-base mt-6">{t('services', 'subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group bg-white p-8 border border-gray-100 rounded-xl transition-all duration-300 hover:border-gold-400 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-gold-50 flex items-center justify-center mb-8 transition-colors duration-300 group-hover:bg-gold-100">
                    <IconComponent className="w-7 h-7 text-gold-400" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-900 tracking-tight mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.description}</p>
                </div>
                <button
                  id={`learn-more-${service.id}`}
                  onClick={() => onContactClick(service.title)}
                  className="group/btn flex items-center space-x-2 text-xs font-bold text-gold-400 uppercase tracking-widest mt-auto cursor-pointer focus:outline-none"
                >
                  <span>{t('services', 'learn')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-gold-400" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
