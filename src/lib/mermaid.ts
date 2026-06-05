import mermaid from 'mermaid'

type Theme = 'light' | 'dark'

// Palette: #E63946 #F1FAEE #A8DADC #457B9D #1D3557
const THEMES = {
  dark: {
    theme: 'dark' as const,
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
  },
  light: {
    theme: 'base' as const,
    themeVariables: {
      darkMode: false,
      background: '#F1FAEE',
      primaryColor: '#FFFFFF',
      primaryTextColor: '#1D3557',
      primaryBorderColor: '#E63946',
      lineColor: '#457B9D',
      secondaryColor: '#A8DADC',
      tertiaryColor: '#DCF0F0',
      clusterBkg: '#F8FCF6',
      clusterBorder: '#457B9D',
    },
  },
}

function initMermaid(theme: Theme) {
  const { theme: base, themeVariables } = THEMES[theme]
  // Re-initialize on every render so theme toggles take effect; mermaid reads
  // the current config at render time.
  mermaid.initialize({
    startOnLoad: false,
    theme: base,
    securityLevel: 'loose',
    fontFamily: 'JetBrains Mono, ui-monospace, Menlo, monospace',
    themeVariables,
    flowchart: { htmlLabels: true, curve: 'basis' },
  })
}

export async function renderMermaid(
  chart: string,
  id: string,
  theme: Theme = 'light',
): Promise<string> {
  initMermaid(theme)
  const uniqueId = `mermaid-${id}-${Math.random().toString(36).slice(2)}`
  const { svg } = await mermaid.render(uniqueId, chart)
  return svg
}
