import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'fr' | 'en';

const translations = {
  fr: {
    nav: {
      properties: 'Biens',
      services: 'Services',
      about: 'À propos',
      insights: 'Analyses',
      contact: 'Nous contacter',
      home: 'Accueil',
      close: 'Fermer le menu',
      open: 'Ouvrir le menu',
    },
    hero: {
      kicker: 'ESPACES PREMIUM. EMPLACEMENTS PRIMES.',
      title: 'Des espaces qui',
      highlight: 'inspirent le succès',
      body: "Northline Commercial est la principale société de conseil et de courtage spécialisée dans les espaces de travail d'entreprise de classe A, les installations logistiques de pointe et les domaines commerciaux haut de gamme sur mesure en Côte d'Ivoire. Nous faisons le lien entre une architecture d'élite et des opportunités d'affaires inégalées.",
      explore: 'Explorer les biens',
      video: 'Regarder la visite vidéo',
    },
    videoTour: {
      title: 'Visite vidéo',
      close: 'Fermer la visite vidéo',
      unsupported: 'Votre navigateur ne prend pas en charge la lecture vidéo.',
    },
    features: {
      archTitle: 'Architecture Classe A',
      archDesc: 'Bureaux ultra-premium conçus avec des systèmes durables et des intégrations technologiques de pointe.',
      locTitle: 'Emplacements primes',
      locDesc: 'Biens situés dans les hubs commerciaux à forte croissance, offrant une visibilité et une accessibilité exceptionnelles.',
      brokTitle: 'Courtage sur mesure',
      brokDesc: 'Conseil direct adapté aux besoins spatiaux, délais de location et paramètres d’investissement de votre entreprise.',
      yieldTitle: 'Optimisation du rendement',
      yieldDesc: 'Recherche de marché stratégique pour que vos investissements immobiliers génèrent une forte plus-value.',
    },
    about: {
      kicker: 'EXCELLENCE PIONNIÈRE',
      title: 'Notre vision, votre',
      title2: 'avantage stratégique',
      body: "Depuis plus de dix ans, Northline Commercial définit la référence en courtage immobilier d'entreprise premium en Côte d'Ivoire. Nous combinons une connaissance fine du marché abidjanais, des insights structurels et un réseau d'investisseurs pour sécuriser des espaces qui accélèrent la croissance de votre entreprise.",
      stat1: "Ans d'expérience",
      stat2: 'Projets réussis',
      stat3: 'm² gérés',
      cta: 'Devenir partenaire',
      featured: 'CAPITAL EN VEDETTE',
      featuredLoc: 'One Northline Plaza, Plateau – Abidjan',
    },
    services: {
      kicker: 'EXPERTISE SUR MESURE',
      title: 'Services commerciaux spécialisés',
      subtitle: 'Nous proposons des solutions immobilières sur l’ensemble du cycle de vie pour faire prospérer votre entreprise.',
      learn: 'En savoir plus',
      s1Title: 'Représentation des locataires',
      s1Desc: 'Acquérez des bureaux, laboratoires ou commerces premium. Nous réalisons la sélection de sites, le conseil en aménagement et sécurisons des conditions locatives compétitives.',
      s2Title: 'Conseil aux propriétaires',
      s2Desc: 'Positionnez votre portefeuille pour attirer des locataires corporate de premier plan. Branding, marketing et stratégies de location sur mesure.',
      s3Title: 'Ventes en investissement',
      s3Desc: 'Accompagnement des acquisitions et cessions complexes. Modélisation, évaluation d’actifs et off-market.',
      s4Title: 'Services de développement',
      s4Desc: 'Pilotage de constructions neuves et de réhabilitations majeures. Urbanisme, programmation architecturale et maîtrise des coûts.',
    },
    properties: {
      kicker: 'SPLENDEUR ARCHITECTURALE',
      title: 'Biens prestigieux en vedette',
      catalog: 'Demander le catalogue complet',
      details: 'Demander les détails',
      empty: 'Aucun bien ne correspond à vos critères.',
      available: 'Disponible',
      reserved: 'Réservé',
      sold: 'Vendu',
      reservedUntil: 'Réservation expire dans',
      reservedExpired: 'Réservation expirée',
    },
    filters: {
      title: 'Affiner la sélection',
      searchLabel: 'Rechercher un bien',
      searchPlaceholder: 'Rechercher par nom, lieu...',
      category: 'Catégorie',
      min: 'Prix min.',
      max: 'Prix max.',
      available: 'Disponibles uniquement',
      reset: 'Réinitialiser',
      one: 'bien trouvé',
      many: 'biens trouvés',
      all: 'Tous les biens',
    },
    insights: {
      kicker: 'CONSEIL MARCHÉ',
      title: 'Recherche & analyses sectorielles',
      viewAll: 'Voir toutes les analyses',
      read: 'Lire le brief',
      market: 'INTELLIGENCE MARCHÉ',
      sustainability: 'DURABILITÉ',
      logistics: 'LOGISTIQUE & INDUSTRIE',
      a1Title: 'Tendances bureaux : concevoir les hubs post-hybrides',
      a1Excerpt: 'Comment les entreprises restructurent les surfaces de bureaux primes pour favoriser la collaboration haute performance.',
      a1Date: '15 juillet 2026',
      a2Title: 'Décarboner les portefeuilles commerciaux d’ici 2030',
      a2Excerpt: 'Feuille de route pour les propriétaires visant le net-zéro tout en optimisant les investissements.',
      a2Date: '28 juin 2026',
      a3Title: 'Immobilier logistique : le prochain horizon entrepôts',
      a3Excerpt: 'Impact des micro-fulfilments automatisés sur les chaînes d’approvisionnement urbaines et la valeur foncière.',
      a3Date: '12 mai 2026',
    },
    cta: {
      kicker: 'SÉCURISEZ VOTRE PATRIMOINE',
      title: 'Prêt à trouver votre',
      title2: 'prochain espace premium ?',
      body: "Planifiez une visite confidentielle ou un briefing conseil avec nos spécialistes en immobilier d'entreprise à Abidjan.",
      button: 'Nous contacter',
      call: 'Appeler +225 05 00 18 39 20',
    },
    contact: {
      close: 'Fermer',
      title: 'Donnez une nouvelle dimension à votre entreprise',
      intro: 'Contactez notre équipe de conseillers pour réserver votre espace premium ou planifier une visite physique privée.',
      plan: 'Planifier une séance de conseil privée',
      name: 'Nom complet',
      email: 'Adresse e-mail',
      phone: 'Numéro de téléphone',
      company: 'Entreprise / Organisation',
      interest: "Centre d'intérêt / Domaine d'activité",
      message: 'Votre message',
      messagePlaceholder: "Décrivez brièvement vos besoins en espace ou votre calendrier d'investissement...",
      submit: 'Demander un appel de conseil',
      success: 'Demande reçue avec succès',
      successText: "Merci d'avoir contacté Northline Commercial. Un conseiller en immobilier d'entreprise senior a été affecté à votre demande et vous contactera dans un délai de 2 heures ouvrables.",
      back: 'Retour',
    },
    legal: {
      privacyTitle: 'Politique de confidentialité',
      termsTitle: "Conditions d'utilisation",
      backHome: "Retour à l'accueil",
    },
  },
  en: {
    nav: {
      properties: 'Properties',
      services: 'Services',
      about: 'About Us',
      insights: 'Insights',
      contact: 'Get In Touch',
      home: 'Northline Commercial Home',
      close: 'Close menu',
      open: 'Open menu',
    },
    hero: {
      kicker: 'PREMIUM SPACES. PRIME LOCATIONS.',
      title: 'Spaces that',
      highlight: 'inspire success',
      body: 'Northline Commercial is a premier advisory and brokerage firm specializing in Class-A corporate workspaces, advanced logistics facilities, and bespoke commercial estates in Côte d\'Ivoire. We connect elite architecture with unmatched business opportunities.',
      explore: 'Explore Properties',
      video: 'Watch the video tour',
    },
    videoTour: {
      title: 'Video tour',
      close: 'Close video tour',
      unsupported: 'Your browser does not support video playback.',
    },
    features: {
      archTitle: 'Class-A Architecture',
      archDesc: 'Ultra-premium office spaces designed with sustainable systems and state-of-the-art tech integrations.',
      locTitle: 'Prime Locations',
      locDesc: 'Properties situated in high-growth commercial hubs, providing outstanding visibility and accessibility.',
      brokTitle: 'Bespoke Brokerage',
      brokDesc: 'Direct advisory tailored to your firm’s spatial needs, leasing timelines, and investment parameters.',
      yieldTitle: 'Yield Optimization',
      yieldDesc: 'Strategic market research ensuring your commercial investments generate strong capital appreciation.',
    },
    about: {
      kicker: 'PIONEERING EXCELLENCE',
      title: 'Our Vision, Your',
      title2: 'Strategic Advantage',
      body: 'For over a decade, Northline Commercial has defined the gold standard in premium commercial real estate brokerage in Côte d\'Ivoire. We combine deep Abidjan market intelligence, structural insights, and an investor network to secure spaces that drive corporate growth.',
      stat1: 'Years of Experience',
      stat2: 'Successful Projects',
      stat3: 'Sq. m Managed',
      cta: 'Partner With Us',
      featured: 'FEATURED CAPITAL',
      featuredLoc: 'One Northline Plaza, Plateau – Abidjan',
    },
    services: {
      kicker: 'TAILORED EXPERTISE',
      title: 'Specialized Commercial Services',
      subtitle: 'We provide full-lifecycle real estate solutions designed to help your enterprise thrive.',
      learn: 'Learn More',
      s1Title: 'Tenant Representation',
      s1Desc: 'Acquire premium offices, labs, or retail facilities. We conduct complete site selection, space planning guidance, and secure competitive rental terms.',
      s2Title: 'Landlord Advisory',
      s2Desc: 'Position your property portfolio to attract high-value corporate tenants. We implement customized branding, marketing, and leasing strategies.',
      s3Title: 'Investment Sales',
      s3Desc: 'Navigate complex acquisitions and disposition. Our advisory team provides full capitalization modeling, asset evaluations, and off-market listings.',
      s4Title: 'Development Services',
      s4Desc: 'Oversee ground-up builds and major adaptive reuses. We bridge zoning approvals, architectural programming, and cost-control management.',
    },
    properties: {
      kicker: 'ARCHITECTURAL SPLENDOR',
      title: 'Featured Prestigious Properties',
      catalog: 'Request Full Catalog',
      details: 'Request Details',
      empty: 'No properties match your criteria.',
      available: 'Available',
      reserved: 'Reserved',
      sold: 'Sold',
      reservedUntil: 'Reservation expires in',
      reservedExpired: 'Reservation expired',
    },
    filters: {
      title: 'Refine selection',
      searchLabel: 'Search properties',
      searchPlaceholder: 'Search by name, location...',
      category: 'Category',
      min: 'Min. price',
      max: 'Max. price',
      available: 'Available only',
      reset: 'Reset',
      one: 'property found',
      many: 'properties found',
      all: 'All properties',
    },
    insights: {
      kicker: 'MARKET ADVISORY',
      title: 'Research & Industry Insights',
      viewAll: 'View All Insights',
      read: 'Read Brief',
      market: 'MARKET INTEL',
      sustainability: 'SUSTAINABILITY',
      logistics: 'LOGISTICS & INDUSTRIAL',
      a1Title: 'Global Office Trends: Designing Post-Hybrid Hubs',
      a1Excerpt: 'Discover how modern enterprises are restructuring prime office squares to foster high-performance collaborative cultures.',
      a1Date: 'July 15, 2026',
      a2Title: 'Decarbonizing Commercial Portfolios by 2030',
      a2Excerpt: 'An actionable roadmap for corporate landlords looking to optimize capital expenditures while transitioning to net-zero assets.',
      a2Date: 'June 28, 2026',
      a3Title: 'Logistics Real Estate: The Next Warehouse Horizon',
      a3Excerpt: 'Evaluating the impact of automated micro-fulfillment facilities on urban supply chains and long-term land values.',
      a3Date: 'May 12, 2026',
    },
    cta: {
      kicker: 'SECURE YOUR REVENUE LANDSCAPE',
      title: 'Ready to Find Your',
      title2: 'Next Premium Space?',
      body: 'Schedule a confidential physical tour or capital advisory briefing with our corporate real estate specialists in Abidjan.',
      button: 'Get In Touch',
      call: 'Call +225 05 00 18 39 20',
    },
    contact: {
      close: 'Close',
      title: 'Give your business a new dimension',
      intro: 'Contact our advisory team to reserve your premium space or plan a private in-person tour.',
      plan: 'Schedule a private advisory session',
      name: 'Full name',
      email: 'Email address',
      phone: 'Phone number',
      company: 'Company / Organization',
      interest: 'Interest / Business area',
      message: 'Your message',
      messagePlaceholder: 'Briefly describe your spatial requirements or investment timeline...',
      submit: 'Request an advisory call',
      success: 'Request received successfully',
      successText: 'Thank you for contacting Northline Commercial. A senior commercial real estate advisor has been assigned to your request and will contact you within 2 business hours.',
      back: 'Back',
    },
    legal: {
      privacyTitle: 'Privacy Policy',
      termsTitle: 'Terms of Service',
      backHome: 'Back to home',
    },
  },
} as const;

type TranslationKey = keyof typeof translations.fr;
type TranslationValue = typeof translations.fr;

const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <S extends TranslationKey, K extends keyof TranslationValue[S]>(section: S, key: K) => TranslationValue[S][K];
} | null>(null);

function detectLocale(): Locale {
  const stored = localStorage.getItem('northline-locale');
  if (stored === 'fr' || stored === 'en') return stored;
  return navigator.languages?.some((language) => language.toLowerCase().startsWith('en')) ||
    navigator.language.toLowerCase().startsWith('en')
    ? 'en'
    : 'fr';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  useEffect(() => setLocaleState(detectLocale()), []);
  const setLocale = (next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('northline-locale', next);
  };
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (section: TranslationKey, key: never) => translations[locale][section][key],
    }),
    [locale],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useTranslation must be used inside I18nProvider');
  return context;
}

export function getTranslations(locale: Locale) {
  return translations[locale];
}
export type { TranslationValue };
