import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const EVENT = 'themechange'

function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('light') ? 'light' : 'dark'
}

export function useTheme(): { theme: Theme; toggle: () => void; setTheme: (t: Theme) => void } {
  const [theme, setThemeState] = useState<Theme>(currentTheme)

  // Keep every hook instance (toggle button, each diagram) in sync.
  useEffect(() => {
    const onChange = () => setThemeState(currentTheme())
    window.addEventListener(EVENT, onChange)
    return () => window.removeEventListener(EVENT, onChange)
  }, [])

  const setTheme = (t: Theme) => {
    document.documentElement.classList.toggle('light', t === 'light')
    try {
      localStorage.setItem(STORAGE_KEY, t)
    } catch {
      // ignore storage failures (e.g. private mode)
    }
    setThemeState(t)
    window.dispatchEvent(new Event(EVENT))
  }

  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return { theme, toggle, setTheme }
}
