import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Bookmark, Download, Share2, X } from 'lucide-react';
import { useTranslation } from '../i18n';

interface InsightsProps {
  onContactClick: (insightTitle: string) => void;
}

interface InsightArticle {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  date: string;
  readTime: string;
  downloadUrl: string;
  category: string;
  image: string;
}

const articleContent = {
  office: 'The next generation of office hubs is being designed around flexibility, collaboration, and measurable employee experience. Leading occupiers are consolidating into highly connected districts while creating hospitality-inspired spaces that support both focused work and team culture. The result is a more intentional approach to footprint planning: fewer square metres, better amenities, and stronger links to public transport and local services.',
  sustainability: 'Decarbonising a commercial portfolio requires more than a single retrofit programme. Asset owners are combining building-performance data, targeted capital expenditure, and renewable-energy procurement to prioritise the highest-impact interventions. A clear 2030 roadmap starts with a reliable baseline, then aligns leasing, maintenance, and investment decisions around operational carbon reduction.',
  logistics: 'Urban logistics is moving closer to the customer. Automated micro-fulfilment, adaptable industrial buildings, and last-mile networks are reshaping how investors assess land value and warehouse demand. Successful strategies balance delivery speed with planning constraints, energy requirements, and the long-term flexibility of each asset.',
};

export default function Insights({ onContactClick }: InsightsProps) {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);
  const [shareMessage, setShareMessage] = useState('');

  const articles: InsightArticle[] = [
    {
      id: 'ins-1',
      title: 'Global Office Trends: Designing Post-Hybrid Hubs',
      summary: 'Discover how modern enterprises are restructuring prime office squares to foster high-performance collaborative cultures.',
      fullContent: articleContent.office,
      date: 'July 15, 2026',
      readTime: '6 min read',
      downloadUrl: '/reports/global-office-trends.txt',
      category: t('insights', 'market'),
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 'ins-2',
      title: 'Decarbonizing Commercial Portfolios by 2030',
      summary: 'An actionable roadmap for corporate landlords looking to optimize capital expenditures while transitioning to net-zero assets.',
      fullContent: articleContent.sustainability,
      date: 'June 28, 2026',
      readTime: '8 min read',
      downloadUrl: '/reports/decarbonizing-commercial-portfolios.txt',
      category: t('insights', 'sustainability'),
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop',
    },
    {
      id: 'ins-3',
      title: 'Logistics Real Estate: The Next Warehouse Horizon',
      summary: 'Evaluating the impact of automated micro-fulfillment facilities on urban supply chains and long-term land values.',
      fullContent: articleContent.logistics,
      date: 'May 12, 2026',
      readTime: '5 min read',
      downloadUrl: '/reports/logistics-real-estate.txt',
      category: t('insights', 'logistics'),
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
    },
  ];

  const handleDownload = (article: InsightArticle) => {
    const report = `${article.title}\n\n${article.fullContent}\n\nNorthline Commercial | ${article.date}`;
    const url = URL.createObjectURL(new Blob([report], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${article.id}-report.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleShare = async (article: InsightArticle) => {
    const url = `${window.location.origin}/insights/${article.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, text: article.summary, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage('Link copied');
        window.setTimeout(() => setShareMessage(''), 2200);
      }
    } catch {
      setShareMessage('Share cancelled');
      window.setTimeout(() => setShareMessage(''), 2200);
    }
  };

  return (
    <section id="insights" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-xs md:text-sm font-bold tracking-[0.25em] text-gold-400 uppercase">{t('insights', 'kicker')}</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-gray-900 leading-tight mt-3">{t('insights', 'title')}</h2>
          </div>
          <button id="view-all-insights-btn" onClick={() => onContactClick('All Insights')} className="self-start md:self-auto border border-gray-300 hover:border-gold-400 hover:text-gold-400 text-gray-700 font-bold text-xs uppercase tracking-widest py-3 px-6 rounded transition-colors duration-300 cursor-pointer">
            {t('insights', 'viewAll')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article key={article.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: index * 0.15 }} className="group flex flex-col h-full rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="h-56 w-full relative overflow-hidden shrink-0">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute bottom-4 left-4 bg-brand-dark/95 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold text-gold-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Bookmark className="w-3 h-3 text-gold-400 shrink-0" />
                  <span>{article.category}</span>
                </div>
              </div>
              <div className="bg-gray-50 flex-grow border border-t-0 border-gray-100 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3"><Calendar className="w-3.5 h-3.5 shrink-0" /><span>{article.date} · {article.readTime}</span></div>
                  <h3 className="font-display font-bold text-lg text-gray-900 tracking-tight mb-3 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">{article.summary}</p>
                </div>
                <div className="pt-4 border-t border-gray-200/65 flex items-center justify-between gap-3">
                  <button id={`read-more-${article.id}`} onClick={() => setSelectedArticle(article)} className="group/btn flex items-center gap-2 text-xs font-bold text-gold-400 uppercase tracking-widest cursor-pointer focus:outline-none">
                    <span>{t('insights', 'read')}</span><ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1 text-gold-400" />
                  </button>
                  <div className="flex items-center gap-1">
                    <button aria-label={`Download ${article.title}`} onClick={() => handleDownload(article)} className="p-2 text-gray-500 hover:text-gold-500 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400" title="Download report"><Download className="w-4 h-4" /></button>
                    <button aria-label={`Share ${article.title}`} onClick={() => handleShare(article)} className="p-2 text-gray-500 hover:text-gold-500 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-400" title="Share"><Share2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {shareMessage && <div role="status" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 rounded bg-brand-dark px-4 py-3 text-sm text-white shadow-lg">{shareMessage}</div>}

      {selectedArticle && (
        <div role="presentation" className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark/80 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedArticle(null); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="insight-modal-title" className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 text-gray-900 shadow-2xl md:p-10">
            <button aria-label="Close article" onClick={() => setSelectedArticle(null)} className="absolute right-4 top-4 rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"><X className="w-5 h-5" /></button>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-500">{selectedArticle.category}</p>
            <h2 id="insight-modal-title" className="pr-8 font-display text-2xl font-bold md:text-4xl">{selectedArticle.title}</h2>
            <p className="mt-3 text-sm text-gray-500">{selectedArticle.date} · {selectedArticle.readTime}</p>
            <p className="mt-8 text-base leading-8 text-gray-700">{selectedArticle.fullContent}</p>
            <button onClick={() => handleDownload(selectedArticle)} className="mt-8 inline-flex items-center gap-2 rounded bg-brand-dark px-5 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-gold-500"><Download className="w-4 h-4" />Download report</button>
          </div>
        </div>
      )}
    </section>
  );
}

export { Insights };
export type { InsightArticle };
