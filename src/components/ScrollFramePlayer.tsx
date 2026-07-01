import { useRef, useEffect } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'

const TOTAL_FRAMES = 211

function pad(n: number) {
  return String(n).padStart(3, '0')
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const ir = img.naturalWidth / img.naturalHeight
  const cr = cw / ch
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

  if (ir > cr) {
    sw = img.naturalHeight * cr
    sx = (img.naturalWidth - sw) / 2
  } else {
    sh = img.naturalWidth / cr
    sy = (img.naturalHeight - sh) / 2
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
}

function ensureCanvasSize(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  const w = Math.round(rect.width * dpr)
  const h = Math.round(rect.height * dpr)

  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w
    canvas.height = h
  }
  return { w, h }
}

export default function ScrollFramePlayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const loadedRef = useRef(false)
  const progress = useScrollProgress()

  // Preload all images
  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/frames/ezgif-frame-${pad(i)}.jpg`
      images.push(img)
    }

    imagesRef.current = images

    // Initial dark fill
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ensureCanvasSize(canvas)
    ctx.fillStyle = '#0D0D0D'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Draw current frame on scroll
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = ensureCanvasSize(canvas)

    const frameIndex = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    )

    const img = imagesRef.current[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    // No clearRect — drawImage overwrites everything
    drawCover(ctx, img, w, h)
  }, [progress])

  // Redraw on resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const { w, h } = ensureCanvasSize(canvas)

      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      )

      const img = imagesRef.current[frameIndex]
      if (!img || !img.complete || img.naturalWidth === 0) return

      drawCover(ctx, img, w, h)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [progress])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
