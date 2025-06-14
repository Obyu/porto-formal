"use client"

import { useEffect, useState } from "react"

interface FarmerCharacterProps {
  season: string
}

export default function FarmerCharacter({ season }: FarmerCharacterProps) {
  const [frame, setFrame] = useState(0)
  const [direction, setDirection] = useState("down")
  const totalFrames = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % totalFrames)
    }, 250)

    // Randomly change direction every few seconds
    const directionInterval = setInterval(() => {
      const directions = ["down", "up", "left", "right"]
      setDirection(directions[Math.floor(Math.random() * directions.length)])
    }, 3000)

    return () => {
      clearInterval(interval)
      clearInterval(directionInterval)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={`farmer-character season-${season}`}>
        <div className={`farmer-sprite farmer-${direction}-${frame}`}></div>
      </div>
    </div>
  )
}
