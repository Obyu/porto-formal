"use client"

import { Clock, Users, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface AcademyCardProps {
  title: string
  description: string
  level: string
  duration: string
  students: number
  imageUrl: string
  courseUrl: string
  color?: string
}

export default function AcademyCard({
  title,
  description,
  level,
  duration,
  students,
  imageUrl,
  courseUrl,
  color = "from-primary to-purple-500",
}: AcademyCardProps) {
  return (
    <Card className="overflow-hidden bg-white h-full flex flex-col group shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 z-10"></div>
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 z-20">
          <span className={`bg-gradient-to-r ${color} text-white text-xs font-medium px-2.5 py-1 rounded-full`}>
            {level}
          </span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-gray-900 group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm text-gray-600">{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm text-gray-600">{students.toLocaleString()} siswa</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
        <Button variant="default" asChild className={`w-full bg-gradient-to-r ${color} hover:opacity-90 text-white`}>
          <Link href={courseUrl} target="_blank" rel="noopener noreferrer">
            <BookOpen className="mr-2 h-4 w-4" /> Lihat Kursus
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
