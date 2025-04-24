"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Terminal() {
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [currentCommand, setCurrentCommand] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commands = [
    { prompt: "user@portfolio:~$ ", command: "whoami", delay: 0 },
    {
      prompt: "",
      command: `
Name: Luís Miguel Furlanetto Sousa
Role: Full-Stack Developer
Location: Brazil
Contact: (34) 99723-7900 | lfurlanettosousa@gmail.com
GitHub: LuisMIguelFurlanettoSousa
LinkedIn: Luís Miguel Furlanetto
`,
      delay: 30,
    },
    { prompt: "user@portfolio:~$ ", command: "cat education.txt", delay: 100 },
    {
      prompt: "",
      command: `
Curso: Análise e Desenvolvimento de Sistemas (ADS)
Instituição: Uniube
Conclusão prevista: 2026

Idiomas:
- Português (nativo)
- Inglês (básico)
`,
      delay: 20,
    },
    { prompt: "user@portfolio:~$ ", command: "ls -la skills/", delay: 100 },
    {
      prompt: "",
      command: `
total 14
drwxr-xr-x  5 luis  staff  160 Apr 22 19:48 .
drwxr-xr-x 10 luis  staff  320 Apr 22 19:48 ..
drwxr-xr-x  3 luis  staff   96 Apr 22 19:48 languages/
-rw-r--r--  1 luis  staff  102 Apr 22 19:48 python.lang
-rw-r--r--  1 luis  staff  128 Apr 22 19:48 javascript.lang
-rw-r--r--  1 luis  staff   56 Apr 22 19:48 c.lang
-rw-r--r--  1 luis  staff   78 Apr 22 19:48 java.lang
drwxr-xr-x  4 luis  staff  128 Apr 22 19:48 frameworks/
-rw-r--r--  1 luis  staff   96 Apr 22 19:48 nodejs.fw
-rw-r--r--  1 luis  staff  112 Apr 22 19:48 express.fw
-rw-r--r--  1 luis  staff  104 Apr 22 19:48 react.fw
-rw-r--r--  1 luis  staff  95 Apr 22 19:48 next.fw
-rw-r--r--  1 luis  staff  109 Apr 22 19:48 tailwind.fw
-rw-r--r--  1 luis  staff   88 Apr 22 19:48 bcrypt.fw
drwxr-xr-x  5 luis  staff  160 Apr 22 19:48 databases/
-rw-r--r--  1 luis  staff  120 Apr 22 19:48 mongodb.db
-rw-r--r--  1 luis  staff  112 Apr 22 19:48 mysql.db
-rw-r--r--  1 luis  staff  136 Apr 22 19:48 sqlserver.db
-rw-r--r--  1 luis  staff  104 Apr 22 19:48 oracle.db
`,
      delay: 10,
    },
    { prompt: "user@portfolio:~$ ", command: "cat objective.txt", delay: 100 },
    {
      prompt: "",
      command: `
Busco posição como Desenvolvedor Back-end ou Full-stack para aplicar conhecimentos em Node.js,
Python e bancos de dados, criando aplicações escaláveis e seguras. Experiência com SQL Server, MySQL,
NoSQL, APIs REST e WebSockets. No front-end, utilizo JavaScript, React e TailwindCSS para interfaces
responsivas. Possuo projetos no GitHub que demonstram minha capacidade de desenvolver soluções
eficientes. Estou sempre em busca de aprimorar habilidades e aprender novas tecnologias para agregar
valor às equipes e projetos.
`,
      delay: 15,
    },
    { prompt: "user@portfolio:~$ ", command: "ls -la projects/", delay: 100 },
    {
      prompt: "",
      command: `
total 6
drwxr-xr-x  2 luis  staff  192 Apr 22 19:48 .
drwxr-xr-x 10 luis  staff  320 Apr 22 19:48 ..
-rw-r--r--  1 luis  staff  4.2K Apr 22 19:48 FistApi.js
-rw-r--r--  1 luis  staff  3.8K Apr 22 19:48 TripleWinSlots.py
-rw-r--r--  1 luis  staff  5.6K Apr 22 19:48 Beecrowd.py
-rw-r--r--  1 luis  staff  4.1K Apr 22 19:48 NepsAcademy.py
-rw-r--r--  1 luis  staff  7.7K Apr 22 19:48 myPortfolio.tsx
-rw-r--r--  1 luis  staff  1.4K Apr 22 19:48 GeradorDeSenhas.C
`,
      delay: 10,
    },
    { prompt: "user@portfolio:~$ ", command: "ls -la courses/", delay: 100 },
    {
      prompt: "",
      command: `
total 7
drwxr-xr-x  2 luis  staff  192 Apr 22 19:48 .
drwxr-xr-x 10 luis  staff  320 Apr 22 19:48 ..
-rw-r--r--  1 luis  staff  4.2K Apr 22 19:48 JavaViradoNoJiraya.java
-rw-r--r--  1 luis  staff  3.8K Apr 22 19:48 FullStack (Luiz Otávio Miranda).ts
-rw-r--r--  1 luis  staff  4.4K Apr 22 19:48 Python (Luiz Otávio Miranda).py
-rw-r--r--  1 luis  staff  1.4K Apr 22 19:48 Git (Hora de Codar).ts
-rw-r--r--  1 luis  staff  7.8K Apr 22 19:48 Figma
-rw-r--r--  1 luis  staff  2.7K Apr 22 19:48 Html e css (Curso em video)
-rw-r--r--  1 luis  staff  3.9K Apr 22 19:48 Python (Curso em video).py
`,
      delay: 10,
    },
  ]

  // Detect when terminal is in viewport
  useEffect(() => {
    if (typeof window === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (terminalRef.current) {
      observer.observe(terminalRef.current)
    }

    return () => {
      if (terminalRef.current) {
        observer.unobserve(terminalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    // Only start typing commands when the terminal is visible
    if (!isVisible || currentCommand >= commands.length) return

    const command = commands[currentCommand]
    let currentIndex = 0
    const commandText = command.command

    // Reset typed text when starting a new command
    setTypedText(command.prompt)

    // Type out the command character by character
    const typeNextChar = () => {
      if (currentIndex < commandText.length) {
        const nextChar = commandText[currentIndex]
        setTypedText((prev) => prev + nextChar)
        currentIndex++
        setTimeout(typeNextChar, command.delay)
      } else {
        // Move to next command after a delay
        setTimeout(() => {
          setCurrentCommand((prev) => prev + 1)
        }, 1000)
      }
    }

    // Start typing
    setTimeout(typeNextChar, 100)

    return () => {
      // No need for clearInterval as we're using setTimeout
    }
  }, [currentCommand, isVisible])

  return (
    <section className="py-20" ref={terminalRef}>
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg overflow-hidden border border-zinc-700 shadow-lg">
            {/* Terminal header */}
            <div className="bg-zinc-800 px-4 py-2 flex items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="mx-auto text-sm text-zinc-400">terminal — luis@portfolio — 80×24</div>
            </div>

            {/* Terminal content */}
            <div className="bg-zinc-900 p-4 font-mono text-sm h-[400px] overflow-y-auto relative">
              <pre className="whitespace-pre-wrap text-zinc-300">
                {typedText}
                {showCursor && currentCommand < commands.length && <span className="text-white">▋</span>}
              </pre>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
