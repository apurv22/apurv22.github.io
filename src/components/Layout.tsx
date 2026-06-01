import type { ReactNode } from 'react'
import { profile } from '../data/profile'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/80 border-b border-slate-800">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#/" className="font-mono text-accent font-semibold">
            apurv<span className="text-slate-100">.dev</span>
          </a>
          <ul className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-accent transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="flex-1" id="top">
        {children}
      </main>

      <footer className="border-t border-slate-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {profile.name}. Built with React + Vite.</p>
          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent">
              LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
