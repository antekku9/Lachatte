import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Instagram, Facebook, Sparkles, Clock, Briefcase } from 'lucide-react';
import logo01 from '../imports/Logo_La_chatte_a4-01.png';
import logo02 from '../imports/Logo_La_chatte_a4-02.png';
import { NewsletterForm } from './components/NewsletterForm';
import { ContactModal } from './components/ContactModal';
import { getThemeColors } from './utils/colorThemes';

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    // Detect user's color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const logo = isDark ? logo02 : logo01;
  const colors = getThemeColors('black-gold', isDark);

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-gradient-to-br ${colors.bgGradient}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className={`absolute inset-0 ${
          isDark ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent)]'
        }`} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-4xl w-full mx-auto text-center space-y-12">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <img 
              src={logo} 
              alt="La Chatte" 
              className="h-40 md:h-52 lg:h-56 w-auto object-contain"
            />
          </motion.div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${colors.badge} border backdrop-blur-sm`}>
              <Clock className={`w-5 h-5 ${colors.badgeIcon}`} />
              <span className={`text-sm font-medium ${colors.badgeText}`}>
                Strona w budowie
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${colors.textGradient}`}>
              Wkrótce otwarcie
            </h1>
            <div className="space-y-3">
              <p className={`text-lg md:text-xl italic ${colors.textSecondary}`}>
                Usiądź wygodnie, przygotowujemy dla ciebie coś niezwykłego.
              </p>
              <p className={`text-2xl md:text-3xl font-semibold ${colors.textAccent}`}>
                La chatte
              </p>
              <p className={`text-xl md:text-2xl font-light tracking-wide ${colors.textPrimary}`}>
                Define Your Elegance
              </p>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex justify-center gap-8"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <Sparkles className={`w-6 h-6 md:w-8 md:h-8 ${colors.sparkle}`} />
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className={`p-8 rounded-2xl ${colors.bgCard} border backdrop-blur-md shadow-2xl`}>
              <div className="space-y-4 mb-6">
                <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
                  Zapisz się do newslettera
                </h2>
                <p className={`text-sm ${colors.textSecondary}`}>
                  Otrzymaj powiadomienie o otwarciu sklepu oraz <span className="font-semibold">ekskluzywny kupon rabatowy</span> na pierwsze zakupy!
                </p>
              </div>
              
              <NewsletterForm isDark={isDark} colors={colors} />
            </div>
          </motion.div>

          {/* Collaboration Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setIsContactModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex flex-col items-center gap-2 px-8 py-4 rounded-full ${colors.badge} border backdrop-blur-sm cursor-pointer transition-all hover:shadow-xl`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className={`w-5 h-5 ${colors.badgeIcon}`} />
                <span className={`text-sm font-medium ${colors.badgeText}`}>
                  Współpraca biznesowa
                </span>
              </div>
              <span className={`text-xs ${colors.textSecondary} underline`}>
                kliknij tutaj
              </span>
            </motion.button>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="space-y-4"
          >
            <p className={`text-sm font-medium ${colors.textSecondary}`}>
              Śledź nas w social mediach
            </p>
            <div className="flex justify-center gap-4">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Facebook, href: '#', label: 'Facebook' },
                { Icon: Mail, href: '#', label: 'Email' }
              ].map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-full transition-colors ${colors.social} shadow-lg`}
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pt-8"
          >
            <p className={`text-sm ${colors.textSecondary} opacity-70`}>
              © 2026 La Chatte. Wszystkie prawa zastrzeżone.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        isDark={isDark}
        colors={colors}
      />
    </div>
  );
}