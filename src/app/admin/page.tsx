/* eslint-disable */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  // Input fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [remote, setRemote] = useState(false);
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Speakers states
  const [speakers, setSpeakers] = useState<{name: string, role: string, image: string, profileUrl: string}[]>([]);
  const [newSpeakerName, setNewSpeakerName] = useState('');
  const [newSpeakerRole, setNewSpeakerRole] = useState('');
  const [newSpeakerImage, setNewSpeakerImage] = useState('');
  const [newSpeakerProfileUrl, setNewSpeakerProfileUrl] = useState('');

  // Agenda states
  const [agenda, setAgenda] = useState<{time: string, title: string, description: string}[]>([]);
  const [newAgendaTime, setNewAgendaTime] = useState('');
  const [newAgendaTitle, setNewAgendaTitle] = useState('');
  const [newAgendaDescription, setNewAgendaDescription] = useState('');

  // Edit Mode states
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Status states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Security gate states
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // List management states
  const [eventsList, setEventsList] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const fetchEvents = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/event?page=0&size=100`);
      if (res.ok) {
        const data = await res.json();
        setEventsList(data);
      }
    } catch (err) {
      console.error("Erro ao buscar eventos para o admin:", err);
    } finally {
      setLoadingList(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita e removerá cupons associados.")) {
      return;
    }
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/event/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchEvents();
      } else {
        alert("Erro ao excluir o evento. Verifique o console ou tente novamente.");
      }
    } catch (err) {
      console.error("Erro de rede ao excluir evento:", err);
      alert("Erro de rede ao excluir o evento.");
    }
  };

  // Load authorization from sessionStorage on mount (client-side only)
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_authorized');
    if (authStatus === 'true') {
      setIsAuthorized(true);
    }
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (isAuthorized) {
      fetchEvents();
    }
  }, [isAuthorized]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const requiredKey = process.env.NEXT_PUBLIC_ADMIN_KEY || 'admin123';

    if (passcode === requiredKey) {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_authorized', 'true');
    } else {
      setAuthError('Chave de acesso incorreta. Acesso negado.');
      setPasscode('');
    }
  };

  const handleLock = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('admin_authorized');
    setPasscode('');
    setAuthError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleEditClick = async (eventBasic: any) => {
    try {
      setErrorMsg(null);
      setSuccess(false);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await fetch(`${apiUrl}/api/event/${eventBasic.id}`);
      if (res.ok) {
        const details = await res.json();
        setIsEditing(true);
        setEditingId(details.id);
        setTitle(details.title || '');
        setDescription(details.description || '');
        
        if (details.date) {
          const dateObj = new Date(details.date);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0');
          const day = String(dateObj.getDate()).padStart(2, '0');
          const hours = String(dateObj.getHours()).padStart(2, '0');
          const minutes = String(dateObj.getMinutes()).padStart(2, '0');
          setDate(`${year}-${month}-${day}T${hours}:${minutes}`);
        } else {
          setDate('');
        }

        setEventUrl(details.eventUrl || '');
        setRemote(details.remote || false);
        setCity(details.city || '');
        setUf(details.uf || '');
        if (details.price !== undefined && details.price !== null) {
          setPrice(String(details.price).replace('.', ','));
        } else {
          setPrice('0');
        }
        
        setImagePreview(details.imgUrl || null);
        setImage(null);

        setSpeakers(details.speakers || []);
        setAgenda(details.agenda || []);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Erro ao buscar detalhes do evento.");
      }
    } catch (err) {
      console.error("Erro ao buscar detalhes:", err);
      alert("Erro de conexão ao carregar detalhes.");
    }
  };

  const handleCancelEdit = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setEventUrl('');
    setRemote(false);
    setCity('');
    setUf('');
    setPrice('');
    setImage(null);
    setImagePreview(null);
    setSpeakers([]);
    setAgenda([]);
    setIsEditing(false);
    setEditingId(null);
    setErrorMsg(null);
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('eventUrl', eventUrl);
      formData.append('remote', String(remote));

      if (!remote) {
        formData.append('city', city);
        formData.append('uf', uf.toUpperCase());
      } else {
        formData.append('city', '');
        formData.append('uf', '');
      }

      if (date) {
        const timestamp = new Date(date).getTime();
        formData.append('date', String(timestamp));
      }

      let formattedPrice = '0';
      if (price) {
        const normalized = price.replace(',', '.');
        const parsed = parseFloat(normalized);
        if (!isNaN(parsed)) {
          formattedPrice = String(parsed);
        }
      }
      formData.append('price', formattedPrice);

      if (image) {
        formData.append('image', image);
      }

      // Add speakers and agenda as serialized JSON strings
      formData.append('speakers', JSON.stringify(speakers));
      formData.append('agenda', JSON.stringify(agenda));

      const url = isEditing 
        ? `${apiUrl}/api/event/${editingId}` 
        : `${apiUrl}/api/event`;

      const res = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Erro do servidor: Código ${res.status}`);
      }

      setSuccess(true);
      // Reset form
      setTitle('');
      setDescription('');
      setDate('');
      setEventUrl('');
      setRemote(false);
      setCity('');
      setUf('');
      setPrice('');
      setImage(null);
      setImagePreview(null);
      setSpeakers([]);
      setAgenda([]);
      setIsEditing(false);
      setEditingId(null);
      fetchEvents();
    } catch (err: any) {
      setErrorMsg(err.message || 'Erro inesperado ao salvar evento.');
    } finally {
      setLoading(false);
    }
  };

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

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin h-8 w-8 text-primary-fixed-dim border-2 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Render Lock Screen if not authorized
  if (!isAuthorized) {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center px-md py-xl relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,219,231,0.05)_0%,transparent_70%)] z-0 pointer-events-none"></div>
        <div className="glass-panel w-full max-w-[440px] p-xl rounded-xl glow-border bg-surface-container-low border border-white/5 relative z-10 text-center space-y-lg animate-fade-in">
          <div>
            <span className="material-symbols-outlined text-primary-fixed-dim text-[48px] mb-xs">lock</span>
            <h1 className="font-display-lg text-headline-xl text-on-surface text-glow">Acesso Restrito</h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[320px] mx-auto mt-xs">
              Informe a chave de acesso do administrador para liberar o cadastro de eventos.
            </p>
          </div>

          {authError && (
            <div className="bg-error/10 border border-error/20 p-sm rounded-lg text-error text-label-sm font-label-sm">
              {authError}
            </div>
          )}

          <form onSubmit={handleUnlock} className="space-y-md">
            <div className="flex flex-col gap-xs text-left">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Chave de Acesso</label>
              <input 
                type="password"
                required
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors text-center tracking-widest"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-primary-fixed-dim hover:brightness-110 text-on-primary-fixed font-label-md text-label-md font-bold py-sm rounded-lg flex items-center justify-center gap-xs transition-all duration-300 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              Desbloquear Painel
            </button>
          </form>

          <div className="pt-md border-t border-white/10">
            <Link href="/" className="text-on-surface-variant hover:text-on-surface text-label-sm font-label-sm transition-colors flex items-center justify-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">home</span>
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Admin Form if authorized
  return (
    <main className="min-h-screen py-xxl px-md max-w-4xl mx-auto mt-[80px] animate-fade-in">
      <div className="mb-xl flex flex-col md:flex-row md:items-center justify-between gap-md">
        <div>
          <span className="text-primary-fixed-dim font-label-sm text-label-sm uppercase tracking-wider block mb-xs">Painel Admin</span>
          <h1 className="font-display-lg text-headline-xl lg:text-display-lg text-on-surface text-glow leading-tight">
            {isEditing ? 'Editar Evento' : 'Cadastrar Evento'}
          </h1>
        </div>
        <div className="flex items-center gap-sm">
          <button 
            onClick={handleLock}
            className="inline-flex items-center gap-xs text-error hover:text-error/80 font-label-sm text-label-sm transition-colors border border-error/20 px-md py-sm rounded-lg glass-panel hover:bg-error/5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            Bloquear
          </button>
          <Link 
            href="/explore" 
            className="inline-flex items-center gap-xs text-on-surface-variant hover:text-primary-fixed-dim font-label-sm text-label-sm transition-colors border border-white/10 px-md py-sm rounded-lg glass-panel hover:bg-white/5"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Ver Eventos
          </Link>
        </div>
      </div>

      {success && (
        <div className="glass-panel p-xl rounded-xl glow-border border border-primary-fixed-dim/30 bg-primary-fixed-dim/5 mb-xl flex flex-col items-center text-center animate-fade-in">
          <span className="material-symbols-outlined text-primary-fixed-dim text-[64px] mb-md">check_circle</span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-xs">Evento Salvo!</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[400px] mb-lg">
            O evento foi salvo com sucesso no banco de dados e as informações foram processadas.
          </p>
          <div className="flex gap-md">
            <button 
              onClick={() => setSuccess(false)}
              className="bg-primary-fixed-dim text-on-primary-fixed font-label-sm text-label-sm px-lg py-sm rounded-lg hover:brightness-110 transition-all duration-300 font-bold cursor-pointer"
            >
              Fechar
            </button>
            <Link 
              href="/explore"
              className="border border-white/20 hover:border-white/40 text-on-surface font-label-sm text-label-sm px-lg py-sm rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              Ir para Eventos
            </Link>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="glass-panel p-md rounded-xl glow-border border border-error/30 bg-error/5 mb-xl flex items-start gap-md animate-fade-in">
          <span className="material-symbols-outlined text-error text-[24px] shrink-0">error</span>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Falha no Cadastro</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{errorMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel p-xl rounded-xl glow-border bg-surface-container-low border border-white/5 space-y-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Title */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Título do Evento *</label>
            <input 
              type="text" 
              required
              placeholder="Ex: Frontin Sampa 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Data e Hora *</label>
              {date && (
                <span className={`text-[10px] px-sm py-[2px] rounded font-bold uppercase tracking-wider ${
                  getEventStatus(date).color
                }`}>
                  Status: {getEventStatus(date).text}
                </span>
              )}
            </div>
            <input 
              type="datetime-local" 
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Event URL */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Link Oficial do Evento *</label>
            <input 
              type="url" 
              required
              placeholder="Ex: https://eventos.com/frontin-sampa"
              value={eventUrl}
              onChange={(e) => setEventUrl(e.target.value)}
              className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Preço do Ingresso (R$ ou 0 para Grátis) *</label>
            <input 
              type="text" 
              required
              placeholder="Ex: 99,90 (digite 0 para grátis)"
              value={price}
              onChange={(e) => {
                const val = e.target.value;
                if (/^[0-9]*[,\.]?[0-9]{0,2}$/.test(val) || val === '') {
                  setPrice(val);
                }
              }}
              className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
            />
          </div>
        </div>

        {/* Remote Toggle Row */}
        <div className="flex flex-col justify-end pb-sm">
          <label className="flex items-center gap-sm cursor-pointer select-none">
            <input 
              type="checkbox"
              checked={remote}
              onChange={(e) => setRemote(e.target.checked)}
              className="w-5 h-5 accent-primary-fixed-dim rounded border-white/10 cursor-pointer bg-surface-container-lowest"
            />
            <div>
              <span className="font-body-md text-body-md text-on-surface font-bold">Evento Remoto / Online</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Marque se o evento não tiver localização física.</p>
            </div>
          </label>
        </div>

        {/* Location (City/UF) */}
        {!remote && (
          <div className="grid grid-cols-4 gap-lg animate-fade-in">
            <div className="col-span-3 flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Cidade *</label>
              <input 
                type="text" 
                required={!remote}
                placeholder="Ex: São Paulo"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
              />
            </div>
            <div className="col-span-1 flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">UF *</label>
              <input 
                type="text" 
                required={!remote}
                maxLength={2}
                placeholder="SP"
                value={uf}
                onChange={(e) => setUf(e.target.value.slice(0, 2))}
                className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim text-center uppercase transition-colors"
              />
            </div>
          </div>
        )}

        {/* Description */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Descrição do Evento *</label>
          <textarea 
            required
            rows={4}
            placeholder="Forneça detalhes detalhados sobre os palestrantes, trilhas de conhecimento e a programação..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-sm text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors resize-none"
          />
        </div>

        {/* Image File Upload */}
        <div className="flex flex-col gap-xs">
          <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Imagem / Banner do Evento (Opcional)</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md items-center">
            <div className="md:col-span-2">
              <label className="border-2 border-dashed border-white/10 hover:border-primary-fixed-dim/50 rounded-lg p-lg flex flex-col items-center justify-center cursor-pointer bg-surface-container-lowest/50 hover:bg-surface-container-lowest transition-all duration-300">
                <span className="material-symbols-outlined text-outline text-[32px] mb-xs">cloud_upload</span>
                <span className="font-label-sm text-label-sm text-on-surface font-bold">Escolher Arquivo</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-1 text-center">Arraste uma imagem ou clique para selecionar (PNG, JPG, JPEG)</span>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            
            <div className="md:col-span-1 h-36 rounded-lg border border-white/10 overflow-hidden relative bg-surface-container-lowest flex items-center justify-center">
              {imagePreview ? (
                <>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    type="button"
                    onClick={() => { setImage(null); setImagePreview(null); }}
                    className="absolute top-sm right-sm bg-error/90 hover:bg-error text-on-error p-xs rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </>
              ) : (
                <div className="text-center p-md flex flex-col items-center gap-xs">
                  <span className="material-symbols-outlined text-outline text-[24px]">image</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Pré-visualização</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bloco de Palestrantes */}
        <div className="border-t border-white/10 pt-lg space-y-md">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Palestrantes do Evento</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">Adicione ou remova palestrantes para este evento.</p>
          </div>
          
          {/* Adicionar Palestrante Form */}
          <div className="glass-panel p-md rounded-lg bg-surface-container-lowest/30 border border-white/5 space-y-md animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Nome do Palestrante</label>
                <input 
                  type="text" 
                  placeholder="Ex: Marcus Chen"
                  value={newSpeakerName}
                  onChange={(e) => setNewSpeakerName(e.target.value)}
                  className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-xs text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Cargo / Função</label>
                <input 
                  type="text" 
                  placeholder="Ex: Arquiteto de Software Principal"
                  value={newSpeakerRole}
                  onChange={(e) => setNewSpeakerRole(e.target.value)}
                  className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-xs text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">URL da Foto</label>
                <input 
                  type="url" 
                  placeholder="Ex: https://link.com/foto.jpg"
                  value={newSpeakerImage}
                  onChange={(e) => setNewSpeakerImage(e.target.value)}
                  className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-xs text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Link do Perfil (LinkedIn, Site, etc.)</label>
                <input 
                  type="url" 
                  placeholder="Ex: https://linkedin.com/in/perfil"
                  value={newSpeakerProfileUrl}
                  onChange={(e) => setNewSpeakerProfileUrl(e.target.value)}
                  className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-xs text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end pt-xs">
              <button
                type="button"
                onClick={() => {
                  if (!newSpeakerName || !newSpeakerRole) {
                    alert("Por favor, insira pelo menos o Nome e o Cargo do palestrante.");
                    return;
                  }
                  const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60";
                  const newSpeaker = {
                    name: newSpeakerName,
                    role: newSpeakerRole,
                    image: newSpeakerImage || defaultAvatar,
                    profileUrl: newSpeakerProfileUrl || "#"
                  };
                  setSpeakers([...speakers, newSpeaker]);
                  setNewSpeakerName('');
                  setNewSpeakerRole('');
                  setNewSpeakerImage('');
                  setNewSpeakerProfileUrl('');
                }}
                className="bg-primary-fixed-dim/10 hover:bg-primary-fixed-dim/25 text-primary-fixed-dim font-bold font-label-sm text-label-sm px-md py-sm rounded-lg flex items-center gap-xs cursor-pointer border border-primary-fixed-dim/20 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Adicionar Palestrante</span>
              </button>
            </div>
          </div>

          {/* Speakers List */}
          {speakers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-md">
              {speakers.map((sp, idx) => (
                <div key={idx} className="glass-panel p-sm rounded-lg bg-surface-container-lowest border border-white/5 flex items-center gap-md relative group">
                  <img 
                    src={sp.image} 
                    alt={sp.name} 
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60";
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-body-md text-on-surface truncate">{sp.name}</p>
                    <p className="text-body-sm text-on-surface-variant truncate">{sp.role}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSpeakers(speakers.filter((_, i) => i !== idx));
                    }}
                    className="absolute top-xs right-xs opacity-0 group-hover:opacity-100 bg-error/90 hover:bg-error text-on-error p-[2px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
                    title="Excluir Palestrante"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-on-surface-variant italic opacity-60">Nenhum palestrante adicionado ainda.</p>
          )}
        </div>

        {/* Bloco de Programação (Agenda) */}
        <div className="border-t border-white/10 pt-lg space-y-md">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Programação do Evento</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant opacity-70">Adicione cronogramas e sessões do evento.</p>
          </div>

          {/* Adicionar Agenda Form */}
          <div className="glass-panel p-md rounded-lg bg-surface-container-lowest/30 border border-white/5 space-y-md animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
              <div className="md:col-span-1 flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Horário</label>
                <input 
                  type="text" 
                  placeholder="Ex: 09:00"
                  value={newAgendaTime}
                  onChange={(e) => setNewAgendaTime(e.target.value)}
                  className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-xs text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
              </div>
              <div className="md:col-span-3 flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Título da Sessão</label>
                <input 
                  type="text" 
                  placeholder="Ex: Abertura e Keynote Principal"
                  value={newAgendaTitle}
                  onChange={(e) => setNewAgendaTitle(e.target.value)}
                  className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-xs text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant font-bold">Descrição da Sessão</label>
              <textarea 
                rows={2}
                placeholder="Ex: Apresentação das novidades, visão do ecossistema e palestrantes principais do evento..."
                value={newAgendaDescription}
                onChange={(e) => setNewAgendaDescription(e.target.value)}
                className="bg-surface-container-lowest border border-white/10 rounded-lg px-md py-xs text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-fixed-dim transition-colors resize-none"
              />
            </div>

            <div className="flex justify-end pt-xs">
              <button
                type="button"
                onClick={() => {
                  if (!newAgendaTime || !newAgendaTitle) {
                    alert("Por favor, insira pelo menos o Horário e o Título da programação.");
                    return;
                  }
                  const newAgenda = {
                    time: newAgendaTime,
                    title: newAgendaTitle,
                    description: newAgendaDescription
                  };
                  setAgenda([...agenda, newAgenda]);
                  setNewAgendaTime('');
                  setNewAgendaTitle('');
                  setNewAgendaDescription('');
                }}
                className="bg-primary-fixed-dim/10 hover:bg-primary-fixed-dim/25 text-primary-fixed-dim font-bold font-label-sm text-label-sm px-md py-sm rounded-lg flex items-center gap-xs cursor-pointer border border-primary-fixed-dim/20 transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Adicionar Sessão</span>
              </button>
            </div>
          </div>

          {/* Agenda List */}
          {agenda.length > 0 ? (
            <div className="glass-panel p-md rounded-lg bg-surface-container-lowest border border-white/5 space-y-sm divide-y divide-white/5">
              {agenda.map((item, idx) => (
                <div key={idx} className="flex items-start gap-md pt-sm first:pt-0 relative group">
                  <span className="font-label-sm text-label-sm text-primary-fixed-dim shrink-0 w-16">{item.time}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-body-md text-on-surface">{item.title}</h4>
                    {item.description && <p className="text-body-sm text-on-surface-variant">{item.description}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAgenda(agenda.filter((_, i) => i !== idx));
                    }}
                    className="absolute top-sm right-xs opacity-0 group-hover:opacity-100 bg-error/90 hover:bg-error text-on-error p-[2px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
                    title="Excluir Sessão"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-sm text-on-surface-variant italic opacity-60">Nenhuma programação adicionada ainda.</p>
          )}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="pt-md border-t border-white/10 flex justify-end gap-sm">
          {isEditing && (
            <button 
              type="button"
              onClick={handleCancelEdit}
              className="w-full md:w-auto min-w-[150px] bg-white/5 border border-white/10 hover:bg-white/10 text-on-surface font-label-md text-label-md font-bold px-xl py-md rounded-lg flex items-center justify-center gap-sm transition-all duration-300 cursor-pointer"
            >
              Cancelar Edição
            </button>
          )}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto min-w-[200px] bg-primary-fixed-dim hover:brightness-110 text-on-primary-fixed font-label-md text-label-md font-bold px-xl py-md rounded-lg flex items-center justify-center gap-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-on-primary-fixed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{isEditing ? 'Salvando...' : 'Cadastrando...'}</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">{isEditing ? 'save' : 'add'}</span>
                <span>{isEditing ? 'Salvar Alterações' : 'Criar Evento'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Area to manage / delete events */}
      <section className="glass-panel p-xl rounded-xl glow-border bg-surface-container-low border border-white/5 mt-xxl space-y-lg">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Gerenciar Eventos Existentes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Visualize, filtre ou exclua eventos cadastrados no sistema.</p>
        </div>

        {loadingList ? (
          <div className="flex justify-center items-center py-xl">
            <div className="animate-spin h-6 w-6 text-primary-fixed-dim border-2 border-t-transparent rounded-full"></div>
          </div>
        ) : eventsList.length === 0 ? (
          <div className="text-center py-xl border border-dashed border-white/10 rounded-lg">
            <p className="font-body-md text-body-md text-on-surface-variant">Nenhum evento cadastrado no banco de dados.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 font-label-md text-label-md text-on-surface-variant">
                  <th className="py-md pr-md">Evento</th>
                  <th className="py-md px-md hidden md:table-cell">Data</th>
                  <th className="py-md px-md">Status</th>
                  <th className="py-md px-md">Local</th>
                  <th className="py-md px-md text-right">Preço</th>
                  <th className="py-md pl-md text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-body-md text-body-md text-on-surface">
                {eventsList.map((event) => {
                  const dateObj = event.date ? new Date(event.date) : null;
                  const dateStr = dateObj ? dateObj.toLocaleDateString('pt-BR') : 'TBD';
                  const locationStr = event.remote ? 'Online' : `${event.city || ''} - ${event.uf || ''}`;
                  const statusInfo = getEventStatus(event.date);
                  
                  return (
                    <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-md pr-md flex items-center gap-sm">
                        <img 
                          src={event.image || event.imgUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&auto=format&fit=crop&q=60"}
                          alt=""
                          className="w-12 h-12 object-cover rounded-md border border-white/10 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=100&auto=format&fit=crop&q=60";
                          }}
                        />
                        <div className="font-bold truncate max-w-[200px] md:max-w-xs">{event.title}</div>
                      </td>
                      <td className="py-md px-md hidden md:table-cell text-on-surface-variant">{dateStr}</td>
                      <td className="py-md px-md">
                        <span className={`text-[10px] px-sm py-[2px] rounded font-bold uppercase tracking-wider ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="py-md px-md text-on-surface-variant">{locationStr}</td>
                      <td className="py-md px-md text-right text-primary-fixed-dim font-bold">
                        {event.price === undefined || event.price === null || event.price === 0 ? (
                          "Grátis"
                        ) : (
                          `R$ ${Number(event.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        )}
                      </td>
                      <td className="py-md pl-md">
                        <div className="flex items-center justify-end gap-xs">
                          <button
                            onClick={() => handleEditClick(event)}
                            className="p-sm bg-primary-fixed-dim/10 hover:bg-primary-fixed-dim/25 text-primary-fixed-dim rounded-lg flex items-center justify-center gap-xs transition-colors cursor-pointer border border-primary-fixed-dim/20"
                            title="Editar Evento"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                            <span className="hidden sm:inline font-bold text-[13px]">Editar</span>
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="p-sm bg-error/10 hover:bg-error/25 text-error rounded-lg flex items-center justify-center gap-xs transition-colors cursor-pointer border border-error/20"
                            title="Excluir Evento"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                            <span className="hidden sm:inline font-bold text-[13px]">Excluir</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
