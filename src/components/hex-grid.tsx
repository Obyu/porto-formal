"use client"

import { useEffect, useRef } from "react"

export function HexGrid() {
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

    // Hex grid properties
    const hexSize = 30
    const hexHeight = hexSize * Math.sqrt(3)
    const hexWidth = hexSize * 2
    const hexVertSpace = hexHeight
    const hexHorizSpace = hexWidth * 0.75

    // Animation properties
    let time = 0

    const drawHex = (x: number, y: number, time: number) => {
      const pulseIntensity = (Math.sin(time * 0.001 + x * 0.01 + y * 0.01) + 1) * 0.5
      const size = hexSize * (0.8 + pulseIntensity * 0.2)

      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + pulseIntensity * 0.1})`
      ctx.lineWidth = 1

      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = ((2 * Math.PI) / 6) * i
        const hx = x + size * Math.cos(angle)
        const hy = y + size * Math.sin(angle)
        if (i === 0) {
          ctx.moveTo(hx, hy)
        } else {
          ctx.lineTo(hx, hy)
        }
      }
      ctx.closePath()
      ctx.stroke()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / hexHorizSpace) + 1
      const rows = Math.ceil(canvas.height / hexVertSpace) + 1

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * hexHorizSpace + (row % 2 === 0 ? 0 : hexHorizSpace / 2)
          const y = row * hexVertSpace
          drawHex(x, y, time + x + y)
        }
      }

      time += 16
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
