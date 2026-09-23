import { lazy, Suspense, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import TrustedCompanies from './components/TrustedCompanies';
import ContactModal from './components/ContactModal';
import VideoTourModal from './components/VideoTourModal';
import { I18nProvider } from './i18n';

const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const FeaturedProperties = lazy(() => import('./components/FeaturedProperties'));
const Insights = lazy(() => import('./components/Insights'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const LegalPage = lazy(() => import('./pages/LegalPage'));

function SectionFallback() {
  return <div className="min-h-[200px] bg-brand-dark" aria-hidden="true" />;
}

export default function App() {
  const path = window.location.pathname;

  if (path === '/admin') {
    return (
      <>
        <Suspense fallback={<SectionFallback />}>
          <AdminDashboard />
        </Suspense>
        <Analytics />
      </>
    );
  }
  if (path === '/privacy') {
    return (
      <I18nProvider>
        <Suspense fallback={<SectionFallback />}>
          <LegalPage type="privacy" />
        </Suspense>
        <Analytics />
      </I18nProvider>
    );
  }
  if (path === '/terms') {
    return (
      <I18nProvider>
        <Suspense fallback={<SectionFallback />}>
          <LegalPage type="terms" />
        </Suspense>
        <Analytics />
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <SiteContent />
      <Analytics />
    </I18nProvider>
  );
}

function SiteContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [prefilledProperty, setPrefilledProperty] = useState('');

  const handleOpenContact = (propertyTitle: string = '') => {
    setPrefilledProperty(propertyTitle);
    setIsContactOpen(true);
  };

  const handleScrollToProperties = () => {
    const el = document.getElementById('properties');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0B0E14] text-white min-h-screen overflow-x-hidden selection:bg-gold-400 selection:text-brand-dark">
      <Navbar onContactClick={() => handleOpenContact('General Inquiry')} />

      <main>
        <Hero
          onExploreClick={handleScrollToProperties}
          onContactClick={() => handleOpenContact('Video Tour Inquiry')}
          onVideoClick={() => setIsVideoOpen(true)}
        />
        <FeaturesGrid />
        <TrustedCompanies />

        <Suspense fallback={<SectionFallback />}>
          <About onContactClick={() => handleOpenContact('Corporate Partnership')} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services onContactClick={(srv) => handleOpenContact(srv)} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FeaturedProperties onContactClick={(prop) => handleOpenContact(prop)} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Insights onContactClick={(insight) => handleOpenContact(insight)} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTA onContactClick={() => handleOpenContact('Direct Callback')} />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback />}>
        <Footer onContactClick={(area) => handleOpenContact(area)} />
      </Suspense>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledProperty={prefilledProperty}
      />
      <VideoTourModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </div>
  );
}
