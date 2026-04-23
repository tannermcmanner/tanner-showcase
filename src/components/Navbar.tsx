import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

interface NavbarProps {
  isReady: boolean
}

export default function Navbar({ isReady }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)

      const sections = ['home', 'projects', 'about', 'contact']
      const current = sections.find(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })
      if (current) setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on link click
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="navbar__inner">
        <a href="#home" className="navbar__logo" onClick={e => handleLinkClick(e, '#home')}>
          TM
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`navbar__link ${active === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
              onClick={e => handleLinkClick(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <motion.div
          className="navbar__mobile"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`navbar__mobile-link ${active === link.href.replace('#', '') ? 'navbar__mobile-link--active' : ''}`}
              onClick={e => handleLinkClick(e, link.href)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.header>
  )
}
