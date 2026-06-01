import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

let initialized = false
function ensureInit() {
  if (initialized) return
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'JetBrains Mono, ui-monospace, Menlo, monospace',
    themeVariables: {
      darkMode: true,
      background: '#0f172a',
      primaryColor: '#1e293b',
      primaryTextColor: '#e2e8f0',
      primaryBorderColor: '#22d3ee',
      lineColor: '#475569',
      secondaryColor: '#0f172a',
      tertiaryColor: '#0f172a',
      clusterBkg: '#0b1220',
      clusterBorder: '#334155',
    },
    flowchart: { htmlLabels: true, curve: 'basis' },
  })
  initialized = true
}

export function MermaidDiagram({ chart, id }: { chart: string; id: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureInit()
    let cancelled = false
    const render = async () => {
      if (!ref.current) return
      try {
        const { svg } = await mermaid.render(`mermaid-${id}-${Math.random().toString(36).slice(2)}`, chart)
        if (!cancelled && ref.current) {
          ref.current.innerHTML = svg
        }
      } catch (e) {
        if (ref.current) {
          ref.current.innerHTML = `<pre class="text-red-400 text-xs">Diagram render error: ${(e as Error).message}</pre>`
        }
      }
    }
    void render()
    return () => {
      cancelled = true
    }
  }, [chart, id])

  return <div ref={ref} className="mermaid w-full overflow-x-auto" />
}
