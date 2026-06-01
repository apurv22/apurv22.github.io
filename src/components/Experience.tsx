import { jobs, education, certifications } from '../data/experience'

export function Experience() {
  return (
    <section id="experience" className="section">
      <p className="section-eyebrow">Experience</p>
      <h2 className="section-title">Where I've worked.</h2>

      <div className="mt-10 space-y-12">
        {jobs.map((job) => (
          <article key={job.company} className="border-l-2 border-slate-800 pl-6 md:pl-8 relative">
            <span className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-accent" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
              <h3 className="text-2xl">{job.company}</h3>
              <span className="text-slate-500 font-mono text-sm">{job.period}</span>
            </div>
            <p className="text-slate-400 mb-4">{job.location}</p>
            <ul className="flex flex-wrap gap-2 mb-6">
              {job.roles.map((role) => (
                <li key={role.title} className="chip-accent">
                  {role.title} <span className="text-slate-500 ml-2">{role.dates}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-6">
              {job.highlights.map((highlight) => (
                <div key={highlight.team}>
                  <p className="text-slate-200 font-medium">
                    {highlight.team}{' '}
                    <span className="text-slate-500 font-normal font-mono text-sm">
                      · {highlight.period}
                    </span>
                  </p>
                  <ul className="mt-2 space-y-2 text-slate-400">
                    {highlight.bullets.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-accent mt-1">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div>
          <h3 className="text-xl mb-4 text-accent font-mono">Education</h3>
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.school} className="card">
                <p className="text-slate-200 font-medium">{e.school}</p>
                <p className="text-slate-400 text-sm">{e.degree}</p>
                <p className="text-slate-500 text-sm font-mono mt-2">
                  {e.period}
                  {e.gpa ? ` · GPA ${e.gpa}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl mb-4 text-accent font-mono">Certifications & Awards</h3>
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.name} className="card">
                <p className="text-slate-200">{c.name}</p>
                <p className="text-slate-500 text-sm font-mono mt-1">
                  {c.issuer} · {c.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
