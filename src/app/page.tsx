import Link from "next/link";

export const dynamic = "force-dynamic";

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Next.js Global Summit",
    overview: "Junte-se a visionários do setor para um mergulho profundo em infraestrutura de nuvem de próxima geração, Server Actions e a evolução do React.",
    description: "Junte-se a visionários do setor para um mergulho profundo em infraestrutura de nuvem de próxima geração, Server Actions e a evolução do React.",
    date: "2024-10-24T09:00:00",
    city: "San Francisco",
    uf: "CA",
    remote: false,
    banner: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
    type: "Ao Vivo"
  },
  {
    id: "2",
    title: "AI Vision Summit",
    overview: "Definindo as fronteiras dos LLMs.",
    description: "Definindo as fronteiras dos LLMs.",
    date: "2024-11-12T09:00:00",
    city: "",
    uf: "",
    remote: true,
    banner: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
    type: "Summit"
  },
  {
    id: "3",
    title: "Hackathon Global",
    overview: "48 horas para desafiar o sistema.",
    description: "48 horas para desafiar o sistema.",
    date: "2024-12-05T09:00:00",
    city: "Berlim",
    uf: "DE",
    remote: false,
    banner: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
    type: "Hackathon"
  },
  {
    id: "4",
    title: "Protegendo o Mesh",
    overview: "Um mergulho profundo intensivo em arquiteturas zero-trust e vulnerabilidades de service mesh. Conduzido por renomados pesquisadores de segurança.",
    description: "Um mergulho profundo intensivo em arquiteturas zero-trust e vulnerabilidades de service mesh. Conduzido por renomados pesquisadores de segurança.",
    date: "2024-12-15T09:00:00",
    city: "",
    uf: "",
    remote: true,
    banner: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    type: "Workshop"
  }
];

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  let dbEvents: any[] = [];
  
  try {
    if (apiUrl.startsWith('https://localhost')) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    }
    const res = await fetch(`${apiUrl}/api/event?page=0&size=4`, { cache: 'no-store' });
    if (res.ok) {
      dbEvents = await res.json();
    }
  } catch (err) {
    console.error("Erro ao buscar eventos em destaque:", err);
  }

  // Merge dbEvents with fallbacks if fewer than 4 events exist in database
  const displayEvents = [...dbEvents];
  if (displayEvents.length < 4) {
    const fallbacksNeeded = 4 - displayEvents.length;
    for (let i = 0; i < fallbacksNeeded; i++) {
      const mockEvent = MOCK_EVENTS[i % MOCK_EVENTS.length];
      displayEvents.push({
        ...mockEvent,
        id: mockEvent.id
      });
    }
  }

  const getEventStatus = (dateStr: any) => {
    if (!dateStr) return { text: "Sem data", color: "bg-white/10 text-on-surface-variant" };
    
    let d: Date;
    if (typeof dateStr === 'number' || /^\d+$/.test(String(dateStr))) {
      d = new Date(Number(dateStr));
    } else {
      d = new Date(dateStr);
    }
    
    if (isNaN(d.getTime())) return { text: "Data inválida", color: "bg-white/10 text-on-surface-variant" };

    const today = new Date();
    const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const eventZero = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();

    if (eventZero === todayZero) {
      return { text: "AO VIVO", color: "bg-error text-on-error animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.5)]" };
    } else if (eventZero < todayZero) {
      return { text: "ENCERRADO", color: "bg-white/10 text-on-surface-variant line-through border border-white/5" };
    } else {
      return { text: "AGENDADO", color: "bg-primary-fixed-dim/90 text-on-primary-fixed" };
    }
  };

  const formatDate = (dateStr: any) => {
    if (!dateStr) return "A definir";
    let d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return String(dateStr);
    }
    return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const [e1, e2, e3, e4] = displayEvents;
  const status1 = getEventStatus(e1.date);
  const status2 = getEventStatus(e2.date);
  const status3 = getEventStatus(e3.date);
  const status4 = getEventStatus(e4.date);

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[819px] flex flex-col items-center justify-center px-md text-center max-w-container-max mx-auto relative mb-xxl">
        <h1 className="font-display-lg text-display-lg text-on-surface max-w-5xl mb-lg text-glow leading-tight">
          O principal hub de eventos para profissionais tech
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-xl">
          Conectando você aos eventos mais relevantes, práticos e técnicos do mercado. Encontre conferências, workshops e meetups focados em conteúdo de alto nível para impulsionar sua carreira.
        </p>

        {/* Glassmorphic Search Bar */}
        <form action="/explore" method="GET" className="glass-panel w-full max-w-3xl rounded-xl p-xs flex flex-col md:flex-row items-center gap-sm glow-border">
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg px-md py-sm w-full border border-white/5">
            <span className="material-symbols-outlined text-outline mr-sm">search</span>
            <input 
              name="query"
              className="bg-transparent border-none text-on-surface font-body-md focus:ring-0 w-full placeholder-outline outline-none" 
              placeholder="Buscar eventos" 
              type="text" 
            />
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block"></div>
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg px-md py-sm w-full border border-white/5">
            <span className="material-symbols-outlined text-outline mr-sm">location_on</span>
            <input 
              name="location"
              className="bg-transparent border-none text-on-surface font-body-md focus:ring-0 w-full placeholder-outline outline-none" 
              placeholder="Localização..." 
              type="text" 
            />
          </div>
          <button type="submit" className="w-full md:w-auto bg-primary-container text-on-primary-container font-label-sm text-label-sm px-xl py-md rounded-lg hover:brightness-110 transition-all duration-300 whitespace-nowrap flex items-center justify-center gap-xs">
            Buscar Eventos <span className="material-symbols-outlined" style={{ fontVariationSettings: "'opsz' 16" }}>arrow_forward</span>
          </button>
        </form>
      </section>

      {/* Featured Events Section */}
      <section className="max-w-container-max mx-auto px-md mb-xxl">
        <div className="flex justify-between items-end mb-xl border-b border-white/10 pb-sm">
          <div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface">Eventos em Destaque</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Encontros técnicos e palestras de alta relevância.</p>
          </div>
          <Link href="/explore" className="text-primary-fixed-dim font-label-sm text-label-sm hover:text-primary-fixed transition-colors flex items-center gap-xs">
            Ver Todos <span className="material-symbols-outlined" style={{ fontVariationSettings: "'opsz' 16" }}>north_east</span>
          </Link>
        </div>

        {/* Bento Grid Events */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-lg auto-rows-[300px]">
          {/* Event 1 (Large) */}
          <div className="md:col-span-8 h-full relative">
            <Link href={`/event/${e1.id}`} className="w-full h-full glass-panel rounded-xl overflow-hidden group relative glow-border flex flex-col justify-end p-lg">
              <div className="absolute inset-0 bg-surface-container-lowest/80 group-hover:bg-surface-container-lowest/40 transition-colors z-10"></div>
              <img 
                alt={e1.title} 
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale group-hover:grayscale-0 transition-all duration-700" 
                src={e1.image || e1.imgUrl || e1.banner || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"}
              />
              <div className="relative z-20">
                <div className="flex gap-sm mb-md">
                  <span className={`font-label-sm text-label-sm px-sm py-xs rounded-DEFAULT uppercase tracking-wider backdrop-blur-md ${status1.color}`}>
                    {status1.text}
                  </span>
                  <span className="bg-surface/50 text-on-surface font-label-sm text-label-sm px-sm py-xs rounded-DEFAULT border border-white/10 backdrop-blur-md">
                    {e1.remote ? 'Online' : `${e1.city || ''} - ${e1.uf || ''}`}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs group-hover:text-primary-fixed-dim transition-colors">{e1.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant truncate max-w-xl">{e1.description || e1.overview}</p>
              </div>
            </Link>
          </div>

          {/* Event 2 (Small) */}
          <div className="md:col-span-4 h-full relative">
            <Link href={`/event/${e2.id}`} className="w-full h-full glass-panel rounded-xl overflow-hidden group relative glow-border flex flex-col justify-end p-lg">
              <div className="absolute inset-0 bg-surface-container-lowest/80 group-hover:bg-surface-container-lowest/40 transition-colors z-10"></div>
              <img 
                alt={e2.title} 
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale group-hover:grayscale-0 transition-all duration-700" 
                src={e2.image || e2.imgUrl || e2.banner || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80"}
              />
              <div className="relative z-20">
                <div className="flex gap-sm mb-md">
                  <span className={`font-label-sm text-label-sm px-sm py-xs rounded-DEFAULT uppercase tracking-wider backdrop-blur-md ${status2.color}`}>
                    {status2.text}
                  </span>
                  <span className="bg-surface/50 text-on-surface font-label-sm text-label-sm px-sm py-xs rounded-DEFAULT border border-white/10 backdrop-blur-md">
                    {e2.remote ? 'Online' : `${e2.city || ''} - ${e2.uf || ''}`}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs group-hover:text-primary-fixed-dim transition-colors">{e2.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant truncate">{e2.description || e2.overview}</p>
              </div>
            </Link>
          </div>

          {/* Event 3 (Small) */}
          <div className="md:col-span-4 h-full relative">
            <Link href={`/event/${e3.id}`} className="w-full h-full glass-panel rounded-xl overflow-hidden group relative glow-border flex flex-col justify-end p-lg">
              <div className="absolute inset-0 bg-surface-container-lowest/80 group-hover:bg-surface-container-lowest/40 transition-colors z-10"></div>
              <img 
                alt={e3.title} 
                className="absolute inset-0 w-full h-full object-cover z-0 grayscale group-hover:grayscale-0 transition-all duration-700" 
                src={e3.image || e3.imgUrl || e3.banner || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80"}
              />
              <div className="relative z-20">
                <div className="flex gap-sm mb-md">
                  <span className={`font-label-sm text-label-sm px-sm py-xs rounded-DEFAULT uppercase tracking-wider backdrop-blur-md ${status3.color}`}>
                    {status3.text}
                  </span>
                  <span className="bg-surface/50 text-on-surface font-label-sm text-label-sm px-sm py-xs rounded-DEFAULT border border-white/10 backdrop-blur-md">
                    {e3.remote ? 'Online' : `${e3.city || ''} - ${e3.uf || ''}`}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-xs group-hover:text-primary-fixed-dim transition-colors">{e3.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant truncate">{e3.description || e3.overview}</p>
              </div>
            </Link>
          </div>

          {/* Event 4 (Large) */}
          <div className="md:col-span-8 h-full relative">
            <div className="w-full h-full glass-panel rounded-xl p-lg relative glow-border flex items-center bg-surface-container-low border border-white/5 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img 
                  alt={e4.title} 
                  className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 grayscale" 
                  src={e4.image || e4.imgUrl || e4.banner || "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80"}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-surface-container-low/95 to-transparent"></div>
              </div>
              <div className="flex-1 relative z-10 pr-md">
                <span className="text-primary-fixed-dim font-label-sm text-label-sm mb-xs block">
                  {status4.text === 'AO VIVO' ? 'Evento em Andamento' : 'Destaque'}
                </span>
                <Link href={`/event/${e4.id}`} className="group/title">
                  <h3 className="font-headline-xl text-headline-xl text-on-surface mb-sm group-hover/title:text-primary-fixed-dim transition-colors">{e4.title}</h3>
                </Link>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md max-w-xl truncate">{e4.description || e4.overview}</p>
                <div className="flex items-center gap-md mb-md font-label-sm text-label-sm text-on-surface-variant">
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span>{formatDate(e4.date)}</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>{e4.remote ? 'Online' : `${e4.city || ''} - ${e4.uf || ''}`}</span>
                  </div>
                </div>
                <Link href={`/event/${e4.id}`} className="inline-block bg-transparent border border-white/20 text-on-surface font-label-sm text-label-sm px-lg py-sm rounded-DEFAULT hover:border-primary-container hover:text-primary-container transition-all duration-300">
                  Ver Detalhes
                </Link>
              </div>
              <div className="hidden md:flex w-32 h-32 rounded-full border border-white/10 items-center justify-center bg-surface-container-lowest shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] relative z-10 shrink-0">
                <span className="material-symbols-outlined text-outline text-[48px]" style={{ fontVariationSettings: "'opsz' 48" }}>
                  {e4.remote ? 'devices' : 'location_away'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* About Section */}
      <section id="about" className="max-w-container-max mx-auto px-md mb-xxl border-t border-white/10 pt-xxl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
          {/* Left: Headline */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <span className="text-primary-fixed-dim font-label-sm text-label-sm uppercase tracking-wider mb-sm block">A Origem</span>
            <h2 className="font-display-lg text-headline-x1 lg:text-display-lg text-on-surface leading-tight text-glow mb-md">
              Networking prático para profissionais da tecnologia
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant w-full">
              O ecossistema definitivo desenhado por quem vive a realidade do desenvolvimento de software de alta performance todos os dias.
            </p>
          </div>

          {/* Right: Narrative blocks */}
          <div className="lg:col-span-7 flex flex-col gap-lg">
            {/* Background */}
            <div className="glass-panel p-lg rounded-xl glow-border bg-surface-container-low/50 border border-white/5">
              <span className="text-primary-fixed-dim font-label-sm text-label-sm mb-xs block">O Background</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">5+ anos na linha de frente</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Há mais de 5 anos atuo na engenharia e arquitetura de sistemas. Durante essa trajetória, cansei de frequentar eventos de tecnologia superficiais — repletos de palestras patrocinadas genéricas, slides cansativos e muito marketing disfarçado de conteúdo técnico. Faltava código limpo na tela, discussões sobre infraestrutura escalável de verdade e conexões genuínas entre quem realmente resolve os bugs em produção.
              </p>
            </div>

            {/* Ponto de Virada */}
            <div className="glass-panel p-lg rounded-xl glow-border bg-surface-container-low/50 border border-white/5">
              <span className="text-primary-fixed-dim font-label-sm text-label-sm mb-xs block">A Virada</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">Decidi construir a solução</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Entendi que, se eu queria um ecossistema com profundidade técnica e networking real com outros desenvolvedores e profissionais de TI seniores, eu precisava criá-lo. Decidi pivotar essa insatisfação em ação: fundar uma plataforma focada exclusivamente em curadoria técnica rigorosa, eliminando o ruído e mantendo apenas o conteúdo de alto nível que gera valor real para a comunidade dev.
              </p>
            </div>

            {/* Propósito */}
            <div className="glass-panel p-lg rounded-xl glow-border bg-surface-container-low/50 border border-white/5">
              <span className="text-primary-fixed-dim font-label-sm text-label-sm mb-xs block">O Propósito</span>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-xs block">Conexão, conhecimento e evolução</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Hoje, o Event Tecs é a ponte para sua evolução de carreira e refinamento técnico. Nós entregamos conexões estratégicas, workshops práticos intensivos e debates profundos sobre arquitetura de sistemas. Sem jargões comerciais vazios. Aqui, conectamos profissionais qualificados a conhecimento técnico robusto que você aplica no próximo deploy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
