import { motion } from 'motion/react';
import { ArrowRight, Calendar, Bookmark, Download, Share2, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from '../i18n';

interface Article {
  id: string;
  title: string;
  summary: string;
  fullContent: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  downloadUrl: string;
}

interface ResearchInsightsProps {
  onContactClick: (insightTitle: string) => void;
}

export default function ResearchInsights({ onContactClick }: ResearchInsightsProps) {
  const { t } = useTranslation();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'ins-1',
      title: 'Global Office Trends: Designing Post-Hybrid Hubs',
      summary: 'Discover how modern enterprises are restructuring prime office squares to foster high-performance collaborative cultures.',
      fullContent: `Discover how modern enterprises are restructuring prime office squares to foster high-performance collaborative cultures.

The evolution of workplace design is reshaping how companies approach their real estate portfolios. As hybrid work models become the norm, organizations are reimagining office spaces to maximize collaboration while accommodating flexible work arrangements.

Key findings from our research indicate that companies are investing in:
- Flexible collaboration zones instead of assigned seating
- High-quality amenity spaces to drive employee engagement
- Advanced technology infrastructure for seamless hybrid meetings
- Wellness-focused design incorporating natural light and green spaces

The implications for commercial real estate are significant. Properties that can adapt to these changing needs will command premium valuations and attract quality tenants. Properties designed solely for traditional office use may face challenges in attracting and retaining occupants.`,
      date: 'July 15, 2026',
      category: t('insights', 'market') as string,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop',
      readTime: '8 min read',
      downloadUrl: 'https://example.com/reports/office-trends-2026.pdf',
    },
    {
      id: 'ins-2',
      title: 'Decarbonizing Commercial Portfolios by 2030',
      summary: 'An actionable roadmap for corporate landlords looking to optimize capital expenditures while transitioning to net-zero assets.',
      fullContent: `An actionable roadmap for corporate landlords looking to optimize capital expenditures while transitioning to net-zero assets.

Decarbonization is no longer a future consideration—it's a present investment imperative. Corporate landlords and institutional investors face mounting pressure from regulatory bodies, stakeholders, and market demand to transition their portfolios to net-zero emissions.

Our comprehensive analysis reveals:
- Cost-effective retrofit strategies that improve building performance
- Financing mechanisms specifically designed for green transitions
- Tax incentives and rebates available across major markets
- Projected ROI timelines for various decarbonization approaches

The business case is compelling: decarbonized assets command 15-25% rental premiums and attract ESG-focused tenants willing to pay more for sustainable spaces. Early movers will capture disproportionate returns in an increasingly carbon-conscious market.`,
      date: 'June 28, 2026',
      category: t('insights', 'sustainability') as string,
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop',
      readTime: '10 min read',
      downloadUrl: 'https://example.com/reports/decarbonization-roadmap-2030.pdf',
    },
    {
      id: 'ins-3',
      title: 'Logistics Real Estate: The Next Warehouse Horizon',
      summary: 'Evaluating the impact of automated micro-fulfillment facilities on urban supply chains and long-term land values.',
      fullContent: `Evaluating the impact of automated micro-fulfillment facilities on urban supply chains and long-term land values.

The logistics real estate sector is experiencing unprecedented transformation driven by e-commerce acceleration and automation adoption. Micro-fulfillment centers (MFCs) are emerging as a game-changing asset class for investors seeking exposure to logistics real estate with lower capital requirements.

Key market dynamics:
- Last-mile delivery economics favoring urban and near-urban MFC locations
- Automation reducing labor dependency and improving facility scalability
- Supply chain resilience driving geographic diversification of logistics assets
- Omnichannel retail models requiring distributed inventory networks

Investors who understand these trends can capture outsized returns through strategic acquisition and development of MFC assets. The window of opportunity is narrowing as institutional capital increasingly recognizes these value drivers.`,
      date: 'May 12, 2026',
      category: t('insights', 'logistics') as string,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop',
      readTime: '9 min read',
      downloadUrl: 'https://example.com/reports/logistics-warehouse-horizon.pdf',
    },
  ];

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleDownloadReport = (downloadUrl: string, title: string) => {
    try {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.log('[v0] Download triggered:', downloadUrl);
      window.open(downloadUrl, '_blank');
    }
  };

  const handleShareArticle = (article: Article) => {
    const shareData = {
      title: article.title,
      text: article.summary,
      url: `${window.location.origin}/#insights`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => {
        if (err.name !== 'AbortError') {
          console.log('[v0] Share error:', err);
          fallbackShare(article);
        }
      });
    } else {
      fallbackShare(article);
    }
  };

  const fallbackShare = (article: Article) => {
    const text = `${article.title} - ${article.summary}`;
    const url = `${window.location.origin}/#insights`;
    const encoded = `${encodeURIComponent(text)} ${encodeURIComponent(url)}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title}\n${article.summary}\n${url}`);
      alert('Article link copied to clipboard!');
    } else {
      console.log('[v0] Copy to clipboard fallback');
    }
  };

  return (
    <section id="insights" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header Block */}
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

                {/* Category tag */}
                <div className="absolute bottom-4 left-4 bg-brand-dark/95 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[9px] font-bold text-gold-400 uppercase tracking-widest flex items-center space-x-1.5">
                  <Bookmark className="w-3 h-3 text-gold-400 shrink-0" />
                  <span>{article.category}</span>
                </div>
              </div>

              {/* Info Block */}
              <div className="bg-gray-50 flex-grow border border-t-0 border-gray-100 p-6 flex flex-col justify-between">
                <div>
                  {/* Metadata */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <div className="flex items-center space-x-1.5 text-gray-400">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{article.date}</span>
                    </div>
                    <span className="text-gray-500 font-medium">{article.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-lg text-gray-900 tracking-tight mb-3 group-hover:text-gold-400 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200/65 space-y-3">
                  {/* Read Brief Button */}
                  <button
                    id={`read-more-${article.id}`}
                    onClick={() => handleReadArticle(article)}
                    className="w-full group/btn flex items-center justify-between px-4 py-2.5 bg-brand-dark text-gold-400 rounded hover:bg-gray-900 transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
                  >
                    <span>{t('insights', 'read')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>

                  {/* Download & Share Buttons */}
                  <div className="flex gap-3">
                    <button
                      id={`download-${article.id}`}
                      onClick={() => handleDownloadReport(article.downloadUrl, article.title)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded hover:border-gold-400 hover:text-gold-400 transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
                      title="Download PDF report"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                    <button
                      id={`share-${article.id}`}
                      onClick={() => handleShareArticle(article)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded hover:border-gold-400 hover:text-gold-400 transition-colors duration-300 text-xs font-bold uppercase tracking-widest"
                      title="Share this article"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Modal */}
      {selectedArticle && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            >
              <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 md:p-8 flex items-start justify-between">
                  <div className="pr-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">
                        {selectedArticle.category}
                      </span>
                      <span className="text-xs text-gray-500">{selectedArticle.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                      {selectedArticle.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Image */}
                <div className="w-full h-64 md:h-80 overflow-hidden">
                  <img
                    src={selectedArticle.image}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600 pb-6 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedArticle.date}</span>
                    </div>
                  </div>

                  <div className="prose prose-sm md:prose-base max-w-none text-gray-600">
                    {selectedArticle.fullContent.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Modal Footer Actions */}
                  <div className="pt-6 border-t border-gray-200 flex gap-3 flex-col sm:flex-row">
                    <button
                      onClick={() => handleDownloadReport(selectedArticle.downloadUrl, selectedArticle.title)}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-brand-dark text-gold-400 rounded font-bold text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Report
                    </button>
                    <button
                      onClick={() => handleShareArticle(selectedArticle)}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded font-bold text-sm uppercase tracking-widest hover:border-gold-400 hover:text-gold-400 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Article
                    </button>
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded font-bold text-sm uppercase tracking-widest hover:border-gray-400 transition-colors ml-auto"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
    </section>
  );
}
