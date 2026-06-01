import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'

export function ProjectsGrid() {
  return (
    <section id="projects" className="section">
      <p className="section-eyebrow">Projects</p>
      <h2 className="section-title">Things I've built on the side.</h2>
      <p className="text-slate-400 mb-10 max-w-3xl">
        Five production-grade Python projects. Each one is a complete system — code, tests, Docker
        infra, CI — that I built end-to-end to explore the design space.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}
