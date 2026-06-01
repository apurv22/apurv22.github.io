import { skills } from '../data/skills'

export function Skills() {
  return (
    <section id="skills" className="section">
      <p className="section-eyebrow">Skills</p>
      <h2 className="section-title">Tools I use, day to day.</h2>
      <p className="text-slate-400 mb-10 max-w-3xl">
        The stacks I'm productive in today. Heaviest hours are in Python and Java for backend
        services, PySpark and Airflow for data, and AWS for everything else.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group) => (
          <div key={group.category} className="card">
            <h3 className="text-lg mb-4 text-accent font-mono">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
