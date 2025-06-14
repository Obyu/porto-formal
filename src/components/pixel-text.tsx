"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PixelTextProps {
  children: React.ReactNode
  className?: string
}

export default function PixelText({ children, className }: PixelTextProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 200)
    }, 5000)

    return () => clearInterval(animationInterval)
  }, [])

  return <span className={cn("relative inline-block", className, isAnimating && "animate-pixel-text")}>{children}</span>
}
