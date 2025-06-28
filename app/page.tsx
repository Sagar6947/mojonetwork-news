"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Menu,
  Globe,
  User,
  Play,
  Clock,
  TrendingUp,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Rss,
  Volume2,
  Share2,
  MessageCircle,
  ArrowRight,
  Zap,
  Users,
  BarChart3,
  Flame,
  Star,
  ChevronRight,
  Bell,
  Wifi,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Enhanced mock data
const breakingNews = [
  "🚨 BREAKING: PM Modi announces ₹15 lakh crore infrastructure package for rural development",
  "⚡ LIVE: India defeats Australia by 7 wickets in World Cup final - Historic victory!",
  "📈 MARKET ALERT: Sensex crosses 75,000 mark for first time in history",
  "🎬 BOLLYWOOD: Superstar couple announces surprise engagement at award ceremony",
  "🚇 MUMBAI: New metro line connecting Bandra to Versova inaugurated today",
  "🌧️ WEATHER: IMD issues red alert for heavy rainfall in 5 states",
]

const webStories = [
  {
    id: 1,
    slug: "massive-rain-in-india",
    title: "Massive Rain Alert",
    coverImage: "/placeholder.svg?height=400&width=300&text=🌧️+Rain+Alert&bg=1e40af",
    category: "Weather",
    totalFrames: 4,
    views: "2.3M",
  },
  {
    id: 2,
    slug: "world-war-three",
    title: "Global Tensions Rise",
    coverImage: "/placeholder.svg?height=400&width=300&text=🌍+Global+Crisis&bg=dc2626",
    category: "International",
    totalFrames: 5,
    views: "1.8M",
  },
  {
    id: 3,
    slug: "bollywood-awards-night",
    title: "Awards Night Glamour",
    coverImage: "/placeholder.svg?height=400&width=300&text=🏆+Awards+Night&bg=db2777",
    category: "Entertainment",
    totalFrames: 6,
    views: "3.1M",
  },
  {
    id: 4,
    slug: "tech-innovation-summit",
    title: "Tech Revolution 2024",
    coverImage: "/placeholder.svg?height=400&width=300&text=💻+Tech+Summit&bg=2563eb",
    category: "Technology",
    totalFrames: 4,
    views: "1.2M",
  },
  {
    id: 5,
    slug: "economic-policy-changes",
    title: "Economic Reforms",
    coverImage: "/placeholder.svg?height=400&width=300&text=💰+Economy&bg=7c3aed",
    category: "Business",
    totalFrames: 3,
    views: "890K",
  },
  {
    id: 6,
    slug: "climate-change-summit",
    title: "Climate Action Plan",
    coverImage: "/placeholder.svg?height=400&width=300&text=🌱+Climate&bg=059669",
    category: "Environment",
    totalFrames: 5,
    views: "1.5M",
  },
]

const topHeadlines = [
  {
    id: 1,
    title: "Prime Minister Modi Announces Historic ₹15 Lakh Crore Rural Infrastructure Development Plan",
    subtitle: "Largest investment in rural India since independence to transform villages nationwide",
    image: "/placeholder.svg?height=400&width=600&text=🏛️+PM+Modi+Infrastructure&bg=dc2626",
    category: "Politics",
    time: "2 hours ago",
    author: "Rajesh Kumar",
    views: "45.2K",
    comments: 234,
    slug: "pm-modi-infrastructure-plan",
    isBreaking: true,
  },
  {
    id: 2,
    title: "India Defeats Australia in Thrilling World Cup Final",
    subtitle: "Historic 7-wicket victory brings World Cup home after 12 years",
    image: "/placeholder.svg?height=300&width=450&text=🏏+Cricket+Victory&bg=16a34a",
    category: "Sports",
    time: "1 hour ago",
    author: "Sanjay Gupta",
    views: "67.8K",
    comments: 456,
    slug: "india-cricket-victory",
    isBreaking: true,
  },
  {
    id: 3,
    title: "Stock Market Reaches All-Time High",
    subtitle: "Sensex crosses 75,000 mark amid economic optimism",
    image: "/placeholder.svg?height=300&width=450&text=📈+Stock+Market&bg=2563eb",
    category: "Business",
    time: "3 hours ago",
    author: "Priya Sharma",
    views: "23.1K",
    comments: 89,
    slug: "stock-market-high",
  },
  {
    id: 4,
    title: "Bollywood Power Couple Announces Engagement",
    subtitle: "Surprise announcement at star-studded award ceremony",
    image: "/placeholder.svg?height=300&width=450&text=💍+Celebrity+News&bg=db2777",
    category: "Entertainment",
    time: "4 hours ago",
    author: "Kavita Reddy",
    views: "89.3K",
    comments: 567,
    slug: "bollywood-engagement",
  },
]

