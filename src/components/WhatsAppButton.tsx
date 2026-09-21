import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  propertyId: string;
  propertyTitle: string;
  compact?: boolean;
}

const WHATSAPP_NUMBER = '225XXXXXXXX';

export default function WhatsAppButton({ propertyId, propertyTitle, compact = false }: WhatsAppButtonProps) {
  const message = `Bonjour, je suis intéressé(e) par le bien ${propertyTitle} (ID: ${propertyId})`;
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Contacter WhatsApp au sujet de ${propertyTitle}`}
      className={`flex items-center justify-center gap-2 rounded-lg bg-[#25D366] font-semibold text-brand-dark transition-colors hover:bg-[#42e681] ${compact ? 'px-4 py-2.5 text-[10px] uppercase tracking-wider' : 'px-5 py-3 text-sm'}`}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      WhatsApp
    </a>
  );
}
