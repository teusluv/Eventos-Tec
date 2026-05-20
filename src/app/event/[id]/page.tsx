/* eslint-disable */
import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientImage } from "@/components/common/ClientImage";

interface Speaker {
  name: string;
  role: string;
  image: string;
  profileUrl: string;
}

interface AgendaItem {
  time: string;
  title: string;
  description: string;
}

interface TicketTier {
  name: string;
  price: string;
  description: string;
  features: string[];
}

interface EventData {
  id: string | number;
  title: string;
  overview: string;
  longDescription: string;
  date: string;
  location: string;
  type: string;
  banner: string;
  speakers: Speaker[];
  agenda: AgendaItem[];
  tickets: TicketTier[];
}

const EVENTS_DB: Record<string, EventData> = {
  "1": {
    id: 1,
    title: "Next.js Global Summit",
    overview: "Junte-se a visionários do setor para um mergulho profundo em infraestrutura de nuvem de próxima geração, Server Actions e a evolução do React.",
    longDescription: "O Next.js Global Summit é o principal encontro para desenvolvedores, arquitetos de sistemas e líderes técnicos que moldam a próxima década da engenharia front-end e full-stack. Ao longo de três dias, exploraremos o estado da arte do Next.js, App Router, Server Actions, Edge Compute e React Server Components. Este não é um evento de marketing; é uma arena de alto nível técnico para construir o futuro das aplicações web.",
    date: "24 de Out, 2024",
    location: "Remoto / Online",
    type: "Ao Vivo",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLoo387JyYOVda0gJ-8v26E2vcX9e4dDtKfXLxhOTNovdxz0CevTLRHlX6R4eNScr2F1_b8GuJpuwTO6XwIxNCoBYuvj3BbWgWVucPQasdCb1yiM45Afv9rgvZzOM-s3S-ZgK3r6JFKD92uGyES_IFiJ6Y1dNyR_KTbcpDrGH5IUrhLJ-REUkByNbm4poBY03y92ELa7zUlz0kj2Dnadg4JwKQV26Rh3G5qIH1L74ErOqYPWPlVgv-TDCQmkaMvQxz2NgEKJVVyYY",
    speakers: [
      {
        name: "Dra. Elena Rostova",
        role: "Líder da Equipe Core do React",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMDrPUrWKIpEFG5ypEoWLxn-E56Eh031zwZ9LJXqubH6Dj6Hb2Dyk33-zlxHe16fHWyP0ZE4ClN6qfevo6fI3n6iVORz5cXM0YynGKf-0HhoMVROn_zhTG391BORfTj7TILbhG3qo79HIj2JTD5xjGdMS1hFrMAlaWr6Tc33M4fZmB8KXw3-kkloCexnhVjI1m0VijGdnuwUQXuCp6Pgyj5k5PO8EsmQF47GspSVV1ghhyo1moUODhFuRKvKiejwd4wi6l-4llMZA",
        profileUrl: "#"
      },
      {
        name: "Marcus Chen",
        role: "Arquiteto Principal, Nexus",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtDqe2Z7b-1l0ejRR83SuSVaZdVSb5yGw7ZqNAH2d67EwUT5YJp1pN9jQciRYQlPMbjWyfPDUGDf7NaLHooRLYMh0YK2VslejPFShw1ZWOEzpNWBkbjIrVXu5O1qe-yPGmpDOlHcJ3M8vIxygEF4SYw_3B7bAEEx3zG9EtB0Wue20Aj2GpgZWU5yQBeLSlMWcd1M9a1540XrDsSiX6-rXOcDDEqJCbbQakFrIv8CX4Hp8kaoAKFMwZHPQyY4pMP3j4o9M7_tFpwXM",
        profileUrl: "#"
      },
      {
        name: "Sarah Jenkins",
        role: "Diretora de Operações Frontend",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN68SirWSu8BLzc2y5hjqPrXX2m-TRyL6AqsUIWOalzmEzr7zz0AeG5gz1jsFDNKwmyNiAtVEow5SzzkPdqlpuhW-igNJgG5CA-IQenwHDr0Zirk0O7vH-M3aFiXTrrWOI4_HQepge95XlE4GcONn33L8wdWGpchQMXw3Ioq8J1G2VNDgvvSE2zwccMV_kRyRmxRnbNVtCDymjD4cqSvLePRRwf3x0R5564ZS-RJZluvnqJi2AyJlnzb-ZTRtxxoNflRSwWWPpobE",
        profileUrl: "#"
      }
    ],
    agenda: [
      {
        time: "09:00",
        title: "Abertura: O futuro do Next.js e React Server Components",
        description: "Palestra de abertura e revelação dos principais recursos de próxima geração do Next.js."
      },
      {
        time: "11:30",
        title: "Mergulho Profundo em Server Actions",
        description: "Protegendo envios de formulários, fluxos de mutação e gerenciamento de estado no React 19."
      },
      {
        time: "14:00",
        title: "Workshop: Construindo Apps Edge-First",
        description: "Sessão prática sobre otimizações de cache para deploys globais."
      }
    ],
    tickets: [
      {
        name: "Acesso Digital",
        price: "R$ 299",
        description: "Apenas transmissão remota",
        features: ["Acesso à transmissão ao vivo", "Gravações sob demanda (VOD)", "Acesso ao chat interativo"]
      },
      {
        name: "Passe Pro",
        price: "R$ 899",
        description: "Acesso remoto completo e perguntas e respostas",
        features: ["Todos os recursos do Acesso Digital", "Perguntas ao vivo com palestrantes", "Slides das apresentações", "Workshops interativos"]
      }
    ]
  },
  "2": {
    id: 2,
    title: "Zero Trust Architecture Masterclass",
    overview: "Workshop prático construindo perímetros de segurança robustos e baseados em identidade para infraestruturas de nuvem modernas.",
    longDescription: "Na Zero Trust Architecture Masterclass, arquitetos de segurança e engenheiros de plataforma aprenderão a fazer a transição de microsserviços modernos e infraestruturas multi-nuvem de uma segurança de perímetro de rede tradicional para um modelo estrito de Confiança Zero (Zero-Trust). Aprenda padrões fundamentais de asserção de identidade, configurações de TLS mútuo (mTLS), redes de service mesh e fluxos de verificação criptográfica.",
    date: "12 de Nov, 2024",
    location: "Londres, Reino Unido",
    type: "Workshop",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-JPSIXHHOTeKCGLVgqWaQNVc0f5VbNHa050XkjG7gsgrTtMNdlzKSG-jX9hwJHNVEWW-oNuG7yb-J9BCSmsd8fFuZ5ra53IdwhC_aZeRIz4LILhkAMTvq7BoRMvpomSL1cdm9nF2z6P66UtHdJ4MHvUdVtfgnuE77U2dlj1NK0tw3WhWcMxSopzpjP2FQqdA3cQx98Nw4zEV6f-Jw2EkB88fPBVC045vWMz5ghPEeFstZ0Fhows33GgtNx8uqyneJvjh6qdV4-jA",
    speakers: [
      {
        name: "Marcus Chen",
        role: "Arquiteto Principal, Nexus Security",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtDqe2Z7b-1l0ejRR83SuSVaZdVSb5yGw7ZqNAH2d67EwUT5YJp1pN9jQciRYQlPMbjWyfPDUGDf7NaLHooRLYMh0YK2VslejPFShw1ZWOEzpNWBkbjIrVXu5O1qe-yPGmpDOlHcJ3M8vIxygEF4SYw_3B7bAEEx3zG9EtB0Wue20Aj2GpgZWU5yQBeLSlMWcd1M9a1540XrDsSiX6-rXOcDDEqJCbbQakFrIv8CX4Hp8kaoAKFMwZHPQyY4pMP3j4o9M7_tFpwXM",
        profileUrl: "#"
      },
      {
        name: "Sarah Jenkins",
        role: "Diretora de IA e Segurança de Infraestrutura",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN68SirWSu8BLzc2y5hjqPrXX2m-TRyL6AqsUIWOalzmEzr7zz0AeG5gz1jsFDNKwmyNiAtVEow5SzzkPdqlpuhW-igNJgG5CA-IQenwHDr0Zirk0O7vH-M3aFiXTrrWOI4_HQepge95XlE4GcONn33L8wdWGpchQMXw3Ioq8J1G2VNDgvvSE2zwccMV_kRyRmxRnbNVtCDymjD4cqSvLePRRwf3x0R5564ZS-RJZluvnqJi2AyJlnzb-ZTRtxxoNflRSwWWPpobE",
        profileUrl: "#"
      }
    ],
    agenda: [
      {
        time: "09:30",
        title: "Introdução às Redes Confiança Zero",
        description: "Desconstruindo os modelos tradicionais de perímetro. Estudo de caso da arquitetura BeyondCorp do Google."
      },
      {
        time: "11:00",
        title: "Mutual TLS & Identidade Criptográfica",
        description: "Garantindo a segurança na comunicação de containers com gestão de identidade SPIFFE/SPIRE."
      },
      {
        time: "14:30",
        title: "Laboratório Prático: Quebrando o Mesh",
        description: "Sessão interativa executando varreduras de vulnerabilidade e mitigação em service mesh."
      }
    ],
    tickets: [
      {
        name: "Passe Presencial",
        price: "R$ 899",
        description: "Acesso completo ao local em Londres",
        features: ["Acesso aos palcos principais", "Materiais de laboratório práticos", "Almoço & evento de Networking", "Kit de brindes exclusivo"]
      },
      {
        name: "Passe VIP Elite",
        price: "R$ 1499",
        description: "Experiência presencial premium",
        features: ["Todos os recursos do Passe Presencial", "Revisão de arquitetura 1-a-1", "Acesso exclusivo ao jantar dos palestrantes", "Assento prioritário"]
      }
    ]
  },
  "3": {
    id: 3,
    title: "KubeCon Cloud Native 2024",
    overview: "A principal conferência de nuvem da CNCF reúne as mentes mais brilhantes do mundo em Kubernetes, ecossistema cloud native e ferramentas de container.",
    longDescription: "A KubeCon reúne adotantes e tecnólogos das principais comunidades open source e cloud native em Berlim. Junte-se a nós para aprender sobre escalabilidade do Kubernetes, camadas de execução serverless, arquiteturas multi-cluster e a evolução da computação de código aberto.",
    date: "05 de Dez, 2024",
    location: "Berlim, Alemanha",
    type: "Conferência",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8EBVoljhVBZ8WptX5ZXqbDmlAiTgCgzZl5guzevfvfvk3tByIjSiuuuhEAfZvFASgZfNt6gY5wOtP1i8blQuRRfQvVWAwVmKv-kL3eDr4l3W8c8KlJQ74WSy3vTJrY-8NaRkSbR2scpCLQGATjtHr-weviFH0buwcIQyj09riaWPqyPVSijJFAyVBynNqkg_jiPJjLp-JnEsI2QQdzGQHeb9VppoeQleL7V4bS_TNScbb9Rgr5FFuQ_YfMtTd5CQ4J-SQGCDwptY",
    speakers: [
      {
        name: "Dra. Elena Rostova",
        role: "Líder de Engenharia de Sistemas Quânticos",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMDrPUrWKIpEFG5ypEoWLxn-E56Eh031zwZ9LJXqubH6Dj6Hb2Dyk33-zlxHe16fHWyP0ZE4ClN6qfevo6fI3n6iVORz5cXM0YynGKf-0HhoMVROn_zhTG391BORfTj7TILbhG3qo79HIj2JTD5xjGdMS1hFrMAlaWr6Tc33M4fZmB8KXw3-kkloCexnhVjI1m0VijGdnuwUQXuCp6Pgyj5k5PO8EsmQF47GspSVV1ghhyo1moUODhFuRKvKiejwd4wi6l-4llMZA",
        profileUrl: "#"
      },
      {
        name: "Marcus Chen",
        role: "Embaixador CNCF",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtDqe2Z7b-1l0ejRR83SuSVaZdVSb5yGw7ZqNAH2d67EwUT5YJp1pN9jQciRYQlPMbjWyfPDUGDf7NaLHooRLYMh0YK2VslejPFShw1ZWOEzpNWBkbjIrVXu5O1qe-yPGmpDOlHcJ3M8vIxygEF4SYw_3B7bAEEx3zG9EtB0Wue20Aj2GpgZWU5yQBeLSlMWcd1M9a1540XrDsSiX6-rXOcDDEqJCbbQakFrIv8CX4Hp8kaoAKFMwZHPQyY4pMP3j4o9M7_tFpwXM",
        profileUrl: "#"
      }
    ],
    agenda: [
      {
        time: "09:00",
        title: "Abertura: 10 Anos de Kubernetes",
        description: "Uma reflexão sobre uma década de orquestração e as previsões para as novas fronteiras."
      },
      {
        time: "11:30",
        title: "WASM Serverless no Kubernetes",
        description: "Eliminando o overhead de containers com camadas rápidas de execução em sandbox WebAssembly."
      }
    ],
    tickets: [
      {
        name: "Passe Gratuito",
        price: "R$ 0",
        description: "Entrada geral da comunidade",
        features: ["Acesso ao pavilhão comunitário", "Sessões gerais", "Acesso a gravações online"]
      },
      {
        name: "Passe Acesso Total",
        price: "R$ 599",
        description: "Inscrição completa na conferência",
        features: ["Acesso a todas as palestras e trilhas", "Acesso a eventos co-localizados", "Cupom de desconto no exame CNCF", "Acesso à recepção noturna"]
      }
    ]
  },
  "4": {
    id: 4,
    title: "Securing the Mesh",
    overview: "Um mergulho profundo intensivo em arquiteturas zero-trust e vulnerabilidades de service mesh. Conduzido por renomados pesquisadores de segurança.",
    longDescription: "O Securing the Mesh oferece a profissionais de infraestrutura e cibersegurança as chaves para projetar, auditar e fortalecer plataformas de service mesh como Istio e Linkerd. À medida que sistemas de microsserviços se expandem, proteger endpoints de rede entre pods distribuídos torna-se crítico. Aprenda configurações de TLS mútuo, injeções dinâmicas de políticas e auditoria de logs.",
    date: "15 de Dez, 2024",
    location: "Remoto / Online",
    type: "Workshop",
    banner: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5qBonYxQZA_u_croMM-QUayG58elrNCTSkPYS1wnoZSQjSm7uu6UuP3Q4Kgjhctq9nnYJvdZJIPwt3WBNGre66bOq-Odm_Nu6AS3tKmvgdSBrCSYYI7QnYoffUsAbH34uHmwLjMNl33FMHqqn3_F1VVUM0qH3dZ_M3ojG7PI6j83hE7B1tK6DHH1Nye5wiGlhWfYsa1iBW4lbF_dch7zfWdBdX267bgWuGDahA6GC4PekBLrVyBCX0mYVzFFIaEEOx9VAcvzkFfo",
    speakers: [
      {
        name: "Marcus Chen",
        role: "Arquiteto Principal de Segurança, Nexus",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtDqe2Z7b-1l0ejRR83SuSVaZdVSb5yGw7ZqNAH2d67EwUT5YJp1pN9jQciRYQlPMbjWyfPDUGDf7NaLHooRLYMh0YK2VslejPFShw1ZWOEzpNWBkbjIrVXu5O1qe-yPGmpDOlHcJ3M8vIxygEF4SYw_3B7bAEEx3zG9EtB0Wue20Aj2GpgZWU5yQBeLSlMWcd1M9a1540XrDsSiX6-rXOcDDEqJCbbQakFrIv8CX4Hp8kaoAKFMwZHPQyY4pMP3j4o9M7_tFpwXM",
        profileUrl: "#"
      },
      {
        name: "Sarah Jenkins",
        role: "Diretora de Operações de IA e Análise de Segurança",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN68SirWSu8BLzc2y5hjqPrXX2m-TRyL6AqsUIWOalzmEzr7zz0AeG5gz1jsFDNKwmyNiAtVEow5SzzkPdqlpuhW-igNJgG5CA-IQenwHDr0Zirk0O7vH-M3aFiXTrrWOI4_HQepge95XlE4GcONn33L8wdWGpchQMXw3Ioq8J1G2VNDgvvSE2zwccMV_kRyRmxRnbNVtCDymjD4cqSvLePRRwf3x0R5564ZS-RJZluvnqJi2AyJlnzb-ZTRtxxoNflRSwWWPpobE",
        profileUrl: "#"
      },
      {
        name: "Dra. Elena Rostova",
        role: "Líder de Pesquisa em Criptografia Quântica",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMDrPUrWKIpEFG5ypEoWLxn-E56Eh031zwZ9LJXqubH6Dj6Hb2Dyk33-zlxHe16fHWyP0ZE4ClN6qfevo6fI3n6iVORz5cXM0YynGKf-0HhoMVROn_zhTG391BORfTj7TILbhG3qo79HIj2JTD5xjGdMS1hFrMAlaWr6Tc33M4fZmB8KXw3-kkloCexnhVjI1m0VijGdnuwUQXuCp6Pgyj5k5PO8EsmQF47GspSVV1ghhyo1moUODhFuRKvKiejwd4wi6l-4llMZA",
        profileUrl: "#"
      }
    ],
    agenda: [
      {
        time: "09:00",
        title: "Abertura: Modelagem de Ameaças em Service Mesh",
        description: "Identificando vulnerabilidades nas configurações de roteamento de containers."
      },
      {
        time: "11:30",
        title: "Mutual TLS & Políticas de Segurança de Sidecars",
        description: "Como configurar perfis mTLS estritos e matrizes de autorização sem gargalos de desempenho."
      },
      {
        time: "14:00",
        title: "Workshop: Construindo Proxies Seguros",
        description: "Laboratório prático compilando filtros em Rust customizados para sidecars Envoy."
      }
    ],
    tickets: [
      {
        name: "Acesso Digital",
        price: "R$ 199",
        description: "Acesso à transmissão ao vivo do workshop",
        features: ["Transmissão ao vivo & perguntas e respostas", "Repositórios de código do workshop", "Gravações da sessão (VOD)"]
      },
      {
        name: "Acesso Pro",
        price: "R$ 499",
        description: "Inscrição prática no laboratório (sandbox)",
        features: ["Todos os recursos do Acesso Digital", "Instância de sandbox na nuvem dedicada", "Sessão de consultoria com palestrantes", "Certificado de conclusão"]
      }
    ]
  }
};

