import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import TrustedCompanies from './components/TrustedCompanies';
import About from './components/About';
import Services from './components/Services';
import FeaturedProperties from './components/FeaturedProperties';
import Insights from './components/Insights';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import AdminDashboard from './pages/AdminDashboard';
import LegalPage from './pages/LegalPage';
import { I18nProvider } from './i18n';

export default function App() {
  const path = window.location.pathname;

  if (path === '/admin') return <AdminDashboard />;
  if (path === '/privacy') {
    return (
      <I18nProvider>
        <LegalPage type="privacy" />
      </I18nProvider>
    );
  }
  if (path === '/terms') {
    return (
      <I18nProvider>
        <LegalPage type="terms" />
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <SiteContent />
    </I18nProvider>
  );
}

function SiteContent() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [prefilledProperty, setPrefilledProperty] = useState('');

  const handleOpenContact = (propertyTitle: string = '') => {
    setPrefilledProperty(propertyTitle);
    setIsContactOpen(true);
  };

  const handleScrollToProperties = () => {
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#0B0E14] text-white min-h-screen overflow-x-hidden selection:bg-gold-400 selection:text-brand-dark">
      <Navbar onContactClick={() => handleOpenContact('General Inquiry')} />

      <main>
        <Hero
          onExploreClick={handleScrollToProperties}
          onContactClick={() => handleOpenContact('Video Tour Inquiry')}
        />
        <FeaturesGrid />
        <TrustedCompanies />
        <About onContactClick={() => handleOpenContact('Corporate Partnership')} />
        <Services onContactClick={(srv) => handleOpenContact(srv)} />
        <FeaturedProperties onContactClick={(prop) => handleOpenContact(prop)} />
        <Insights onContactClick={(insight) => handleOpenContact(insight)} />
        <CTA onContactClick={() => handleOpenContact('Direct Callback')} />
      </main>

      <Footer onContactClick={(area) => handleOpenContact(area)} />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledProperty={prefilledProperty}
      />
    </div>
  );
}
