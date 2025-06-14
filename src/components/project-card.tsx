"use client"

import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  projectUrl: string
  githubUrl?: string
  color?: string
}

export default function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  projectUrl,
  githubUrl,
  color = "from-primary to-purple-500",
}: ProjectCardProps) {
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
            Project
          </span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-gray-900 group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
        <Button variant="default" size="sm" asChild className={`bg-gradient-to-r ${color} rounded-full hover:opacity-90 text-white`}>
          <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
            Demo <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        {githubUrl && (
          <Button variant="outline" size="sm" asChild className="bg-whiite rounded-full border-gray-300 text-gray-700 hover:bg-gray-100">
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              Code <Github className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
