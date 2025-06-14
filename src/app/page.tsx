"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Mail, Linkedin, ArrowRight, Sparkles, Code, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useInView } from "react-intersection-observer"
import { TypeAnimation } from "react-type-animation"
import ProjectCard from "@/components/project-card"
import SkillBar from "@/components/skill-bar"
import ColorfulBackground from "@/components/colorful-background"
import MobileNav from "@/components/mobile-nav"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Refs for each section to track scroll position
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.5 })
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.3 })
  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.3 })
  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.3 })
  const { ref: contactRef, inView: contactInView } = useInView({ threshold: 0.3 })

  // Scroll animation
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  const navigationItems = [
    { name: "Beranda", href: "#hero" },
    { name: "Tentang", href: "#about" },
    { name: "Proyek", href: "#projects" },
    { name: "Keahlian", href: "#skills" },
    { name: "Kontak", href: "#contact" },
  ]

  useEffect(() => {
    // Loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Close mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest(".mobile-nav")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Sparkles className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-primary mb-4 sm:mb-6" />
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Loading</h1>
          </motion.div>
          <div className="w-48 sm:w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Colorful background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          <ColorfulBackground />
        </motion.div>
      </div>

      {/* Main content */}
      <div className="relative z-30">
        {/* Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
          <div className="container mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center space-x-2"
              >
                <Code className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <span className="text-lg sm:text-xl font-bold text-gray-900">Bayu Ahmad Johari</span>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-8">
                {navigationItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-gray-600 hover:text-primary transition-all duration-300 relative group",
                        (item.href === "#hero" && heroInView) ||
                          (item.href === "#about" && aboutInView) ||
                          (item.href === "#projects" && projectsInView) ||
                          (item.href === "#skills" && skillsInView) ||
                          (item.href === "#contact" && contactInView)
                          ? "text-primary font-medium"
                          : "",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Desktop Social Links */}
              <div className="hidden sm:flex items-center space-x-2 sm:space-x-4">
                {[
                  { href: "https://github.com/Obyu", icon: <Github className="h-4 w-4 sm:h-5 sm:w-5" /> },
                  {
                    href: "https://www.linkedin.com/in/bayu-ahmad-johari-4a1a71327",
                    icon: <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />,
                  },
                  { href: "mailto:bayujohari4@gmail.com", icon: <Mail className="h-4 w-4 sm:h-5 sm:w-5" /> },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="text-gray-600 hover:text-primary hover:bg-gray-100 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Link href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.icon}
                        <span className="sr-only">Social Link</span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-8 w-8 sm:h-10 sm:w-10"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navigationItems={navigationItems}
          currentSection={{
            heroInView,
            aboutInView,
            projectsInView,
            skillsInView,
            academyInView: false,
            contactInView,
          }}
        />

        {/* Hero Section */}
        <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  <span className="block">Halo, Saya</span>
                  <span className="block">Bayu Ahmad Johari</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent">
                    <TypeAnimation
                      sequence={["Backend Developer", 2000, "AI Specialist", 2000, "Full Stack Developer", 2000]}
                      wrapper="span"
                      speed={50}
                      repeat={Number.POSITIVE_INFINITY}
                    />
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                  Saya membangun solusi backend yang robust dan mengintegrasikan kecerdasan buatan untuk menciptakan
                  aplikasi yang cerdas dan efisien.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary rounded-full hover:bg-primary-dark text-white group w-full sm:w-auto"
                  >
                    <Link href="#contact">
                      Hubungi Saya
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="bg-white/50 rounded-full border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
                  >
                    <Link href="#projects">Lihat Proyek</Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative order-1 lg:order-2"
              >
                <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] w-full max-w-sm sm:max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg backdrop-blur-sm border border-white/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/images/Bayu.jpg"
                      alt="Bayu Ahmad Johari"
                      width={250}
                      height={250}
                      className="rounded-full object-cover border-4 border-white w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px]"
                    />
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="absolute top-6 sm:top-10 right-6 sm:right-10"
                  >
                    <div className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-r from-warning to-accent shadow-lg" />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                    className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10"
                  >
                    <div className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 rounded-full bg-gradient-to-r from-success to-primary shadow-lg" />
                  </motion.div>

                  <motion.div
                    animate={{
                      y: [0, 8, 0],
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      delay: 0.5,
                    }}
                    className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2"
                  >
                    <div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full bg-gradient-to-r from-secondary to-accent shadow-lg" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <Link href="#about" className="flex flex-col items-center text-gray-400 hover:text-primary">
              <span className="text-xs sm:text-sm mb-2">Scroll ke bawah</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-bounce sm:w-6 sm:h-6"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </Link>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" ref={aboutRef} className="py-16 sm:py-20 lg:py-24 relative px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Tentang Saya</h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
              >
                <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] overflow-hidden rounded-lg">
                  <Image src="/images/bayu2.jpg" alt="About Me" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-white p-3 sm:p-6 rounded-lg shadow-xl max-w-[200px] sm:max-w-xs"
                >
                  <p className="text-primary font-medium mb-1 sm:mb-2 text-sm sm:text-base">Backend & AI Specialist</p>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Membangun solusi backend yang robust dan mengintegrasikan AI
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="space-y-4 sm:space-y-6 order-1 lg:order-2"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Perjalanan Saya</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Saya adalah seorang Backend Developer dan AI Specialist dengan pengalaman dalam membangun aplikasi web
                  yang robust dan cerdas. Saya memiliki pengalaman sebagai Full Stack Developer di PT Yodya Karya
                  (Persero) dan telah mengembangkan berbagai solusi berbasis AI.
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Keahlian saya meliputi pengembangan backend dengan Laravel, Python, dan NestJS, serta implementasi
                  solusi AI untuk berbagai kebutuhan bisnis. Saya juga memiliki pengalaman dalam penjualan dan kerja tim
                  yang membantu saya memahami kebutuhan klien dengan baik.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
                  {[
                    { number: "3+", label: "Proyek AI" },
                    { number: "2+", label: "Tahun Pengalaman" },
                    { number: "5+", label: "Teknologi Dikuasai" },
                    { number: "100%", label: "Dedikasi" },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-100"
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <div className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {stat.number}
                      </div>
                      <div className="text-gray-500 text-xs sm:text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">Pengalaman Kerja:</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-primary">Full Stack Developer Intern</p>
                    <p className="text-sm text-gray-600">PT Yodya Karya (Persero)</p>
                    <p className="text-xs text-gray-500 mt-1">Pengembangan aplikasi web dan sistem backend</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium text-primary">Sales Gas Elpiji</p>
                    <p className="text-sm text-gray-600">50 Kilo</p>
                    <p className="text-xs text-gray-500 mt-1">Pengalaman dalam penjualan dan customer service</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" ref={projectsRef} className="py-16 sm:py-20 lg:py-24 relative bg-gray-50 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Proyek Terbaru</h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 sm:mb-6"></div>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Berikut adalah beberapa proyek terbaru yang telah saya kerjakan. Setiap proyek mencerminkan keahlian
                saya dalam backend development dan implementasi AI.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  title: "WhatsApp Bot AI",
                  description:
                    "Bot WhatsApp berbasis AI yang dapat menjawab pertanyaan dan membantu customer service secara otomatis menggunakan teknologi machine learning.",
                  tags: ["JavaScript", "Node.js", "Ollama", "WhatsApp API"],
                  imageUrl: "/images/wa.png",
                  projectUrl: "https://github.com/Obyu",
                  color: "from-green-500 to-emerald-400",
                },
                {
                  title: "EngineerHub",
                  description:
                    "Platform yang menghubungkan engineer dengan peluang kerja dan membantu arsitek menemukan bahan bangunan dengan mudah dan efisien.",
                  tags: ["Laravel", "MySQL", "Bootstrap", "PHP"],
                  imageUrl: "/images/enhub.png",
                  projectUrl: "https://github.com/Obyu",
                  color: "from-blue-500 to-cyan-400",
                },
                {
                  title: "AbsenCloud",
                  description:
                    "Aplikasi untuk memindahkan data absensi dari Excel ke database dengan interface yang user-friendly dan proses yang otomatis.",
                  tags: ["Laravel", "MySQL", "Excel Import", "Dashboard"],
                  imageUrl: "/images/absencloud.png",
                  projectUrl: "https://github.com/Obyu",
                  color: "from-purple-500 to-pink-500",
                },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    tags={project.tags}
                    imageUrl={project.imageUrl}
                    projectUrl={project.projectUrl}
                    githubUrl="https://github.com/Obyu"
                    color={project.color}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center mt-8 sm:mt-12"
            >
              <Button
                variant="outline"
                asChild
                className="bg-white border-primary text-primary rounded-full hover:bg-primary/10 w-full sm:w-auto"
              >
                <Link href="https://github.com/Obyu" target="_blank">
                  Lihat GitHub <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" ref={skillsRef} className="py-16 sm:py-20 lg:py-24 relative px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Keahlian</h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 sm:mb-6"></div>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Saya terus mengembangkan keterampilan saya dalam backend development, AI, dan soft skills untuk
                memberikan solusi terbaik.
              </p>
            </motion.div>

            <Tabs defaultValue="backend" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center mb-6 sm:mb-8"
              >
                <TabsList className="bg-white shadow-md border border-gray-100 p-1 rounded-full grid grid-cols-3 w-full max-w-md sm:max-w-lg">
                  {["backend", "tools", "soft-skills"].map((tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-2 sm:px-6 py-1 sm:py-2 text-xs sm:text-sm uppercase"
                    >
                      {tab.replace("-", " ")}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              {[
                {
                  value: "backend",
                  skills: [
                    { name: "Laravel", level: 90, color: "from-red-500 to-orange-500" },
                    { name: "Python", level: 85, color: "from-blue-500 to-yellow-400" },
                    { name: "NestJS", level: 80, color: "from-red-600 to-pink-500" },
                    { name: "MySQL", level: 85, color: "from-blue-600 to-blue-400" },
                    { name: "PostgreSQL", level: 75, color: "from-blue-700 to-blue-500" },
                    { name: "REST API", level: 90, color: "from-green-500 to-emerald-500" },
                    { name: "AI Integration", level: 80, color: "from-purple-500 to-pink-500" },
                    { name: "Machine Learning", level: 75, color: "from-indigo-500 to-purple-500" },
                  ],
                },
                {
                  value: "tools",
                  skills: [
                    { name: "VS Code", level: 95, color: "from-blue-600 to-blue-400" },
                    { name: "Git", level: 90, color: "from-orange-600 to-red-600" },
                    { name: "GitHub", level: 85, color: "from-gray-900 to-gray-700" },
                    { name: "Webpack", level: 75, color: "from-blue-500 to-sky-500" },
                    { name: "Microsoft Word", level: 90, color: "from-blue-600 to-blue-400" },
                    { name: "Postman", level: 85, color: "from-orange-500 to-red-500" },
                    { name: "Docker", level: 70, color: "from-blue-500 to-cyan-500" },
                  ],
                },
                {
                  value: "soft-skills",
                  skills: [
                    { name: "Teamwork", level: 90, color: "from-green-500 to-emerald-500" },
                    { name: "Adaptasi", level: 85, color: "from-blue-500 to-cyan-400" },
                    { name: "Sales", level: 80, color: "from-purple-500 to-pink-500" },
                    { name: "Customer Service", level: 85, color: "from-orange-500 to-amber-500" },
                    { name: "Problem Solving", level: 90, color: "from-red-500 to-rose-500" },
                    { name: "Communication", level: 85, color: "from-indigo-500 to-purple-500" },
                  ],
                },
              ].map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {tab.skills.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <SkillBar name={skill.name} level={skill.level} color={skill.color} />
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" ref={contactRef} className="py-16 sm:py-20 lg:py-24 relative bg-gray-50 px-4">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12 text-center"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Hubungi Saya</h2>
              <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 sm:mb-6"></div>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Tertarik untuk bekerja sama dalam proyek backend atau AI? Jangan ragu untuk menghubungi saya melalui
                formulir di bawah ini atau melalui kontak langsung.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="space-y-6 sm:space-y-8"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Mari Terhubung</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Saya selalu terbuka untuk diskusi tentang proyek backend, implementasi AI, atau peluang kolaborasi
                  dalam pengembangan aplikasi.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />,
                      label: "Email",
                      value: "bayujohari4@gmail.com",
                      color: "bg-blue-500",
                      href: "mailto:bayujohari4@gmail.com",
                    },
                    {
                      icon: <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />,
                      label: "LinkedIn",
                      value: "Bayu Ahmad Johari",
                      color: "bg-blue-700",
                      href: "https://www.linkedin.com/in/bayu-ahmad-johari-4a1a71327",
                    },
                    {
                      icon: <Github className="h-5 w-5 sm:h-6 sm:w-6" />,
                      label: "GitHub",
                      value: "github.com/Obyu",
                      color: "bg-gray-900",
                      href: "https://github.com/Obyu",
                    },
                  ].map((contact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 sm:space-x-4"
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        href={contact.href}
                        target="_blank"
                        className="flex items-center space-x-3 sm:space-x-4 group"
                      >
                        <div
                          className={`${contact.color} p-2 sm:p-3 rounded-full text-white group-hover:scale-110 transition-transform`}
                        >
                          {contact.icon}
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs sm:text-sm">{contact.label}</p>
                          <p className="text-gray-900 text-sm sm:text-base group-hover:text-primary transition-colors">
                            {contact.value}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-100"
              >
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700">
                        Nama
                      </label>
                      <input
                        id="name"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                        placeholder="Nama Anda"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs sm:text-sm font-medium text-gray-700">
                      Subjek
                    </label>
                    <input
                      id="subject"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                      placeholder="Subjek pesan Anda"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs sm:text-sm font-medium text-gray-700">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base"
                      placeholder="Tulis pesan Anda di sini..."
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white">
                    Kirim Pesan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 sm:py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="space-y-4 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <Code className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  <span className="text-lg sm:text-xl font-bold text-white">Bayu Ahmad Johari</span>
                </div>
                <p className="text-gray-400 text-sm sm:text-base">
                  Backend Developer & AI Specialist yang berdedikasi untuk menciptakan solusi teknologi inovatif.
                </p>
              </div>

              <div className="space-y-4 text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-medium text-white">Navigasi</h4>
                <div className="grid grid-cols-2 gap-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-primary transition-colors text-sm sm:text-base"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4 text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-medium text-white">Terhubung</h4>
                <div className="flex justify-center sm:justify-start space-x-4">
                  {[
                    { href: "https://github.com/Obyu", icon: <Github className="h-4 w-4 sm:h-5 sm:w-5" /> },
                    {
                      href: "https://www.linkedin.com/in/bayu-ahmad-johari-4a1a71327",
                      icon: <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />,
                    },
                    { href: "mailto:bayujohari4@gmail.com", icon: <Mail className="h-4 w-4 sm:h-5 sm:w-5" /> },
                  ].map((item, i) => (
                    <Button
                      key={i}
                      variant="ghost"
                      size="icon"
                      asChild
                      className="text-gray-400 hover:text-primary hover:bg-gray-800 h-8 w-8 sm:h-10 sm:w-10"
                    >
                      <Link href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.icon}
                        <span className="sr-only">Social Link</span>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
              <p className="text-gray-400 text-xs sm:text-sm">
                &copy; {new Date().getFullYear()} Bayu Ahmad Johari. Semua hak dilindungi.
              </p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-0">
                Dibuat dengan ❤️ menggunakan Next.js dan Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
