"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Users,
  FileText,
  AlertTriangle,
  Play,
  ImageIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AdminLayout from "@/components/admin/admin-layout"

// Mock webstories data
const webstoriesData = [
  {
    id: 1,
    title: "Breaking: Election Results 2024",
    slug: "election-results-2024",
    category: "Politics",
    status: "published",
    author: "Rajesh Kumar",
    publishedAt: "2024-01-15T10:30:00Z",
    views: 125000,
    shares: 2340,
    coverImage: "/placeholder.svg?height=200&width=150&text=Story+1&bg=dc2626",
    frameCount: 8,
    featured: true,
    duration: "45s",
  },
  {
    id: 2,
    title: "Cricket World Cup Final Highlights",
    slug: "cricket-world-cup-final",
    category: "Sports",
    status: "published",
    author: "Sanjay Gupta",
    publishedAt: "2024-01-14T18:30:00Z",
    views: 89000,
    shares: 1890,
    coverImage: "/placeholder.svg?height=200&width=150&text=Story+2&bg=16a34a",
    frameCount: 12,
    featured: true,
    duration: "60s",
  },
  {
    id: 3,
    title: "Bollywood Awards Night 2024",
    slug: "bollywood-awards-2024",
    category: "Entertainment",
    status: "draft",
    author: "Kavita Reddy",
    publishedAt: null,
    views: 0,
    shares: 0,
    coverImage: "/placeholder.svg?height=200&width=150&text=Story+3&bg=db2777",
    frameCount: 6,
    featured: false,
    duration: "30s",
  },
  {
    id: 4,
    title: "Stock Market Update Today",
    slug: "stock-market-update",
    category: "Business",
    status: "scheduled",
    author: "Priya Sharma",
    publishedAt: "2024-01-16T09:00:00Z",
    views: 0,
    shares: 0,
    coverImage: "/placeholder.svg?height=200&width=150&text=Story+4&bg=2563eb",
    frameCount: 5,
    featured: false,
    duration: "25s",
  },
  {
    id: 5,
    title: "Tech Innovation Summit 2024",
    slug: "tech-innovation-summit",
    category: "Technology",
    status: "published",
    author: "Amit Singh",
    publishedAt: "2024-01-13T14:20:00Z",
    views: 45600,
    shares: 890,
    coverImage: "/placeholder.svg?height=200&width=150&text=Story+5&bg=7c3aed",
    frameCount: 10,
    featured: false,
    duration: "50s",
  },
  // Add more mock data to test pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    title: `Sample Web Story ${i + 6}`,
    slug: `sample-story-${i + 6}`,
    category: ["Politics", "Sports", "Business", "Technology"][i % 4],
    status: ["published", "draft", "scheduled"][i % 3],
    author: "Sample Author",
    publishedAt: "2024-01-10T10:00:00Z",
    views: Math.floor(Math.random() * 50000),
    shares: Math.floor(Math.random() * 1000),
    coverImage: `/placeholder.svg?height=200&width=150&text=Story+${i + 6}&bg=${["dc2626", "16a34a", "2563eb", "7c3aed"][i % 4]}`,
    frameCount: Math.floor(Math.random() * 10) + 3,
    featured: false,
    duration: `${Math.floor(Math.random() * 40) + 20}s`,
  })),
]

const categories = ["All", "Politics", "Sports", "Business", "Entertainment", "Technology"]
const statuses = ["All", "Published", "Draft", "Scheduled"]

export default function WebStoriesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [storyToDelete, setStoryToDelete] = useState<any>(null)
  const [storyToView, setStoryToView] = useState<any>(null)

  const itemsPerPage = 10

  const filteredStories = webstoriesData.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || story.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || story.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredStories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStories = filteredStories.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published"
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleView = (story: any) => {
    setStoryToView(story)
    setViewDialogOpen(true)
  }

  const handleEdit = (story: any) => {
    window.location.href = `/admin/webstories/edit/${story.id}`
  }

  const handleDelete = (story: any) => {
    setStoryToDelete(story)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    console.log("Deleting story:", storyToDelete)
    setDeleteDialogOpen(false)
    setStoryToDelete(null)
  }

  const stats = {
    total: webstoriesData.length,
    published: webstoriesData.filter((s) => s.status === "published").length,
    draft: webstoriesData.filter((s) => s.status === "draft").length,
    scheduled: webstoriesData.filter((s) => s.status === "scheduled").length,
    totalViews: webstoriesData.reduce((sum, s) => sum + s.views, 0),
    totalShares: webstoriesData.reduce((sum, s) => sum + s.shares, 0),
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Web Stories</h1>
            <p className="text-gray-600 mt-1">Manage your web stories and visual content</p>
          </div>
          <Link href="/admin/webstories/add">
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Story
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Stories</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <Play className="w-5 h-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                </div>
                <Eye className="w-5 h-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Drafts</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
                </div>
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Scheduled</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.scheduled}</p>
                </div>
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalViews.toLocaleString()}</p>
                </div>
                <Eye className="w-5 h-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Shares</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.totalShares.toLocaleString()}</p>
                </div>
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>All Web Stories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search stories by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stories Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead>Story</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Frames</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Shares</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedStories.map((story) => (
                    <TableRow key={story.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Image
                              src={story.coverImage || "/placeholder.svg"}
                              alt={story.title}
                              width={60}
                              height={80}
                              className="rounded object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 rounded flex items-center justify-center">
                              <Play className="w-4 h-4 text-white" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 line-clamp-2">{story.title}</p>
                            {story.featured && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{story.category}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(story.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{story.author}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          {story.frameCount}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{story.duration}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {story.views.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {story.shares}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleView(story)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(story)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(story)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage > 1) setCurrentPage(currentPage - 1)
                        }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentPage(page)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                        }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            {filteredStories.length === 0 && (
              <div className="text-center py-8">
                <Play className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No web stories found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Story Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>View Web Story</DialogTitle>
            </DialogHeader>
            {storyToView && (
              <div className="space-y-4">
                <div className="aspect-[9/16] relative rounded-lg overflow-hidden max-w-xs mx-auto">
                  <Image
                    src={storyToView.coverImage || "/placeholder.svg"}
                    alt={storyToView.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{storyToView.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>By {storyToView.author}</span>
                    <span>{formatDate(storyToView.publishedAt)}</span>
                    <Badge variant="outline">{storyToView.category}</Badge>
                    {getStatusBadge(storyToView.status)}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{storyToView.views.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{storyToView.shares}</p>
                    <p className="text-sm text-gray-600">Shares</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{storyToView.frameCount}</p>
                    <p className="text-sm text-gray-600">Frames</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{storyToView.duration}</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleEdit(storyToView)} className="bg-red-600 hover:bg-red-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Story
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Delete Web Story
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{storyToDelete?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
