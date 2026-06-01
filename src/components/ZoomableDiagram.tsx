import { useCallback, useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { renderMermaid } from '../lib/mermaid'

export function ZoomableDiagram({ chart, id }: { chart: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setSvg(null)
    setError(null)
    renderMermaid(chart, id)
      .then((rendered) => {
        if (!cancelled) setSvg(rendered)
      })
      .catch((e) => {
        if (!cancelled) setError((e as Error).message)
      })
    return () => {
      cancelled = true
    }
  }, [chart, id])

  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void containerRef.current.requestFullscreen()
    }
  }, [])

  return (
    <div>
      <div
        ref={containerRef}
        className={`relative bg-slate-950/60 border border-slate-800 rounded-lg overflow-hidden ${
          isFullscreen ? 'w-screen h-screen' : 'h-[70vh]'
        }`}
      >
        {error ? (
          <pre className="text-red-400 text-xs p-4">{error}</pre>
        ) : !svg ? (
          <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-mono">
            Rendering diagram…
          </div>
        ) : (
          <TransformWrapper
            initialScale={1}
            minScale={0.3}
            maxScale={5}
            wheel={{ step: 0.1 }}
            doubleClick={{ disabled: false, step: 0.5 }}
            limitToBounds={false}
            centerOnInit
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="absolute top-3 right-3 z-10 flex gap-1.5 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-1 shadow-lg">
                  <ToolbarButton onClick={() => zoomIn()} label="Zoom in">
                    +
                  </ToolbarButton>
                  <ToolbarButton onClick={() => zoomOut()} label="Zoom out">
                    −
                  </ToolbarButton>
                  <ToolbarButton onClick={() => resetTransform()} label="Reset">
                    ⟲
                  </ToolbarButton>
                  <ToolbarButton
                    onClick={toggleFullscreen}
                    label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                  >
                    {isFullscreen ? '⤡' : '⛶'}
                  </ToolbarButton>
                </div>
                <TransformComponent
                  wrapperStyle={{ width: '100%', height: '100%' }}
                >
                  <div
                    className="zoom-svg p-6"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        )}
      </div>
      <p className="text-xs text-slate-500 mt-2 font-mono">
        Drag to pan · Scroll to zoom · Double-click to zoom in
      </p>
    </div>
  )
}

function ToolbarButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void
  label: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-800 text-slate-300 hover:text-accent transition-colors text-base"
    >
      {children}
    </button>
  )
}
