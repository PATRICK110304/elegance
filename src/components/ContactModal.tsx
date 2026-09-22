import { useState, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from '../i18n';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProperty?: string;
}

export default function ContactModal({ isOpen, onClose, prefilledProperty = '' }: ContactModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: prefilledProperty || 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (prefilledProperty) {
      setFormData((prev) => ({ ...prev, interest: prefilledProperty }));
    }
  }, [prefilledProperty]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || 'Une erreur est survenue');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible d\'envoyer le message. Réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      interest: 'General Inquiry',
      message: '',
    });
    setIsSubmitted(false);
    setError('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          />

          <motion.div
            id="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:w-full md:max-w-4xl md:h-auto md:max-h-[90vh] bg-brand-dark border border-white/10 rounded-2xl z-50 overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            <div className="w-full md:w-2/5 bg-[#162032] p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
              <div>
                <div className="flex items-end space-x-2 mb-8">
                  <div className="flex items-end space-x-0.5">
                    <div className="w-1 bg-gold-400 h-5" />
                    <div className="w-1 bg-gold-400 h-7 animate-pulse" />
                    <div className="w-1 bg-gold-400 h-9" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-base tracking-wider leading-none">
                      NORTHLINE
                    </div>
                    <div className="text-[9px] font-semibold text-gold-400 tracking-widest leading-none mt-0.5">
                      COMMERCIAL
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white tracking-tight mb-4">
                  {t('contact', 'title')}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  {t('contact', 'intro')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <a href="tel:+2250500183920" className="hover:text-gold-400">+225 05 00 18 39 20</a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                  <a href="mailto:patrickndri120@gmail.com" className="hover:text-gold-400">patrickndri120@gmail.com</a>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
                  <span>Rue 13, Koumassi Inchalla, Abidjan, Côte d'Ivoire</span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 overflow-y-auto flex flex-col justify-center relative">
              <button
                id="close-modal-btn"
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <h4 className="font-display text-xl font-bold text-white mb-6">
                      {t('contact', 'plan')}
                    </h4>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            {t('contact', 'name')}
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Jean Kouassi"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            {t('contact', 'email')}
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="jean@entreprise.ci"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            {t('contact', 'phone')}
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+225 07 00 00 00 00"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                            {t('contact', 'company')}
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Votre entreprise"
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          {t('contact', 'interest')}
                        </label>
                        <select
                          value={formData.interest}
                          onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all appearance-none"
                        >
                          <option value="Conseil général" className="bg-brand-dark text-white">Conseil général</option>
                          <option value="Location / Leasing" className="bg-brand-dark text-white">Location / Leasing</option>
                          <option value="Acquisition & Vente" className="bg-brand-dark text-white">Acquisition & Vente</option>
                          <option value="Gestion de patrimoine" className="bg-brand-dark text-white">Gestion de patrimoine</option>
                          <option value="One Northline Plaza" className="bg-brand-dark text-white">One Northline Plaza</option>
                          <option value="The Atrium at Westside" className="bg-brand-dark text-white">The Atrium Plateau</option>
                          <option value="Summit Logistics Hub" className="bg-brand-dark text-white">Summit Logistics Hub</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                          {t('contact', 'message')}
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder={t('contact', 'messagePlaceholder')}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-all resize-none"
                        />
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}

                      <button
                        id="submit-contact-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gold-400 hover:bg-gold-500 text-brand-dark font-semibold text-sm py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg shadow-gold-400/15 disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{t('contact', 'submit')}</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <CheckCircle2 className="w-16 h-16 text-gold-400 mx-auto mb-4 animate-bounce" />
                    <h4 className="font-display text-2xl font-bold text-white mb-2">
                      {t('contact', 'success')}
                    </h4>
                    <p className="text-gray-300 text-sm max-w-sm mx-auto mb-6">
                      {t('contact', 'successText')}
                    </p>
                    <button
                      id="close-success-btn"
                      onClick={handleClose}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-all"
                    >
                      {t('contact', 'back')}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
