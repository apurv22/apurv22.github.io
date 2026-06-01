import type { Project } from '../data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={`#/projects/${project.slug}`}
      className="card text-left group flex flex-col h-full"
    >
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <h3 className="text-xl font-mono text-accent group-hover:underline">{project.name}</h3>
      </div>
      <p className="text-slate-400 text-sm mb-4">{project.tagline}</p>
      <p className="text-slate-500 text-sm mb-5 line-clamp-3">{project.summary}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.technologies.slice(0, 6).map((t) => (
          <span key={t} className="chip text-[10px] py-0.5 px-2">
            {t}
          </span>
        ))}
        {project.technologies.length > 6 && (
          <span className="chip text-[10px] py-0.5 px-2">
            +{project.technologies.length - 6}
          </span>
        )}
      </div>
      <span className="text-accent text-sm mt-5 inline-flex items-center gap-1">
        View details <span aria-hidden>→</span>
      </span>
    </a>
  )
}
