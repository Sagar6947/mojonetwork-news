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
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, Calendar, Users, FileText, AlertTriangle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AdminLayout from "@/components/admin/admin-layout"

// Mock news data
const newsData = [
  {
    id: 1,
    title: "Prime Minister Modi Announces Major Infrastructure Development Plan",
    slug: "pm-modi-infrastructure-plan",
    category: "Politics",
    status: "published",
    author: "Rajesh Kumar",
    publishedAt: "2024-01-15T10:30:00Z",
    views: 45200,
    comments: 234,
    image: "/placeholder.svg?height=60&width=80&text=News+1&bg=dc2626",
    featured: true,
    scheduled: false,
  },
  {
    id: 2,
    title: "India Defeats Australia in Thrilling Cricket World Cup Final",
    slug: "india-cricket-victory",
    category: "Sports",
    status: "published",
    author: "Sanjay Gupta",
    publishedAt: "2024-01-14T18:30:00Z",
    views: 67800,
    comments: 456,
    image: "/placeholder.svg?height=60&width=80&text=News+2&bg=16a34a",
    featured: true,
    scheduled: false,
  },
  {
    id: 3,
    title: "Stock Market Reaches All-Time High Amid Economic Optimism",
    slug: "stock-market-high",
    category: "Business",
    status: "draft",
    author: "Priya Sharma",
    publishedAt: null,
    views: 0,
    comments: 0,
    image: "/placeholder.svg?height=60&width=80&text=News+3&bg=2563eb",
    featured: false,
    scheduled: false,
  },
  {
    id: 4,
    title: "Bollywood Power Couple Announces Surprise Engagement",
    slug: "bollywood-engagement",
    category: "Entertainment",
    status: "scheduled",
    author: "Kavita Reddy",
    publishedAt: "2024-01-16T09:00:00Z",
    views: 0,
    comments: 0,
    image: "/placeholder.svg?height=60&width=80&text=News+4&bg=db2777",
    featured: false,
    scheduled: true,
  },
  {
    id: 5,
    title: "Tech Giant Announces ₹5000 Crore Investment in India",
    slug: "tech-investment",
    category: "Technology",
    status: "published",
    author: "Amit Singh",
    publishedAt: "2024-01-13T14:20:00Z",
    views: 23100,
    comments: 89,
    image: "/placeholder.svg?height=60&width=80&text=News+5&bg=7c3aed",
    featured: false,
    scheduled: false,
  },
  // Add more mock data to test pagination
  ...Array.from({ length: 15 }, (_, i) => ({
    id: i + 6,
    title: `Sample News Article ${i + 6}`,
    slug: `sample-news-${i + 6}`,
    category: ["Politics", "Sports", "Business", "Technology"][i % 4],
    status: ["published", "draft", "scheduled"][i % 3],
    author: "Sample Author",
    publishedAt: "2024-01-10T10:00:00Z",
    views: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 100),
    image: `/placeholder.svg?height=60&width=80&text=News+${i + 6}&bg=${["dc2626", "16a34a", "2563eb", "7c3aed"][i % 4]}`,
    featured: false,
    scheduled: false,
  })),
]

const categories = ["All", "Politics", "Sports", "Business", "Entertainment", "Technology"]
const statuses = ["All", "Published", "Draft", "Scheduled"]

export default function NewsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [newsToDelete, setNewsToDelete] = useState<any>(null)
  const [newsToView, setNewsToView] = useState<any>(null)

  const itemsPerPage = 10

  const filteredNews = newsData.filter((news) => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || news.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage)

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

  const handleView = (news: any) => {
    setNewsToView(news)
    setViewDialogOpen(true)
  }

  const handleEdit = (news: any) => {
    // Navigate to edit page
    window.location.href = `/admin/news/edit/${news.id}`
  }

  const handleDelete = (news: any) => {
    setNewsToDelete(news)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // Handle delete logic here
    console.log("Deleting news:", newsToDelete)
    setDeleteDialogOpen(false)
    setNewsToDelete(null)
  }

  const stats = {
    total: newsData.length,
    published: newsData.filter((n) => n.status === "published").length,
    draft: newsData.filter((n) => n.status === "draft").length,
    scheduled: newsData.filter((n) => n.status === "scheduled").length,
    totalViews: newsData.reduce((sum, n) => sum + n.views, 0),
    totalComments: newsData.reduce((sum, n) => sum + n.comments, 0),
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
            <p className="text-gray-600 mt-1">Manage your news articles and content</p>
          </div>
          <Link href="/admin/news/add">
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 mr-2" />
              Add News
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FileText className="w-5 h-5 text-blue-600" />
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
                  <p className="text-sm text-gray-600">Comments</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.totalComments}</p>
                </div>
                <Users className="w-5 h-5 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>All News Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search news by title or author..."
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

            {/* News Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead>Article</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedNews.map((news) => (
                    <TableRow key={news.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Image
                            src={news.image || "/placeholder.svg"}
                            alt={news.title}
                            width={60}
                            height={40}
                            className="rounded object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-gray-900 line-clamp-2">{news.title}</p>
                            {news.featured && (
                              <Badge variant="outline" className="mt-1 text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{news.category}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(news.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{news.author}</TableCell>
                      <TableCell className="text-sm text-gray-600">{formatDate(news.publishedAt)}</TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {news.views.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {news.comments}
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
                            <DropdownMenuItem onClick={() => handleView(news)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(news)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(news)}>
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

            {filteredNews.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No news articles found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View News Dialog */}
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>View Article</DialogTitle>
            </DialogHeader>
            {newsToView && (
              <div className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <Image
                    src={newsToView.image || "/placeholder.svg"}
                    alt={newsToView.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{newsToView.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>By {newsToView.author}</span>
                    <span>{formatDate(newsToView.publishedAt)}</span>
                    <Badge variant="outline">{newsToView.category}</Badge>
                    {getStatusBadge(newsToView.status)}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-purple-600">{newsToView.views.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Views</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">{newsToView.comments}</p>
                    <p className="text-sm text-gray-600">Comments</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{newsToView.featured ? "Yes" : "No"}</p>
                    <p className="text-sm text-gray-600">Featured</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Close
              </Button>
              <Button onClick={() => handleEdit(newsToView)} className="bg-red-600 hover:bg-red-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Article
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
                Delete News Article
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{newsToDelete?.title}"? This action cannot be undone.
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
