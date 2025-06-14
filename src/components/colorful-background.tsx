"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function ColorfulBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX / width - 0.5) * 2 // -1 to 1
      const y = (clientY / height - 0.5) * 2 // -1 to 1

      const blobs = containerRef.current.querySelectorAll(".blob")

      blobs.forEach((blob, i) => {
        const factor = i % 2 === 0 ? 1 : -1
        const speed = (i + 1) * 2
        const moveX = x * speed * factor
        const moveY = y * speed * factor
        ;(blob as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden opacity-20 sm:opacity-30">
      {/* Colorful blobs */}
      <motion.div
        className="blob absolute top-[10%] left-[20%] w-[40vw] h-[40vw] sm:w-[30vw] sm:h-[30vw] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 blur-[80px] sm:blur-[100px]"
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="blob absolute top-[40%] right-[10%] w-[35vw] h-[35vw] sm:w-[25vw] sm:h-[25vw] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-[80px] sm:blur-[100px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <motion.div
        className="blob absolute bottom-[10%] left-[30%] w-[30vw] h-[30vw] sm:w-[20vw] sm:h-[20vw] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 blur-[80px] sm:blur-[100px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
      />

      <motion.div
        className="blob absolute top-[60%] left-[10%] w-[25vw] h-[25vw] sm:w-[15vw] sm:h-[15vw] rounded-full bg-gradient-to-r from-green-400 to-emerald-500 blur-[80px] sm:blur-[100px]"
        animate={{
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 3,
        }}
      />
    </div>
  )
}
