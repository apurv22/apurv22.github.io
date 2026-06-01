import { useCallback, useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { MermaidDiagram } from './MermaidDiagram'

export function ZoomableDiagram({ chart, id }: { chart: string; id: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

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
        <TransformWrapper
          initialScale={1}
          minScale={0.4}
          maxScale={4}
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
                contentStyle={{ width: '100%', height: '100%' }}
              >
                <div className="flex items-center justify-center w-full h-full p-6">
                  <MermaidDiagram chart={chart} id={id} zoomable />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
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
