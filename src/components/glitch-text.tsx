"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  intensity?: "low" | "medium" | "high"
}

export default function GlitchText({ children, className, intensity = "medium" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      },
      intensity === "high" ? 2000 : intensity === "medium" ? 4000 : 6000,
    )

    return () => clearInterval(glitchInterval)
  }, [intensity])

  return (
    <span className={cn("relative inline-block", className)}>
      <span className={cn("relative z-10", isGlitching && "animate-glitch")}>{children}</span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 z-0 text-neon-pink opacity-70 animate-glitch-1">{children}</span>
          <span className="absolute top-0 left-0 z-0 text-neon-cyan opacity-70 animate-glitch-2">{children}</span>
        </>
      )}
    </span>
  )
}
