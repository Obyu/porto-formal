"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ForestParticlesProps {
  cursorPosition: { x: number; y: number }
}

export default function ForestParticles({ cursorPosition }: ForestParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const trees = containerRef.current.querySelectorAll(".tree")

    trees.forEach((tree) => {
      const rect = tree.getBoundingClientRect()
      const treeX = rect.left + rect.width / 2
      const treeY = rect.top + rect.height / 2

      const distX = cursorPosition.x - treeX
      const distY = cursorPosition.y - treeY
      const distance = Math.sqrt(distX * distX + distY * distY)

      const maxDistance = 300
      const influence = Math.max(0, 1 - distance / maxDistance)

      // Move trees slightly away from cursor
      const moveX = -distX * influence * 0.03
      const moveY = -distY * influence * 0.01
      ;(tree as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
    })
  }, [cursorPosition])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {/* Generate trees */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = 30 + Math.random() * 50
        const left = Math.random() * 100
        const bottom = Math.random() * 20
        const delay = Math.random() * 2

        return (
          <motion.div
            key={i}
            className="tree absolute"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay }}
            style={{
              left: `${left}%`,
              bottom: `${bottom}%`,
              width: size,
              height: size * 1.5,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 150' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50,0 L20,50 L35,50 L15,90 L35,90 L0,150 L100,150 L65,90 L85,90 L65,50 L80,50 Z' fill='%23355E3B'/%3E%3C/svg%3E\")",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            />
          </motion.div>
        )
      })}
    </div>
  )
}
