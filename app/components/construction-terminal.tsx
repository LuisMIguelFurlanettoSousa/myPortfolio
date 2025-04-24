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

  // Detect when terminal is in viewport
  useEffect(() => {
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

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  // Type out commands when terminal is visible
  useEffect(() => {
    if (!isVisible || currentCommand >= commands.length) return

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
      // No need for clearInterval as we're using setTimeout
    }
  }, [currentCommand, isVisible])

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
                {showCursor && currentCommand < commands.length && <span className="text-white">▋</span>}
              </pre>
            </div>
          </div>

          <div className="mt-6 text-center text-zinc-500 text-sm font-mono">
            <p>This portfolio is actively being developed. New features coming soon.</p>
            <p className="mt-2">
              <code>last_updated: {new Date().toLocaleDateString()}</code>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
