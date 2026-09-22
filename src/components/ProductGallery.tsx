import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  imageUrls: string[];
  title: string;
}

export default function ProductGallery({ imageUrls, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const images = imageUrls.filter(Boolean);
  const activeImage = images[activeIndex] ?? images[0];

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % images.length);
      if (event.key === 'ArrowLeft')
        setActiveIndex((index) => (index - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [images.length, isLightboxOpen]);

  if (!activeImage) return null;

  const selectImage = (index: number) => setActiveIndex(index);
  const next = () => setActiveIndex((index) => (index + 1) % images.length);
  const previous = () => setActiveIndex((index) => (index - 1 + images.length) % images.length);

  return (
    <>
      <div className="space-y-3">
        <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#162032]">
          <img
            src={activeImage}
            alt={`${title} — photo ${activeIndex + 1}`}
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Ouvrir la galerie en plein écran"
            className="absolute right-3 top-3 rounded-lg border border-white/15 bg-brand-dark/75 p-2 text-white backdrop-blur transition-colors hover:bg-gold-400 hover:text-brand-dark"
          >
            <Maximize2 aria-hidden="true" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previous}
                aria-label="Photo précédente"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-brand-dark/70 p-2 text-white backdrop-blur hover:bg-gold-400 hover:text-brand-dark"
              >
                <ChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Photo suivante"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-brand-dark/70 p-2 text-white backdrop-blur hover:bg-gold-400 hover:text-brand-dark"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Miniatures de la galerie">
            {images.map((image, index) => (
              <button
                type="button"
                key={image}
                onClick={() => selectImage(index)}
                aria-label={`Afficher la photo ${index + 1}`}
                aria-current={index === activeIndex}
                className={`size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity ${
                  index === activeIndex
                    ? 'border-gold-400 opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galerie ${title}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Fermer la galerie"
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          >
            <X aria-hidden="true" />
          </button>
          <img
            src={activeImage}
            alt={`${title} — photo ${activeIndex + 1}`}
            className="max-h-[88vh] max-w-full rounded-lg object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previous();
                }}
                aria-label="Photo précédente"
                className="absolute left-4 rounded-full bg-white/10 p-3 text-white hover:bg-gold-400 hover:text-brand-dark"
              >
                <ChevronLeft />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                aria-label="Photo suivante"
                className="absolute right-4 rounded-full bg-white/10 p-3 text-white hover:bg-gold-400 hover:text-brand-dark"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