const isUUID = (str: string) => {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetail({ params }: PageProps) {
  const { id } = await params;
  let event: EventData | null = null;

  if (isUUID(id)) {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:8080';
      
      // Node by default throws on self-signed certificates (localhost SSL).
      // We will allow unauthorized connections for local debugging if using https.
      if (apiUrl.startsWith('https://localhost')) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      }

      const res = await fetch(`${apiUrl}/api/event/${id}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        
        let dateStr = "A definir";
        if (data.date) {
          const d = new Date(data.date);
          dateStr = d.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        event = {
          id: data.id,
          title: data.title || "Evento Sem Título",
          overview: data.description ? data.description.substring(0, 150) + "..." : "Descrição não disponível.",
          longDescription: data.description || "Nenhuma descrição fornecida.",
          date: dateStr,
          location: data.city ? `${data.city}, ${data.uf || ''}` : "Remoto",
          type: data.city ? "Presencial" : "Online",
          banner: data.imgUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
          speakers: data.speakers && data.speakers.length > 0 ? data.speakers : [
            {
              name: "Marcus Chen",
              role: "Arquiteto Principal",
              image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAtDqe2Z7b-1l0ejRR83SuSVaZdVSb5yGw7ZqNAH2d67EwUT5YJp1pN9jQciRYQlPMbjWyfPDUGDf7NaLHooRLYMh0YK2VslejPFShw1ZWOEzpNWBkbjIrVXu5O1qe-yPGmpDOlHcJ3M8vIxygEF4SYw_3B7bAEEx3zG9EtB0Wue20Aj2GpgZWU5yQBeLSlMWcd1M9a1540XrDsSiX6-rXOcDDEqJCbbQakFrIv8CX4Hp8kaoAKFMwZHPQyY4pMP3j4o9M7_tFpwXM",
              profileUrl: data.eventUrl || "#"
            }
          ],
          agenda: data.agenda && data.agenda.length > 0 ? data.agenda : [
            {
              time: "09:00",
              title: "Introdução e Abertura",
              description: "Sessão de abertura apresentando os destaques do evento e palestrantes."
            },
            {
              time: "14:00",
              title: "Apresentações Técnicas e Demos",
              description: "Workshops aprofundados, demonstrações práticas e perguntas ao vivo."
            }
          ],
          tickets: [
            {
              name: "Ingresso Padrão",
              price: data.price !== undefined && data.price !== null ? (data.price === 0 ? "Grátis" : `R$ ${Number(data.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`) : "Grátis",
              description: "Acesso geral ao evento",
              features: ["Acesso aos palcos principais", "Portal online do evento", "Certificado de participação"]
            }
          ]
        };

        if (data.coupons && data.coupons.length > 0) {
          data.coupons.forEach((coupon: any) => {
            event?.tickets.push({
              name: `Cupom de Desconto: ${coupon.code}`,
              price: `-${coupon.discount}%`,
              description: `Válido até ${new Date(coupon.valid).toLocaleDateString('pt-BR')}`,
              features: ["Taxa de desconto especial", "Privilégios de acesso padrão"]
            });
          });
        }
      }
    } catch (err) {
      console.warn("Failed to load backend event, falling back to mock event", err);
    }
  }

  // Fallback to MOCK data if not loaded/not found in database
  if (!event) {
    event = EVENTS_DB[id];
  }

  if (!event) {
    notFound();
  }

  return (
    <>
      {/* Hero Header */}
      <section className="relative w-full h-[600px] mb-xxl mt-[-80px]">
        <div className="absolute inset-0 z-0">
          <ClientImage 
            alt={event.title} 
            className="w-full h-full object-cover" 
            src={event.banner || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"} 
            fallbackSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto h-full flex flex-col justify-end px-lg pb-xl">
          <div className="flex gap-sm mb-md">
            <span className="bg-primary-fixed-dim/90 text-on-primary-fixed font-label-sm text-label-sm px-sm py-xs rounded-DEFAULT uppercase tracking-wider font-bold">
              {event.type}
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-white mb-sm">{event.title}</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {event.overview}
          </p>
          <div className="flex items-center gap-lg mt-md font-label-sm text-label-sm text-on-surface-variant">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-container-max mx-auto px-lg grid grid-cols-1 lg:grid-cols-12 gap-xl mb-xxl">
        {/* Left Column: Details, Speakers, Schedule */}
        <div className="lg:col-span-8 space-y-xxl">
          {/* Description */}
          <section>
            <h2 className="font-headline-xl text-headline-xl mb-lg text-glow">Visão Geral do Evento</h2>
            <div className="font-body-md text-body-md text-on-surface-variant space-y-md">
              <p>{event.longDescription}</p>
            </div>
          </section>

          {/* Speakers Bento Grid */}
          <section>
            <h2 className="font-headline-xl text-headline-xl mb-lg text-glow">Palestrantes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="glass-panel rounded-xl p-md flex flex-col items-center text-center transition-all duration-300 hover:border-primary-fixed-dim hover:shadow-[inset_0_0_10px_rgba(0,219,231,0.2)]">
                  <img alt={speaker.name} className="w-24 h-24 rounded-full mb-md object-cover border-2 border-white/10" src={speaker.image} />
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">{speaker.name}</h3>
                  <p className="font-label-sm text-label-sm text-primary-fixed-dim mb-md">{speaker.role}</p>
                  <div className="flex gap-sm">
                    <a href={speaker.profileUrl} aria-label={`View profile for ${speaker.name}`} className="material-symbols-outlined text-on-surface-variant hover:text-primary-fixed-dim transition-colors text-[20px] focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim rounded">link</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Schedule Timeline */}
          <section>
            <h2 className="font-headline-xl text-headline-xl mb-lg text-glow">Programação</h2>
            <div className="glass-panel rounded-xl p-lg space-y-lg border-l-4 border-l-primary-fixed-dim">
              {event.agenda.map((item, index) => (
                <div key={index} className="relative pl-md pb-md border-b border-white/10 last:border-0 last:pb-0">
                  <div className={`absolute left-[-26px] top-1 w-3 h-3 rounded-full ${index === 0 ? "bg-primary-fixed-dim shadow-[0_0_8px_rgba(0,219,231,0.8)]" : "bg-surface-variant border border-primary-fixed-dim"}`}></div>
                  <div className="flex flex-col md:flex-row md:items-baseline gap-sm mb-xs">
                    <span className={`font-label-sm text-label-sm w-24 ${index === 0 ? "text-primary-fixed-dim" : "text-on-surface-variant"}`}>{item.time}</span>
                    <h4 className="font-headline-md text-headline-md text-on-surface">{item.title}</h4>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant ml-0 md:ml-[104px]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Ticket Widget */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 space-y-md">
            <h3 className="font-headline-xl text-headline-xl mb-md text-glow">Inscrição</h3>
            
            {event.tickets.map((tier, index) => (
              <div key={index} className={`glass-panel rounded-xl p-lg transition-all duration-300 hover:border-primary-fixed-dim hover:shadow-[inset_0_0_10px_rgba(0,219,231,0.2)] ${
                index === 1 ? "border-primary-fixed-dim shadow-[0_0_15px_rgba(0,219,231,0.1)] relative overflow-hidden" : ""
              }`}>
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-primary-fixed-dim text-on-primary-fixed px-sm py-xs font-label-sm text-[10px] rounded-bl-lg font-bold">POPULAR</div>
                )}
                <div className="flex justify-between items-start mb-sm">
                  <div>
                    <h4 className={`font-headline-md text-headline-md ${index === 1 ? "text-primary-fixed-dim" : "text-on-surface"}`}>{tier.name}</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">{tier.description}</p>
                  </div>
                  <span className="font-headline-md text-headline-md text-white">{tier.price}</span>
                </div>
                <ul className="font-body-md text-body-md text-on-surface-variant space-y-sm mb-lg mt-md">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-sm">
                      <span className="material-symbols-outlined text-[16px] text-primary-fixed-dim">check</span> 
                      {feature}
                    </li>
                  ))}
                </ul>
                <button type="button" className={`w-full py-sm rounded-DEFAULT transition-colors focus:outline-none focus:ring-2 ${
                  index === 1 
                    ? "bg-primary-fixed-dim text-on-primary-fixed-variant font-label-sm text-label-sm hover:bg-primary-fixed focus:ring-primary-fixed"
                    : "bg-surface-variant border border-white/20 text-on-surface font-label-sm text-label-sm hover:border-primary-fixed-dim hover:text-primary-fixed-dim focus:ring-primary-fixed-dim"
                }`}>
                  {index === 1 ? "Inscreva-se Agora" : "Selecionar Ingresso"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
