"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface SkillBadgeProps {
  name: string
  level: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 100)
    return () => clearTimeout(timer)
  }, [level])

  return (
    <div className="bg-black/60 backdrop-blur-sm border border-neon-blue/30 rounded-lg p-3 w-[calc(50%-0.75rem)] md:w-[calc(33.333%-0.75rem)] hover:border-neon-cyan transition-colors">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-white font-mono">{name}</span>
        <span className="text-xs text-neon-cyan">{level}%</span>
      </div>
      <Progress value={progress} className="h-2" indicatorColor="bg-gradient-to-r from-neon-blue to-neon-cyan" />
    </div>
  )
}
