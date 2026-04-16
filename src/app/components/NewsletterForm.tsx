import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, CheckCircle2, Loader2 } from 'lucide-react';

interface NewsletterFormProps {
  isDark: boolean;
  colors: {
    textPrimary: string;
    textSecondary: string;
    textAccent: string;
    button: string;
    input: string;
    icon: string;
  };
}

export function NewsletterForm({ isDark, colors }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Proszę podać poprawny adres email');
      return;
    }

    setStatus('loading');
    
    // Simulate API call (replace with actual backend integration later)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }, 1500);
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`text-center py-8 ${isDark ? 'text-green-300' : 'text-green-600'}`}
      >
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
        <p className="text-lg font-semibold mb-2">Dziękujemy za zapis!</p>
        <p className="text-sm opacity-90">
          Powiadomimy Cię o otwarciu sklepu
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${colors.icon}`} />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus('idle');
            setErrorMessage('');
          }}
          placeholder="twoj.email@example.com"
          className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all outline-none ${colors.input} ${status === 'error' ? 'border-red-500' : ''}`}
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
            Zapisywanie...
          </>
        ) : (
          'Zapisz się'
        )}
      </motion.button>

      <p className={`text-xs text-center ${colors.textSecondary} opacity-70`}>
        Twój email będzie używany wyłącznie do powiadomień o otwarciu sklepu
      </p>
    </form>
  );
}