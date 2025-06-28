"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Heart,
  MessageCircle,
  Home,
  Play,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

// Complete stories data with multiple frames
const storiesData = {
  "massive-rain-in-india": {
    id: 1,
    title: "Massive Rain in India",
    category: "Weather",
    frames: [
      {
        id: 1,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Heavy+Rainfall+Alert&bg=1e40af",
        title: "Heavy Rainfall Alert",
        description: "Meteorological department issues red alert for heavy rainfall across northern India.",
        duration: 5000,
      },
      {
        id: 2,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Flood+Situation&bg=0f172a",
        title: "Flood Situation Worsens",
        description: "Several districts report severe flooding as rivers overflow their banks.",
        duration: 5000,
      },
      {
        id: 3,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Rescue+Operations&bg=dc2626",
        title: "Rescue Operations Underway",
        description: "Army and NDRF teams deployed for rescue operations in affected areas.",
        duration: 5000,
      },
      {
        id: 4,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Relief+Camps&bg=16a34a",
        title: "Relief Camps Setup",
        description: "Government sets up relief camps to provide shelter and food to displaced families.",
        duration: 5000,
      },
    ],
  },
  "world-war-three": {
    id: 2,
    title: "World War Three Tensions",
    category: "International",
    frames: [
      {
        id: 1,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Global+Tensions&bg=dc2626",
        title: "Rising Global Tensions",
        description: "International relations reach critical point as diplomatic talks fail.",
        duration: 5000,
      },
      {
        id: 2,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Military+Buildup&bg=991b1b",
        title: "Military Buildup",
        description: "Nations increase military presence along disputed borders.",
        duration: 5000,
      },
      {
        id: 3,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=UN+Emergency&bg=7f1d1d",
        title: "UN Emergency Session",
        description: "United Nations calls emergency session to address escalating crisis.",
        duration: 5000,
      },
      {
        id: 4,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Peace+Talks&bg=059669",
        title: "Last-Minute Peace Talks",
        description: "World leaders attempt final diplomatic solution to prevent conflict.",
        duration: 5000,
      },
      {
        id: 5,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Global+Impact&bg=1e40af",
        title: "Global Economic Impact",
        description: "Stock markets crash worldwide as investors fear global conflict.",
        duration: 5000,
      },
    ],
  },
  "bollywood-awards-night": {
    id: 3,
    title: "Bollywood Awards Night",
    category: "Entertainment",
    frames: [
      {
        id: 1,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Red+Carpet&bg=db2777",
        title: "Red Carpet Glamour",
        description: "Bollywood stars dazzle on the red carpet with stunning outfits.",
        duration: 5000,
      },
      {
        id: 2,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Best+Actor&bg=be185d",
        title: "Best Actor Award",
        description: "Emotional acceptance speech as veteran actor wins lifetime achievement.",
        duration: 5000,
      },
      {
        id: 3,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Best+Actress&bg=a21caf",
        title: "Best Actress Winner",
        description: "Young talent takes home the coveted Best Actress award.",
        duration: 5000,
      },
      {
        id: 4,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Dance+Performance&bg=c026d3",
        title: "Spectacular Performances",
        description: "Star-studded dance performances light up the stage.",
        duration: 5000,
      },
      {
        id: 5,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Best+Film&bg=9333ea",
        title: "Best Film of the Year",
        description: "Critically acclaimed movie wins the top honor of the night.",
        duration: 5000,
      },
      {
        id: 6,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=After+Party&bg=7c3aed",
        title: "Star-Studded After Party",
        description: "Celebrities celebrate late into the night at exclusive after party.",
        duration: 5000,
      },
    ],
  },
  "tech-innovation-summit": {
    id: 4,
    title: "Tech Innovation Summit",
    category: "Technology",
    frames: [
      {
        id: 1,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=AI+Revolution&bg=2563eb",
        title: "AI Revolution Unveiled",
        description: "Leading tech companies showcase breakthrough AI technologies.",
        duration: 5000,
      },
      {
        id: 2,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Quantum+Computing&bg=1d4ed8",
        title: "Quantum Computing Breakthrough",
        description: "Scientists demonstrate quantum computer solving complex problems.",
        duration: 5000,
      },
      {
        id: 3,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Green+Tech&bg=16a34a",
        title: "Green Technology Focus",
        description: "Sustainable technology solutions take center stage at summit.",
        duration: 5000,
      },
      {
        id: 4,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Future+Vision&bg=7c3aed",
        title: "Vision for Future",
        description: "Tech leaders share their vision for the next decade of innovation.",
        duration: 5000,
      },
    ],
  },
  "economic-policy-changes": {
    id: 5,
    title: "Economic Policy Changes",
    category: "Business",
    frames: [
      {
        id: 1,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Policy+Announcement&bg=7c3aed",
        title: "Major Policy Announcement",
        description: "Finance Minister announces sweeping economic reforms.",
        duration: 5000,
      },
      {
        id: 2,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Market+Reaction&bg=16a34a",
        title: "Positive Market Reaction",
        description: "Stock markets surge following the policy announcement.",
        duration: 5000,
      },
      {
        id: 3,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Expert+Analysis&bg=2563eb",
        title: "Expert Analysis",
        description: "Economic experts analyze the long-term impact of new policies.",
        duration: 5000,
      },
    ],
  },
  "climate-change-summit": {
    id: 6,
    title: "Climate Change Summit",
    category: "Environment",
    frames: [
      {
        id: 1,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Global+Leaders&bg=059669",
        title: "World Leaders Gather",
        description: "Presidents and Prime Ministers unite for climate action.",
        duration: 5000,
      },
      {
        id: 2,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Carbon+Neutral&bg=0d9488",
        title: "Carbon Neutral Pledge",
        description: "Major economies commit to carbon neutrality by 2050.",
        duration: 5000,
      },
      {
        id: 3,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Green+Energy&bg=0f766e",
        title: "Green Energy Investment",
        description: "Trillion-dollar investment announced for renewable energy.",
        duration: 5000,
      },
      {
        id: 4,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Youth+Activists&bg=134e4a",
        title: "Youth Climate Activists",
        description: "Young environmental activists address world leaders.",
        duration: 5000,
      },
      {
        id: 5,
        type: "image",
        content: "/placeholder.svg?height=600&width=400&text=Action+Plan&bg=115e59",
        title: "Global Action Plan",
        description: "Comprehensive climate action plan adopted by all nations.",
        duration: 5000,
      },
    ],
  },
}

