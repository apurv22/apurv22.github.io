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
      background: '#1D3557',
      primaryColor: '#274B6D',
      primaryTextColor: '#F1FAEE',
      primaryBorderColor: '#E63946',
      lineColor: '#457B9D',
      secondaryColor: '#1D3557',
      tertiaryColor: '#1D3557',
      clusterBkg: '#142539',
      clusterBorder: '#457B9D',
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
