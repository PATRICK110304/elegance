import { MapPin } from 'lucide-react';

interface LocationMapProps {
  location: string;
  latitude?: number;
  longitude?: number;
}

export default function LocationMap({ location, latitude, longitude }: LocationMapProps) {
  const query = latitude !== undefined && longitude !== undefined ? `${latitude},${longitude}` : location;
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude !== undefined && latitude !== undefined ? `${longitude - 0.025}%2C${latitude - 0.018}%2C${longitude + 0.025}%2C${latitude + 0.018}` : ''}&layer=mapnik&marker=${latitude !== undefined && longitude !== undefined ? `${latitude}%2C${longitude}` : ''}`;

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#162032]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3"><MapPin className="text-gold-400" aria-hidden="true" /><div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400">Localisation</p><p className="text-sm text-gray-300">{location}</p></div></div>
      <iframe title={`Carte de localisation — ${location}`} src={mapUrl || `https://www.openstreetmap.org/export/embed.html?search=${encodeURIComponent(query)}`} className="h-52 w-full border-0 grayscale-[0.25]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <a href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(query)}`} target="_blank" rel="noreferrer" className="block px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gold-400 transition-colors hover:text-gold-300">Voir sur OpenStreetMap ↗</a>
    </div>
  );
}
