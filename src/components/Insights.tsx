import { motion } from 'motion/react';
import { ArrowRight, Calendar, Bookmark } from 'lucide-react';
import { useTranslation } from '../i18n';

interface InsightsProps {
  onContactClick: (insightTitle: string) => void;
}

export default function Insights({ onContactClick }: InsightsProps) {
  const { t } = useTranslation();
  const articles = [
    {
      id: 'ins-1',
      title: 'Global Office Trends: Designing Post-Hybrid Hubs',
      date: 'July 15, 2026',
      category: t('insights', 'market'),
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
      excerpt: 'Discover how modern enterprises are restructuring prime office squares to foster high-performance collaborative cultures.',
    },
    {
      id: 'ins-2',
      title: 'Decarbonizing Commercial Portfolios by 2030',
      date: 'June 28, 2026',
      category: t('insights', 'sustainability'),
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop',
      excerpt: 'An actionable roadmap for corporate landlords looking to optimize capital expenditures while transitioning to net-zero assets.',
    },
    {
      id: 'ins-3',
      title: 'Logistics Real Estate: The Next Warehouse Horizon',
      date: 'May 12, 2026',
      category: t('insights', 'logistics'),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
      excerpt: 'Evaluating the impact of automated micro-fulfillment facilities on urban supply chains and long-term land values.',
    },
  ];

  return (
    <section id="insights" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Block (Light Theme) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-gold-400 uppercase">
              {t('insights', 'kicker')}
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-gray-900 leading-tight mt-3">
              {t('insights', 'title')}
            </h2>
          </div>
          <button
            id="view-all-insights-btn"
            onClick={() => onContactClick('All Insights')}
            className="self-start md:self-auto border border-gray-300 hover:border-gold-400 hover:text-gold-400 text-gray-700 font-bold text-xs uppercase tracking-widest py-3 px-6 rounded transition-colors duration-300 cursor-pointer"
          >
            {t('insights', 'viewAll')}
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Image Block */}
              <div className="h-56 w-full relative overflow-hidden shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Category tag */}
                <div className="absolute bottom-4 left-4 bg-brand-dark/95 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold text-gold-400 uppercase tracking-widest flex items-center space-x-1.5">
                  <Bookmark className="w-3 h-3 text-gold-400 shrink-0" />
                  <span>{article.category}</span>
                </div>
              </div>

              {/* Info Block */}
              <div className="bg-gray-50 flex-grow border border-t-0 border-gray-100 p-6 flex flex-col justify-between">
                <div>
                  {/* Date Metadata */}
                  <div className="flex items-center space-x-1.5 text-gray-400 text-xs mb-3">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>{article.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-gray-900 tracking-tight mb-3 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                {/* Read More link */}
                <div className="pt-4 border-t border-gray-200/65">
                  <button
                    id={`read-more-${article.id}`}
                    onClick={() => onContactClick(article.title)}
                    className="group/btn flex items-center space-x-2 text-xs font-bold text-gold-400 uppercase tracking-widest cursor-pointer focus:outline-none"
                  >
                    <span>{t('insights', 'read')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-gold-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
