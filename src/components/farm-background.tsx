"use client"

import { useEffect, useRef } from "react"

interface FarmBackgroundProps {
  season: string
}

export default function FarmBackground({ season }: FarmBackgroundProps) {
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

    // Crop properties
    const crops: { x: number; y: number; type: number; growth: number }[] = []
    for (let i = 0; i < 30; i++) {
      crops.push({
        x: Math.random() * canvas.width,
        y: canvas.height - 100 - Math.random() * 200,
        type: Math.floor(Math.random() * 4),
        growth: Math.random(),
      })
    }

    const drawCloud = (x: number, y: number, size: number) => {
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(x, y, size, size / 2)
      ctx.fillRect(x + size / 4, y - size / 4, size / 2, size / 2)
      ctx.fillRect(x - size / 4, y - size / 8, size / 2, size / 3)
      ctx.fillRect(x + size / 2, y - size / 8, size / 2, size / 3)
    }

    const drawCrop = (x: number, y: number, type: number, growth: number) => {
      const size = 16
      const growthStage = Math.floor(growth * 3)

      // Draw soil
      ctx.fillStyle = "#5c4a3d"
      ctx.fillRect(x, y + size, size, size / 2)

      // Draw crop based on season and type
      let cropColor = "#4ade80" // Default green

      if (season === "spring") {
        cropColor = type === 0 ? "#4ade80" : type === 1 ? "#22c55e" : type === 2 ? "#86efac" : "#bbf7d0"
      } else if (season === "summer") {
        cropColor = type === 0 ? "#facc15" : type === 1 ? "#eab308" : type === 2 ? "#fde047" : "#fef08a"
      } else if (season === "fall") {
        cropColor = type === 0 ? "#f97316" : type === 1 ? "#ea580c" : type === 2 ? "#fb923c" : "#fdba74"
      } else if (season === "winter") {
        cropColor = type === 0 ? "#e5e7eb" : type === 1 ? "#d1d5db" : type === 2 ? "#f3f4f6" : "#f9fafb"
      }

      if (growthStage > 0) {
        // Draw stem
        ctx.fillStyle = "#65a30d"
        ctx.fillRect(x + size / 2 - 1, y + size / 2, 2, size / 2)

        // Draw leaves/crop
        ctx.fillStyle = cropColor
        if (growthStage === 1) {
          ctx.fillRect(x + size / 2 - 3, y + size / 2, 6, 3)
        } else {
          ctx.fillRect(x + size / 2 - 6, y + 2, 12, 6)
          ctx.fillRect(x + size / 2 - 3, y + 8, 6, 4)
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw sky color based on season
      let skyColor = "#87CEEB" // Default sky blue
      if (season === "spring") {
        skyColor = "#87CEEB" // Light blue
      } else if (season === "summer") {
        skyColor = "#1E90FF" // Bright blue
      } else if (season === "fall") {
        skyColor = "#B0C4DE" // Light steel blue
      } else if (season === "winter") {
        skyColor = "#E0FFFF" // Light cyan
      }

      ctx.fillStyle = skyColor
      ctx.fillRect(0, 0, canvas.width, canvas.height / 2)

      // Draw and move clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed
        if (cloud.x > canvas.width) {
          cloud.x = -cloud.size
          cloud.y = Math.random() * (canvas.height / 3)
        }
        drawCloud(cloud.x, cloud.y, cloud.size)
      })

      // Draw crops
      crops.forEach((crop) => {
        drawCrop(crop.x, crop.y, crop.type, crop.growth)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [season])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-30" />
}
