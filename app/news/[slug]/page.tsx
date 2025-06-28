"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
  ThumbsUp,
  Heart,
  Frown,
  Angry,
  SmileIcon as Surprise,
  Laugh,
  ThumbsDown,
  Send,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Rss,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock news data
const newsData = {
  "pm-modi-infrastructure-plan": {
    id: 1,
    slug: "pm-modi-infrastructure-plan",
    title: "Prime Minister Modi Announces Major Infrastructure Development Plan for Rural India",
    subtitle: "₹10 Lakh Crore Investment to Transform Rural Infrastructure Over Next 5 Years",
    category: "Politics",
    author: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40&text=RK&bg=dc2626",
      role: "Political Correspondent",
    },
    publishedAt: "2024-01-15T10:30:00Z",
    readTime: "5 min read",
    views: 15420,
    image: "/placeholder.svg?height=400&width=800&text=Infrastructure+Development&bg=dc2626",
    content: `
      <p>In a landmark announcement today, Prime Minister Narendra Modi unveiled an ambitious infrastructure development plan aimed at transforming rural India over the next five years. The comprehensive program, worth ₹10 lakh crore, promises to revolutionize connectivity, healthcare, and educational facilities across the country's villages.</p>

      <p>Speaking at the Red Fort, the Prime Minister emphasized that this initiative represents the largest rural development program since independence. "We are committed to ensuring that every village in India has access to world-class infrastructure," Modi stated during his address to the nation.</p>

      <h3>Key Components of the Plan</h3>

      <p>The infrastructure plan encompasses several critical areas:</p>

      <ul>
        <li><strong>Digital Connectivity:</strong> High-speed internet access to all villages with population above 500</li>
        <li><strong>Healthcare Infrastructure:</strong> Establishment of 50,000 new primary health centers</li>
        <li><strong>Educational Facilities:</strong> Construction of 25,000 new schools with modern amenities</li>
        <li><strong>Transportation:</strong> All-weather roads connecting every village to district headquarters</li>
        <li><strong>Water Supply:</strong> Piped water connections to every rural household</li>
      </ul>

      <p>The announcement has been welcomed by various stakeholders, including state governments, rural development experts, and farmer organizations. Opposition parties, however, have raised questions about the funding mechanism and implementation timeline.</p>

      <h3>Implementation Timeline</h3>

      <p>The government plans to implement this massive undertaking in phases, with the first phase beginning in April 2024. Priority will be given to the most underserved regions, particularly in eastern and northeastern states.</p>

      <p>Finance Minister Nirmala Sitharaman, who was present during the announcement, assured that adequate budgetary provisions have been made for the program. "This investment will not only improve rural infrastructure but also create millions of employment opportunities," she added.</p>

      <p>The program is expected to directly benefit over 60 crore rural Indians and significantly boost the country's GDP growth in the coming years.</p>
    `,
    tags: ["Infrastructure", "Rural Development", "Modi Government", "Investment"],
    reactions: {
      like: 1250,
      love: 890,
      sad: 45,
      angry: 120,
      wow: 670,
      funny: 23,
      dislike: 89,
    },
    comments: [
      {
        id: 1,
        author: {
          name: "Priya Sharma",
          avatar: "/placeholder.svg?height=32&width=32&text=PS&bg=16a34a",
        },
        content: "This is exactly what rural India needs! Hope the implementation is as good as the announcement.",
        timestamp: "2024-01-15T11:45:00Z",
        likes: 45,
        replies: [
          {
            id: 11,
            author: {
              name: "Amit Singh",
              avatar: "/placeholder.svg?height=32&width=32&text=AS&bg=2563eb",
            },
            content: "Agreed! The digital connectivity part is especially important for rural education.",
            timestamp: "2024-01-15T12:15:00Z",
            likes: 12,
          },
        ],
      },
      {
        id: 2,
        author: {
          name: "Dr. Suresh Patel",
          avatar: "/placeholder.svg?height=32&width=32&text=SP&bg=7c3aed",
        },
        content:
          "As a rural healthcare worker, I'm excited about the 50,000 new health centers. This could be a game-changer.",
        timestamp: "2024-01-15T12:30:00Z",
        likes: 78,
        replies: [],
      },
      {
        id: 3,
        author: {
          name: "Kavita Reddy",
          avatar: "/placeholder.svg?height=32&width=32&text=KR&bg=db2777",
        },
        content: "Sounds promising, but we've heard similar announcements before. Let's see the actual implementation.",
        timestamp: "2024-01-15T13:00:00Z",
        likes: 23,
        replies: [],
      },
    ],
  },
  "india-cricket-victory": {
    id: 2,
    slug: "india-cricket-victory",
    title: "India Defeats Australia in Thrilling Cricket World Cup Final",
    subtitle: "Historic Victory Brings World Cup Home After 12 Years",
    category: "Sports",
    author: {
      name: "Sanjay Gupta",
      avatar: "/placeholder.svg?height=40&width=40&text=SG&bg=16a34a",
      role: "Sports Editor",
    },
    publishedAt: "2024-01-14T18:30:00Z",
    readTime: "4 min read",
    views: 25680,
    image: "/placeholder.svg?height=400&width=800&text=Cricket+Victory&bg=16a34a",
    content: `
      <p>In a nail-biting finish that had the entire nation on the edge of their seats, India defeated Australia by 6 wickets in the Cricket World Cup final at the Melbourne Cricket Ground. This historic victory marks India's return to World Cup glory after a 12-year wait.</p>

      <p>Captain Virat Kohli's masterful century and Jasprit Bumrah's exceptional bowling performance were the highlights of India's comprehensive victory. The win has sparked celebrations across the country, with millions of fans taking to the streets to celebrate.</p>

      <h3>Match Highlights</h3>

      <p>Australia, batting first, posted a challenging total of 287 runs, thanks to Steve Smith's brilliant 89 and David Warner's solid 67. However, India's bowling attack, led by Bumrah's 4/45, kept the Australian total within reach.</p>

      <p>India's chase got off to a shaky start, losing two early wickets. But Kohli's partnership with Shreyas Iyer (78*) steadied the ship, and the captain's unbeaten 112 guided India to victory with 8 balls to spare.</p>
    `,
    tags: ["Cricket", "World Cup", "India", "Australia", "Victory"],
    reactions: {
      like: 3450,
      love: 2890,
      sad: 15,
      angry: 45,
      wow: 1670,
      funny: 123,
      dislike: 67,
    },
    comments: [],
  },
}

