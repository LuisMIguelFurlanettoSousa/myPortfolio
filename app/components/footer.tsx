"use client"

import { useState, useEffect } from "react"

export default function Footer() {
  // const [year, setYear] = useState("2024")

  // useEffect(() => {
  //   setYear(new Date().getFullYear().toString())
  // }, [])

  return (
    <footer className="border-t border-zinc-800 bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-400">© 2025 Luís Miguel Furlanetto Sousa. All rights reserved.</p>
          <div className="flex gap-6">
            <a
              href="https://github.com/LuisMIguelFurlanettoSousa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/luis-miguel-furlanetto-sousa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              LinkedIn
            </a>
            <a href="mailto:lfurlanettosousa@gmail.com" className="text-gray-400 hover:text-white">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