const quickNews = [
  {
    title: "New Metro Line Connects Mumbai Suburbs",
    time: "30 min ago",
    category: "Mumbai",
    urgent: true,
  },
  {
    title: "Tech Giant Announces ₹5000 Crore Investment",
    time: "45 min ago",
    category: "Business",
    urgent: false,
  },
  {
    title: "Monsoon Forecast: Heavy Rains Expected",
    time: "1 hour ago",
    category: "Weather",
    urgent: true,
  },
  {
    title: "Education Policy Shows Promising Results",
    time: "2 hours ago",
    category: "Education",
    urgent: false,
  },
  {
    title: "Space Mission Achieves New Milestone",
    time: "3 hours ago",
    category: "Science",
    urgent: false,
  },
]

const trendingTopics = [
  { tag: "#ModiInfrastructure", count: "45.2K", trend: "up" },
  { tag: "#CricketWorldCup", count: "67.8K", trend: "up" },
  { tag: "#StockMarket", count: "23.1K", trend: "up" },
  { tag: "#BollywoodNews", count: "89.3K", trend: "up" },
  { tag: "#TechInnovation", count: "12.5K", trend: "up" },
  { tag: "#ClimateAction", count: "34.7K", trend: "up" },
]

const liveUpdates = [
  {
    time: "14:30",
    title: "PM Modi addresses nation on infrastructure development",
    status: "LIVE",
  },
  {
    time: "14:15",
    title: "Cricket World Cup final: India 287/3 (45 overs)",
    status: "LIVE",
  },
  {
    time: "14:00",
    title: "Stock market update: Sensex up 2.3%",
    status: "UPDATE",
  },
  {
    time: "13:45",
    title: "Mumbai metro services resume after technical glitch",
    status: "RESOLVED",
  },
]

const bulletinVideo = {
  title: "LIVE: Prime Minister's Address on Rural Development",
  thumbnail: "/placeholder.svg?height=300&width=500&text=🔴+LIVE+PM+Address&bg=dc2626",
  duration: "LIVE",
  viewers: "2.3M watching",
  isLive: true,
}

