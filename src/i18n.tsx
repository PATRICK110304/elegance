import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'fr' | 'en';

const translations = {
  fr: {
    nav: { properties: 'Biens', services: 'Services', about: 'À propos', insights: 'Analyses', contact: 'Nous contacter', home: 'Accueil', close: 'Fermer le menu', open: 'Ouvrir le menu' },
    hero: { kicker: 'ESPACES PREMIUM. EMPLACEMENTS PRIMES.', title: 'Des espaces qui', highlight: 'inspirent le succès', body: "Northline Commercial est la principale société de conseil et de courtage spécialisée dans les espaces de travail d'entreprise de classe A, les installations logistiques de pointe et les domaines commerciaux haut de gamme sur mesure. Nous faisons le lien entre une architecture d'élite et des opportunités d'affaires inégalées.", explore: 'Explorer les biens', video: 'Regarder la visite vidéo' },
    filters: { title: 'Affiner la sélection', searchLabel: 'Rechercher un bien', searchPlaceholder: 'Rechercher par nom, lieu...', category: 'Catégorie', min: 'Prix min.', max: 'Prix max.', available: 'Disponibles uniquement', reset: 'Réinitialiser', one: 'bien trouvé', many: 'biens trouvés', all: 'Tous les biens' },
    insights: { kicker: 'CONSEIL MARCHÉ', title: 'Recherche & analyses sectorielles', viewAll: 'Voir toutes les analyses', read: 'Lire le brief', market: 'INTELLIGENCE MARCHÉ', sustainability: 'DURABILITÉ', logistics: 'LOGISTIQUE & INDUSTRIE' },
    contact: { close: 'Fermer', title: 'Donnez une nouvelle dimension à votre entreprise', intro: 'Contactez notre équipe de conseillers pour réserver votre espace premium ou planifier une visite physique privée.', plan: 'Planifier une séance de conseil privée', name: 'Nom complet', email: 'Adresse e-mail', phone: 'Numéro de téléphone', company: 'Entreprise / Organisation', interest: "Centre d'intérêt / Domaine d'activité", message: 'Votre message', messagePlaceholder: 'Décrivez brièvement vos besoins en espace ou votre calendrier d’investissement...', submit: 'Demander un appel de conseil', success: 'Demande reçue avec succès', successText: "Merci d'avoir contacté Northline Commercial. Un conseiller en immobilier d'entreprise senior a été affecté à votre demande et vous contactera dans un délai de 2 heures ouvrables.", back: 'Retour à la galerie' },
  },
  en: {
    nav: { properties: 'Properties', services: 'Services', about: 'About Us', insights: 'Insights', contact: 'Get In Touch', home: 'Northline Commercial Home', close: 'Close menu', open: 'Open menu' },
    hero: { kicker: 'PREMIUM SPACES. PRIME LOCATIONS.', title: 'Spaces that', highlight: 'inspire success', body: 'Northline Commercial is a premier advisory and brokerage firm specializing in Class-A corporate workspaces, advanced logistics facilities, and bespoke commercial estates. We connect elite architecture with unmatched business opportunities.', explore: 'Explore Properties', video: 'Watch Video Tour' },
    filters: { title: 'Refine selection', searchLabel: 'Search properties', searchPlaceholder: 'Search by name, location...', category: 'Category', min: 'Min. price', max: 'Max. price', available: 'Available only', reset: 'Reset', one: 'property found', many: 'properties found', all: 'All properties' },
    insights: { kicker: 'MARKET ADVISORY', title: 'Research & Industry Insights', viewAll: 'View All Insights', read: 'Read Brief', market: 'MARKET INTEL', sustainability: 'SUSTAINABILITY', logistics: 'LOGISTICS & INDUSTRIAL' },
    contact: { close: 'Close', title: 'Give your business a new dimension', intro: 'Contact our advisory team to reserve your premium space or plan a private in-person tour.', plan: 'Schedule a private advisory session', name: 'Full name', email: 'Email address', phone: 'Phone number', company: 'Company / Organization', interest: 'Interest / Business area', message: 'Your message', messagePlaceholder: 'Briefly describe your spatial requirements or investment timeline...', submit: 'Request an advisory call', success: 'Request received successfully', successText: 'Thank you for contacting Northline Commercial. A senior commercial real estate advisor has been assigned to your request and will contact you within 2 business hours.', back: 'Back to gallery' },
  },
} as const;

type TranslationKey = keyof typeof translations.fr;
type TranslationValue = typeof translations.fr;

const I18nContext = createContext<{ locale: Locale; setLocale: (locale: Locale) => void; t: <S extends TranslationKey, K extends keyof TranslationValue[S]>(section: S, key: K) => TranslationValue[S][K] } | null>(null);

function detectLocale(): Locale {
  const stored = localStorage.getItem('northline-locale');
  if (stored === 'fr' || stored === 'en') return stored;
  return navigator.languages?.some((language) => language.toLowerCase().startsWith('en')) || navigator.language.toLowerCase().startsWith('en') ? 'en' : 'fr';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  useEffect(() => setLocaleState(detectLocale()), []);
  const setLocale = (next: Locale) => { setLocaleState(next); localStorage.setItem('northline-locale', next); };
  const value = useMemo(() => ({ locale, setLocale, t: (section: TranslationKey, key: never) => translations[locale][section][key] }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useTranslation must be used inside I18nProvider');
  return context;
}

export function getTranslations(locale: Locale) { return translations[locale]; }
export type { TranslationValue };
