"use client"

import { useEffect, useRef } from "react"
import { Snowflake, Cloud, CloudRain } from "lucide-react"

interface WeatherEffectProps {
  weather: string
}

export default function WeatherEffect({ weather }: WeatherEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous weather elements
    const weatherElements = containerRef.current.querySelectorAll(".weather-element")
    weatherElements.forEach((el) => el.remove())

    if (weather === "clear") return

    // Create new weather elements
    const count = weather === "snow" ? 50 : weather === "rain" ? 100 : 10

    for (let i = 0; i < count; i++) {
      const element = document.createElement("div")
      element.classList.add("weather-element", weather)

      const size =
        weather === "snow"
          ? 5 + Math.random() * 10
          : weather === "rain"
            ? 1 + Math.random() * 2
            : 50 + Math.random() * 100

      const left = Math.random() * 100
      const animationDuration =
        weather === "snow"
          ? 10 + Math.random() * 20
          : weather === "rain"
            ? 0.5 + Math.random() * 1.5
            : 30 + Math.random() * 60

      const delay = Math.random() * animationDuration

      element.style.position = "absolute"
      element.style.left = `${left}%`
      element.style.top = `-${size}px`
      element.style.width = `${size}px`
      element.style.height = weather === "rain" ? `${size * 10}px` : `${size}px`

      if (weather === "snow") {
        element.style.borderRadius = "50%"
        element.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
        element.style.boxShadow = "0 0 10px rgba(255, 255, 255, 0.5)"
      } else if (weather === "rain") {
        element.style.backgroundColor = "rgba(200, 220, 255, 0.5)"
        element.style.borderRadius = "0"
      } else if (weather === "fog") {
        element.style.borderRadius = "50%"
        element.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
        element.style.filter = "blur(20px)"
      }

      element.style.animation = `fall-${weather} ${animationDuration}s linear ${delay}s infinite`

      containerRef.current.appendChild(element)
    }

    // Add keyframes for animations if they don't exist
    if (!document.querySelector(`#weather-keyframes-${weather}`)) {
      const style = document.createElement("style")
      style.id = `weather-keyframes-${weather}`

      if (weather === "snow") {
        style.textContent = `
          @keyframes fall-snow {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
            }
          }
        `
      } else if (weather === "rain") {
        style.textContent = `
          @keyframes fall-rain {
            0% {
              transform: translateY(0) translateX(0);
            }
            100% {
              transform: translateY(100vh) translateX(20px);
            }
          }
        `
      } else if (weather === "fog") {
        style.textContent = `
          @keyframes fall-fog {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              transform: translateY(20vh) translateX(50px);
              opacity: 0;
            }
          }
        `
      }

      document.head.appendChild(style)
    }
  }, [weather])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-30">
      {weather === "snow" && (
        <div className="absolute top-4 left-4 text-white/80 bg-everest-dark/30 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
          <Snowflake className="h-4 w-4" />
          <span className="text-xs">Snowing</span>
        </div>
      )}

      {weather === "rain" && (
        <div className="absolute top-4 left-4 text-white/80 bg-everest-dark/30 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
          <CloudRain className="h-4 w-4" />
          <span className="text-xs">Raining</span>
        </div>
      )}

      {weather === "fog" && (
        <div className="absolute top-4 left-4 text-white/80 bg-everest-dark/30 backdrop-blur-sm p-2 rounded-lg flex items-center space-x-2">
          <Cloud className="h-4 w-4" />
          <span className="text-xs">Foggy</span>
        </div>
      )}
    </div>
  )
}
