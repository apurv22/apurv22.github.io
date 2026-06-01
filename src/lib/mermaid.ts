import mermaid from 'mermaid'

let initialized = false

export function ensureMermaid() {
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

export async function renderMermaid(chart: string, id: string): Promise<string> {
  ensureMermaid()
  const uniqueId = `mermaid-${id}-${Math.random().toString(36).slice(2)}`
  const { svg } = await mermaid.render(uniqueId, chart)
  return svg
}
