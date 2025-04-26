"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Terminal() {
  // Referência para o elemento do terminal
  const terminalRef = useRef(null)
  // Estado para controlar o cursor piscante
  const [showCursor, setShowCursor] = useState(true)
  // Estado para armazenar o texto atual exibido
  const [displayText, setDisplayText] = useState("")
  // Estado para controlar se o terminal está visível
  const [isInView, setIsInView] = useState(false)
  // Estado para rastrear o comando atual
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  // Referência para rastrear se o componente está montado
  const isMountedRef = useRef(true)
  // Referência para armazenar timers ativos
  const timersRef = useRef([])

  // Lista de comandos e respostas
  const commands = [
    { prompt: "user@portfolio:~$ ", command: "whoami", delay: 50 },
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
    { prompt: "user@portfolio:~$ ", command: "cat education.txt", delay: 50 },
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
 //   { prompt: "user@portfolio:~$ ", command: "ls -la skills/", delay: 50 },
//     {
//       prompt: "",
//       command: `
// total 14
// drwxr-xr-x  5 luis  staff  160 Apr 22 19:48 .
// drwxr-xr-x 10 luis  staff  320 Apr 22 19:48 ..
// drwxr-xr-x  3 luis  staff   96 Apr 22 19:48 languages/
// -rw-r--r--  1 luis  staff  102 Apr 22 19:48 python.lang
// -rw-r--r--  1 luis  staff  128 Apr 22 19:48 javascript.lang
// -rw-r--r--  1 luis  staff   56 Apr 22 19:48 c.lang
// -rw-r--r--  1 luis  staff   78 Apr 22 19:48 java.lang
// drwxr-xr-x  4 luis  staff  128 Apr 22 19:48 frameworks/
// -rw-r--r--  1 luis  staff   96 Apr 22 19:48 nodejs.fw
// -rw-r--r--  1 luis  staff  112 Apr 22 19:48 express.fw
// -rw-r--r--  1 luis  staff  104 Apr 22 19:48 react.fw
// -rw-r--r--  1 luis  staff  95 Apr 22 19:48 next.fw
// -rw-r--r--  1 luis  staff  109 Apr 22 19:48 tailwind.fw
// -rw-r--r--  1 luis  staff   88 Apr 22 19:48 bcrypt.fw
// drwxr-xr-x  5 luis  staff  160 Apr 22 19:48 databases/
// -rw-r--r--  1 luis  staff  120 Apr 22 19:48 mongodb.db
// -rw-r--r--  1 luis  staff  112 Apr 22 19:48 mysql.db
// -rw-r--r--  1 luis  staff  136 Apr 22 19:48 sqlserver.db
// -rw-r--r--  1 luis  staff  104 Apr 22 19:48 oracle.db
// `,
//       delay: 10,
 //   },
    { prompt: "user@portfolio:~$ ", command: "cat objective.txt", delay: 50 },
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
    { prompt: "user@portfolio:~$ ", command: "ls -la projects/", delay: 50 },
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
    { prompt: "user@portfolio:~$ ", command: "ls -la courses/", delay: 50 },
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

  // Limpar todos os timers quando o componente for desmontado
  useEffect(() => {
    return () => {
      isMountedRef.current = false
      // Limpar todos os timers pendentes
      timersRef.current.forEach(timer => clearTimeout(timer))
    }
  }, [])

  // Efeito para o cursor piscante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      if (isMountedRef.current) {
        setShowCursor(prev => !prev)
      }
    }, 530)
    
    return () => clearInterval(cursorInterval)
  }, [])

  // Verificar se o terminal está na viewport
  useEffect(() => {
    // Em dispositivos móveis, simplesmente inicie a animação
    if (typeof window !== "undefined" && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      setIsInView(true)
      return
    }
    
    // Em outros dispositivos, use IntersectionObserver se disponível
    if (typeof window !== "undefined" && typeof IntersectionObserver !== "undefined" && terminalRef.current) {
      try {
        const observer = new IntersectionObserver(
          entries => {
            if (entries[0].isIntersecting && isMountedRef.current) {
              setIsInView(true)
            }
          },
          { threshold: 0.1 }
        )
        
        observer.observe(terminalRef.current)
        
        return () => {
          if (terminalRef.current) {
            observer.unobserve(terminalRef.current)
          }
        }
      } catch (error) {
        // Fallback se houver erro
        setIsInView(true)
      }
    } else {
      // Fallback se não houver IntersectionObserver
      setIsInView(true)
    }
  }, [])

  // Função para digitar um par de comando atual
  const typeCurrentCommand = () => {
    // Limpar timers existentes
    timersRef.current.forEach(timer => clearTimeout(timer))
    timersRef.current = []
    
    // Verificar se existem mais comandos para digitar
    if (currentCommandIndex >= commands.length || !isInView) {
      return
    }
    
    // Obter par atual (comando e resposta)
    const currentCmdIndex = Math.floor(currentCommandIndex / 2) * 2;
    const cmd = commands[currentCmdIndex];
    const response = commands[currentCmdIndex + 1];
    
    // Limpar terminal para o novo comando
    setDisplayText("");
    
    // Função auxiliar para adicionar texto com segurança
    const safeAppendText = (text) => {
      if (isMountedRef.current) {
        setDisplayText(prev => prev + text)
      }
    }
    
    let totalDelay = 0;
    
    // Digitar o prompt
    safeAppendText(cmd.prompt);
    totalDelay += 200;
    
    // Digitar o comando caractere por caractere
    for (let i = 0; i < cmd.command.length; i++) {
      const charTimer = setTimeout(() => {
        safeAppendText(cmd.command[i])
      }, totalDelay);
      timersRef.current.push(charTimer);
      totalDelay += cmd.delay;
    }
    
    // Adicionar quebra de linha após o comando
    const lineBreakTimer = setTimeout(() => {
      safeAppendText("\n");
    }, totalDelay);
    timersRef.current.push(lineBreakTimer);
    totalDelay += 300;
    
    // Digitar a resposta caractere por caractere
    for (let i = 0; i < response.command.length; i++) {
      const charTimer = setTimeout(() => {
        safeAppendText(response.command[i])
      }, totalDelay);
      timersRef.current.push(charTimer);
      totalDelay += response.delay;
    }
    
    // Programar o próximo par de comando após um atraso
    const nextCommandTimer = setTimeout(() => {
      if (isMountedRef.current) {
        setCurrentCommandIndex(currentCommandIndex + 2);
      }
    }, totalDelay + 1500);
    timersRef.current.push(nextCommandTimer);
  };
  
  // Efeito para digitar comandos quando o índice atual ou visibilidade mudar
  useEffect(() => {
    if (!isInView) return;
    typeCurrentCommand();
  }, [currentCommandIndex, isInView]);

  // Função para rolar automaticamente para o final do terminal
  const scrollToBottom = () => {
    if (terminalRef.current) {
      const content = terminalRef.current.querySelector('.terminal-content')
      if (content) {
        content.scrollTop = content.scrollHeight
      }
    }
  }

  // Rolar para o final cada vez que o texto muda
  useEffect(() => {
    scrollToBottom()
  }, [displayText])

  return (
    <section className="py-20">
      <div className="container mx-auto px-4" ref={terminalRef}>
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
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
            <div className="bg-zinc-900 p-4 font-mono text-sm h-[400px] overflow-y-auto terminal-content">
              <div className="whitespace-pre-wrap text-zinc-300">
                {displayText}
                {showCursor && <span className="text-white">▋</span>}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}