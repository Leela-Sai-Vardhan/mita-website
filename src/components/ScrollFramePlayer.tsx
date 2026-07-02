import { useRef, useEffect, useCallback } from 'react'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useOrientation } from '../hooks/useOrientation'

const TOTAL_FRAMES = 211

function pad(n: number) {
  return String(n).padStart(3, '0')
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  portrait: boolean
) {
  if (portrait) {
    // Rotate 90° so landscape image fills portrait screen
    ctx.save()
    ctx.translate(cw / 2, ch / 2)
    ctx.rotate(Math.PI / 2)

    // After rotation, the visible area is ch wide × cw tall
    const vw = ch
    const vh = cw

    const ir = img.naturalWidth / img.naturalHeight
    const cr = vw / vh
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight

    if (ir > cr) {
      sw = img.naturalHeight * cr
      sx = (img.naturalWidth - sw) / 2
    } else {
      sh = img.naturalWidth / cr
      sy = (img.naturalHeight - sh) / 2
    }

    ctx.drawImage(img, sx, sy, sw, sh, -vw / 2, -vh / 2, vw, vh)
    ctx.restore()
  } else {
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
  const portrait = useOrientation()

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = ensureCanvasSize(canvas)

    const img = imagesRef.current[frameIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    drawCover(ctx, img, w, h, portrait)
  }, [portrait])

  // Preload images & draw first frame once loaded
  useEffect(() => {
    if (loadedRef.current) return
    loadedRef.current = true
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()

      if (i === 1) {
        img.onload = () => drawFrame(0)
      }

      img.src = `/frames/ezgif-frame-${pad(i)}.jpg`
      images.push(img)
    }

    imagesRef.current = images

    // Try frame 0 right now (browser cache)
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = ensureCanvasSize(canvas)

    if (images[0]?.complete && images[0].naturalWidth > 0) {
      drawCover(ctx, images[0], w, h, portrait)
    } else {
      ctx.fillStyle = '#0D0D0D'
      ctx.fillRect(0, 0, w, h)
    }
  }, [drawFrame, portrait])

  // Draw frame on scroll progress change
  useEffect(() => {
    const frameIndex = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    )
    drawFrame(frameIndex)
  }, [progress, drawFrame])

  // Redraw on resize or orientation change
  useEffect(() => {
    const handleResize = () => {
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      )
      drawFrame(frameIndex)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [progress, drawFrame])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
