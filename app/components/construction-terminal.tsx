"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Terminal } from "lucide-react"

export default function ConstructionTerminal() {
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [currentCommand, setCurrentCommand] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const terminalRef = useRef(null)
  // Estado para verificar se é um dispositivo móvel
  const [isMobile, setIsMobile] = useState(false)

  // Conteúdo estático para exibir em dispositivos móveis
  const staticContent = `visitor@portfolio:~$ check-status
Status: UNDER CONSTRUCTION
ETA: Coming soon...
This portfolio is currently under development.
New features and projects will be added shortly.
Please check back later or contact me for more information.`

  const commands = [
    { prompt: "visitor@portfolio:~$ ", command: "load-more-features", delay: 80 },
    {
      prompt: "",
      command: "Connecting to server...",
      delay: 50,
    },
    {
      prompt: "",
      command: "Retrieving additional content...",
      delay: 50,
    },
    {
      prompt: "",
      command: "ERROR: Connection timed out.",
      delay: 100,
    },
    { prompt: "visitor@portfolio:~$ ", command: "retry --force", delay: 80 },
    {
      prompt: "",
      command: "Attempting to reconnect...",
      delay: 50,
    },
    {
      prompt: "",
      command: `ERROR: Server responded with code 503
> Service Unavailable
> Reason: Site under construction`,
      delay: 30,
    },
    { prompt: "visitor@portfolio:~$ ", command: "check-status", delay: 80 },
    {
      prompt: "",
      command: `Status: UNDER CONSTRUCTION
ETA: Coming soon...

This portfolio is currently under development.
New features and projects will be added shortly.
Please check back later or contact me for more information.`,
      delay: 20,
    },
  ]

  // Função melhorada para detectar dispositivos móveis (incluindo Xiaomi)
  const checkIfMobile = () => {
    if (typeof window === "undefined") return false;
    
    // Detecção por UserAgent (abordagem tradicional)
    const userAgentCheck = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|MI\s|Redmi|MIUI|XIAOMI/i.test(
      navigator.userAgent
    );
    
    // Detecção por tamanho de tela (abordagem alternativa)
    const screenCheck = window.innerWidth <= 768;
    
    // Detecção por recursos de toque (outra abordagem alternativa)
    const touchCheck = 'ontouchstart' in window || 
                     navigator.maxTouchPoints > 0 ||
                     (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0);
    
    // Para dispositivos Xiaomi específicos, verificação adicional
    const isXiaomiCheck = /MI\s|Redmi|MIUI|XIAOMI/i.test(navigator.userAgent) || 
                         /HM\sNote/i.test(navigator.userAgent) ||
                         /Mi\sNote/i.test(navigator.userAgent);
    
    // Retorna true se qualquer uma das verificações for positiva
    return userAgentCheck || (screenCheck && touchCheck) || isXiaomiCheck;
  };

  // Detectar dispositivo móvel
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Verificação imediata na montagem
      const isMobileDevice = checkIfMobile();
      setIsMobile(isMobileDevice);
      
      // Se for móvel, definir o conteúdo estático imediatamente
      if (isMobileDevice) {
        setTypedText(staticContent);
      }
      
      // Adicionar listener de redimensionamento para ajustar se necessário
      const handleResize = () => {
        const newIsMobile = checkIfMobile();
        if (newIsMobile !== isMobile) {
          setIsMobile(newIsMobile);
          if (newIsMobile) {
            setTypedText(staticContent);
          }
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Verificação de força bruta para garantir que funcione em dispositivos Xiaomi
      const forceCheckTimeout = setTimeout(() => {
        const forcedCheck = checkIfMobile();
        if (forcedCheck && !isMobile) {
          setIsMobile(true);
          setTypedText(staticContent);
        }
      }, 500);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        clearTimeout(forceCheckTimeout);
      };
    }
  }, []);

  // Detect when terminal is in viewport
  useEffect(() => {
    // Pular se for dispositivo móvel
    if (isMobile) {
      return;
    }
    
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
  }, [isMobile])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Type out commands when terminal is visible and not mobile
  useEffect(() => {
    if (!isVisible || isMobile || currentCommand >= commands.length) return

    const command = commands[currentCommand]
    let currentIndex = 0

    // Start with just the prompt
    setTypedText(command.prompt)

    const typeNextChar = () => {
      if (currentIndex < command.command.length) {
        const nextChar = command.command[currentIndex]
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
      // Cleanup is handled by other useEffects
    }
  }, [currentCommand, isVisible, isMobile])

  return (
    <section className="py-20 bg-black border-t border-zinc-800" ref={terminalRef}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <div className="flex items-center justify-center mb-8">
            <Terminal className="text-yellow-500 mr-3" size={24} />
            <h2 className="text-2xl font-bold font-mono text-yellow-500">LOADING MORE CONTENT</h2>
            <Terminal className="text-yellow-500 ml-3" size={24} />
          </div>

          <div className="rounded-lg overflow-hidden border border-zinc-700 shadow-lg">
            <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex space-x-2 mr-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-zinc-400">construction-status.sh</div>
              </div>
              <div className="text-xs text-zinc-500">visitor@portfolio</div>
            </div>

            <div className="bg-zinc-900 p-4 font-mono text-sm h-[300px] overflow-y-auto">
              <pre className="whitespace-pre-wrap text-zinc-300">
                {typedText}
                {showCursor && (isMobile || currentCommand < commands.length) && <span className="text-white">▋</span>}
              </pre>
            </div>
          </div>

          <div className="mt-6 text-center text-zinc-500 text-sm font-mono">
            <p>This portfolio is actively being developed. New features coming soon.</p>
            <p className="mt-2">
              <code>last_updated: 04-25-2025</code>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}