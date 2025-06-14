"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface SkillBarProps {
  name: string
  level: number
  color?: string
}

export default function SkillBar({ name, level, color = "from-primary to-purple-500" }: SkillBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(level), 300)
    return () => clearTimeout(timer)
  }, [level])

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 group hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-gray-900 group-hover:text-primary transition-colors">{name}</span>
        <span className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
          {level}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