const relatedNews = [
  {
    id: 3,
    slug: "budget-2024-highlights",
    title: "Budget 2024: Key Highlights and Tax Changes",
    image: "/placeholder.svg?height=100&width=150&text=Budget+2024&bg=2563eb",
    category: "Business",
    time: "3 hours ago",
  },
  {
    id: 4,
    slug: "bollywood-awards-ceremony",
    title: "Bollywood Stars Shine at Annual Awards Ceremony",
    image: "/placeholder.svg?height=100&width=150&text=Awards&bg=db2777",
    category: "Entertainment",
    time: "5 hours ago",
  },
  {
    id: 5,
    slug: "tech-startup-funding",
    title: "Indian Tech Startup Raises $100M in Series C Funding",
    image: "/placeholder.svg?height=100&width=150&text=Startup&bg=16a34a",
    category: "Technology",
    time: "1 day ago",
  },
  {
    id: 6,
    slug: "climate-change-report",
    title: "New Climate Report Shows Alarming Temperature Rise",
    image: "/placeholder.svg?height=100&width=150&text=Climate&bg=059669",
    category: "Environment",
    time: "2 days ago",
  },
]

const moreNews = [
  {
    id: 7,
    slug: "stock-market-surge",
    title: "Stock Market Hits All-Time High Amid Economic Optimism",
    image: "/placeholder.svg?height=80&width=120&text=Stock+Market&bg=7c3aed",
    category: "Business",
    time: "1 hour ago",
  },
  {
    id: 8,
    slug: "space-mission-success",
    title: "ISRO Successfully Launches Communication Satellite",
    image: "/placeholder.svg?height=80&width=120&text=Space+Mission&bg=dc2626",
    category: "Science",
    time: "4 hours ago",
  },
  {
    id: 9,
    slug: "education-policy-update",
    title: "New Education Policy Shows Promising Results",
    image: "/placeholder.svg?height=80&width=120&text=Education&bg=16a34a",
    category: "Education",
    time: "6 hours ago",
  },
  {
    id: 10,
    slug: "monsoon-forecast",
    title: "IMD Predicts Normal Monsoon This Year",
    image: "/placeholder.svg?height=80&width=120&text=Monsoon&bg=1e40af",
    category: "Weather",
    time: "8 hours ago",
  },
  {
    id: 11,
    slug: "healthcare-breakthrough",
    title: "Indian Scientists Develop New Cancer Treatment",
    image: "/placeholder.svg?height=80&width=120&text=Healthcare&bg=059669",
    category: "Health",
    time: "1 day ago",
  },
]

