"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Terminal, X } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showTerminal, setShowTerminal] = useState(false)
  const [loginDate, setLoginDate] = useState("YYYY-MM-DD HH:MM:SS")

  // Add this useEffect to handle window-based initialization
  useEffect(() => {
    // Check if on desktop and update terminal visibility
    if (typeof window !== "undefined" && window.innerWidth > 768) {
      setShowTerminal(true)
    }
  }, [])

  // Update date string on client-side only
  useEffect(() => {
    const now = new Date()
    setLoginDate(`${now.toISOString().split("T")[0]} ${now.toTimeString().split(" ")[0]}`)
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.1
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvasRef.current) return
      canvasRef.current.width = window.innerWidth
      canvasRef.current.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogoClick = () => {
    setClickCount((prev) => {
      const newCount = prev + 1
      if (newCount >= 5) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 3000)
        return 0
      }
      return newCount
    })
  }

  // Function to simulate typing effect
  const typeCommand = async (command: string, url: string, delay = 50) => {
    if (isTyping) return

    setIsTyping(true)
    setTerminalOutput([])

    // Type the command character by character
    const chars = command.split("")
    for (let i = 0; i < chars.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      setTerminalOutput((prev) => [...prev.slice(0, -1), prev[prev.length - 1] + chars[i]])
    }

    // Add response lines
    await new Promise((resolve) => setTimeout(resolve, 300))
    setTerminalOutput((prev) => [...prev, "Connecting..."])

    await new Promise((resolve) => setTimeout(resolve, 500))
    setTerminalOutput((prev) => [...prev, "Connection established"])

    await new Promise((resolve) => setTimeout(resolve, 300))
    setTerminalOutput((prev) => [...prev, "Opening link..."])

    // Open the URL
    await new Promise((resolve) => setTimeout(resolve, 500))
    window.open(url, "_blank")

    setIsTyping(false)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />

      {/* Terminal toggle button for mobile */}
      <div className="fixed top-6 left-6 z-50 md:hidden">
        {!showTerminal ? (
          <button
            onClick={() => setShowTerminal(true)}
            className="bg-zinc-900 border border-zinc-700 rounded-md p-2 shadow-lg flex items-center"
          >
            <Terminal className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-green-500">Terminal</span>
          </button>
        ) : null}
      </div>

      {/* Terminal-style Social Links - Mac style */}
      {showTerminal && (
        <div className="fixed top-6 left-6 z-50">
          <div className="bg-black bg-opacity-90 border border-zinc-800 rounded-lg overflow-hidden shadow-lg w-72">
            {/* Terminal header - Mac style */}
            <div className="bg-zinc-900 px-3 py-2 flex items-center justify-between border-b border-zinc-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-zinc-400">bash</div>
              <button onClick={() => setShowTerminal(false)} className="text-zinc-400 hover:text-white md:hidden">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Terminal content */}
            <div className="p-3 font-mono text-xs">
              <div className="mb-1 text-green-500">Last login: {loginDate}</div>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://github.com/LuisMIguelFurlanettoSousa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const terminalOutput = document.getElementById("terminal-output")
                    if (terminalOutput) {
                      terminalOutput.innerHTML =
                        "> curl github.com/LuisMIguelFurlanettoSousa<br>> Connecting...<br>> Connected!"
                      setTimeout(() => {
                        window.open("https://github.com/LuisMIguelFurlanettoSousa", "_blank")
                      }, 800)
                    }
                  }}
                >
                  [GitHub]
                  <span className="text-zinc-500 text-xs ml-1">//click</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/luis-miguel-furlanetto-sousa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    const terminalOutput = document.getElementById("terminal-output")
                    if (terminalOutput) {
                      terminalOutput.innerHTML =
                        "> ssh linkedin.com/in/luis-miguel-furlanetto-sousa/<br>> Establishing secure connection...<br>> Connected!"
                      setTimeout(() => {
                        window.open("https://www.linkedin.com/in/luis-miguel-furlanetto-sousa/", "_blank")
                      }, 800)
                    }
                  }}
                >
                  [LinkedIn]
                  <span className="text-zinc-500 text-xs ml-1">//click</span>
                </a>
              </div>
              <div className="mt-2">
                <ScrollLink
                  to="contact-section"
                  smooth={true}
                  duration={500}
                  className="text-amber-500 hover:text-amber-400 transition-colors cursor-pointer"
                  onClick={() => {
                    const terminalOutput = document.getElementById("terminal-output")
                    if (terminalOutput) {
                      terminalOutput.innerHTML =
                        "> navigate to contact section<br>> Scrolling...<br>> Contact section reached!"
                    }
                    if (typeof window !== "undefined" && window.innerWidth <= 768) {
                      setShowTerminal(false)
                    }
                  }}
                >
                  [Contact]
                  <span className="text-zinc-500 text-xs ml-1">//click</span>
                </ScrollLink>
              </div>
              <div id="terminal-output" className="text-xs text-gray-400 mt-2 h-12 overflow-hidden"></div>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          className="mb-6 cursor-pointer select-none"
          onClick={handleLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl">LUÍS MIGUEL</h1>
          {/* Hidden binary code that appears on hover - improved visibility for mobile */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-40 text-sm sm:text-xs font-mono bg-black bg-opacity-50 px-2 py-1 rounded">
            01001100 01110101 01101001 01110011
          </div>
        </motion.div>
        <motion.p
          className="max-w-[600px] text-lg text-gray-400 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Full-Stack Developer & Software Engineer
        </motion.p>

        {/* Backend easter egg - hidden message */}
        <div className="mt-8 text-xs font-mono text-gray-600">
          <span className="hidden sm:inline">// Press &gt; to open console</span>
          <span className="sm:hidden">// Tap 5x on name for surprise</span>
        </div>

        {/* Easter egg popup */}
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-20 bg-zinc-900 border border-zinc-700 p-3 rounded-md shadow-lg"
          >
            <pre className="text-xs font-mono text-green-400">
              {`
> sudo access granted
> loading backend modules...
> initializing server...
> welcome, admin
              `}
            </pre>
          </motion.div>
        )}

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs font-mono text-gray-400 mb-2">scroll down</span>
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="text-white h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
