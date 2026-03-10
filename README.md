<div align="center">

# `> luís-miguel.dev`

**Portfólio interativo com design de terminal — construído com Next.js 15, React 19 e TypeScript.**

[![Deploy Status](https://img.shields.io/netlify/your-site-id?label=deploy&logo=netlify&logoColor=white)](https://lmfs.netlify.app)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

<br />

[**Ver ao Vivo**](https://lmfs.netlify.app) · [**Reportar Bug**](https://github.com/LuisMIguelFurlanettoSousa/myPortfolio/issues/new?template=bug_report.md) · [**Sugerir Feature**](https://github.com/LuisMIguelFurlanettoSousa/myPortfolio/issues/new?template=feature_request.md)

</div>

---

## Features

- **Hero com Partículas** — animação em canvas com efeito de partículas interativas
- **Timeline Profissional** — experiência de trabalho em formato de timeline interativa
- **Projetos em JSON** — cards de projetos estilizados como objetos JSON com filtros por categoria
- **Tech Stack Filtável** — habilidades técnicas organizadas e filtráveis por categoria
- **Terminal Interativo** — simula um terminal real com comandos (`whoami`, `cat`, `ls`)
- **Formulário Code-Editor** — contato estilizado como editor de código com validação Zod
- **Easter Eggs** — Konami Code e console backend secreto (tecla `>`)
- **Dark Theme** — design inspirado em terminais e editores de código
- **Segurança** — CSP, honeypot, sanitização de inputs e headers de segurança
- **Responsivo** — adaptado para todas as resoluções de tela

---

## Quick Start

```bash
git clone https://github.com/LuisMIguelFurlanettoSousa/myPortfolio.git
cd myPortfolio
npm install
npm run dev
```

Acesse [localhost:3000](http://localhost:3000).

---

## Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| [Next.js](https://nextjs.org/) | 15 | Framework React com App Router |
| [React](https://react.dev/) | 19 | Biblioteca de UI |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4 | Estilização utility-first |
| [Framer Motion](https://motion.dev/) | latest | Animações e transições |
| [Shadcn/UI](https://ui.shadcn.com/) | — | Componentes acessíveis (Radix UI) |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | latest | Formulários com validação |
| [Lucide React](https://lucide.dev/) | — | Ícones |

---

## Estrutura do Projeto

```
app/
├── components/          # Seções do portfólio
│   ├── hero.tsx         # Partículas + apresentação
│   ├── work-experience.tsx  # Timeline profissional
│   ├── portfolio.tsx    # Projetos em JSON
│   ├── tech-stack.tsx   # Skills filtráveis
│   ├── terminal.tsx     # Terminal interativo
│   ├── contact.tsx      # Formulário estilizado
│   ├── easter-eggs.tsx  # Funcionalidades ocultas
│   └── footer.tsx
├── layout.tsx           # Layout + headers de segurança
├── page.tsx             # Página principal
└── globals.css
components/ui/           # Shadcn/UI components
hooks/                   # Custom hooks
lib/                     # Utilitários
public/                  # Assets estáticos
```

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Linter |

---

## Segurança

- **Content-Security-Policy (CSP)** — prevenção de XSS e injeção de scripts
- **Validação com Zod** — validação de schema nos formulários
- **Honeypot** — detecção de bots no formulário de contato
- **Sanitização** — proteção contra caracteres maliciosos
- **Headers** — X-XSS-Protection, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

---

## Contribuindo

Contribuições são bem-vindas! Leia o [guia de contribuição](./CONTRIBUTING.md) para começar.

---

## Contato

| Canal | Link |
|-------|------|
| Email | lfurlanettosousa@gmail.com |
| LinkedIn | [luis-miguel-furlanetto-sousa](https://linkedin.com/in/luis-miguel-furlanetto-sousa) |
| GitHub | [LuisMIguelFurlanettoSousa](https://github.com/LuisMIguelFurlanettoSousa) |

---

## Licença

Distribuído sob a licença MIT. Veja [LICENSE](./LICENSE) para mais detalhes.

---

<div align="center">

Se este projeto foi útil, considere dar uma **star**!

</div>
