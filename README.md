# Eventos-Tec 🚀
O **Eventos-Tec** é uma plataforma moderna e premium para descoberta de eventos de tecnologia, palestras, summits e hackathons. Focada em **High-End UI**, performance e segurança, a aplicação oferece uma experiência imersiva para o usuário final através de um design minimalista, Dark Mode nativo e animações fluidas.
## 🎯 Principais Recursos
* **High-End UI & Glassmorphism:** Design sofisticado com componentes translúcidos, bordas iluminadas (glow) e feedback visual interativo.
* **Sistema de Navegação Dinâmico:** Roteamento de alta performance para áreas como Explorar, Sobre, Documentação, Privacidade e Suporte.
* **Segurança Robusta (AppSec):** 
  * Middleware integrado de segurança.
  * Content Security Policy (CSP) severo para mitigar XSS.
  * Proteção de cabeçalhos HTTP (Strict-Transport-Security, X-Frame-Options, etc).
  * Route Guards impedindo acesso a áreas restritas (ex: `/admin`) para usuários não autenticados.
* **Integração Real-Time:** Fetch dinâmico do backend para alimentar a vitrine de eventos sem a dependência de dados estáticos falsos (Mocks).
## 🛠️ Stack Tecnológico
A aplicação foi construída visando o estado-da-arte do desenvolvimento frontend moderno:
* **Framework:** [Next.js (App Router)](https://nextjs.org/) + React
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animações:** [Framer Motion](https://www.framer.com/motion/)
* **Ícones:** Google Material Symbols
## 📦 Estrutura do Projeto
```text
src/
├── app/                  # Rotas do Next.js App Router
│   ├── admin/            # Painel Administrativo (Rota Protegida)
│   ├── contact/          # Página de Fale Conosco
│   ├── docs/             # Página de Documentação
│   ├── explore/          # Página de Busca e Filtros de Eventos
│   ├── privacy/          # Política de Privacidade
│   ├── support/          # Suporte e FAQ
│   ├── layout.tsx        # Layout raiz e Navbar/Footer globais
│   └── page.tsx          # Landing Page (Home)
├── components/           # Componentes React reutilizáveis (Layouts, UI, etc)
└── middleware.ts         # Middleware de segurança e rotas do Next.js
```
## 🚀 Como Executar o Projeto Localmente
### Pré-requisitos
* Node.js (v18 ou superior recomendado)
* npm, yarn, pnpm ou bun
### 1. Clonar o Repositório e Instalar Dependências
```bash
git clone https://github.com/teusluv/Eventos-Tec.git
cd Eventos-Tec
npm install
```
### 2. Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto contendo a URL do seu backend. Se não for informada, o sistema tentará buscar no localhost padrão:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```
### 3. Rodar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação rodando.
## 🔒 Considerações de Segurança (Handoff)
A aplicação foi entregue pronta para produção com uma barreira central no `middleware.ts`. Ao fazer o deploy (na Vercel, AWS, etc):
1. Confirme se as rotas da API no seu CSP batem com o seu domínio real de produção.
2. Certifique-se de preencher a variável `NEXT_PUBLIC_API_URL` nos painéis de variáveis de ambiente da sua hospedagem.
---
*Desenvolvido com padrão de Elite para máxima conversão e usabilidade.*
