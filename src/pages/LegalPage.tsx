import { useTranslation } from '../i18n';

type LegalType = 'privacy' | 'terms';

interface LegalPageProps {
  type: LegalType;
}

export default function LegalPage({ type }: LegalPageProps) {
  const { t, locale } = useTranslation();
  const isPrivacy = type === 'privacy';

  const contentFr = isPrivacy
    ? {
        title: 'Politique de confidentialité',
        updated: 'Dernière mise à jour : 22 septembre 2026',
        sections: [
          {
            h: '1. Responsable du traitement',
            p: "Northline Commercial, située à Rue 13, Koumassi Inchalla, Abidjan, Côte d'Ivoire (contact : patrickndri120@gmail.com / +225 05 00 18 39 20), est responsable du traitement des données collectées via ce site.",
          },
          {
            h: '2. Données collectées',
            p: 'Nous collectons les données que vous nous transmettez volontairement via le formulaire de contact : nom, e-mail, téléphone, entreprise, message et centre d’intérêt. Aucune donnée sensible n’est demandée.',
          },
          {
            h: '3. Finalités',
            p: 'Ces données sont utilisées uniquement pour répondre à vos demandes de renseignement, planifier des visites et assurer le suivi commercial. Elles ne sont pas vendues ni cédées à des tiers à des fins marketing.',
          },
          {
            h: '4. Conservation',
            p: 'Les données sont conservées pendant une durée maximale de 3 ans à compter du dernier contact, sauf obligation légale contraire.',
          },
          {
            h: '5. Vos droits',
            p: 'Conformément à la réglementation applicable en Côte d’Ivoire et aux bonnes pratiques internationales, vous pouvez demander l’accès, la rectification ou la suppression de vos données en nous écrivant à patrickndri120@gmail.com.',
          },
          {
            h: '6. Cookies',
            p: 'Ce site utilise uniquement des cookies techniques nécessaires au fonctionnement (ex. préférence de langue). Aucun cookie publicitaire n’est déposé sans votre consentement.',
          },
        ],
      }
    : {
        title: "Conditions d'utilisation",
        updated: 'Dernière mise à jour : 22 septembre 2026',
        sections: [
          {
            h: '1. Objet',
            p: "Les présentes conditions régissent l'accès et l'utilisation du site Northline Commercial. En naviguant sur ce site, vous acceptez ces conditions.",
          },
          {
            h: '2. Contenu informatif',
            p: "Les informations, descriptions de biens et analyses publiées sont fournies à titre indicatif. Elles ne constituent pas une offre contractuelle. Les disponibilités, surfaces et prix peuvent évoluer sans préavis.",
          },
          {
            h: '3. Propriété intellectuelle',
            p: 'L’ensemble des contenus (textes, logos, design, images) est protégé. Toute reproduction non autorisée est interdite.',
          },
          {
            h: '4. Limitation de responsabilité',
            p: "Northline Commercial ne saurait être tenue responsable des dommages indirects résultant de l'utilisation du site ou d'erreurs éventuelles dans les informations affichées.",
          },
          {
            h: '5. Contact',
            p: "Pour toute question relative à ces conditions : patrickndri120@gmail.com ou +225 05 00 18 39 20.",
          },
        ],
      };

  const contentEn = isPrivacy
    ? {
        title: 'Privacy Policy',
        updated: 'Last updated: September 22, 2026',
        sections: [
          {
            h: '1. Data controller',
            p: "Northline Commercial, located at Rue 13, Koumassi Inchalla, Abidjan, Côte d'Ivoire (contact: patrickndri120@gmail.com / +225 05 00 18 39 20), is the controller of personal data collected through this website.",
          },
          {
            h: '2. Data collected',
            p: 'We collect data you voluntarily submit via the contact form: name, email, phone, company, message and area of interest. No sensitive data is requested.',
          },
          {
            h: '3. Purposes',
            p: 'Data is used solely to respond to your inquiries, schedule visits and ensure commercial follow-up. It is not sold or transferred to third parties for marketing purposes.',
          },
          {
            h: '4. Retention',
            p: 'Data is retained for a maximum of 3 years from the last contact, unless a longer period is required by law.',
          },
          {
            h: '5. Your rights',
            p: 'You may request access, rectification or deletion of your data by writing to patrickndri120@gmail.com.',
          },
          {
            h: '6. Cookies',
            p: 'This site uses only technical cookies required for operation (e.g. language preference). No advertising cookies are set without your consent.',
          },
        ],
      }
    : {
        title: 'Terms of Service',
        updated: 'Last updated: September 22, 2026',
        sections: [
          {
            h: '1. Purpose',
            p: 'These terms govern access to and use of the Northline Commercial website. By browsing this site, you accept these terms.',
          },
          {
            h: '2. Informational content',
            p: 'Property descriptions, analyses and other information are provided for guidance only and do not constitute a contractual offer. Availability, sizes and prices may change without notice.',
          },
          {
            h: '3. Intellectual property',
            p: 'All content (texts, logos, design, images) is protected. Unauthorized reproduction is prohibited.',
          },
          {
            h: '4. Limitation of liability',
            p: 'Northline Commercial shall not be liable for indirect damages arising from use of the site or possible errors in the information displayed.',
          },
          {
            h: '5. Contact',
            p: 'For any questions regarding these terms: patrickndri120@gmail.com or +225 05 00 18 39 20.',
          },
        ],
      };

  const content = locale === 'en' ? contentEn : contentFr;

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <a
          href="/"
          className="inline-flex items-center text-sm text-gold-400 hover:text-gold-300 mb-10 transition-colors"
        >
          ← {t('legal', 'backHome')}
        </a>

        <h1 className="font-display font-bold text-3xl md:text-4xl tracking-tight mb-2">
          {content.title}
        </h1>
        <p className="text-gray-500 text-sm mb-12">{content.updated}</p>

        <div className="space-y-10">
          {content.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display font-semibold text-lg text-gold-400 mb-3">{s.h}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-xs text-gray-500">
          © {new Date().getFullYear()} Northline Commercial — Abidjan, Côte d&apos;Ivoire
        </div>
      </div>
    </div>
  );
}