const reactionIcons = {
  like: ThumbsUp,
  love: Heart,
  sad: Frown,
  angry: Angry,
  wow: Surprise,
  funny: Laugh,
  dislike: ThumbsDown,
}

const reactionColors = {
  like: "text-blue-600",
  love: "text-red-600",
  sad: "text-yellow-600",
  angry: "text-red-700",
  wow: "text-yellow-500",
  funny: "text-green-600",
  dislike: "text-gray-600",
}

export default function NewsDetailsPage() {
  const params = useParams()
  const slug = params?.slug as string
  const article = newsData[slug as keyof typeof newsData]

  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [reactions, setReactions] = useState(article?.reactions || {})
  const [comments, setComments] = useState(article?.comments || [])
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleReaction = (reactionType: string) => {
    if (selectedReaction === reactionType) {
      // Remove reaction
      setSelectedReaction(null)
      setReactions((prev) => ({
        ...prev,
        [reactionType]: prev[reactionType as keyof typeof prev] - 1,
      }))
    } else {
      // Add new reaction (remove old one if exists)
      if (selectedReaction) {
        setReactions((prev) => ({
          ...prev,
          [selectedReaction]: prev[selectedReaction as keyof typeof prev] - 1,
        }))
      }
      setSelectedReaction(reactionType)
      setReactions((prev) => ({
        ...prev,
        [reactionType]: prev[reactionType as keyof typeof prev] + 1,
      }))
    }
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: {
          name: "Anonymous User",
          avatar: "/placeholder.svg?height=32&width=32&text=AU&bg=6b7280",
        },
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: [],
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  const handleAddReply = (commentId: number) => {
    if (replyText.trim()) {
      const reply = {
        id: Date.now(),
        author: {
          name: "Anonymous User",
          avatar: "/placeholder.svg?height=32&width=32&text=AU&bg=6b7280",
        },
        content: replyText,
        timestamp: new Date().toISOString(),
        likes: 0,
      }

      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
        ),
      )
      setReplyText("")
      setReplyTo(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article not found</h2>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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
              <Link href="/">
                <h1 className="text-2xl font-bold text-red-600">भारत न्यूज़</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-8">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Article Header */}
              <div className="p-6">
                <Badge className="bg-red-600 mb-4">{article.category}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{article.title}</h1>
                <h2 className="text-xl text-gray-600 mb-6">{article.subtitle}</h2>

                {/* Author and Meta Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={article.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {article.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">{article.author.name}</p>
                      <p className="text-sm text-gray-600">{article.author.role}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {article.readTime}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2" />
                      {article.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative h-96">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="hover:bg-red-50 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Reactions */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Your Reaction:</h4>
                  <div className="flex items-center space-x-4 mb-4">
                    {Object.entries(reactions).map(([type, count]) => {
                      const Icon = reactionIcons[type as keyof typeof reactionIcons]
                      const isSelected = selectedReaction === type
                      return (
                        <Button
                          key={type}
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          className={`flex items-center space-x-2 ${isSelected ? "bg-red-600 hover:bg-red-700" : ""}`}
                          onClick={() => handleReaction(type)}
                        >
                          <Icon
                            className={`w-4 h-4 ${
                              isSelected ? "text-white" : reactionColors[type as keyof typeof reactionColors]
                            }`}
                          />
                          <span className="capitalize">{type}</span>
                          <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs">{count}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-4 flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Comments ({comments.length})
                  </h4>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-3"
                    />
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="border-l-2 border-gray-200 pl-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {comment.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm">{comment.author.name}</span>
                              <span className="text-xs text-gray-500">{getTimeAgo(comment.timestamp)}</span>
                            </div>
                            <p className="text-gray-700 mb-2">{comment.content}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <Button variant="ghost" size="sm" className="p-0 h-auto">
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                {comment.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto"
                                onClick={() => setReplyTo(comment.id)}
                              >
                                Reply
                              </Button>
                            </div>

                            {/* Reply Form */}
                            {replyTo === comment.id && (
                              <div className="mt-3">
                                <Input
                                  placeholder="Write a reply..."
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  className="mb-2"
                                />
                                <div className="flex space-x-2">
                                  <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                                    Reply
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => setReplyTo(null)}>
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Replies */}
                            {comment.replies.length > 0 && (
                              <div className="mt-4 space-y-3">
                                {comment.replies.map((reply) => (
                                  <div key={reply.id} className="flex items-start space-x-3 ml-4">
                                    <Avatar className="w-6 h-6">
                                      <AvatarImage src={reply.author.avatar || "/placeholder.svg"} />
                                      <AvatarFallback>
                                        {reply.author.name
                                          .split(" ")
                                          .map((n) => n[0])
                                          .join("")}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-semibold text-sm">{reply.author.name}</span>
                                        <span className="text-xs text-gray-500">{getTimeAgo(reply.timestamp)}</span>
                                      </div>
                                      <p className="text-gray-700 text-sm mb-1">{reply.content}</p>
                                      <Button variant="ghost" size="sm" className="p-0 h-auto text-xs">
                                        <ThumbsUp className="w-3 h-3 mr-1" />
                                        {reply.likes}
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Related News */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="text-xl">Related News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {relatedNews.map((news) => (
                    <Link key={news.id} href={`/news/${news.slug}`}>
                      <div className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                        <Image
                          src={news.image || "/placeholder.svg"}
                          alt={news.title}
                          width={120}
                          height={80}
                          className="object-cover rounded"
                        />
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-1">
                            {news.category}
                          </Badge>
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1">{news.title}</h4>
                          <p className="text-xs text-gray-500">{news.time}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* More News */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">More News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moreNews.map((news, index) => (
                    <Link key={news.id} href={`/news/${news.slug}`}>
                      <div className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">{index + 1}</span>
                        <Image
                          src={news.image || "/placeholder.svg"}
                          alt={news.title}
                          width={80}
                          height={60}
                          className="object-cover rounded"
                        />
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-1">
                            {news.category}
                          </Badge>
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1">{news.title}</h4>
                          <p className="text-xs text-gray-500">{news.time}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advertisement */}
            <Card className="bg-gradient-to-b from-purple-500 to-pink-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Advertisement</h3>
                <div className="h-64 bg-white/20 rounded flex items-center justify-center">
                  <span className="text-sm">300x250</span>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">Get daily news updates delivered to your inbox</p>
                <Input placeholder="Your email address" className="mb-3" />
                <Button className="w-full bg-red-600 hover:bg-red-700">Subscribe</Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center justify-center">
                    <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center">
                    <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center">
                    <Instagram className="w-4 h-4 mr-2 text-pink-600" />
                    Instagram
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center">
                    <Youtube className="w-4 h-4 mr-2 text-red-600" />
                    YouTube
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-4">भारत न्यूज़</h3>
              <p className="text-sm text-gray-300 mb-4">
                India's leading news portal providing latest updates on politics, sports, entertainment, and more.
              </p>
              <div className="flex space-x-3">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400" />
                <Youtube className="w-5 h-5 cursor-pointer hover:text-red-400" />
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Politics
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Sports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Bollywood
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Business
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  New Delhi, India
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 11 1234 5678
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  news@bharatnews.com
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6 bg-gray-700" />

          <div className="flex justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 भारत न्यूज़. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Rss className="w-4 h-4" />
              <span>RSS Feed</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
