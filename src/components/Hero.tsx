import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import './Hero.css'

interface HeroProps {
  isReady: boolean
}

export default function Hero({ isReady }: HeroProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const lineVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  const scrollIndicatorVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, delay: 1.2 },
    },
  }

  return (
    <section id="home" className="hero" ref={ref}>
      {/* Parallax background image */}
      <motion.div className="hero__image-wrap" style={{ y: imageY }}>
        <img
          src="/hero.jpg"
          alt="Tanner McNatt"
          className="hero__image"
        />
        <div className="hero__overlay" />
      </motion.div>

      {/* Text content */}
      <motion.div className="hero__content" style={{ y: textY, opacity }}>
        <motion.div
          className="hero__text"
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
        >
          <div className="hero__name-wrap">
            <motion.div className="hero__name-line" variants={lineVariants}>
              Tanner
            </motion.div>
            <motion.div className="hero__name-line hero__name-line--indent" variants={lineVariants}>
              McNatt
            </motion.div>
          </div>

          <motion.div className="hero__divider" variants={subtitleVariants} />

          <motion.p className="hero__subtitle" variants={subtitleVariants}>
            Web Designer &amp; Developer
          </motion.p>

          <motion.a
            href="#projects"
            className="hero__cta"
            variants={subtitleVariants}
            onClick={e => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <span>View My Work</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate={isReady ? 'visible' : 'hidden'}
      >
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">Scroll</span>
      </motion.div>
    </section>
  )
}
