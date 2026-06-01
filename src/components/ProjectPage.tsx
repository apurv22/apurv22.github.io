import type { Project } from '../data/projects'
import { ZoomableDiagram } from './ZoomableDiagram'

export function ProjectPage({ project }: { project: Project }) {
  return (
    <article className="section pt-12">
      <a
        href="#/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-accent mb-8"
      >
        <span aria-hidden>←</span> Back to projects
      </a>

      <header className="mb-10">
        <p className="section-eyebrow">Project</p>
        <h1 className="text-4xl md:text-5xl font-mono text-accent mb-3">{project.name}</h1>
        <p className="text-xl text-slate-300">{project.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn">
            View on GitHub
          </a>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
          Summary
        </h2>
        <p className="text-slate-300 leading-relaxed max-w-4xl">{project.summary}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span key={t} className="chip-accent">
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
          Features
        </h2>
        <ul className="space-y-2 text-slate-300 max-w-4xl">
          {project.features.map((f, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent mt-1">›</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
          Architecture
        </h2>
        <ZoomableDiagram chart={project.mermaid} id={project.slug} />
      </section>

      <section className="flex flex-wrap gap-3 pt-8 border-t border-slate-800">
        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn">
          View on GitHub
        </a>
        <a href="#/" className="btn-outline">
          Back to projects
        </a>
      </section>
    </article>
  )
}
