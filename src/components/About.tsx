import { profile } from '../data/profile'

export function About() {
  return (
    <section id="about" className="section">
      <p className="section-eyebrow">About</p>
      <h2 className="section-title">A quick intro.</h2>
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-4 text-slate-400 leading-relaxed">
          {profile.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="md:border-l md:border-slate-800 md:pl-8 text-sm">
          <dl className="space-y-3 text-slate-400">
            <div>
              <dt className="text-slate-500">Currently</dt>
              <dd className="text-slate-200">{profile.title}, Capital One</dd>
            </div>
            <div>
              <dt className="text-slate-500">Based in</dt>
              <dd className="text-slate-200">{profile.location}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Open to</dt>
              <dd className="text-slate-200">Senior / Staff / Principal SWE roles</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
