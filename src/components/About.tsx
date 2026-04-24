import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './About.css'

const technicalSkills = [
  { name: 'JavaScript', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'HTML', level: 98 },
  { name: 'CSS', level: 95 },
  { name: 'React', level: 92 },
  { name: 'Next.js', level: 85 },
  { name: 'Angular', level: 80 },
  { name: 'Node.js', level: 78 },
  { name: 'RxJS', level: 75 },
  { name: 'CSS Libraries', level: 88 },
]

const additionalSkills = [
  { name: 'Photography', level: 90 },
  { name: 'Videography', level: 85 },
  { name: 'Photoshop', level: 88 },
  { name: 'Lightroom', level: 92 },
  { name: 'Premiere Pro', level: 82 },
  { name: 'Microsoft Office', level: 90 },
  { name: 'Audio Engineering', level: 78 },
]

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8%' })

  const bioVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
    }),
  }

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        {/* Header */}
        <motion.div
          className="about__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-label">About Me</span>
          <h2 className="about__heading">Crafting<br /><em>digital experiences</em></h2>
        </motion.div>

        {/* Bio */}
        <div className="about__bio-wrap">
          <motion.p
            className="about__bio"
            custom={0}
            variants={bioVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            My name is Tanner McNatt, and I am a web developer with 3 years of experience creating
            engaging, responsive websites. I am proficient in frontend development with additional
            experience in backend. Initially self-taught, I am now pursuing a Bachelor's in
            Software Engineering to further elevate my skills and output.
          </motion.p>
          <motion.p
            className="about__bio"
            custom={1}
            variants={bioVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            My background in content creation and performing, including photography, video editing,
            and acting, has given me a deep appreciation for creating beautiful things. That same
            love for the craft has carried over into my work as a developer and fueled my passion
            for building visually stunning and engaging web applications.
          </motion.p>
        </div>

        {/* Skills */}
        <div className="about__skills-wrap">
          <SkillsBlock
            label="Technical Skills"
            skills={technicalSkills}
            isInView={isInView}
            delay={0}
          />
          <SkillsBlock
            label="Additional Skills"
            skills={additionalSkills}
            isInView={isInView}
            delay={0.15}
          />
        </div>
      </div>
    </section>
  )
}

interface Skill {
  name: string
  level: number
}

function SkillsBlock({
  label,
  skills,
  isInView,
  delay,
}: {
  label: string
  skills: Skill[]
  isInView: boolean
  delay: number
}) {
  return (
    <motion.div
      className="skills-block"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="section-label">{label}</span>
      <div className="skills-tags">
        {skills.map((skill, i) => (
          <motion.span
            key={skill.name}
            className="skill-tag"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.25 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}
