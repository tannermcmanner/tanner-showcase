import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const duration = 1800
    const interval = 20
    const steps = duration / interval
    let current = 0

    const timer = setInterval(() => {
      current++
      const eased = Math.round(Math.pow(current / steps, 0.6) * 100)
      setProgress(Math.min(eased, 100))
      if (current >= steps) {
        clearInterval(timer)
        setTimeout(() => setDone(true), 200)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!done && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Curtain reveal top */}
          <motion.div
            className="loading-curtain loading-curtain--top"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0 }}
          />
          {/* Curtain reveal bottom */}
          <motion.div
            className="loading-curtain loading-curtain--bottom"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />

          <div className="loading-content">
            <motion.div
              className="loading-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Tanner McNatt
            </motion.div>
            <motion.div
              className="loading-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Web Designer &amp; Developer
            </motion.div>

            <div className="loading-bar-wrap">
              <motion.div
                className="loading-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            <div className="loading-percent">{progress}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
