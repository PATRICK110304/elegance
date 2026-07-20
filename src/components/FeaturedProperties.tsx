import { motion } from 'motion/react';
import { ArrowRight, MapPin, Layers } from 'lucide-react';

interface FeaturedPropertiesProps {
  onContactClick: (propertyTitle: string) => void;
}

export default function FeaturedProperties({ onContactClick }: FeaturedPropertiesProps) {
  const properties = [
    {
      id: 'prop-1',
      title: 'One Northline Plaza',
      location: 'Midtown Manhattan, New York',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
      specs: '350,000 SQ. FT. • CLASS-A OFFICE',
      price: '$120 / Sq. Ft. / Yr',
    },
    {
      id: 'prop-2',
      title: 'The Atrium at Westside',
      location: 'Silicon Valley, California',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
      specs: '180,000 SQ. FT. • TECH HQ / R&D',
      price: '$95 / Sq. Ft. / Yr',
    },
    {
      id: 'prop-3',
      title: 'Summit Logistics Hub',
      location: 'Port of Newark, New Jersey',
      image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop',
      specs: '500,000 SQ. FT. • FREESTANDING LOGISTICS',
      price: '$22 / Sq. Ft. / Yr',
    },
  ];

  return (
    <section
      id="properties"
      className="bg-brand-dark py-20 md:py-28 text-white border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
          <div>
            <span className="text-xs md:text-sm font-semibold tracking-[0.25em] text-gold-400 uppercase">
              Splendeur architecturale
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-tight mt-3">
              Biens prestigieux en vedette
            </h2>
          </div>
          <button
            id="view-all-properties-btn"
            onClick={() => onContactClick('All Properties')}
            className="self-start md:self-auto border border-white/20 hover:border-gold-400 hover:text-gold-400 text-gray-300 font-bold text-xs uppercase tracking-widest py-3 px-6 rounded transition-colors duration-300 cursor-pointer"
          >
            Demander le catalogue complet
          </button>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group flex flex-col h-full rounded-xl overflow-hidden border border-white/5 shadow-xl bg-[#162032]"
            >
              {/* Image Block with overlays and slow zoom */}
              <div className="h-64 md:h-72 w-full relative overflow-hidden shrink-0">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Overlapping Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-500 group-hover:from-black/90 group-hover:via-black/10" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-brand-dark/90 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded text-xs font-bold text-gold-400 uppercase tracking-wider">
                  {property.price}
                </div>
              </div>

              {/* Info Block */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  {/* Specs Tracked String */}
                  <div className="flex items-center space-x-1.5 text-gold-400 text-[10px] font-bold tracking-widest uppercase mb-3">
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span>{property.specs}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl text-white tracking-tight mb-2 group-hover:text-gold-300 transition-colors duration-300">
                    {property.title}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center space-x-1.5 text-gray-400 text-sm mb-6">
                    <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                    <span>{property.location}</span>
                  </div>
                </div>

                {/* Details Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    id={`view-details-${property.id}`}
                    onClick={() => onContactClick(property.title)}
                    className="group/btn w-full bg-white/5 hover:bg-gold-400 text-white hover:text-brand-dark font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Request Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
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
