import { motion } from 'motion/react';
import { Building2, Gem, User, TrendingUp } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function FeaturesGrid() {
  const { t } = useTranslation();
  const features = [
    {
      icon: Building2,
      title: t('features', 'archTitle'),
      description: t('features', 'archDesc'),
    },
    {
      icon: Gem,
      title: t('features', 'locTitle'),
      description: t('features', 'locDesc'),
    },
    {
      icon: User,
      title: t('features', 'brokTitle'),
      description: t('features', 'brokDesc'),
    },
    {
      icon: TrendingUp,
      title: t('features', 'yieldTitle'),
      description: t('features', 'yieldDesc'),
    },
  ];

  return (
    <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-8">
      <motion.div
        id="features-overlap-grid"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="lg:-mt-24 glass rounded-2xl overflow-hidden shadow-2xl border border-white/10"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group p-8 md:p-10 flex flex-col items-start transition-all duration-300 hover:bg-white/[0.02]"
              >
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 mb-6 transition-colors duration-300 group-hover:bg-gold-400/10 group-hover:border-gold-400/30">
                  <IconComponent className="w-6 h-6 text-gold-400 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2 tracking-tight group-hover:text-gold-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
