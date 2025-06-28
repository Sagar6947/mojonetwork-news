"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const webStories = [
  {
    id: 1,
    slug: "massive-rain-in-india",
    title: "Massive Rain in India",
    coverImage: "/placeholder.svg?height=400&width=300&text=Massive+Rain&bg=1e40af",
    category: "Weather",
    totalFrames: 4,
  },
  {
    id: 2,
    slug: "world-war-three",
    title: "World War Three Tensions",
    coverImage: "/placeholder.svg?height=400&width=300&text=World+War+3&bg=dc2626",
    category: "International",
    totalFrames: 5,
  },
  {
    id: 3,
    slug: "bollywood-awards-night",
    title: "Bollywood Awards Night",
    coverImage: "/placeholder.svg?height=400&width=300&text=Awards+Night&bg=db2777",
    category: "Entertainment",
    totalFrames: 6,
  },
  {
    id: 4,
    slug: "tech-innovation-summit",
    title: "Tech Innovation Summit",
    coverImage: "/placeholder.svg?height=400&width=300&text=Tech+Summit&bg=2563eb",
    category: "Technology",
    totalFrames: 4,
  },
  {
    id: 5,
    slug: "economic-policy-changes",
    title: "Economic Policy Changes",
    coverImage: "/placeholder.svg?height=400&width=300&text=Economic+Policy&bg=7c3aed",
    category: "Business",
    totalFrames: 3,
  },
  {
    id: 6,
    slug: "climate-change-summit",
    title: "Climate Change Summit",
    coverImage: "/placeholder.svg?height=400&width=300&text=Climate+Summit&bg=059669",
    category: "Environment",
    totalFrames: 5,
  },
]

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-red-600">Web Stories</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Play className="w-6 h-6 mr-2 text-red-600" />
              All Web Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {webStories.map((story) => (
                <Link key={story.id} href={`/stories/${story.slug}/1`}>
                  <div className="cursor-pointer group">
                    <div className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={story.coverImage || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 p-4">
                        <Badge className="bg-red-600 text-xs mb-2">{story.category}</Badge>
                        <h3 className="text-white text-sm font-semibold line-clamp-3">{story.title}</h3>
                        <p className="text-white text-xs opacity-75 mt-1">{story.totalFrames} slides</p>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
