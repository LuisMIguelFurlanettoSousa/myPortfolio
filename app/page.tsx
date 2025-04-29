import Hero from "./components/hero"
import Terminal from "./components/terminal"
import TechStack from "./components/tech-stack"
import Portfolio from "./components/portfolio"
import Contact from "./components/contact"
import Footer from "./components/footer"
import EasterEggs from "./components/easter-eggs"
import ConstructionTerminal from "./components/construction-terminal"

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Portfolio />
      <TechStack />
      <Terminal />
      <Contact />
      <ConstructionTerminal />
      <EasterEggs />
      <Footer />
    </main>
  )
}
