"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxMountainsProps {
  timeOfDay: string
}

export default function ParallaxMountains({ timeOfDay }: ParallaxMountainsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { width, height } = containerRef.current.getBoundingClientRect()

      const x = (clientX / width - 0.5) * 2 // -1 to 1
      const y = (clientY / height - 0.5) * 2 // -1 to 1

      const mountains = containerRef.current.querySelectorAll(".mountain")
      const clouds = containerRef.current.querySelectorAll(".cloud")

      mountains.forEach((mountain, i) => {
        const depth = i + 1
        const moveX = (x * 10) / depth
        const moveY = (y * 5) / depth
        ;(mountain as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
      })

      clouds.forEach((cloud, i) => {
        const depth = i + 1
        const moveX = (x * 20) / depth
        const moveY = (y * 10) / depth
        ;(cloud as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {/* Far mountains */}
      <div
        className={cn(
          "mountain absolute bottom-0 left-0 right-0 h-[30vh] transition-colors duration-1000",
          timeOfDay === "day"
            ? "bg-everest-mountain-light"
            : timeOfDay === "sunset"
              ? "bg-everest-mountain-sunset"
              : "bg-everest-mountain-night",
        )}
        style={{
          maskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 L0,200 Q250,50 500,150 T1000,100 L1000,300 Z' fill='%23000'/%3E%3C/svg%3E\")",
          WebkitMaskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 L0,200 Q250,50 500,150 T1000,100 L1000,300 Z' fill='%23000'/%3E%3C/svg%3E\")",
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      />

      {/* Middle mountains */}
      <div
        className={cn(
          "mountain absolute bottom-0 left-0 right-0 h-[25vh] transition-colors duration-1000",
          timeOfDay === "day"
            ? "bg-everest-mountain"
            : timeOfDay === "sunset"
              ? "bg-everest-mountain-sunset-mid"
              : "bg-everest-mountain-night-mid",
        )}
        style={{
          maskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 L0,150 Q200,50 400,200 T700,100 T1000,150 L1000,300 Z' fill='%23000'/%3E%3C/svg%3E\")",
          WebkitMaskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 L0,150 Q200,50 400,200 T700,100 T1000,150 L1000,300 Z' fill='%23000'/%3E%3C/svg%3E\")",
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      />

      {/* Near mountains */}
      <div
        className={cn(
          "mountain absolute bottom-0 left-0 right-0 h-[20vh] transition-colors duration-1000",
          timeOfDay === "day"
            ? "bg-everest-mountain-dark"
            : timeOfDay === "sunset"
              ? "bg-everest-mountain-sunset-dark"
              : "bg-everest-mountain-night-dark",
        )}
        style={{
          maskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 L0,200 Q100,150 200,220 T400,180 T600,220 T800,170 T1000,200 L1000,300 Z' fill='%23000'/%3E%3C/svg%3E\")",
          WebkitMaskImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 1000 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,300 L0,200 Q100,150 200,220 T400,180 T600,220 T800,170 T1000,200 L1000,300 Z' fill='%23000'/%3E%3C/svg%3E\")",
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      />

      {/* Clouds */}
      <motion.div
        className="cloud absolute top-[10%] left-[10%] w-32 h-16 bg-white/80 rounded-full"
        animate={{
          x: [0, 20, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        style={{
          filter: "blur(4px)",
          opacity: timeOfDay === "night" ? 0.3 : 0.8,
        }}
      />

      <motion.div
        className="cloud absolute top-[15%] right-[20%] w-40 h-20 bg-white/80 rounded-full"
        animate={{
          x: [0, -30, 0],
          y: [0, 8, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
        style={{
          filter: "blur(5px)",
          opacity: timeOfDay === "night" ? 0.3 : 0.8,
        }}
      />

      <motion.div
        className="cloud absolute top-[5%] right-[40%] w-24 h-12 bg-white/80 rounded-full"
        animate={{
          x: [0, 15, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1,
        }}
        style={{
          filter: "blur(3px)",
          opacity: timeOfDay === "night" ? 0.3 : 0.8,
        }}
      />
    </div>
  )
}
