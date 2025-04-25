"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type Skill = {
  name: string
  category: string
  icon: string
  description: string
}

export default function TechStack() {
  const [filter, setFilter] = useState<string>("language")
  // const [dateString, setDateString] = useState("YYYY-MM-DD")

  // // Update date string on client-side only
  // useEffect(() => {
    //   setDateString(new Date().toISOString().split("T")[0])
    // }, [])
    
    const skills: Skill[] = [
      // Languages
      {
        name: "Java",
        category: "language",
        icon: "Java",
        description: "Studying",
      },
      {
        name: "TypeScript",
        category: "language",
        icon: "TS",
        description: "Used in 2 projects",
      },
      {
        name: "Python",
        category: "language",
        icon: "PY",
        description: "Used in 3 projects",
      },
    {
      name: "JavaScript",
      category: "language",
      icon: "JS",
      description: "Used in 2 projects",
    },
    {
      name: "C",
      category: "language",
      icon: "C",
      description: "Used in 1 projects",
    },

    // Frameworks
    {
      name: "React",
      category: "framework",
      icon: "REACT",
      description: "1 year experience",
    },
    {
      name: "Next",
      category: "framework",
      icon: "NEXT",
      description: "1 year experience",
    },
    {
      name: "Node.js",
      category: "framework",
      icon: "NODE",
      description: "1 year experience",
    },
    {
      name: "Express.js",
      category: "framework",
      icon: "EXP",
      description: "1 year experience",
    },
    {
      name: "Tailwind",
      category: "framework",
      icon: "TW",
      description: "0.5 year experience",
    },
    {
      name: "bcrypt",
      category: "framework",
      icon: "BCR",
      description: "1 year experience",
    },

    // Databases
    {
      name: "SQL Server",
      category: "database",
      icon: "MSSQL",
      description: "950 queries written",
    },
    {
      name: "Oracle",
      category: "database",
      icon: "ORA",
      description: "500 queries written",
    },
    {
      name: "MongoDB",
      category: "database",
      icon: "MONGO",
      description: "850 queries written",
    },
    {
      name: "MySQL",
      category: "database",
      icon: "SQL",
      description: "1200 queries written",
    },

    // Tools
    {
      name: "Git",
      category: "tool",
      icon: "GIT",
      description: "Daily workflow integration",
    },
    {
      name: "GitHub",
      category: "tool",
      icon: "GH",
      description: "Daily workflow integration",
    },
    {
      name: "Figma",
      category: "tool",
      icon: "FI",
      description: "project planning",
    },

    // Methodologies
    {
      name: "Scrum",
      category: "methodology",
      icon: "SCR",
      description: "Daily workflow integration",
    },
    {
      name: "Kanban",
      category: "methodology",
      icon: "KAN",
      description: "Daily workflow integration",
    },
    //Test
    {
      name: "TDD",
      category: "test",
      icon: "TDD",
      description: "Applied in team projects",
    },
    {
      name: "BDD",
      category: "test",
      icon: "BDD",
      description: "Applied in team projects",
    },
    {
      name: "DDD",
      category: "test",
      icon: "DDD",
      description: "Applied in team projects",
    },
  ]

  const categories = [
    { id: "language", name: "Languages" },
    { id: "framework", name: "Frameworks" },
    { id: "database", name: "Databases" },
    { id: "tool", name: "Tools" },
    { id: "methodology", name: "Methodologies" },
    { id: "test", name: "Test"},
    { id: null, name: "All" },
  ]

  const filteredSkills = filter !== null ? skills.filter((skill) => skill.category === filter) : skills

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
              <span className="text-[#569cd6]">const</span> <span className="text-[#4ec9b0]">techStack</span>{" "}
              <span className="text-white">=</span> <span className="text-[#dcdcaa]">getSkills</span>
              <span className="text-white">();</span>
            </h2>
            <p className="text-zinc-400 font-mono">// Hover over skills for more details</p>
          </div>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded font-mono text-sm ${filter === category.id ? "bg-[#007acc] text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"}`}
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
                        <span className="text-xs font-mono text-zinc-400">{skill.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center font-mono text-xs text-zinc-500">
            <code>/* Skills last updated: 04-25-2025 */</code>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
