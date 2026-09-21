import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import TrustedCompanies from './components/TrustedCompanies';
import About from './components/About';
import Services from './components/Services';
import FeaturedProperties from './components/FeaturedProperties';
import ResearchInsights from './components/ResearchInsights';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import AdminDashboard from './pages/AdminDashboard';
import { I18nProvider } from './i18n';

export default function App() {
  if (window.location.pathname === '/admin') return <AdminDashboard />;

  return <I18nProvider><SiteContent /></I18nProvider>;
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
      {/* 3.1 Global Navbar */}
      <Navbar onContactClick={() => handleOpenContact('General Inquiry')} />

      {/* Main Page Layout */}
      <main>
        {/* 3.2 Hero Section */}
        <Hero
          onExploreClick={handleScrollToProperties}
          onContactClick={() => handleOpenContact('Video Tour Inquiry')}
        />

        {/* 3.3 Features Grid Overlap */}
        <FeaturesGrid />

        {/* 3.4 Trusted Companies Banner */}
        <TrustedCompanies />

        {/* 3.5 About Section */}
        <About onContactClick={() => handleOpenContact('Corporate Partnership')} />

        {/* 3.6 Services Section */}
        <Services onContactClick={(srv) => handleOpenContact(srv)} />

        {/* 3.7 Featured Properties Section */}
        <FeaturedProperties onContactClick={(prop) => handleOpenContact(prop)} />

        {/* 3.8 Insights & News Section */}
        <ResearchInsights onContactClick={(insight) => handleOpenContact(insight)} />

        {/* 3.9 Call To Action Section */}
        <CTA onContactClick={() => handleOpenContact('Direct Callback')} />
      </main>

      {/* 3.10 Footer */}
      <Footer onContactClick={(area) => handleOpenContact(area)} />

      {/* Dynamic Slide-Over / Lightbox Advisory Contact Form */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        prefilledProperty={prefilledProperty}
      />
    </div>
  );
}