export default function IndianNewsPortal() {
  const [currentBreaking, setCurrentBreaking] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Breaking news ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBreaking((prev) => (prev + 1) % breakingNews.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Current time update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Top Bar */}
      <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white px-4 py-2 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">
                {currentTime.toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">{currentTime.toLocaleTimeString("en-IN")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="w-4 h-4" />
              <span className="text-sm">LIVE</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-red-600 border border-white/20">
              <Globe className="w-4 h-4 mr-1" />
              हिंदी
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-red-600 border border-white/20">
              <User className="w-4 h-4 mr-1" />
              Login
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-red-600">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Header */}
      <header className="bg-white shadow-xl border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">भ</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                      भारत न्यूज़
                    </h1>
                    <p className="text-xs text-gray-600 font-medium">India's Leading News Portal</p>
                  </div>
                </div>
              </Link>
              <div className="flex items-center space-x-2">
                <Badge className="bg-red-600 animate-pulse">
                  <span className="w-2 h-2 bg-white rounded-full mr-1 animate-ping"></span>
                  LIVE
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <Users className="w-3 h-3 mr-1" />
                  2.3M Online
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search breaking news..."
                  className="pl-12 w-80 h-12 border-2 border-gray-200 focus:border-red-500 rounded-xl shadow-lg"
                />
                <Button size="sm" className="absolute right-2 top-2 bg-red-600 hover:bg-red-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" size="icon" className="h-12 w-12 border-2 hover:border-red-500">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation */}
        <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-8">
                {[
                  { name: "Home", icon: "🏠", active: true },
                  { name: "Politics", icon: "🏛️", active: false },
                  { name: "Sports", icon: "🏏", active: false },
                  { name: "Bollywood", icon: "🎬", active: false },
                  { name: "Business", icon: "💼", active: false },
                  { name: "Tech", icon: "💻", active: false },
                  { name: "International", icon: "🌍", active: false },
                  { name: "Videos", icon: "📺", active: false },
                ].map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={`text-white hover:bg-red-600 px-4 py-2 rounded-lg transition-all duration-300 ${
                      item.active ? "bg-red-600 shadow-lg" : ""
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                  <Flame className="w-3 h-3 mr-1" />
                  Trending
                </Badge>
                <Badge variant="outline" className="border-green-400 text-green-400">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Markets
                </Badge>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Breaking News Ticker */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black py-3 overflow-hidden shadow-inner">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            <div className="flex items-center space-x-3 mr-6">
              <Badge className="bg-red-600 text-white animate-pulse shadow-lg">
                <Zap className="w-3 h-3 mr-1" />
                BREAKING
              </Badge>
              <div className="w-2 h-2 bg-red-600 rounded-full animate-ping"></div>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap">
                <span className="font-bold text-lg">{breakingNews[currentBreaking]}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-black hover:bg-yellow-300 ml-4">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar - Enhanced */}
          <div className="col-span-3 space-y-6">
            {/* Live Updates */}
            <Card className="border-2 border-red-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                <CardTitle className="text-lg flex items-center">
                  <div className="w-3 h-3 bg-white rounded-full mr-2 animate-ping"></div>
                  Live Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {liveUpdates.map((update, index) => (
                  <div key={index} className="p-4 border-b last:border-b-0 hover:bg-red-50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-mono text-gray-600">{update.time}</span>
                      <Badge
                        variant={update.status === "LIVE" ? "default" : "outline"}
                        className={`text-xs ${
                          update.status === "LIVE"
                            ? "bg-red-600 animate-pulse"
                            : update.status === "UPDATE"
                              ? "border-blue-500 text-blue-600"
                              : "border-green-500 text-green-600"
                        }`}
                      >
                        {update.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium line-clamp-2">{update.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card className="shadow-xl border-2 border-orange-200">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-orange-600 font-bold">#{index + 1}</span>
                        <span className="font-semibold text-sm">{topic.tag}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600">{topic.count}</span>
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick News */}
            <Card className="shadow-xl border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-lg flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Quick Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {quickNews.map((news, index) => (
                  <div
                    key={index}
                    className="p-4 border-b last:border-b-0 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      {news.urgent && <div className="w-2 h-2 bg-red-500 rounded-full mt-2 animate-pulse"></div>}
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1">{news.title}</h4>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {news.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{news.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Enhanced Ad */}
            <Card className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 text-white shadow-2xl">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2 text-lg">Premium Advertisement</h3>
                <p className="text-sm opacity-90 mb-4">Reach millions of readers</p>
                <div className="h-40 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <Star className="w-8 h-8 mx-auto mb-2" />
                    <span className="text-sm font-medium">300x250 Premium</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Redesigned */}
          <div className="col-span-6 space-y-6">
            {/* Bulletin Video Section */}
            <Card className="shadow-2xl border-4 border-red-500 overflow-hidden">
              <div className="relative">
                <div className="relative h-80">
                  <Image
                    src={bulletinVideo.thumbnail || "/placeholder.svg"}
                    alt="Live Bulletin"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Live Indicator */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <Badge className="bg-red-600 animate-pulse px-3 py-1">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                      LIVE
                    </Badge>
                    <Badge variant="outline" className="bg-black/50 text-white border-white/30">
                      <Users className="w-3 h-3 mr-1" />
                      {bulletinVideo.viewers}
                    </Badge>
                  </div>

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 shadow-2xl">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </Button>
                  </div>

                  {/* Video Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-white text-2xl font-bold mb-2">{bulletinVideo.title}</h2>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                          <Volume2 className="w-4 h-4 mr-2" />
                          Audio
                        </Button>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                      <Badge className="bg-white/20 text-white">
                        <Eye className="w-3 h-3 mr-1" />
                        {bulletinVideo.viewers}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Top Headlines Grid */}
            <div className="grid grid-cols-2 gap-6">
              {/* Main Story */}
              <Link href={`/news/${topHeadlines[0].slug}`} className="col-span-2">
                <Card className="hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-red-200 overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={topHeadlines[0].image || "/placeholder.svg"}
                      alt={topHeadlines[0].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    {topHeadlines[0].isBreaking && (
                      <Badge className="absolute top-4 left-4 bg-red-600 animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        BREAKING
                      </Badge>
                    )}

                    <div className="absolute bottom-0 p-6">
                      <Badge className="bg-red-600 mb-3">{topHeadlines[0].category}</Badge>
                      <h2 className="text-white text-2xl font-bold mb-2 line-clamp-2">{topHeadlines[0].title}</h2>
                      <p className="text-gray-200 text-sm mb-4 line-clamp-2">{topHeadlines[0].subtitle}</p>
                      <div className="flex items-center justify-between text-sm text-gray-300">
                        <div className="flex items-center space-x-4">
                          <span>{topHeadlines[0].author}</span>
                          <span>{topHeadlines[0].time}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {topHeadlines[0].views}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {topHeadlines[0].comments}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>

              {/* Secondary Stories */}
              {topHeadlines.slice(1, 4).map((story, index) => (
                <Link key={story.id} href={`/news/${story.slug}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 border hover:border-red-200 h-full">
                    <div className="relative h-48">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      {story.isBreaking && (
                        <Badge className="absolute top-3 left-3 bg-red-600 text-xs animate-pulse">BREAKING</Badge>
                      )}

                      <Badge className="absolute top-3 right-3 bg-black/50 text-white text-xs">{story.category}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-sm line-clamp-2 mb-2">{story.title}</h3>
                      <p className="text-gray-600 text-xs line-clamp-2 mb-3">{story.subtitle}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{story.time}</span>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {story.views}
                          </span>
                          <span className="flex items-center">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            {story.comments}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Web Stories Section - Enhanced */}
            <Card className="shadow-xl border-2 border-purple-200">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                <CardTitle className="text-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <Play className="w-6 h-6 mr-2" />
                    Web Stories
                  </div>
                  <Badge variant="outline" className="border-white text-white">
                    Trending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex space-x-4 overflow-x-auto pb-4">
                  {webStories.map((story) => (
                    <Link key={story.id} href={`/stories/${story.slug}/1`}>
                      <div className="flex-shrink-0 cursor-pointer group">
                        <div className="relative w-36 h-56 rounded-xl overflow-hidden shadow-lg">
                          <Image
                            src={story.coverImage || "/placeholder.svg"}
                            alt={story.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          <div className="absolute top-3 left-3">
                            <Badge className="bg-purple-600 text-xs">{story.category}</Badge>
                          </div>

                          <div className="absolute top-3 right-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Play className="w-4 h-4 text-white" />
                            </div>
                          </div>

                          <div className="absolute bottom-0 p-4">
                            <h3 className="text-white text-sm font-bold line-clamp-2 mb-2">{story.title}</h3>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-white/80">{story.totalFrames} slides</span>
                              <span className="text-white/80 flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {story.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Horizontal Premium Ad */}
            <Card className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white shadow-2xl">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2 text-lg">Premium Banner Advertisement</h3>
                <div className="h-24 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <div className="flex items-center space-x-4">
                    <Star className="w-6 h-6" />
                    <span className="text-lg font-medium">728x90 Premium Banner</span>
                    <Star className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Enhanced */}
          <div className="col-span-3 space-y-6">
            {/* Most Read */}
            <Card className="shadow-xl border-2 border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                <CardTitle className="text-lg flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Most Read Today
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {[
                  "PM Modi's infrastructure plan gets cabinet approval",
                  "India's historic cricket victory celebrations continue",
                  "Stock market surge creates new millionaires",
                  "Bollywood couple's engagement breaks internet",
                  "Tech innovation summit announces breakthrough",
                ].map((story, index) => (
                  <div
                    key={index}
                    className="p-4 border-b last:border-b-0 hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold line-clamp-2 mb-1">{story}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{Math.floor(Math.random() * 50) + 10}K views</span>
                          <span>{Math.floor(Math.random() * 5) + 1} hours ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market Widget */}
            <Card className="shadow-xl border-2 border-blue-200">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Market Watch
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {[
                    { name: "SENSEX", value: "75,245.67", change: "+2.34%", positive: true },
                    { name: "NIFTY", value: "22,789.45", change: "+1.89%", positive: true },
                    { name: "USD/INR", value: "83.25", change: "-0.12%", positive: false },
                    { name: "GOLD", value: "₹62,450", change: "+0.78%", positive: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-lg font-bold">{item.value}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${item.positive ? "border-green-500 text-green-600" : "border-red-500 text-red-600"}`}
                      >
                        {item.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weather Widget */}
            <Card className="shadow-xl border-2 border-yellow-200">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                <CardTitle className="text-lg flex items-center">
                  <span className="mr-2">🌤️</span>
                  Weather Alert
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="text-center mb-4">
                  <p className="text-3xl font-bold">32°C</p>
                  <p className="text-gray-600">New Delhi</p>
                  <p className="text-sm text-gray-500">Partly Cloudy</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mumbai</span>
                    <span className="font-semibold">29°C ⛅</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Bangalore</span>
                    <span className="font-semibold">26°C 🌧️</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Chennai</span>
                    <span className="font-semibold">34°C ☀️</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card className="shadow-xl border-2 border-indigo-200">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                <CardTitle className="text-lg">Daily Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-4">Get top stories delivered to your inbox every morning</p>
                <Input placeholder="Enter your email" className="mb-3 border-2 focus:border-indigo-500" />
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg">Subscribe Now</Button>
                <p className="text-xs text-gray-500 mt-2 text-center">Join 2.3M+ subscribers</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-12 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">भ</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-red-400">भारत न्यूज़</h3>
                  <p className="text-sm text-gray-400">India's Leading News Portal</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Delivering breaking news, in-depth analysis, and comprehensive coverage of politics, sports,
                entertainment, business, and more. Trusted by millions of readers across India.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, color: "hover:text-blue-400" },
                  { icon: Twitter, color: "hover:text-blue-400" },
                  { icon: Instagram, color: "hover:text-pink-400" },
                  { icon: Youtube, color: "hover:text-red-400" },
                ].map((social, index) => (
                  <Button key={index} variant="ghost" size="icon" className={`${social.color} transition-colors`}>
                    <social.icon className="w-5 h-5" />
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-red-400">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                {["About Us", "Contact", "Privacy Policy", "Terms of Service", "Careers", "Advertise"].map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-white transition-colors flex items-center">
                      <ChevronRight className="w-3 h-3 mr-1" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-red-400">Categories</h4>
              <ul className="space-y-3 text-sm text-gray-300">
                {["Politics", "Sports", "Bollywood", "Business", "Technology", "International"].map((category) => (
                  <li key={category}>
                    <a href="#" className="hover:text-white transition-colors flex items-center">
                      <ChevronRight className="w-3 h-3 mr-1" />
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-red-400">Contact Info</h4>
              <div className="space-y-3 text-sm text-gray-300">
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-red-400" />
                  New Delhi, India 110001
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-red-400" />
                  +91 11 1234 5678
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-red-400" />
                  news@bharatnews.com
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-700" />

          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 भारत न्यूज़. All rights reserved. | Powered by Next.js</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Rss className="w-4 h-4" />
                <span>RSS Feed</span>
              </div>
              <Badge variant="outline" className="border-green-500 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-ping"></div>
                Server Status: Online
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
