"use client"

import { useEffect, useRef } from "react"

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Cloud properties
    const clouds: { x: number; y: number; speed: number; size: number }[] = []
    for (let i = 0; i < 10; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height / 3),
        speed: 0.2 + Math.random() * 0.3,
        size: 30 + Math.random() * 50,
      })
    }

    // Star properties
    const stars: { x: number; y: number; size: number; blink: number }[] = []
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 2,
        blink: Math.random() * 100,
      })
    }

    const drawCloud = (x: number, y: number, size: number) => {
      ctx.fillStyle = "#8ba9d9"
      ctx.fillRect(x, y, size, size / 2)
      ctx.fillRect(x + size / 4, y - size / 4, size / 2, size / 2)
      ctx.fillRect(x - size / 4, y - size / 8, size / 2, size / 3)
      ctx.fillRect(x + size / 2, y - size / 8, size / 2, size / 3)
    }

    const drawStar = (x: number, y: number, size: number, blink: number) => {
      const time = Date.now() / 1000
      const visible = Math.sin(time + blink) > 0
      if (visible) {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(x, y, size, size)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        drawStar(star.x, star.y, star.size, star.blink)
      })

      // Draw and move clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed
        if (cloud.x > canvas.width) {
          cloud.x = -cloud.size
          cloud.y = Math.random() * (canvas.height / 3)
        }
        drawCloud(cloud.x, cloud.y, cloud.size)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />
}
