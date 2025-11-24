import { useEffect, useRef } from 'react'

export const MouseGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`
        glowRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none z-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl transition-opacity duration-500"
      style={{
        background: 'radial-gradient(circle, rgba(14, 116, 144, 0.4) 0%, transparent 70%)'
      }}
    />
  )
}
