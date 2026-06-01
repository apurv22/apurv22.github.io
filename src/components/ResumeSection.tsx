import { profile } from '../data/profile'

export function ResumeSection() {
  return (
    <section id="resume" className="section">
      <p className="section-eyebrow">Resume</p>
      <h2 className="section-title">The one-pager.</h2>
      <div className="card flex flex-col md:flex-row md:items-center gap-6 mt-8">
        <div className="flex-1">
          <p className="text-slate-300 mb-2">
            A short, no-fluff summary of roles, tech, and impact.
          </p>
          <p className="text-slate-500 text-sm">
            Master SWE resume · PDF · updated regularly
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={profile.resumePath} target="_blank" rel="noreferrer" className="btn">
            View resume
          </a>
          <a href={profile.resumePath} download className="btn-outline">
            Download PDF
          </a>
        </div>
      </div>
    </section>
  )
}
