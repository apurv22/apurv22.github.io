import { profile } from '../data/profile'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(230,57,70,0.15),transparent_60%)]"
      />
      <div className="section relative pt-24 md:pt-32 pb-16">
        <p className="section-eyebrow">Hi, I'm</p>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{profile.name}</h1>
        <p className="text-2xl md:text-3xl text-slate-300 mb-6">
          {profile.title}{' '}
          <span className="text-slate-500">·</span>{' '}
          <span className="text-slate-400">{profile.location}</span>
        </p>
        <p className="max-w-3xl text-lg text-slate-400 mb-8 leading-relaxed">{profile.intro}</p>

        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="btn">
            View projects
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-outline">
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
