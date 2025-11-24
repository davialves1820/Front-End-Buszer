import { useEffect, useRef } from 'react'

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const particleCount = 50

    // Rainbow colors palette
    const rainbowColors = [
      { r: 14, g: 116, b: 144 }, // Teal
      { r: 59, g: 130, b: 246 }, // Azul
      { r: 139, g: 92, b: 246 }, // Roxo
      { r: 236, g: 72, b: 153 }, // Rosa
      { r: 251, g: 146, b: 60 }, // Laranja
      { r: 34, g: 197, b: 94 } // Verde
    ]

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      baseColor: { r: number; g: number; b: number }
      hue: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.baseColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)]
        this.hue = Math.random() * 360
      }

      getColor() {
        // Calcula a distância do mouse
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Muda a cor com base na distância do mouse
        const maxDistance = 200
        if (distance < maxDistance) {
          const colorIndex = Math.floor((distance / maxDistance) * rainbowColors.length)
          const color = rainbowColors[colorIndex] || this.baseColor
          const alpha = Math.random() * 0.4 + 0.2
          return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`
        }

        const alpha = Math.random() * 0.3 + 0.1
        return `rgba(${this.baseColor.r}, ${this.baseColor.g}, ${this.baseColor.b}, ${alpha})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Interação com o mouse
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 150) {
          const force = (150 - distance) / 150
          this.x -= (dx / distance) * force * 2
          this.y -= (dy / distance) * force * 2
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        if (!ctx) return
        const color = this.getColor()
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Adiciona o glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = color
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Conecta as partículas com rainbow effect
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 120) {
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
            const alpha = 0.15 * (1 - distance / 120)
            gradient.addColorStop(0, a.getColor().replace(/[\d.]+\)$/g, `${alpha})`))
            gradient.addColorStop(1, b.getColor().replace(/[\d.]+\)$/g, `${alpha})`))
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
