import { motion } from 'motion/react';
import { Link, MessageCircle, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onContactClick: (interest?: string) => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-brand-dark text-white border-t border-white/10 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          {/* Brand Column (col-span-2) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            {/* Logo */}
            <a href="#" className="flex items-end space-x-2 group mb-6 focus:outline-none">
              <div className="flex items-end space-x-0.5 h-10 pb-0.5">
                <div className="w-1.5 bg-gold-400 rounded-t-sm h-4 transition-all group-hover:h-6" />
                <div className="w-1.5 bg-gold-400 rounded-t-sm h-6 transition-all group-hover:h-9" />
                <div className="w-1.5 bg-gold-400 rounded-t-sm h-8 transition-all group-hover:h-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-white text-lg tracking-wider leading-none">
                  NORTHLINE
                </span>
                <span className="text-[9px] font-semibold text-gold-400 tracking-[0.25em] leading-none mt-1">
                  COMMERCIAL
                </span>
              </div>
            </a>

            {/* Paragraph */}
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Northline Commercial est un cabinet de courtage en immobilier d'entreprise de premier plan, couvrant l'ensemble du cycle de vie des actifs. Nous offrons des espaces de travail d'exception ainsi que des services de conseil en investissement pour les entreprises leaders du marché.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Link className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300"
                aria-label="Twitter Profile"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="mailto:advisory@northlinecommercial.com"
                className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 hover:bg-gold-400/10 text-gray-300 hover:text-gold-400 transition-all duration-300"
                aria-label="Email Advisory"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Properties */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-400 mb-6">
              Propriétés
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#properties"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Place de la Ligne Nord
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  L'Atrium de l'Ouest
                </a>
              </li>
              <li>
                <a
                  href="#properties"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Logistique de Pointe
                </a>
              </li>
              <li>
                <button
                  onClick={() => onContactClick('All Properties')}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  Catalogue complet
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-400 mb-6">
              Services
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Représentation des Locataires
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Conseil aux propriétaires
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Ventes en investissement
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Développement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-gold-400 mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  About Our Firm
                </a>
              </li>
              <li>
                <a
                  href="#partners"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Corporate Partners
                </a>
              </li>
              <li>
                <a
                  href="#insights"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Research Insights
                </a>
              </li>
              <li>
                <button
                  onClick={() => onContactClick('General Inquiry')}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200 focus:outline-none cursor-pointer"
                >
                  Contact Advisory
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
          {/* Copyright */}
          <div className="text-xs text-gray-500 font-medium">
            &copy; {currentYear} Northline Commercial LLC. All rights reserved. Built for Elite Corporate Workspace Representation.
          </div>

          {/* Legal Links & Scroll to Top */}
          <div className="flex items-center space-x-6 text-xs text-gray-500 font-medium">
            <a href="#privacy" className="hover:text-gold-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-gold-400 transition-colors">
              Terms of Service
            </a>
            
            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-white/5 border border-white/10 hover:border-gold-400 hover:text-gold-400 text-gray-400 transition-all cursor-pointer focus:outline-none"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
