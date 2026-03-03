# Luís Miguel Furlanetto Sousa — Portfólio

Portfólio pessoal desenvolvido com **Next.js 15**, **React 19**, **TypeScript** e **Tailwind CSS**, com foco em interatividade, performance e design inspirado em terminais e editores de código.

> **[lmfs.netlify.app](https://lmfs.netlify.app)**

---

## Sobre Mim

Desenvolvedor de Software com experiência em **Java** no backend, **React** e **React Native** no frontend. Atuo no desenvolvimento de funcionalidades com foco em performance, usabilidade e qualidade, aplicando refatoração, TDD e otimização contínua para garantir código escalável e de fácil manutenção. Vivência em APIs RESTful, automação de processos com Camunda BPM, Docker e práticas de CI/CD.

---

## Experiência Profissional

### UAN — Desenvolvedor Full Stack (04/2025 - Atual)

Desenvolvimento e manutenção do sistema **iGED**, plataforma corporativa de gestão de documentos:

- Desenvolvimento de funcionalidades com foco em performance e usabilidade (Java no backend e React no frontend)
- Refatoração e otimização de código, garantindo legibilidade, reutilização e fácil manutenção
- Correção de bugs e análise de erros em produção, assegurando estabilidade e confiabilidade
- Integração e automação de processos com **Camunda BPM**, otimizando fluxos de trabalho
- Criação e manutenção de **APIs RESTful** para integração com sistemas e serviços externos
- Uso de **Docker** para padronização de ambientes e implementação de práticas de **CI/CD**

### Freelancer — Desenvolvedor Mobile (2025)

Desenvolvimento do aplicativo mobile **iGED App** (React Native + Expo + TypeScript):

- Aplicativo multiplataforma (iOS/Android) com navegação hierárquica de pastas e visualização de PDFs
- Autenticação via QR Code utilizando **OAuth 2.0 Device Flow** com Keycloak
- Integração com **ClickSign** para assinatura digital de documentos
- Push notifications em tempo real (Firebase/APNs) e scanner de documentos nativo
- Suporte a múltiplos idiomas (i18n) e sincronização offline com fila de operações
- Arquitetura baseada em custom hooks, service-layer e tipagem estrita com TypeScript

---

## Seções do Portfólio

| Seção | Descrição |
|-------|-----------|
| **Hero** | Apresentação com animação de partículas em canvas e links sociais |
| **Experiência** | Timeline interativa com histórico profissional |
| **Projetos** | Cards no formato JSON com detalhes expandíveis e filtros por categoria |
| **Tech Stack** | Habilidades técnicas organizadas por categoria com filtros |
| **Terminal** | Terminal interativo com comandos simulados (whoami, cat, ls) |
| **Contato** | Formulário estilizado como editor de código com validação e segurança |
| **Easter Eggs** | Funcionalidades ocultas (Konami Code, console backend com tecla '>') |

---

## Tech Stack

### Linguagens
Java, TypeScript

### Frameworks & Bibliotecas
React, React Native, Expo, Node.js, Tailwind CSS, Next.js

### Banco de Dados
DynamoDB, MongoDB, MySQL, SQL Server, Oracle

### Metodologias & Práticas
Scrum, Kanban, TDD

---

## Stack do Portfólio

| Tecnologia | Uso |
|------------|-----|
| **Next.js 15** | Framework React com App Router |
| **React 19** | Biblioteca de UI |
| **TypeScript 5** | Tipagem estática |
| **Tailwind CSS** | Estilização utility-first |
| **Framer Motion** | Animações e transições |
| **Shadcn/UI** | Componentes de interface (Radix UI) |
| **React Hook Form + Zod** | Formulários com validação |
| **Lucide React** | Iconografia |
| **React Scroll** | Navegação suave entre seções |

---

## Executando Localmente

```bash
# Clonar o repositório
git clone https://github.com/LuisMIguelFurlanettoSousa/myPortfolio.git

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia o servidor de produção |
| `npm run lint` | Executa o linter |

---

## Estrutura do Projeto

```
├── app/
│   ├── components/        # Componentes das seções do portfólio
│   │   ├── hero.tsx
│   │   ├── work-experience.tsx
│   │   ├── portfolio.tsx
│   │   ├── tech-stack.tsx
│   │   ├── terminal.tsx
│   │   ├── contact.tsx
│   │   ├── easter-eggs.tsx
│   │   └── footer.tsx
│   ├── layout.tsx         # Layout raiz com headers de segurança
│   └── page.tsx           # Página principal
├── components/
│   └── ui/                # Componentes Shadcn/UI
├── hooks/                 # Custom hooks
├── lib/                   # Utilitários
├── styles/                # Estilos globais
└── public/                # Assets estáticos
```

---

## Segurança

O portfólio implementa boas práticas de segurança:

- **Content-Security-Policy (CSP)** para prevenção de XSS e injeção de scripts
- **Validação de entrada** com Zod nos formulários
- **Honeypot field** para detecção de bots
- **Sanitização de inputs** contra caracteres maliciosos
- **Headers de segurança**: X-XSS-Protection, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

---

## Contato

- **Email:** lfurlanettosousa@gmail.com
- **LinkedIn:** [luis-miguel-furlanetto-sousa](https://linkedin.com/in/luis-miguel-furlanetto-sousa)
- **GitHub:** [LuisMIguelFurlanettoSousa](https://github.com/LuisMIguelFurlanettoSousa)
- **WhatsApp:** [(34) 99723-7900](https://wa.me/5534997237900)

---

## Idiomas

Português (nativo) | Inglês (intermediário)
