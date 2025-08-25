import ConstructionTerminal from './components/construction-terminal'
import Contact from './components/contact'
import EasterEggs from './components/easter-eggs'
import Footer from './components/footer'
import Hero from './components/hero'
import Portfolio from './components/portfolio'
import TechStack from './components/tech-stack'
import Terminal from './components/terminal'
import WorkExperience from './components/work-experience'

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <WorkExperience />
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
