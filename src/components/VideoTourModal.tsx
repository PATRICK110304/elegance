import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from '../i18n';

const VIDEO_TOUR_URL =
  'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/real_estate_bg_hero_1.mp4';

interface VideoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoTourModal({ isOpen, onClose }: VideoTourModalProps) {
  const { t } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-tour-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl overflow-hidden rounded-lg border border-white/15 bg-brand-dark shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 id="video-tour-title" className="font-display text-lg font-semibold text-white">
            {t('videoTour', 'title')}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-gold-400"
            aria-label={t('videoTour', 'close')}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <video
          className="aspect-video w-full bg-black object-contain"
          controls
          autoPlay
          playsInline
          preload="metadata"
        >
          <source src={VIDEO_TOUR_URL} type="video/mp4" />
          {t('videoTour', 'unsupported')}
        </video>
      </div>
    </div>
  );
}

export { VIDEO_TOUR_URL };

