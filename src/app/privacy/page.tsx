export default function PrivacyPage() {
  return (
    <div className="w-full max-w-[800px] mx-auto px-md min-h-screen py-xl">
      <h1 className="font-display-md text-display-md text-on-surface mb-lg text-glow">Política de Privacidade</h1>
      <div className="glass-panel p-lg rounded-xl border border-white/10 glow-border prose prose-invert max-w-none">
        <p className="text-on-surface-variant mb-md pb-4 border-b border-white/10">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
        <h2 className="text-primary-fixed-dim text-lg font-bold mb-2">1. Coleta de Dados</h2>
        <p className="text-on-surface-variant mb-6">Coletamos informações apenas quando necessário para fornecer nossos serviços. Isso inclui dados básicos de perfil e preferências de eventos.</p>
        <h2 className="text-primary-fixed-dim text-lg font-bold mb-2 mt-md">2. Uso das Informações</h2>
        <p className="text-on-surface-variant mb-6">As informações são utilizadas estritamente para personalizar a sua experiência e enviar atualizações relevantes sobre o ecossistema de eventos.</p>
        <h2 className="text-primary-fixed-dim text-lg font-bold mb-2 mt-md">3. Segurança</h2>
        <p className="text-on-surface-variant">Implementamos medidas robustas de segurança, incluindo CSP e rotas protegidas, para garantir que seus dados não sejam acessados indevidamente.</p>
      </div>
    </div>
  );
}
