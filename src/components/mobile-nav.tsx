"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Github, Mail, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: { name: string; href: string }[]
  currentSection: {
    heroInView: boolean
    aboutInView: boolean
    projectsInView: boolean
    skillsInView: boolean
    academyInView: boolean
    contactInView: boolean
  }
}

export default function MobileNav({ isOpen, onClose, navigationItems, currentSection }: MobileNavProps) {
  const isCurrentSection = (href: string) => {
    switch (href) {
      case "#hero":
        return currentSection.heroInView
      case "#about":
        return currentSection.aboutInView
      case "#projects":
        return currentSection.projectsInView
      case "#skills":
        return currentSection.skillsInView
      case "#contact":
        return currentSection.contactInView
      default:
        return false
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Mobile Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="mobile-nav fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 p-6">
                <ul className="space-y-4">
                  {navigationItems.map((item, i) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "block py-3 px-4 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium",
                          isCurrentSection(item.href) ? "text-primary bg-primary/10" : "",
                        )}
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Social Links */}
              <div className="p-6 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-4">Terhubung dengan saya</p>
                <div className="flex space-x-3">
                  {[
                    { href: "https://github.com/Obyu", icon: <Github className="h-5 w-5" />, label: "GitHub" },
                    {
                      href: "https://www.linkedin.com/in/bayu-ahmad-johari-4a1a71327",
                      icon: <Linkedin className="h-5 w-5" />,
                      label: "LinkedIn",
                    },
                    { href: "mailto:bayujohari4@gmail.com", icon: <Mail className="h-5 w-5" />, label: "Email" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="h-10 w-10 border-gray-300 hover:border-primary hover:text-primary"
                      >
                        <Link href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.icon}
                          <span className="sr-only">{item.label}</span>
                        </Link>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
