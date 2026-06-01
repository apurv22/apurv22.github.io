import { useEffect } from 'react'
import type { Project } from '../data/projects'
import { MermaidDiagram } from './MermaidDiagram'

export function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 rounded-xl max-w-5xl w-full my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h3 className="text-2xl font-mono text-accent">{project.name}</h3>
            <p className="text-slate-400 text-sm mt-1">{project.tagline}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-slate-100 text-2xl leading-none px-2"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
              Summary
            </h4>
            <p className="text-slate-300 leading-relaxed">{project.summary}</p>
          </section>

          <section>
            <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="chip-accent">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
              Features
            </h4>
            <ul className="space-y-2 text-slate-300">
              {project.features.map((f, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent mt-1">›</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-3 font-mono">
              Architecture
            </h4>
            <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4">
              <MermaidDiagram chart={project.mermaid} id={project.slug} />
            </div>
          </section>

          <section className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn">
              View on GitHub
            </a>
            <button onClick={onClose} className="btn-outline">
              Close
            </button>
          </section>
        </div>
      </div>
    </div>
  )
}
