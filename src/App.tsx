import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const handleLoadComplete = () => {
    setIsReady(true)
  }

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />
      <CustomCursor />
      <Navbar isReady={isReady} />
      <main>
        <Hero isReady={isReady} />
        <Projects />
        <About />
        <Contact />
      </main>
    </>
  )
}