export default function StoryFramePage() {
  const router = useRouter()
  const params = useParams()
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [storyProgress, setStoryProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const slug = params?.slug as string
  const frameNumber = Number.parseInt(params?.frame as string)
  const story = storiesData[slug as keyof typeof storiesData]

  // Set current frame based on URL
  useEffect(() => {
    if (story && frameNumber) {
      const frameIndex = frameNumber - 1
      if (frameIndex >= 0 && frameIndex < story.frames.length) {
        setCurrentFrameIndex(frameIndex)
        setStoryProgress(0)
      }
    }
  }, [slug, frameNumber, story])

  // Auto-advance story progress
  useEffect(() => {
    if (!isPaused && story) {
      const interval = setInterval(() => {
        setStoryProgress((prev) => {
          if (prev >= 100) {
            handleNextFrame()
            return 0
          }
          return prev + 2
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [currentFrameIndex, isPaused, story])

  const handleNextFrame = () => {
    if (!story) return

    if (currentFrameIndex < story.frames.length - 1) {
      const nextFrameIndex = currentFrameIndex + 1
      setCurrentFrameIndex(nextFrameIndex)
      setStoryProgress(0)
      router.push(`/stories/${slug}/${nextFrameIndex + 1}`)
    } else {
      // Go to next story or close
      router.push("/")
    }
  }

  const handlePrevFrame = () => {
    if (!story) return

    if (currentFrameIndex > 0) {
      const prevFrameIndex = currentFrameIndex - 1
      setCurrentFrameIndex(prevFrameIndex)
      setStoryProgress(0)
      router.push(`/stories/${slug}/${prevFrameIndex + 1}`)
    }
  }

  const handleFrameClick = (e: React.MouseEvent, direction: "prev" | "next") => {
    e.stopPropagation()
    if (direction === "prev") {
      handlePrevFrame()
    } else {
      handleNextFrame()
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  if (!story) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">Story not found</h2>
          <Link href="/">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentFrame = story.frames[currentFrameIndex]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md h-full bg-black">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 p-4">
          <div className="flex space-x-1">
            {story.frames.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-white/30 rounded">
                <div
                  className="h-full bg-white rounded transition-all duration-100"
                  style={{
                    width:
                      index === currentFrameIndex ? `${storyProgress}%` : index < currentFrameIndex ? "100%" : "0%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-black/50 text-white">
              {currentFrameIndex + 1} / {story.frames.length}
            </Badge>
            <Badge className="bg-red-600">{story.category}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 bg-black/50"
              onClick={togglePause}
            >
              {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 bg-black/50"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 bg-black/50">
                <X className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Story Content */}
        <div className="relative h-full">
          <Image
            src={currentFrame.content || "/placeholder.svg"}
            alt={currentFrame.title}
            fill
            className="object-cover"
          />

          {/* Navigation Areas */}
          <div
            className="absolute left-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={(e) => handleFrameClick(e, "prev")}
          />
          <div
            className="absolute right-0 top-0 w-1/3 h-full z-10 cursor-pointer"
            onClick={(e) => handleFrameClick(e, "next")}
          />

          {/* Story Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
            <h2 className="text-white text-2xl font-bold mb-3">{currentFrame.title}</h2>
            <p className="text-gray-200 text-sm mb-6 leading-relaxed">{currentFrame.description}</p>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={`text-white hover:bg-white/20 ${isLiked ? "text-red-400" : ""}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={`w-4 h-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <MessageCircle className="w-4 h-4 mr-1" />
                Comment
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>

          {/* Navigation Arrows */}
          {currentFrameIndex > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 bg-black/50"
              onClick={handlePrevFrame}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          {currentFrameIndex < story.frames.length - 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 bg-black/50"
              onClick={handleNextFrame}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
