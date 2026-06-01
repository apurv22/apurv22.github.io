import { useEffect } from 'react'
import { Layout } from './components/Layout'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Experience } from './components/Experience'
import { ProjectsGrid } from './components/ProjectsGrid'
import { ResumeSection } from './components/ResumeSection'
import { Contact } from './components/Contact'
import { ProjectPage } from './components/ProjectPage'
import { useHashRoute } from './lib/useHashRoute'
import { projects } from './data/projects'

export default function App() {
  const { route } = useHashRoute()

  useEffect(() => {
    if (route.kind === 'project') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      return
    }
    // On home: if the hash points at an in-page anchor (e.g. "#about"),
    // scroll to it after this render so the section is mounted.
    const hash = window.location.hash
    if (!hash || hash === '#/' || hash === '#') return
    const id = hash.slice(1)
    if (id.startsWith('/')) return
    requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    })
  }, [route])

  if (route.kind === 'project') {
    const project = projects.find((p) => p.slug === route.slug)
    return (
      <Layout>
        {project ? (
          <ProjectPage project={project} />
        ) : (
          <section className="section">
            <p className="section-eyebrow">404</p>
            <h2 className="section-title">Project not found.</h2>
            <p className="text-slate-400 mb-6">
              No project matches <code className="text-accent">{route.slug}</code>.
            </p>
            <a href="#/" className="btn">
              Back to home
            </a>
          </section>
        )}
      </Layout>
    )
  }

  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <ProjectsGrid />
      <ResumeSection />
      <Contact />
    </Layout>
  )
}
