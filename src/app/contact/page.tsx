'use client';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[600px] mx-auto px-md min-h-[80vh] py-xl flex flex-col justify-center">
      <div className="text-center mb-xl">
        <h1 className="font-display-md text-display-md text-on-surface mb-xs text-glow">Fale Conosco</h1>
        <p className="text-on-surface-variant">Tem alguma sugestão ou quer ser um parceiro? Mande uma mensagem.</p>
      </div>

      <div className="glass-panel p-xl rounded-2xl border border-white/10 glow-border bg-surface/40 backdrop-blur-2xl">
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-xl text-center"
          >
            <div className="w-16 h-16 bg-primary-container/20 text-primary-fixed rounded-full flex items-center justify-center mb-md border border-primary-fixed/30">
              <span className="material-symbols-outlined text-[32px]">check</span>
            </div>
            <h2 className="font-headline-md text-on-surface mb-xs">Mensagem Enviada!</h2>
            <p className="text-on-surface-variant">Agradecemos o contato. Retornaremos em breve.</p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="mt-lg text-primary-fixed-dim hover:text-primary-fixed transition-colors font-label-sm uppercase tracking-wider"
            >
              Enviar outra mensagem
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-on-surface-variant">Nome Completo</label>
              <input type="text" required className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-all" placeholder="Seu nome" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-on-surface-variant">E-mail</label>
              <input type="email" required className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-all" placeholder="voce@exemplo.com" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-on-surface-variant">Mensagem</label>
              <textarea required rows={4} className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-all resize-none" placeholder="Como podemos ajudar?"></textarea>
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-sm bg-primary-container text-on-primary-container font-label-md py-md rounded-lg hover:brightness-110 transition-all duration-300 shadow-[0_0_15px_rgba(var(--primary-container),0.3)] flex justify-center items-center h-12"
            >
              {isSubmitting ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-on-primary-container border-t-transparent rounded-full" />
              ) : "Enviar Mensagem"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
