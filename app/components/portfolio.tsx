'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronRight, ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'

type ProjectTab = 'description' | 'code' | 'stack' | 'structure'

interface ProjectFile {
  name: string
  type: 'file' | 'folder'
  children?: ProjectFile[]
  expanded?: boolean
}

interface ProjectEndpoint {
  method: string
  route: string
  description?: string
}

interface Project {
  id: number
  title: string
  category: string
  year: string
  description: string
  longDescription: string
  tags: string[]
  repository?: string
  status: '🟢 online' | '🟡 GitHub' | '🔴 offline' | '🟣 development'
  endpoints?: ProjectEndpoint[]
}

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({})

  const categories = ['all', 'backend', 'frontend', 'fullstack']

  const works: Project[] = [
    {
      id: 1,
      title: 'FirstApi',
      category: 'backend',
      year: '2023',
      description: 'API de autenticação com JWT, bcrypt e MongoDB',
      longDescription: `Este projeto implementa um sistema completo de autenticação de usuários com recursos de segurança modernos.
      
Características principais:
- Registro e login de usuários
- Autenticação baseada em tokens JWT
- Senhas criptografadas com Bcrypt
- Proteção contra ataques de força bruta
- Renovação automática de tokens
- Rotas protegidas por middleware de autenticação`,
      tags: ['Node.js', 'Express', 'JWT', 'Bcrypt', 'MongoDB'],
      repository: 'https://github.com/LuisMIguelFurlanettoSousa/FirstApi',
      status: '🟡 GitHub',
      endpoints: [
        {
          method: 'POST',
          route: '/register',
          description: 'Registra um novo usuário',
        },
        {
          method: 'POST',
          route: '/login',
          description: 'Autentica um usuário e retorna um token JWT',
        },
        {
          method: 'GET',
          route: '/Private',
          description: ' Acessível apenas para usuários autenticados',
        },
      ],
    },
    {
      id: 2,
      title: 'TripleWinSlots',
      category: 'fullstack',
      year: '2023',
      description:
        'Jogo de caça-níquel interativo com animações de rolos girando e verificação de vitórias',
      longDescription: `Um jogo de caça-níquel desenvolvido com interface gráfica interativa e sistema de apostas.
      
Características principais:
- Interface gráfica com animações de rolos girando
- Sistema de apostas e cálculo de ganhos
- Diferentes combinações de símbolos e prêmios
- Sistema de persistência de saldo do jogador
- Estatísticas de jogadas e ganhos`,
      tags: ['JavaScript', 'Next', 'React', 'Python', 'Tailwind'],
      repository: 'https://github.com/LuisMIguelFurlanettoSousa/slot-machine',
      status: '🟡 GitHub',
    },
    {
      id: 3,
      title: 'Beecrowd',
      category: 'backend',
      year: '2024',
      description: 'Resolução de exercicios de maratona de programação',
      longDescription: `Como parte da minha preparação para maratonas de programação e para fortalecer minha lógica de programação, resolvi diversos exercícios da plataforma Beecrowd utilizando Python. O projeto reúne soluções para problemas de diferentes níveis de dificuldade, com foco em algoritmos, estruturas de dados e eficiência na resolução.

Características principais:
-Prática constante de lógica de programação
-Soluções para problemas de diferentes níveis de dificuldade
-Uso de algoritmos clássicos e estruturas de dados
-Código limpo, bem comentado e organizado por categoria
-Foco em desempenho e clareza na resolução dos problemas`,
      tags: ['Python'],
      repository: 'https://github.com/LuisMIguelFurlanettoSousa/Beecrowd',
      status: '🟡 GitHub',
    },
    {
      id: 4,
      title: 'NepsAcademy',
      category: 'backend',
      year: '2023',
      description:
        'Resoluções de exercícios da Neps Academy em Python, com foco em lógica, algoritmos e boas práticas',
      longDescription: `Como parte do meu aprendizado contínuo em programação e desenvolvimento de algoritmos, resolvi diversos exercícios da plataforma Neps Academy utilizando Python. Este projeto tem como objetivo consolidar meus conhecimentos em lógica, estruturas de dados e resolução eficiente de problemas, servindo também como um repositório de consulta e evolução pessoal.

Características principais:

-Prática contínua de lógica de programação e algoritmos
-Exercícios organizados por tema e nível de dificuldade
-Implementações com foco em clareza, eficiência e boas práticas
-Utilização de estruturas de dados e técnicas de resolução de problemas
-Código limpo, comentado e de fácil compreensão para revisão e aprendizado`,
      tags: ['Python'],
      repository: 'https://github.com/LuisMIguelFurlanettoSousa/NepsAcademy',
      status: '🟡 GitHub',
    },
    {
      id: 5,
      title: 'Gerador de Senhas',
      category: 'backend',
      year: '2023',
      description: 'Gerador de senhas seguro em C com menu interativo.',
      longDescription: `Como parte da minha prática com a linguagem C e com o objetivo de consolidar conhecimentos sobre vetores, strings, funções e estruturas básicas, desenvolvi um gerador e gerenciador de senhas via terminal. O projeto permite a criação de senhas seguras com base em critérios definidos pelo usuário, sendo ideal para o estudo de manipulação de dados, entrada/saída e lógica de programação em C.

Características principais:

-Geração de senhas personalizadas com diferentes critérios de complexidade
-Armazenamento de até 5 senhas com nomes personalizados
-Menu interativo no terminal com funcionalidades simples e intuitivas
-Manipulação de strings, vetores e estruturas básicas em C
-Código comentado, funcional e voltado para prática de fundamentos da linguagem`,
      tags: ['C'],
      repository:
        'https://github.com/LuisMIguelFurlanettoSousa/GeradorDeSenhas.git',
      status: '🟡 GitHub',
    },
    {
      id: 6,
      title: 'myPortfolio',
      category: 'frontend',
      year: '2024',
      description:
        'Portfolio pessoal com design terminal-style, animações e easter eggs interativos',
      longDescription: `Este é o próprio site que você está navegando agora! Um portfolio pessoal desenvolvido com Next.js e React, apresentando um design inspirado em terminais de comando e interfaces de programação.
      
Características principais:
- Design inspirado em terminais e IDEs de programação
- Animações suaves e interativas usando Framer Motion
- Terminal funcional com comandos personalizados
- Visualização de projetos em formato JSON
- Easter eggs escondidos e recursos interativos
- Seção de tecnologias com categorização
- Design totalmente responsivo
- Formulário de contato estilizado como editor de código`,
      tags: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Shadcn/UI',
      ],
      repository:
        'https://github.com/LuisMIguelFurlanettoSousa/myPortfolio/tree/master',
      status: '🟢 online',
    },
  ]

  const filteredWorks = works.filter((work) =>
    selectedCategory === 'all' ? true : work.category === selectedCategory
  )

  const toggleFolder = (path: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [path]: !prev[path],
    }))
  }

  const renderFileTree = (files: ProjectFile[], basePath = '') => {
    return (
      <ul className="pl-4">
        {files.map((file, index) => {
          const path = `${basePath}/${file.name}`
          const isExpanded = expandedFolders[path]

          return (
            <li key={index} className="py-1">
              {file.type === 'folder' ? (
                <div>
                  <button
                    onClick={() => toggleFolder(path)}
                    className="flex items-center text-left hover:text-blue-400 transition-colors"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 mr-1 text-zinc-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 mr-1 text-zinc-400" />
                    )}
                    <span className="text-yellow-300 mr-1">📂</span>
                    <span>{file.name}</span>
                  </button>
                  {isExpanded &&
                    file.children &&
                    renderFileTree(file.children, path)}
                </div>
              ) : (
                <div className="flex items-center pl-5">
                  <span className="text-blue-300 mr-1">📝</span>
                  <span className="text-zinc-300">{file.name}</span>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  }

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET':
        return 'text-green-400'
      case 'POST':
        return 'text-blue-400'
      case 'PUT':
        return 'text-amber-400'
      case 'DELETE':
        return 'text-red-400'
      default:
        return 'text-purple-400'
    }
  }

  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4 font-mono">
            <span className="text-[#569cd6]">const</span>{' '}
            <span className="text-[#4ec9b0]">projects</span>{' '}
            <span className="text-white">=</span>{' '}
            <span className="text-[#dcdcaa]">getProjects</span>
            <span className="text-white">();</span>
          </h2>
          <p className="text-zinc-400 font-mono">
            // Clique nos projetos para mais detalhes
          </p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm capitalize ${
                selectedCategory === category
                  ? 'bg-[#007acc] hover:bg-[#0062a3] text-white'
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-1 lg:grid-cols-2 auto-rows-fr"
        >
          <AnimatePresence>
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="overflow-hidden bg-zinc-900 cursor-pointer hover:border-blue-500 transition-colors h-[320px]">
                      <CardContent className="p-6 font-mono h-full flex flex-col">
                        <pre className="text-sm whitespace-pre-wrap flex-1 overflow-hidden">
                          <code>
                            <span className="text-zinc-400">{'{'}</span>
                            <div className="pl-4">
                              <span className="text-[#9cdcfe]">"project"</span>
                              <span className="text-zinc-400">: </span>
                              <span className="text-[#ce9178]">
                                "{work.title}"
                              </span>
                              <span className="text-zinc-400">,</span>
                            </div>
                            <div className="pl-4">
                              <span className="text-[#9cdcfe]">
                                "description"
                              </span>
                              <span className="text-zinc-400">: </span>
                              <span className="text-[#ce9178]">
                                "
                                {work.description.length > 60
                                  ? work.description.substring(0, 60) + '...'
                                  : work.description}
                                "
                              </span>
                              <span className="text-zinc-400">,</span>
                            </div>
                            <div className="pl-4">
                              <span className="text-[#9cdcfe]">
                                "techStack"
                              </span>
                              <span className="text-zinc-400">: [</span>
                              <span className="text-[#ce9178]">
                                "{work.tags.slice(0, 3).join('", "')}
                                {work.tags.length > 3 ? '", ...' : '"'}
                              </span>
                              <span className="text-zinc-400">]</span>
                              <span className="text-zinc-400">,</span>
                            </div>
                            <div className="pl-4">
                              <span className="text-[#9cdcfe]">
                                "repository"
                              </span>
                              <span className="text-zinc-400">: </span>
                              <span className="text-[#ce9178]">
                                "
                                {work.repository ? 'github.com/...' : 'private'}
                                "
                              </span>
                              <span className="text-zinc-400">,</span>
                            </div>
                            <div className="pl-4">
                              <span className="text-[#9cdcfe]">"status"</span>
                              <span className="text-zinc-400">: </span>
                              <span className="text-[#ce9178]">
                                "{work.status}"
                              </span>
                            </div>
                            {work.endpoints && (
                              <div className="pl-4">
                                <span className="text-[#9cdcfe]">
                                  "endpoints"
                                </span>
                                <span className="text-zinc-400">: [</span>
                                <div className="pl-4">
                                  {work.endpoints
                                    .slice(0, 2)
                                    .map((endpoint, i) => (
                                      <div key={i}>
                                        <span className="text-zinc-400">
                                          {'{'}
                                        </span>
                                        <span className="text-[#9cdcfe]">
                                          "method"
                                        </span>
                                        <span className="text-zinc-400">
                                          :{' '}
                                        </span>
                                        <span
                                          className={`${getMethodColor(
                                            endpoint.method
                                          )}`}
                                        >
                                          "{endpoint.method}"
                                        </span>
                                        <span className="text-zinc-400">
                                          ,{' '}
                                        </span>
                                        <span className="text-[#9cdcfe]">
                                          "route"
                                        </span>
                                        <span className="text-zinc-400">
                                          :{' '}
                                        </span>
                                        <span className="text-[#ce9178]">
                                          "{endpoint.route}"
                                        </span>
                                        <span className="text-zinc-400">
                                          {'}'}
                                        </span>
                                      </div>
                                    ))}
                                  {work.endpoints.length > 2 && (
                                    <div>
                                      <span className="text-zinc-400">
                                        // + {work.endpoints.length - 2} more...
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <span className="text-zinc-400">]</span>
                              </div>
                            )}
                            <span className="text-zinc-400">{'}'}</span>
                          </code>
                        </pre>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[900px] bg-zinc-900 border-zinc-700 text-white p-0 max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="px-6 pt-6 pb-2 flex flex-row items-center justify-between">
                      <DialogTitle className="text-2xl font-bold text-white">
                        {work.title}
                      </DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="description" className="w-full">
                      <div className="border-b border-zinc-700">
                        <TabsList className="bg-zinc-800 w-full justify-start rounded-none px-6">
                          <TabsTrigger
                            value="description"
                            className="data-[state=active]:bg-zinc-700"
                          >
                            Descrição
                          </TabsTrigger>
                          {work.endpoints && (
                            <TabsTrigger
                              value="endpoints"
                              className="data-[state=active]:bg-zinc-700"
                            >
                              Endpoints
                            </TabsTrigger>
                          )}
                        </TabsList>
                      </div>

                      <div className="p-6">
                        <TabsContent value="description" className="mt-0">
                          <div className="flex flex-col gap-6">
                            <div>
                              <h3 className="text-xl font-semibold mb-4">
                                Sobre o Projeto
                              </h3>
                              <p className="text-zinc-300 whitespace-pre-line">
                                {work.longDescription}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-lg font-medium mb-3">
                                Tecnologias
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {work.tags.map((tag, index) => (
                                  <span
                                    key={index}
                                    className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between flex-wrap gap-4">
                              <div>
                                <h4 className="text-lg font-medium mb-1">
                                  Status
                                </h4>
                                <span className="text-lg">{work.status}</span>
                              </div>
                              {work.repository && (
                                <a
                                  href={work.repository}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors"
                                >
                                  <Github className="h-4 w-4" />
                                  <span>Ver Repositório</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        </TabsContent>
                        {work.endpoints && (
                          <TabsContent value="endpoints" className="mt-0">
                            <div className="flex flex-col gap-4">
                              <h3 className="text-xl font-semibold">
                                API Endpoints
                              </h3>
                              <div className="bg-zinc-950 rounded-lg overflow-hidden">
                                <div className="bg-zinc-800 px-4 py-2 text-sm font-mono border-b border-zinc-700">
                                  <span>Endpoints disponíveis</span>
                                </div>
                                <div className="p-4 overflow-x-auto">
                                  <table className="w-full border-collapse">
                                    <thead>
                                      <tr className="border-b border-zinc-800">
                                        <th className="text-left py-2 px-4 text-zinc-400">
                                          Método
                                        </th>
                                        <th className="text-left py-2 px-4 text-zinc-400">
                                          Rota
                                        </th>
                                        <th className="text-left py-2 px-4 text-zinc-400">
                                          Descrição
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {work.endpoints.map((endpoint, index) => (
                                        <tr
                                          key={index}
                                          className="border-b border-zinc-800 hover:bg-zinc-900"
                                        >
                                          <td className="py-2 px-4">
                                            <span
                                              className={`font-bold ${getMethodColor(
                                                endpoint.method
                                              )}`}
                                            >
                                              {endpoint.method}
                                            </span>
                                          </td>
                                          <td className="py-2 px-4 font-mono text-zinc-300">
                                            {endpoint.route}
                                          </td>
                                          <td className="py-2 px-4 text-zinc-400">
                                            {endpoint.description || '—'}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        )}
                      </div>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
