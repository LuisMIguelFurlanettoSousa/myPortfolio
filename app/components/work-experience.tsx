'use client'

import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

interface Experience {
  id: string
  company: string
  position: string
  period: string
  description: string
  technologies: string[]
  isActive?: boolean
  achievements?: string[]
}

const experiences: Experience[] = [
  {
    id: '1',
    company: 'uan',
    position: 'Desenvolvedor Full Stack',
    period: '2025 - Atual',
    description:
      'Atuo no desenvolvimento e manutenção do sistema iGED, uma plataforma robusta que demanda alta escalabilidade e eficiência.',
    technologies: [
      'Java',
      'Spring Boot',
      'React.js',
      'TypeScript',
      'Jest',
      'Docker',
      'Camunda BPM',
      'JSON',
    ],
    isActive: true,
    achievements: [
      'Desenvolvimento e evolução de funcionalidades com foco em performance, usabilidade e experiência do usuário',
      'Refatoração e otimização contínua do código, promovendo legibilidade, reutilização e facilidade de manutenção',
      'Correção de bugs e análise de erros, garantindo a estabilidade e confiabilidade do sistema em produção',
      'Integração e automação de processos com Camunda BPM, otimizando fluxos de trabalho e melhorando a eficiência operacional',
      'Criação e manutenção de APIs RESTful, possibilitando integração fluida com outros sistemas e serviços',
      'Uso de contêineres Docker para padronização de ambientes e consistência entre desenvolvimento e produção',
      'Implementação de práticas de CI/CD, testes automatizados com Jest e integração contínua para entregas rápidas e seguras',
    ],
  },
  {
    id: '2',
    company: 'Fazendao Agropecuaria',
    position: 'Vendedor',
    period: '2020 - 2025',
    description:
      'Vendedor Consultivo | Loja de Agropecuária. Como vendedor em uma loja de agropecuária, minha missão é entender as necessidades específicas de cada cliente e oferecer soluções personalizadas que melhorem sua produtividade no campo.',
    technologies: ['Persuasão', 'Negociação', 'Gestão de Vendas'],
    achievements: [
      'Atendimento consultivo personalizado para produtores rurais e pecuaristas',
      'Análise de necessidades específicas de cada propriedade rural',
      'Recomendação de produtos e soluções que otimizam a produtividade no campo',
      'Desenvolvimento de relacionamento duradouro com clientes',
      'Acompanhamento pós-venda para garantir satisfação e resultados',
    ],
  },
]

export default function WorkExperience() {
  return (
    <section id="experience" className="min-h-screen py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="space-y-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold font-mono">
                <span className="text-[#569cd6]">const</span>{' '}
                <span className="text-[#4ec9b0]">Experience</span>{' '}
                <span className="text-white">=</span>{' '}
                <span className="text-[#dcdcaa]">getExperience</span>
                <span className="text-white">();</span>
              </h2>
            </motion.div>

            <motion.div
              className="inline-block text-sm text-muted-foreground font-mono bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="text-green-500">2020</span> —{' '}
              <span className="text-purple-500">2025</span>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Linha vertical do timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-green-500 opacity-30" />

            <div className="space-y-12">
              {experiences.map((job, index) => (
                <motion.div
                  key={job.id}
                  className="group relative"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {/* Ponto no timeline */}
                  <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-zinc-900 border-2 border-purple-500 group-hover:border-green-500 transition-colors duration-300 z-10" />

                  {/* Card da experiência */}
                  <div className="ml-20 bg-zinc-900/50 border border-zinc-700 rounded-lg p-6 hover:bg-zinc-900/70 hover:border-zinc-600 transition-all duration-300">
                    {/* Header do card */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-purple-400 transition-colors">
                            {job.position}
                          </h3>
                          {job.isActive && (
                            <Badge
                              variant="outline"
                              className="bg-green-500/10 border-green-500/50 text-green-400"
                            >
                              Atual
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted-foreground font-mono text-sm mb-2">
                          <span className="text-blue-400">{job.company}</span>
                        </div>
                        <div className="text-xs font-mono text-zinc-500">
                          {job.period}
                        </div>
                      </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                      {job.description}
                    </p>

                    {/* Principais Atividades */}
                    {job.achievements && (
                      <div className="mb-4">
                        <ul className="space-y-2">
                          {job.achievements.map(
                            (achievement, achievementIndex) => (
                              <motion.li
                                key={achievementIndex}
                                className="text-sm text-muted-foreground"
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: achievementIndex * 0.1,
                                }}
                                viewport={{ once: true }}
                              >
                                • {achievement}
                              </motion.li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {job.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="px-2 py-1 text-xs bg-zinc-800 border border-zinc-600 rounded font-mono hover:border-purple-500/50 transition-colors"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: techIndex * 0.05,
                          }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
