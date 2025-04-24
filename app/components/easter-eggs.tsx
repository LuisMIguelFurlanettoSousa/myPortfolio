"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function EasterEggs() {
  const [showConsole, setShowConsole] = useState(false)
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [command, setCommand] = useState("")
  const [cursorPosition, setCursorPosition] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [secretType, setSecretType] = useState<"http" | "sql" | "error" | null>(null)

  // Konami code easter egg
  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ]
    let konamiIndex = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle console with backtick
      if (e.key === ">") {
        e.preventDefault()
        setShowConsole((prev) => !prev)
        return
      }

      // Check for Konami code
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++
        if (konamiIndex === konamiCode.length) {
          setShowSecret(true)
          setSecretType("http")
          konamiIndex = 0
          setTimeout(() => setShowSecret(false), 5000)
        }
      } else {
        konamiIndex = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle console commands
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!command.trim()) return

    const output = [...consoleOutput, `> ${command}`]

    // Process commands
    switch (command.toLowerCase()) {
      case "help":
        output.push(
          "Available commands:",
          "- help: Show this help message",
          "- clear: Clear the console",
          "- error: Simulate a server error",
          "- about: About the developer",
          "- curses: Show completed courses",
          "- exit: Close the console",
        )
        break

      case "clear":
        setConsoleOutput([])
        setCommand("")
        return

      case "error":
        output.push(
          "\x1b[31mERROR: Uncaught Exception at /api/projects (line 42)\x1b[0m",
          "\x1b[33mTypeError: Cannot read property 'id' of undefined\x1b[0m",
          "    at getProjectById (/api/projects:42:23)",
          "    at processRequest (/middleware/auth:217:12)",
          "    at async Router.handleApiRequest (/node_modules/next/server/router.js:28:9)",
          "\x1b[34mStack trace saved to error.log\x1b[0m",
        )
        setShowSecret(true)
        setSecretType("error")
        setTimeout(() => setShowSecret(false), 3000)
        break

      case "about":
        output.push(
          "Luís Miguel Furlanetto Sousa",
          "Full-Stack Developer specializing in Node.js and Python",
          "Currently studying Analysis and Systems Development at Uniube",
          "Expected graduation: 2026",
          "",
          "Contact: lfurlanettosousa@gmail.com | (34) 99723-7900",
        )
        break

      case "curses":
        output.push(
          "Cursos Concluídos:",
          "- FullStack (Luiz Otávio Miranda)",
          "- Python (Luiz Otávio Miranda)",
          "- Git (Hora de Codar)",
          "- Figma (Udemy)",
          "- HTML e CSS (Curso em Vídeo)",
          "- Python (Curso em Vídeo)",
          "",
          "Cursos em Andamento:",
          "- Análise e Desenvolvimento de Sistemas (Uniube)",
          "- JavaViradoNoJiraya.java",
        )
        break

      case "exit":
        setShowConsole(false)
        break

      default:
        output.push(`Command not found: ${command}. Type 'help' for available commands.`)
    }

    setConsoleOutput(output)
    setCommand("")
  }

  // Hidden elements that appear based on interactions
  return (
    <>
      {/* Hidden console (press > to toggle) */}
      {showConsole && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-95 border-b border-zinc-700 p-4 font-mono text-sm"
          style={{ maxHeight: "50vh", overflowY: "auto" }}
        >
          <div className="container mx-auto">
            <div className="mb-2 text-zinc-400">Backend Console v1.0.0 - Press > to hide</div>

            <div className="mb-4 text-zinc-300">
              {consoleOutput.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {line.startsWith("\x1b[31m") ? (
                    <span className="text-red-500">{line.replace(/\x1b\[\d+m/g, "")}</span>
                  ) : line.startsWith("\x1b[33m") ? (
                    <span className="text-yellow-500">{line.replace(/\x1b\[\d+m/g, "")}</span>
                  ) : line.startsWith("\x1b[34m") ? (
                    <span className="text-blue-500">{line.replace(/\x1b\[\d+m/g, "")}</span>
                  ) : (
                    line
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleCommandSubmit} className="flex items-center">
              <span className="text-green-500 mr-2">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white"
                autoFocus
              />
            </form>
          </div>
        </motion.div>
      )}

      {/* Secret HTTP status codes (triggered by Konami code) */}
      {showSecret && secretType === "http" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-4 right-4 z-50 bg-zinc-900 border border-zinc-700 p-4 rounded-lg shadow-lg font-mono"
        >
          <div className="text-green-500 font-bold mb-2">HTTP Status Codes Cheat Sheet</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div>
              <span className="text-blue-400">200</span> - OK
            </div>
            <div>
              <span className="text-blue-400">201</span> - Created
            </div>
            <div>
              <span className="text-blue-400">204</span> - No Content
            </div>
            <div>
              <span className="text-yellow-400">301</span> - Moved Permanently
            </div>
            <div>
              <span className="text-yellow-400">304</span> - Not Modified
            </div>
            <div>
              <span className="text-red-400">400</span> - Bad Request
            </div>
            <div>
              <span className="text-red-400">401</span> - Unauthorized
            </div>
            <div>
              <span className="text-red-400">403</span> - Forbidden
            </div>
            <div>
              <span className="text-red-400">404</span> - Not Found
            </div>
            <div>
              <span className="text-red-400">500</span> - Internal Server Error
            </div>
          </div>
          <div className="mt-2 text-xs text-zinc-400">Konami code activated!</div>
        </motion.div>
      )}

      {/* Error stack trace */}
      {showSecret && secretType === "error" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-900 bg-opacity-90 border border-red-700 p-4 rounded-lg shadow-lg font-mono max-w-md w-full"
        >
          <div className="text-white font-bold mb-2 flex items-center">
            <span className="mr-2">⚠️</span>
            <span>Uncaught Exception</span>
          </div>
          <div className="text-xs text-red-200">
            <pre className="whitespace-pre-wrap">
              {`TypeError: Cannot read property 'id' of undefined
    at getProjectById (/api/projects:42:23)
    at processRequest (/middleware/auth:217:12)
    at async Router.handleApiRequest (/node_modules/next/server/router.js:28:9)`}
            </pre>
          </div>
          <div className="mt-2 text-xs text-red-300 flex justify-between">
            <span>Process exited with code 1</span>
            <button className="text-white hover:text-red-200">Dismiss</button>
          </div>
        </motion.div>
      )}

      {/* Hidden comments in the DOM */}
      {/* <!-- 
        DEBUG MODE: false
        ENV: production
        VERSION: 1.0.0
        LAST DEPLOY: 2023-04-22T19:48:00Z
        SECRET_KEY: Nice try! ;)
      --> */}

      <div className="hidden">
        <div data-easter-egg="true" data-trigger="ctrl+alt+b">
          {`
          function findSecretFeature() {
            // TODO: Implement this feature before production
            console.log("You found a secret feature!");
            return Math.random() > 0.5 ? "Success" : "Try again";
          }
          `}
        </div>
      </div>
    </>
  )
}
