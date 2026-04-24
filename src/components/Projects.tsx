import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    id: 1,
    number: '01',
    title: 'ClearView',
    category: 'E-Commerce',
    description:
      'A premium eyewear e-commerce experience. Full-featured storefront with product catalog, filtering, cart, wishlist, and user authentication.',
    url: 'https://clearview-gamma-bice.vercel.app/',
    tags: ['Angular', 'TypeScript', 'E-Commerce'],
    year: '2024',
  },
  {
    id: 2,
    number: '02',
    title: 'Urban Protein Project',
    category: 'Admin Dashboard',
    description:
      'A full-featured business admin dashboard for Urban Protein Project. Manages customers, products, inventory, orders, and provides rich sales analytics.',
    url: 'https://upp-gold.vercel.app/dashboard',
    tags: ['Angular', 'TypeScript', 'Dashboard'],
    year: '2025',
  },
  {
    id: 3,
    number: '03',
    title: 'Aurum',
    category: 'Brand Website',
    description:
      'An elevated brand showcase for a men\'s luxury jewelry label. Minimal, editorial design with immersive scroll animations and a refined product collection.',
    url: 'https://aurum-peach.vercel.app/',
    tags: ['Next.js', 'Framer Motion', 'Brand'],
    year: '2025',
  },
]

export default function Projects() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="projects__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="section-label">Selected Work</span>
          <h2 className="projects__heading">
            Projects
          </h2>
        </motion.div>

        <div className="projects__list">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Project {
  id: number
  number: string
  title: string
  category: string
  description: string
  url: string
  tags: string[]
  year: string
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="project-card__link"
        aria-label={`View ${project.title}`}
      >
        <div className="project-card__top">
          <div className="project-card__meta">
            <span className="project-card__number">{project.number}</span>
            <span className="project-card__category">{project.category}</span>
          </div>
          <div className="project-card__arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        <div className="project-card__body">
          <h3 className="project-card__title">{project.title}</h3>
          <p className="project-card__desc">{project.description}</p>
        </div>

        <div className="project-card__bottom">
          <div className="project-card__tags">
            {project.tags.map(tag => (
              <span key={tag} className="project-card__tag">{tag}</span>
            ))}
          </div>
        </div>

        <div className="project-card__bar" />
      </a>
    </motion.div>
  )
}
