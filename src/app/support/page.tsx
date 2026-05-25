'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  { q: "Como posso submeter um evento?", a: "No momento, apenas administradores selecionados podem criar eventos para manter o nível de qualidade e curadoria da plataforma." },
  { q: "O EventosTec é gratuito?", a: "Sim, a plataforma de busca e networking é totalmente gratuita para desenvolvedores e profissionais de tecnologia." },
  { q: "Como funciona a verificação de eventos remotos?", a: "Eventos remotos são acompanhados de links oficiais. Nós validamos as URLs e a relevância técnica de cada evento antes da publicação." }
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-[800px] mx-auto px-md min-h-screen py-xl">
      <h1 className="font-display-md text-display-md text-on-surface mb-xs text-glow text-center">Suporte e FAQ</h1>
      <p className="text-center text-on-surface-variant mb-xl">Como podemos ajudar você hoje?</p>
      
      <div className="flex flex-col gap-sm">
        {FAQ_ITEMS.map((item, i) => (
          <div key={i} className="glass-panel border border-white/10 rounded-xl overflow-hidden glow-border">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-lg py-md text-left flex justify-between items-center bg-surface-container-low hover:bg-surface-container transition-colors"
            >
              <span className="font-headline-sm text-on-surface">{item.q}</span>
              <span className="material-symbols-outlined text-outline transition-transform duration-300" style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                expand_more
              </span>
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-lg py-md text-body-md text-on-surface-variant border-t border-white/5">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
