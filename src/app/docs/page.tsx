export default function DocsPage() {
  return (
    <div className="max-w-container-max mx-auto px-md min-h-screen py-xl">
      <h1 className="font-display-md text-display-md text-on-surface mb-lg text-glow">Documentação</h1>
      <div className="glass-panel p-lg rounded-xl border border-white/10 glow-border prose prose-invert max-w-none">
        <h2 className="text-primary-fixed-dim text-xl font-bold mb-4">Bem-vindo ao EventosTec</h2>
        <p className="text-on-surface-variant mb-6">Aprenda a utilizar nossa plataforma para encontrar os melhores eventos de tecnologia.</p>
        <h3 className="mt-md text-lg font-bold text-on-surface mb-2">Busca e Exploração</h3>
        <p className="text-on-surface-variant">Utilize a barra de busca na página inicial para filtrar eventos por nome, tema ou localização. Todos os eventos são cuidadosamente selecionados pela nossa equipe técnica para garantir a máxima relevância e qualidade do conteúdo.</p>
      </div>
    </div>
  );
}
