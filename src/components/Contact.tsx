import { profile } from '../data/profile'

export function Contact() {
  return (
    <section id="contact" className="section">
      <p className="section-eyebrow">Contact</p>
      <h2 className="section-title">Let's talk.</h2>
      <p className="text-slate-400 max-w-3xl mb-8">
        Best way to reach me is email or LinkedIn. I read every message, even if it takes me a
        couple of days to respond.
      </p>

      <div className="grid sm:grid-cols-3 gap-4">
        <a href={`mailto:${profile.email}`} className="card hover:border-accent group">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-mono mb-2">Email</p>
          <p className="text-slate-100 group-hover:text-accent break-all">{profile.email}</p>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="card hover:border-accent group">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-mono mb-2">LinkedIn</p>
          <p className="text-slate-100 group-hover:text-accent">in/apurvpatel</p>
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="card hover:border-accent group">
          <p className="text-slate-500 text-xs uppercase tracking-widest font-mono mb-2">GitHub</p>
          <p className="text-slate-100 group-hover:text-accent">@apurv22</p>
        </a>
      </div>
    </section>
  )
}
