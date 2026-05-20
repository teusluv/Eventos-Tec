/* eslint-disable */
'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface EventItem {
  id: string | number;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'online' | 'in-person';
  tags: string[];
  price: number;
  image: string;
  status: string | null;
}

const MOCK_EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Next.js Global Summit",
    description: "O encontro definitivo para desenvolvedores Next.js. Mergulhos profundos em App Router, Server Actions e computação Edge.",
    date: "24 de Out, 2024",
    location: "Remoto",
    type: "online",
    tags: ["React", "Vercel"],
    price: 299,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLoo387JyYOVda0gJ-8v26E2vcX9e4dDtKfXLxhOTNovdxz0CevTLRHlX6R4eNScr2F1_b8GuJpuwTO6XwIxNCoBYuvj3BbWgWVucPQasdCb1yiM45Afv9rgvZzOM-s3S-ZgK3r6JFKD92uGyES_IFiJ6Y1dNyR_KTbcpDrGH5IUrhLJ-REUkByNbm4poBY03y92ELa7zUlz0kj2Dnadg4JwKQV26Rh3G5qIH1L74ErOqYPWPlVgv-TDCQmkaMvQxz2NgEKJVVyYY",
    status: "AO VIVO",
  },
  {
    id: "2",
    title: "Zero Trust Architecture Masterclass",
    description: "Workshop prático construindo perímetros de segurança robustos e baseados identidade para infraestruturas de nuvem modernas.",
    date: "12 de Nov, 2024",
    location: "Londres, Reino Unido",
    type: "in-person",
    tags: ["SecOps", "IAM"],
    price: 899,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-JPSIXHHOTeKCGLVgqWaQNVc0f5VbNHa050XkjG7gsgrTtMNdlzKSG-jX9hwJHNVEWW-oNuG7yb-J9BCSmsd8fFuZ5ra53IdwhC_aZeRIz4LILhkAMTvq7BoRMvpomSL1cdm9nF2z6P66UtHdJ4MHvUdVtfgnuE77U2dlj1NK0tw3WhWcMxSopzpjP2FQqdA3cQx98Nw4zEV6f-Jw2EkB88fPBVC045vWMz5ghPEeFstZ0Fhows33GgtNx8uqyneJvjh6qdV4-jA",
    status: "Workshop",
  },
  {
    id: "3",
    title: "KubeCon Cloud Native 2024",
    description: "A principal conferência da CNCF reúne adotantes e tecnólogos das principais comunidades open source e nuvem nativa.",
    date: "05 de Dez, 2024",
    location: "Berlim, Alemanha",
    type: "in-person",
    tags: ["K8s", "DevOps"],
    price: 0,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8EBVoljhVBZ8WptX5ZXqbDmlAiTgCgzZl5guzevfvfvk3tByIjSiuuuhEAfZvFASgZfNt6gY5wOtP1i8blQuRRfQvVWAwVmKv-kL3eDr4l3W8c8KlJQ74WSy3vTJrY-8NaRkSbR2scpCLQGATjtHr-weviFH0buwcIQyj09riaWPqyPVSijJFAyVBynNqkg_jiPJjLp-JnEsI2QQdzGQHeb9VppoeQleL7V4bS_TNScbb9Rgr5FFuQ_YfMtTd5CQ4J-SQGCDwptY",
    status: null,
  }
];

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? searchParams.get('query') || '' : '';
  const initialLocation = searchParams ? searchParams.get('location') || '' : '';

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [searchLocation, setSearchLocation] = useState<string>(initialLocation);
  
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [dateFilter, setDateFilter] = useState<string>('anytime');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    if (searchParams) {
      setSearchQuery(searchParams.get('query') || '');
      setSearchLocation(searchParams.get('location') || '');
    }
  }, [searchParams]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:8080';
        
        // Fetch with a timeout so it doesn't hang if backend is offline
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(`${apiUrl}/api/event?size=50`, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json'
          }
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped: EventItem[] = data.map((item: any) => {
            const isRemote = item.remote;
            const locationStr = isRemote ? 'Remoto' : `${item.city || ''}, ${item.uf || ''}`;
            
            let dateStr = "A definir";
            let status = "AGENDADO";
            if (item.date) {
              const d = new Date(item.date);
              dateStr = d.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' });
              
              const today = new Date();
              const todayZero = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
              const eventZero = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
              
              if (eventZero === todayZero) {
                status = "AO VIVO";
              } else if (eventZero < todayZero) {
                status = "ENCERRADO";
              }
            }

            return {
              id: item.id || String(Math.random()),
              title: item.title || "Evento Sem Título",
              description: item.description || "",
              date: dateStr,
              location: locationStr,
              type: isRemote ? 'online' : 'in-person',
              tags: [],
              price: item.price !== undefined && item.price !== null ? item.price : 0,
              image: item.image || item.imgUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60",
              status
            };
          });

          if (mapped.length > 0) {
            setEvents(mapped);
            setLoading(false);
            return;
          }
        }
        throw new Error("Empty list returned");
      } catch (err) {
        console.warn("API offline or CORS blocked. Using local mock data.", err);
        setEvents(MOCK_EVENTS);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    // Search Query (Keyword) filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const titleMatch = (event.title || '').toLowerCase().includes(q);
      const descMatch = (event.description || '').toLowerCase().includes(q);
      const tagMatch = (event.tags || []).some(tag => tag.toLowerCase().includes(q));
      if (!titleMatch && !descMatch && !tagMatch) return false;
    }

    // Location filter
    if (searchLocation.trim() !== '') {
      const loc = searchLocation.toLowerCase();
      if (!(event.location || '').toLowerCase().includes(loc)) return false;
    }

    // Track filter
    if (selectedTrack !== 'all') {
      if (selectedTrack === 'online' && event.type !== 'online') return false;
      if (selectedTrack === 'in-person' && event.type !== 'in-person') return false;
    }
    // Price filter
    if (event.price > maxPrice) return false;
    
    // Date filter simulation
    if (dateFilter !== 'anytime') {
      if (dateFilter === 'this-week' && event.id !== "1") return false;
      if (dateFilter === 'this-month' && event.id !== "2") return false;
    }

    return true;
  });

  const getButtonClass = (track: string) => {
    if (selectedTrack === track) {
      return "bg-primary-container text-on-primary-container rounded-xl flex items-center gap-md px-md py-sm font-label-sm text-label-sm translate-x-1 transition-transform cursor-pointer";
    }
    return "text-on-surface-variant flex items-center gap-md px-md py-sm hover:bg-white/5 rounded-xl font-label-sm text-label-sm transition-all duration-300 cursor-pointer";
  };

  return (
    <div className="max-w-container-max mx-auto px-lg flex flex-col lg:flex-row gap-lg">
      {/* SideNavBar / Filter System */}
      <aside className="w-full lg:w-64 shrink-0 glass-panel rounded-xl p-lg h-fit sticky top-[120px] z-25">
        <div className="mb-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Formato</h2>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Filtrar por formato</p>
        </div>
        <div className="flex flex-col gap-sm">
          <button 
            onClick={() => setSelectedTrack('all')} 
            className={getButtonClass('all')}
          >
            <span className="material-symbols-outlined text-[20px]">widgets</span>
            Todos os Eventos
          </button>
          <button 
            onClick={() => setSelectedTrack('online')} 
            className={getButtonClass('online')}
          >
            <span className="material-symbols-outlined text-[20px]">language</span>
            Online
          </button>
          <button 
            onClick={() => setSelectedTrack('in-person')} 
            className={getButtonClass('in-person')}
          >
            <span className="material-symbols-outlined text-[20px]">location_on</span>
            Presencial
          </button>
        </div>
        <div className="mt-lg pt-lg border-t border-white/10">
          <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-md uppercase tracking-wider">Data</h3>
          <div className="flex flex-col gap-sm">
            <label className="flex items-center gap-sm cursor-pointer group">
              <input 
                checked={dateFilter === 'anytime'} 
                onChange={() => setDateFilter('anytime')}
                className="bg-surface-dim border-outline-variant text-primary-container focus:ring-primary-container cursor-pointer" 
                name="date" 
                type="radio" 
              />
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary-fixed-dim transition-colors">Qualquer data</span>
            </label>
            <label className="flex items-center gap-sm cursor-pointer group">
              <input 
                checked={dateFilter === 'this-week'} 
                onChange={() => setDateFilter('this-week')}
                className="bg-surface-dim border-outline-variant text-primary-container focus:ring-primary-container cursor-pointer" 
                name="date" 
                type="radio" 
              />
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary-fixed-dim transition-colors">Esta Semana</span>
            </label>
            <label className="flex items-center gap-sm cursor-pointer group">
              <input 
                checked={dateFilter === 'this-month'} 
                onChange={() => setDateFilter('this-month')}
                className="bg-surface-dim border-outline-variant text-primary-container focus:ring-primary-container cursor-pointer" 
                name="date" 
                type="radio" 
              />
              <span className="font-body-md text-body-md text-on-surface group-hover:text-primary-fixed-dim transition-colors">Este Mês</span>
            </label>
          </div>
        </div>
        <div className="mt-lg pt-lg border-t border-white/10">
          <h3 className="font-label-sm text-label-sm text-on-surface-variant mb-md uppercase tracking-wider">Preço</h3>
          <input 
            className="w-full accent-primary-container bg-surface-dim h-1 rounded-full appearance-none cursor-pointer" 
            max="1000" 
            min="0" 
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            type="range" 
          />
          <div className="flex justify-between mt-sm text-on-surface-variant font-label-sm text-label-sm">
            <span>Grátis</span>
            <span className="text-primary-fixed-dim font-bold">R$ {maxPrice}</span>
            <span>R$ 1000+</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 pb-xxl">
        <div className="mb-lg flex justify-between items-end">
          <div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-xs">Explorar Eventos</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Descubra summits de tecnologia de alta relevância e workshops práticos.</p>
          </div>
          <div className="hidden md:flex gap-sm">
            <button 
              onClick={() => setViewMode('grid')}
              className={`glass-panel p-sm rounded-lg hover:border-primary-fixed-dim transition-colors cursor-pointer ${viewMode === 'grid' ? 'text-primary-fixed-dim border-primary-fixed-dim/50' : 'text-on-surface-variant'}`}
            >
              <span className="material-symbols-outlined">grid_view</span>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`glass-panel p-sm rounded-lg hover:border-primary-fixed-dim transition-colors cursor-pointer ${viewMode === 'list' ? 'text-primary-fixed-dim border-primary-fixed-dim/50' : 'text-on-surface-variant'}`}
            >
              <span className="material-symbols-outlined">view_list</span>
            </button>
          </div>
        </div>

        {/* Search & Location Bar */}
        <div className="glass-panel w-full rounded-xl p-xs flex flex-col md:flex-row items-center gap-sm glow-border mb-xl bg-surface-container-low border border-white/5">
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg px-md py-sm w-full border border-white/5">
            <span className="material-symbols-outlined text-outline mr-sm">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none text-on-surface font-body-md focus:ring-0 w-full placeholder-outline outline-none" 
              placeholder="Buscar por palavra-chave..." 
              type="text" 
            />
          </div>
          <div className="w-px h-8 bg-white/10 hidden md:block"></div>
          <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg px-md py-sm w-full border border-white/5">
            <span className="material-symbols-outlined text-outline mr-sm">location_on</span>
            <input 
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="bg-transparent border-none text-on-surface font-body-md focus:ring-0 w-full placeholder-outline outline-none" 
              placeholder="Localização..." 
              type="text" 
            />
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-xxl">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-fixed-dim animate-spin shadow-[0_0_15px_rgba(0,219,231,0.5)]"></div>
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="glass-panel rounded-xl p-xxl text-center">
            <span className="material-symbols-outlined text-outline text-6xl mb-md">search_off</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Nenhum evento corresponde aos seus critérios</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Tente ajustar seus filtros ou o limite de preço.</p>
            <button 
              onClick={() => { setSelectedTrack('all'); setMaxPrice(1000); setDateFilter('anytime'); }} 
              className="mt-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm px-xl py-md rounded-lg hover:brightness-110 transition-all duration-300 cursor-pointer"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-lg" 
            : "flex flex-col gap-lg"
          }>
            {filteredEvents.map(event => (
              <Link 
                key={event.id}
                href={`/event/${event.id}`} 
                className={`glass-panel rounded-xl overflow-hidden glass-card-hover group flex transition-all duration-300 ${
                  viewMode === 'grid' ? 'flex-col h-full' : 'flex-col md:flex-row h-fit items-center'
                }`}
              >
                <div className={`relative overflow-hidden bg-surface-dim ${
                  viewMode === 'grid' ? 'h-48 w-full' : 'h-48 md:h-full w-full md:w-64 shrink-0'
                }`}>
                  <img 
                    alt={event.title} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" 
                    src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60"} 
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60";
                    }}
                  />
                  {event.status && (
                    <div className={`absolute top-md right-md px-sm py-xs rounded text-[10px] font-label-sm uppercase tracking-wider font-bold z-10 ${
                      event.status === 'AO VIVO' 
                        ? 'bg-error text-on-error animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.5)]' 
                        : event.status === 'ENCERRADO'
                        ? 'bg-white/10 text-on-surface-variant line-through border border-white/5'
                        : 'bg-primary-fixed-dim/90 text-on-primary-fixed'
                    }`}>
                      {event.status}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-80"></div>
                </div>
                <div className={`p-lg flex-1 flex flex-col relative z-10 ${
                  viewMode === 'grid' ? '-mt-12' : ''
                }`}>
                  <div className="bg-surface/80 backdrop-blur-md rounded-lg p-sm border border-white/5 inline-block w-fit mb-md">
                    <span className="text-primary-fixed-dim font-label-sm text-label-sm flex items-center gap-xs">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {event.date}
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-sm group-hover:text-primary-fixed-dim transition-colors">
                    {event.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-lg flex-1 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/5 pt-md mt-auto w-full">
                    <div className="flex items-center gap-xs text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[16px]">
                        {event.type === 'online' ? 'language' : 'location_on'}
                      </span>
                      <span>
                        {event.location} • {event.price === 0 ? "Grátis" : `R$ ${Number(event.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>
                    </div>
                    <div className="flex gap-xs">
                      <span className="px-sm py-xs bg-primary-fixed-dim/10 border border-primary-fixed-dim/20 rounded-md text-[10px] text-primary-fixed-dim font-label-sm font-bold uppercase tracking-wider">
                        {event.type === 'online' ? 'Online' : 'Presencial'}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Explore() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-xxl min-h-[50vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-fixed-dim animate-spin shadow-[0_0_15px_rgba(0,219,231,0.5)]"></div>
        </div>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
