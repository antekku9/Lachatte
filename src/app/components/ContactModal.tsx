import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, User, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  colors: {
    textPrimary: string;
    textSecondary: string;
    button: string;
    input: string;
    bgCard: string;
    icon: string;
  };
}

export function ContactModal({ isOpen, onClose, isDark, colors }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Proszę podać imię');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Proszę podać poprawny adres email');
      return;
    }

    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Proszę wpisać wiadomość');
      return;
    }

    setStatus('loading');
    
    // Simulate API call (replace with actual email service integration)
    setTimeout(() => {
      setStatus('success');
      
      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setFormData({ name: '', email: '', message: '' });
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`w-full max-w-md ${colors.bgCard} border backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
                  Współpraca biznesowa
                </h2>
                <button
                  onClick={handleClose}
                  className={`p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/10'} transition-colors`}
                >
                  <X className={`w-5 h-5 ${colors.textPrimary}`} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-center py-8 ${isDark ? 'text-green-300' : 'text-green-600'}`}
                  >
                    <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold mb-2">Wiadomość wysłana!</p>
                    <p className="text-sm opacity-90">
                      Skontaktujemy się z Tobą wkrótce
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div className="relative">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.icon}`} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          setStatus('idle');
                          setErrorMessage('');
                        }}
                        placeholder="Imię i nazwisko"
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all outline-none ${colors.input}`}
                        disabled={status === 'loading'}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                      <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.icon}`} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          setStatus('idle');
                          setErrorMessage('');
                        }}
                        placeholder="twoj.email@example.com"
                        className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all outline-none ${colors.input}`}
                        disabled={status === 'loading'}
                      />
                    </div>

                    {/* Message Textarea */}
                    <div>
                      <textarea
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          setStatus('idle');
                          setErrorMessage('');
                        }}
                        placeholder="Opisz swoją propozycję współpracy..."
                        rows={5}
                        className={`w-full px-4 py-3 rounded-lg border-2 transition-all outline-none resize-none ${colors.input}`}
                        disabled={status === 'loading'}
                      />
                    </div>

                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500"
                      >
                        {errorMessage}
                      </motion.p>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${colors.button} shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Wyślij wiadomość
                        </>
                      )}
                    </motion.button>

                    <p className={`text-xs text-center ${colors.textSecondary} opacity-70`}>
                      Odpowiemy na Twoją wiadomość w ciągu 24 godzin
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
