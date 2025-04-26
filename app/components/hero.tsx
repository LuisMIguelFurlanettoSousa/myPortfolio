"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Github, Linkedin, Mail, Phone } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [clickCount, setClickCount] = useState(0)

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

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-black" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
      <motion.div
        className="mb-6 cursor-pointer select-none relative group"
        onClick={handleLogoClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Binário aparece só no hover em telas sm+ */}
        <div className="hidden sm:block absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-40 transition-opacity text-sm font-mono bg-black bg-opacity-50 px-2 py-1 rounded">
          01001100 01110101 01101001 01110011
        </div>
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl lg:text-8xl">LUÍS MIGUEL</h1>
      </motion.div>

        <motion.p
          className="max-w-[600px] text-lg text-gray-400 sm:text-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Full-Stack Developer & Software Engineer
        </motion.p>

        {/* Social Media Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mt-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.a
            href="https://github.com/LuisMIguelFurlanettoSousa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-32 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md font-mono text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="h-4 w-4 text-white mr-2" />
            <span className="text-green-500">GitHub</span>
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/luis-miguel-furlanetto-sousa/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-32 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md font-mono text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className="h-4 w-4 text-white mr-2" />
            <span className="text-blue-500">LinkedIn</span>
          </motion.a>
          
          {/* WhatsApp Button */}
          <motion.a
            href="https://wa.me/5534997237900"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-32 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md font-mono text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="h-4 w-4 text-white mr-2" />
            <span className="text-green-500">WhatsApp</span>
          </motion.a>
          
          <motion.a
            href="mailto:your.email@example.com"
            className="flex items-center justify-center w-32 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md font-mono text-sm transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="h-4 w-4 text-white mr-2" />
            <span className="text-amber-500">Email</span>
          </motion.a>
        </motion.div>

        {/* Backend easter egg - hidden message */}
        <div className="mt-2 text-xs font-mono text-gray-600">
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