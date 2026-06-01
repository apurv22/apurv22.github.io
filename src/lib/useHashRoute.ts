import { useEffect, useState } from 'react'

export type Route =
  | { kind: 'home' }
  | { kind: 'project'; slug: string }

const PROJECT_RE = /^\/projects\/([^/]+)$/

function parse(hash: string): Route {
  // Treat anything after "#" as the path. Strip "?query" if present.
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  const path = raw.split('?')[0]

  // Landing-page in-page anchors like "#about" (no leading "/") are NOT routes.
  if (!path.startsWith('/')) return { kind: 'home' }

  const match = path.match(PROJECT_RE)
  if (match) return { kind: 'project', slug: match[1] }

  return { kind: 'home' }
}

export function useHashRoute(): { route: Route; navigate: (to: string) => void } {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === 'undefined' ? { kind: 'home' } : parse(window.location.hash),
  )

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])

  const navigate = (to: string) => {
    window.location.hash = to.startsWith('#') ? to : `#${to}`
  }

  return { route, navigate }
}
