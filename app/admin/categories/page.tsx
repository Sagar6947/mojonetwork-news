"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Plus, Search, MoreHorizontal, Edit, Trash2, FolderOpen, FileText, Eye, AlertTriangle } from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

// Mock categories data
const categoriesData = [
  {
    id: 1,
    name: "Politics",
    slug: "politics",
    description: "Political news and government updates",
    color: "#dc2626",
    postCount: 45,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdated: "2024-01-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Sports",
    slug: "sports",
    description: "Sports news, matches, and player updates",
    color: "#16a34a",
    postCount: 32,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdated: "2024-01-14T18:30:00Z",
  },
  {
    id: 3,
    name: "Entertainment",
    slug: "entertainment",
    description: "Bollywood, movies, and celebrity news",
    color: "#db2777",
    postCount: 28,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdated: "2024-01-13T14:20:00Z",
  },
  {
    id: 4,
    name: "Business",
    slug: "business",
    description: "Business news, market updates, and economy",
    color: "#2563eb",
    postCount: 19,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdated: "2024-01-12T09:15:00Z",
  },
  {
    id: 5,
    name: "Technology",
    slug: "technology",
    description: "Tech news, gadgets, and innovation",
    color: "#7c3aed",
    postCount: 15,
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdated: "2024-01-11T16:45:00Z",
  },
  {
    id: 6,
    name: "Health",
    slug: "health",
    description: "Health and medical news",
    color: "#059669",
    postCount: 8,
    isActive: false,
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdated: "2024-01-10T11:20:00Z",
  },
  // Add more mock data to test pagination
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 7,
    name: `Category ${i + 7}`,
    slug: `category-${i + 7}`,
    description: `Description for category ${i + 7}`,
    color: ["#dc2626", "#16a34a", "#2563eb", "#7c3aed"][i % 4],
    postCount: Math.floor(Math.random() * 50),
    isActive: i % 3 !== 0,
    createdAt: "2024-01-01T00:00:00Z",
    lastUpdated: "2024-01-10T11:20:00Z",
  })),
]

export default function CategoriesManagement() {
  const [categories, setCategories] = useState(categoriesData)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#dc2626",
  })

  const itemsPerPage = 10

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      color: "#dc2626",
    })
  }

  const handleAdd = () => {
    const newCategory = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      color: formData.color,
      postCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    }

    setCategories((prev) => [...prev, newCategory])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleView = (category: any) => {
    setSelectedCategory(category)
    setIsViewDialogOpen(true)
  }

  const handleEdit = (category: any) => {
    setSelectedCategory(category)
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color,
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdate = () => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === selectedCategory.id
          ? {
              ...cat,
              name: formData.name,
              slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
              description: formData.description,
              color: formData.color,
              lastUpdated: new Date().toISOString(),
            }
          : cat,
      ),
    )
    setIsEditDialogOpen(false)
    setSelectedCategory(null)
    resetForm()
  }

  const handleDelete = (category: any) => {
    setSelectedCategory(category)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    setCategories((prev) => prev.filter((cat) => cat.id !== selectedCategory.id))
    setIsDeleteDialogOpen(false)
    setSelectedCategory(null)
  }

  const toggleStatus = (categoryId: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, isActive: !cat.isActive, lastUpdated: new Date().toISOString() } : cat,
      ),
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const stats = {
    total: categories.length,
    active: categories.filter((c) => c.isActive).length,
    inactive: categories.filter((c) => !c.isActive).length,
    totalPosts: categories.reduce((sum, c) => sum + c.postCount, 0),
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600 mt-1">Manage your news categories and organization</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Categories</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <FolderOpen className="w-5 h-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
                <Eye className="w-5 h-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inactive</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                </div>
                <FolderOpen className="w-5 h-5 text-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalPosts}</p>
                </div>
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Categories</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                          <div>
                            <p className="font-medium text-gray-900">{category.name}</p>
                            <p className="text-sm text-gray-500">/{category.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm text-gray-600 line-clamp-2">{category.description}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {category.postCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => toggleStatus(category.id)}>
                          {category.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{formatDate(category.createdAt)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{formatDate(category.lastUpdated)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleView(category)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(category)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(category)}>
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

            {filteredCategories.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No categories found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Category Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>View Category</DialogTitle>
            </DialogHeader>
            {selectedCategory && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: selectedCategory.color }} />
                  <div>
                    <h3 className="text-lg font-semibold">{selectedCategory.name}</h3>
                    <p className="text-sm text-gray-600">/{selectedCategory.slug}</p>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-gray-700 mt-1">{selectedCategory.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Posts</Label>
                    <p className="text-2xl font-bold text-purple-600">{selectedCategory.postCount}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                      {selectedCategory.isActive ? (
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Created</Label>
                    <p className="text-gray-600">{formatDate(selectedCategory.createdAt)}</p>
                  </div>
                  <div>
                    <Label>Last Updated</Label>
                    <p className="text-gray-600">{formatDate(selectedCategory.lastUpdated)}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  handleEdit(selectedCategory)
                }}
                className="bg-red-600 hover:bg-red-700"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Category Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category to organize your news articles.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="add-name">Category Name</Label>
                <Input
                  id="add-name"
                  placeholder="Enter category name..."
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-description">Description</Label>
                <Textarea
                  id="add-description"
                  placeholder="Enter category description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-color">Color</Label>
                <div className="flex items-center space-x-3">
                  <input
                    id="add-color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className="w-12 h-10 rounded border"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    placeholder="#dc2626"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdd} disabled={!formData.name.trim()} className="bg-red-600 hover:bg-red-700">
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Category Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription>Update the category information.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Category Name</Label>
                <Input
                  id="edit-name"
                  placeholder="Enter category name..."
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  placeholder="Enter category description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-color">Color</Label>
                <div className="flex items-center space-x-3">
                  <input
                    id="edit-color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    className="w-12 h-10 rounded border"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    placeholder="#dc2626"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={!formData.name.trim()} className="bg-red-600 hover:bg-red-700">
                Update Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                Delete Category
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone and will affect{" "}
                {selectedCategory?.postCount} posts.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
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
