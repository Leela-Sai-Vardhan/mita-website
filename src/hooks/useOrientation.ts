import { useState, useEffect } from 'react'

export function useOrientation() {
  const [portrait, setPortrait] = useState(
    () => window.innerWidth < window.innerHeight
  )

  useEffect(() => {
    const check = () => setPortrait(window.innerWidth < window.innerHeight)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return portrait
}
