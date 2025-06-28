"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import {
  Upload,
  X,
  CalendarIcon,
  Clock,
  Save,
  Eye,
  Send,
  ImageIcon,
  FileText,
  Tag,
  Settings,
  ArrowLeft,
  Plus,
  LinkIcon,
} from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import AdminLayout from "@/components/admin/admin-layout"

const categories = [
  "Politics",
  "Sports",
  "Entertainment",
  "Business",
  "Technology",
  "Health",
  "Education",
  "International",
  "Environment",
]

export default function AddNews() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    content: "",
    category: "",
    tags: "",
    metaDescription: "",
    featured: false,
    allowComments: true,
    status: "draft",
  })

  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [publishDate, setPublishDate] = useState<Date>()
  const [publishTime, setPublishTime] = useState("09:00")
  const [isScheduled, setIsScheduled] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [newCategoryDescription, setNewCategoryDescription] = useState("")

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim()
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }))
    }
  }

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAdditionalImages((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    // Simulate API call to add category
    console.log("Adding category:", { name: newCategoryName, description: newCategoryDescription })

    // Add to categories list (in real app, this would come from API)
    categories.push(newCategoryName)

    // Select the new category
    setFormData((prev) => ({
      ...prev,
      category: newCategoryName,
    }))

    // Reset form and close dialog
    setNewCategoryName("")
    setNewCategoryDescription("")
    setAddCategoryDialogOpen(false)
  }

  const handleSave = async (status: string) => {
    setIsSaving(true)

    const newsData = {
      ...formData,
      status,
      coverImage,
      additionalImages,
      publishDate: isScheduled ? publishDate : null,
      publishTime: isScheduled ? publishTime : null,
      createdAt: new Date().toISOString(),
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saving news:", newsData)

      // Show success message and redirect
      alert(
        `News ${status === "published" ? "published" : status === "scheduled" ? "scheduled" : "saved as draft"} successfully!`,
      )
    } catch (error) {
      alert("Error saving news. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const getPreviewUrl = () => {
    const baseUrl = "https://news.mojonetwork.in"
    return `${baseUrl}/news/${formData.slug || "your-news-slug"}`
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/news">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Article</h1>
              <p className="text-gray-600 mt-1">Create and publish a new news article</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              Draft
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Article Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter article title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="text-lg font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <div className="space-y-2">
                    <Input
                      id="slug"
                      placeholder="url-friendly-slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                    />
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <LinkIcon className="w-4 h-4" />
                      <span className="break-all">{getPreviewUrl()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    placeholder="Enter article subtitle..."
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange("subtitle", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => handleInputChange("content", value)}
                    placeholder="Write your article content here..."
                    className="min-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Media
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Image */}
                <div className="space-y-3">
                  <Label>Cover Image *</Label>
                  {coverImage ? (
                    <div className="relative">
                      <Image
                        src={coverImage || "/placeholder.svg"}
                        alt="Cover"
                        width={400}
                        height={200}
                        className="rounded-lg object-cover w-full h-48"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setCoverImage(null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload cover image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                        id="cover-upload"
                      />
                      <Label htmlFor="cover-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Choose File</span>
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>

                {/* Additional Images */}
                <div className="space-y-3">
                  <Label>Additional Images</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {additionalImages.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Additional ${index + 1}`}
                          width={150}
                          height={100}
                          className="rounded-lg object-cover w-full h-24"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImageUpload}
                        className="hidden"
                        id="additional-upload"
                      />
                      <Label htmlFor="additional-upload" className="cursor-pointer">
                        <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Add Image</p>
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  SEO & Meta
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Brief description for search engines..."
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">{formData.metaDescription.length}/160 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags separated by commas..."
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                  />
                  <p className="text-sm text-gray-500">Separate tags with commas (e.g., politics, india, news)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Publish Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <div className="flex gap-2">
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={() => setAddCategoryDialogOpen(true)} className="px-3">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Article</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="comments">Allow Comments</Label>
                  <Switch
                    id="comments"
                    checked={formData.allowComments}
                    onCheckedChange={(checked) => handleInputChange("allowComments", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="schedule">Schedule Publication</Label>
                  <Switch id="schedule" checked={isScheduled} onCheckedChange={setIsScheduled} />
                </div>

                {isScheduled && (
                  <div className="space-y-3 pt-2 border-t">
                    <div className="space-y-2">
                      <Label>Publish Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {publishDate ? format(publishDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={publishDate} onSelect={setPublishDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="publish-time">Publish Time</Label>
                      <Input
                        id="publish-time"
                        type="time"
                        value={publishTime}
                        onChange={(e) => setPublishTime(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleSave("draft")}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Draft"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  disabled={!formData.title || !formData.content}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>

                {isScheduled ? (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSave("scheduled")}
                    disabled={isSaving || !formData.title || !formData.content || !formData.category || !publishDate}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {isSaving ? "Scheduling..." : "Schedule"}
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => handleSave("published")}
                    disabled={isSaving || !formData.title || !formData.content || !formData.category}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSaving ? "Publishing..." : "Publish Now"}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Article Stats Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Article Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Word Count:</span>
                  <span className="font-medium">
                    {formData.content.split(" ").filter((word) => word.length > 0).length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Character Count:</span>
                  <span className="font-medium">{formData.content.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Reading Time:</span>
                  <span className="font-medium">
                    {Math.ceil(formData.content.split(" ").filter((word) => word.length > 0).length / 200)} min
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <Badge variant="outline">{formData.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Category Dialog */}
        <Dialog open={addCategoryDialogOpen} onOpenChange={setAddCategoryDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category to organize your news articles.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-category-name">Category Name</Label>
                <Input
                  id="new-category-name"
                  placeholder="Enter category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-category-description">Description</Label>
                <Textarea
                  id="new-category-description"
                  placeholder="Enter category description..."
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddCategoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddCategory}
                disabled={!newCategoryName.trim()}
                className="bg-red-600 hover:bg-red-700"
              >
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
