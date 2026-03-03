'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

type Skill = {
  name: string
  category: string
  icon: string
}

export default function TechStack() {
  const [filter, setFilter] = useState<string>('language')
  // const [dateString, setDateString] = useState("YYYY-MM-DD")

  // // Update date string on client-side only
  // useEffect(() => {
  //   setDateString(new Date().toISOString().split("T")[0])
  // }, [])

  const skills: Skill[] = [
    // Languages
    {
      name: 'Java',
      category: 'language',
      icon: 'Java',
    },
    {
      name: 'TypeScript',
      category: 'language',
      icon: 'TS',
    },

    // Frameworks
    {
      name: 'React',
      category: 'framework',
      icon: 'REACT',
    },
    {
      name: 'React Native',
      category: 'framework',
      icon: 'RN',
    },
    {
      name: 'Expo',
      category: 'framework',
      icon: 'EXPO',
    },
    {
      name: 'Node.js',
      category: 'framework',
      icon: 'NODE',
    },
    {
      name: 'Tailwind',
      category: 'framework',
      icon: 'TW',
    },
    {
      name: 'Next',
      category: 'framework',
      icon: 'NEXT',
    },

    // Databases
    {
      name: 'DynamoDB',
      category: 'database',
      icon: 'DDB',
    },
    {
      name: 'MongoDB',
      category: 'database',
      icon: 'MONGO',
    },
    {
      name: 'MySQL',
      category: 'database',
      icon: 'SQL',
    },
    {
      name: 'SQL Server',
      category: 'database',
      icon: 'MSSQL',
    },
    {
      name: 'Oracle',
      category: 'database',
      icon: 'ORA',
    },

    // Methodologies
    {
      name: 'Scrum',
      category: 'methodology',
      icon: 'SCR',
    },
    {
      name: 'Kanban',
      category: 'methodology',
      icon: 'KAN',
    },
    {
      name: 'TDD',
      category: 'methodology',
      icon: 'TDD',
    },
  ]

  const categories = [
    { id: 'language', name: 'Languages' },
    { id: 'framework', name: 'Frameworks' },
    { id: 'database', name: 'Databases' },
    { id: 'methodology', name: 'Methodologies' },
    { id: 'all', name: 'All' },
  ]

  const filteredSkills =
    filter !== 'all'
      ? skills.filter((skill) => skill.category === filter)
      : skills

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold mb-2 font-mono">
              <span className="text-[#569cd6]">const</span>{' '}
              <span className="text-[#4ec9b0]">techStack</span>{' '}
              <span className="text-white">=</span>{' '}
              <span className="text-[#dcdcaa]">getSkills</span>
              <span className="text-white">();</span>
            </h2>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded font-mono text-sm ${
                  filter === category.id
                    ? 'bg-[#007acc] text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 hover:border-[#007acc] transition-colors">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-zinc-800 rounded-md mr-3 text-xs font-mono text-[#569cd6]">
                      {skill.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-mono text-white">{skill.name}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center font-mono text-xs text-zinc-500">
            <code>/* Skills last updated: 03-02-2026 */</code>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
