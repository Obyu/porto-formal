"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorFollowerProps {
  cursorPosition: { x: number; y: number }
}

export default function CursorFollower({ cursorPosition }: CursorFollowerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [clickEffect, setClickEffect] = useState(false)
  const [hoverElement, setHoverElement] = useState<string | null>(null)

  useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleClick = () => {
      setClickEffect(true)
      setTimeout(() => setClickEffect(false), 500)
    }

    // Track hover state on interactive elements
    const handleElementMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setHoverElement("interactive")
      } else if (target.classList.contains("hover-effect") || target.closest(".hover-effect")) {
        setHoverElement("effect")
      }
    }

    const handleElementMouseLeave = () => {
      setHoverElement(null)
    }

    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("click", handleClick)
    document.addEventListener("mouseover", handleElementMouseEnter)
    document.addEventListener("mouseout", handleElementMouseLeave)

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("click", handleClick)
      document.removeEventListener("mouseover", handleElementMouseEnter)
      document.removeEventListener("mouseout", handleElementMouseLeave)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main cursor */}
          <motion.div
            className="fixed pointer-events-none z-50 mix-blend-difference"
            animate={{
              x: cursorPosition.x - 5,
              y: cursorPosition.y - 5,
              scale: hoverElement ? 1.5 : 1,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              restDelta: 0.001,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="w-3 h-3 bg-everest-snow rounded-full"
              style={{
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              }}
            />
          </motion.div>

          {/* Cursor trail */}
          <motion.div
            className="fixed pointer-events-none z-40"
            animate={{
              x: cursorPosition.x - 15,
              y: cursorPosition.y - 15,
              scale: hoverElement ? 2 : 1,
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 200,
              restDelta: 0.001,
              delay: 0.02,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="w-10 h-10 bg-everest-green rounded-full opacity-20"
              style={{
                filter: "blur(8px)",
              }}
            />
          </motion.div>

          {/* Click effect */}
          <AnimatePresence>
            {clickEffect && (
              <motion.div
                className="fixed pointer-events-none z-30"
                style={{
                  left: cursorPosition.x,
                  top: cursorPosition.y,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 3, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-10 h-10 border-2 border-everest-green rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}
