import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Contact.css'

export default function Contact() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  const staggerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact__bg-text" aria-hidden="true">Contact</div>

      <div className="container">
        <motion.div
          className="contact__inner"
          variants={staggerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className="section-label" variants={itemVariants}>
            Get In Touch
          </motion.span>

          <motion.h2 className="contact__heading" variants={itemVariants}>
            Let's build<br /><em>something great</em>
          </motion.h2>

          <motion.p className="contact__blurb" variants={itemVariants}>
            Whether you have a project in mind, a question, or just want to connect —
            I'd love to hear from you. I'm always open to new opportunities and
            collaborations.
          </motion.p>

          <motion.div className="contact__links" variants={itemVariants}>
            <a
              href="mailto:tannermcmanner@gmail.com"
              className="contact__link"
              aria-label="Send email"
            >
              <div className="contact__link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="contact__link-body">
                <span className="contact__link-label">Email</span>
                <span className="contact__link-value">tannermcmanner@gmail.com</span>
              </div>
              <div className="contact__link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </a>

            <a
              href="tel:+12082866723"
              className="contact__link"
              aria-label="Call phone number"
            >
              <div className="contact__link-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div className="contact__link-body">
                <span className="contact__link-label">Phone</span>
                <span className="contact__link-value">208-286-6723</span>
              </div>
              <div className="contact__link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <div className="container">
          <div className="contact__footer-inner">
            <span className="contact__footer-copy">
              © {new Date().getFullYear()} Tanner McNatt. All rights reserved.
            </span>
            <a href="#home" className="contact__footer-back" onClick={e => {
              e.preventDefault()
              document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
