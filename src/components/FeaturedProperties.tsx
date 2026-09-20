import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock3, Layers, MapPin } from 'lucide-react';
import ProductFilters, { initialFilters, ProductFilterValues, PropertyStatus } from './ProductFilters';
import WhatsAppButton from './WhatsAppButton';
import ProductGallery from './ProductGallery';
import LocationMap from './LocationMap';

interface FeaturedPropertiesProps {
  onContactClick: (propertyTitle: string) => void;
}

interface Property {
  id: string;
  title: string;
  location: string;
  image: string;
  specs: string;
  category: string;
  price: number;
  priceLabel: string;
  status: PropertyStatus;
  reservedUntil?: string;
  image_urls: string[];
  coordinates?: { latitude: number; longitude: number };
}

const properties: Property[] = [
  { id: 'prop-1', title: 'One Northline Plaza', location: 'Midtown Manhattan, New York', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', image_urls: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop'], coordinates: { latitude: 40.7549, longitude: -73.984 }, specs: '350,000 SQ. FT. • CLASS-A OFFICE', category: 'Local commercial', price: 120, priceLabel: '$120 / Sq. Ft. / Yr', status: 'available' },
  { id: 'prop-2', title: 'The Atrium at Westside', location: 'Silicon Valley, California', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', image_urls: ['https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop', 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop'], coordinates: { latitude: 37.3875, longitude: -122.0575 }, specs: '180,000 SQ. FT. • TECH HQ / R&D', category: 'Local commercial', price: 95, priceLabel: '$95 / Sq. Ft. / Yr', status: 'reserved', reservedUntil: new Date(Date.now() + 1000 * 60 * 60 * 17).toISOString() },
  { id: 'prop-3', title: 'Summit Logistics Hub', location: 'Port of Newark, New Jersey', image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop', image_urls: ['https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072&auto=format&fit=crop', 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?q=80&w=2070&auto=format&fit=crop'], coordinates: { latitude: 40.7357, longitude: -74.1724 }, specs: '500,000 SQ. FT. • FREESTANDING LOGISTICS', category: 'Terrain', price: 22, priceLabel: '$22 / Sq. Ft. / Yr', status: 'sold' },
];

const statusConfig: Record<PropertyStatus, { label: string; className: string }> = {
  available: { label: 'Disponible', className: 'bg-emerald-500/90 text-white' },
  reserved: { label: 'Réservé', className: 'bg-orange-500/90 text-white' },
  sold: { label: 'Vendu', className: 'bg-red-500/90 text-white' },
};

function ReservationCountdown({ reservedUntil }: { reservedUntil: string }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, new Date(reservedUntil).getTime() - Date.now()));

  useEffect(() => {
    const interval = window.setInterval(() => setRemaining(Math.max(0, new Date(reservedUntil).getTime() - Date.now())), 1000);
    return () => window.clearInterval(interval);
  }, [reservedUntil]);

  const totalSeconds = Math.floor(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return remaining > 0 ? <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> Réservation expire dans {hours}h {minutes}m {seconds}s</span> : <span>Réservation expirée</span>;
}

export default function FeaturedProperties({ onContactClick }: FeaturedPropertiesProps) {
  const [filters, setFilters] = useState<ProductFilterValues>(initialFilters);
  const categories = ['Tous les biens', ...new Set(properties.map((property) => property.category))];
  const filteredProperties = properties.filter((property) => {
    const query = filters.search.trim().toLowerCase();
    const matchesSearch = !query || `${property.title} ${property.location} ${property.specs} ${property.category}`.toLowerCase().includes(query);
    const matchesCategory = filters.category === 'Tous les biens' || property.category === filters.category;
    const matchesMin = !filters.minPrice || property.price >= Number(filters.minPrice);
    const matchesMax = !filters.maxPrice || property.price <= Number(filters.maxPrice);
    const matchesAvailability = !filters.availableOnly || property.status === 'available';
    return matchesSearch && matchesCategory && matchesMin && matchesMax && matchesAvailability;
  });

  return (
    <section id="properties" className="border-b border-white/5 bg-brand-dark py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div><span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 md:text-sm">Splendeur architecturale</span><h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">Biens prestigieux en vedette</h2></div>
          <button onClick={() => onContactClick('All Properties')} className="self-start rounded border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-widest text-gray-300 transition-colors hover:border-gold-400 hover:text-gold-400 md:self-auto">Demander le catalogue complet</button>
        </div>

        <ProductFilters value={filters} categories={categories} resultCount={filteredProperties.length} onChange={setFilters} />

        {filteredProperties.length === 0 ? <div className="rounded-xl border border-dashed border-white/15 py-16 text-center text-gray-400">Aucun bien ne correspond à vos critères.</div> : <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {filteredProperties.map((property, index) => {
            const status = statusConfig[property.status];
            return <motion.article key={property.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.6, delay: index * 0.15 }} className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/5 bg-[#162032] shadow-xl">
              <div className="relative h-64 w-full shrink-0 overflow-hidden md:h-72"><img src={property.image} alt={property.title} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" referrerPolicy="no-referrer" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /><div className={`absolute left-4 top-4 rounded px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white ${status.className}`}>{status.label}</div><div className="absolute right-4 top-4 rounded border border-white/10 bg-brand-dark/90 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 backdrop-blur-md">{property.priceLabel}</div>{property.reservedUntil && <div className="absolute bottom-4 left-4 right-4 rounded bg-black/60 px-3 py-2 text-xs text-orange-200 backdrop-blur-sm"><ReservationCountdown reservedUntil={property.reservedUntil} /></div>}</div>
              <div className="flex flex-grow flex-col justify-between p-6"><div><div className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gold-400"><Layers className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /><span>{property.specs}</span></div><h3 className="mb-2 font-display text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-gold-300">{property.title}</h3><div className="mb-6 flex items-center gap-1.5 text-sm text-gray-400"><MapPin className="h-4 w-4 shrink-0 text-gray-500" aria-hidden="true" /><span>{property.location}</span></div><div className="mb-6 space-y-4"><ProductGallery imageUrls={property.image_urls} title={property.title} /><LocationMap location={property.location} latitude={property.coordinates?.latitude} longitude={property.coordinates?.longitude} /></div></div><div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row"><button onClick={() => onContactClick(property.title)} className="group/btn flex flex-1 items-center justify-center gap-2 rounded bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-gold-400 hover:text-brand-dark"><span>Request Details</span><ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true" /></button><WhatsAppButton propertyId={property.id} propertyTitle={property.title} compact /></div></div>
            </motion.article>;
          })}
        </div>}
      </div>
    </section>
  );
}
