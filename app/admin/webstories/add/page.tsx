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
import {
  Upload,
  X,
  CalendarIcon,
  Clock,
  Save,
  Eye,
  Send,
  ImageIcon,
  Play,
  Settings,
  ArrowLeft,
  Plus,
  LinkIcon,
  Move,
  Trash2,
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

interface StoryFrame {
  id: string
  title: string
  content: string
  image: string | null
  duration: number
  backgroundColor: string
  textColor: string
}

export default function AddWebStory() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    tags: "",
    metaDescription: "",
    featured: false,
    status: "draft",
  })

  const [frames, setFrames] = useState<StoryFrame[]>([
    {
      id: "1",
      title: "",
      content: "",
      image: null,
      duration: 5,
      backgroundColor: "#000000",
      textColor: "#ffffff",
    },
  ])

  const [publishDate, setPublishDate] = useState<Date>()
  const [publishTime, setPublishTime] = useState("09:00")
  const [isScheduled, setIsScheduled] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedFrameIndex, setSelectedFrameIndex] = useState(0)
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")

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

  const handleFrameChange = (index: number, field: string, value: any) => {
    setFrames((prev) =>
      prev.map((frame, i) =>
        i === index
          ? {
              ...frame,
              [field]: value,
            }
          : frame,
      ),
    )
  }

  const handleFrameImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleFrameChange(index, "image", e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addFrame = () => {
    const newFrame: StoryFrame = {
      id: Date.now().toString(),
      title: "",
      content: "",
      image: null,
      duration: 5,
      backgroundColor: "#000000",
      textColor: "#ffffff",
    }
    setFrames((prev) => [...prev, newFrame])
    setSelectedFrameIndex(frames.length)
  }

  const removeFrame = (index: number) => {
    if (frames.length > 1) {
      setFrames((prev) => prev.filter((_, i) => i !== index))
      if (selectedFrameIndex >= frames.length - 1) {
        setSelectedFrameIndex(Math.max(0, frames.length - 2))
      }
    }
  }

  const moveFrame = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= frames.length) return

    const newFrames = [...frames]
    const [movedFrame] = newFrames.splice(fromIndex, 1)
    newFrames.splice(toIndex, 0, movedFrame)
    setFrames(newFrames)
    setSelectedFrameIndex(toIndex)
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return

    categories.push(newCategoryName)
    setFormData((prev) => ({
      ...prev,
      category: newCategoryName,
    }))

    setNewCategoryName("")
    setAddCategoryDialogOpen(false)
  }

  const handleSave = async (status: string) => {
    setIsSaving(true)

    const storyData = {
      ...formData,
      status,
      frames,
      publishDate: isScheduled ? publishDate : null,
      publishTime: isScheduled ? publishTime : null,
      createdAt: new Date().toISOString(),
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saving web story:", storyData)

      alert(
        `Web Story ${status === "published" ? "published" : status === "scheduled" ? "scheduled" : "saved as draft"} successfully!`,
      )
    } catch (error) {
      alert("Error saving web story. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const getPreviewUrl = () => {
    const baseUrl = "https://news.mojonetwork.in"
    return `${baseUrl}/stories/${formData.slug || "your-story-slug"}/1`
  }

  const getTotalDuration = () => {
    return frames.reduce((total, frame) => total + frame.duration, 0)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/webstories">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Stories
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Web Story</h1>
              <p className="text-gray-600 mt-1">Create an engaging visual story</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Play className="w-3 h-3" />
              {frames.length} frames • {getTotalDuration()}s
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Frame Timeline */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Story Frames</CardTitle>
                  <Button size="sm" onClick={addFrame} className="bg-red-600 hover:bg-red-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {frames.map((frame, index) => (
                  <div
                    key={frame.id}
                    className={`relative border rounded-lg p-3 cursor-pointer transition-colors ${
                      selectedFrameIndex === index
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedFrameIndex(index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Frame {index + 1}</span>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            moveFrame(index, index - 1)
                          }}
                          disabled={index === 0}
                        >
                          <Move className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 w-6 p-0 text-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFrame(index)
                          }}
                          disabled={frames.length === 1}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="aspect-[9/16] bg-gray-100 rounded overflow-hidden mb-2">
                      {frame.image ? (
                        <Image
                          src={frame.image || "/placeholder.svg"}
                          alt={`Frame ${index + 1}`}
                          width={100}
                          height={178}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ backgroundColor: frame.backgroundColor }}
                        >
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 truncate">{frame.title || "Untitled"}</p>
                    <p className="text-xs text-gray-500">{frame.duration}s</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Frame Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Frame Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Frame Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[9/16] max-w-xs mx-auto rounded-lg overflow-hidden border">
                  <div
                    className="w-full h-full relative flex flex-col justify-end p-4"
                    style={{
                      backgroundColor: frames[selectedFrameIndex]?.backgroundColor || "#000000",
                      backgroundImage: frames[selectedFrameIndex]?.image
                        ? `url(${frames[selectedFrameIndex].image})`
                        : undefined,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {frames[selectedFrameIndex]?.image && (
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    )}
                    <div className="relative z-10">
                      {frames[selectedFrameIndex]?.title && (
                        <h3
                          className="text-lg font-bold mb-2"
                          style={{ color: frames[selectedFrameIndex]?.textColor || "#ffffff" }}
                        >
                          {frames[selectedFrameIndex].title}
                        </h3>
                      )}
                      {frames[selectedFrameIndex]?.content && (
                        <p className="text-sm" style={{ color: frames[selectedFrameIndex]?.textColor || "#ffffff" }}>
                          {frames[selectedFrameIndex].content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Frame Content */}
            <Card>
              <CardHeader>
                <CardTitle>Frame {selectedFrameIndex + 1} Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="frame-title">Frame Title</Label>
                  <Input
                    id="frame-title"
                    placeholder="Enter frame title..."
                    value={frames[selectedFrameIndex]?.title || ""}
                    onChange={(e) => handleFrameChange(selectedFrameIndex, "title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frame-content">Frame Content</Label>
                  <Textarea
                    id="frame-content"
                    placeholder="Enter frame content..."
                    value={frames[selectedFrameIndex]?.content || ""}
                    onChange={(e) => handleFrameChange(selectedFrameIndex, "content", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Frame Image</Label>
                  {frames[selectedFrameIndex]?.image ? (
                    <div className="relative">
                      <Image
                        src={frames[selectedFrameIndex].image || "/placeholder.svg"}
                        alt="Frame"
                        width={200}
                        height={150}
                        className="rounded-lg object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleFrameChange(selectedFrameIndex, "image", null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Upload frame image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFrameImageUpload(selectedFrameIndex, e)}
                        className="hidden"
                        id={`frame-upload-${selectedFrameIndex}`}
                      />
                      <Label htmlFor={`frame-upload-${selectedFrameIndex}`} className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Choose File</span>
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bg-color">Background Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="bg-color"
                        type="color"
                        value={frames[selectedFrameIndex]?.backgroundColor || "#000000"}
                        onChange={(e) => handleFrameChange(selectedFrameIndex, "backgroundColor", e.target.value)}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={frames[selectedFrameIndex]?.backgroundColor || "#000000"}
                        onChange={(e) => handleFrameChange(selectedFrameIndex, "backgroundColor", e.target.value)}
                        placeholder="#000000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="text-color">Text Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        id="text-color"
                        type="color"
                        value={frames[selectedFrameIndex]?.textColor || "#ffffff"}
                        onChange={(e) => handleFrameChange(selectedFrameIndex, "textColor", e.target.value)}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={frames[selectedFrameIndex]?.textColor || "#ffffff"}
                        onChange={(e) => handleFrameChange(selectedFrameIndex, "textColor", e.target.value)}
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (seconds)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="1"
                    max="15"
                    value={frames[selectedFrameIndex]?.duration || 5}
                    onChange={(e) =>
                      handleFrameChange(selectedFrameIndex, "duration", Number.parseInt(e.target.value) || 5)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Story Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Story Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="story-title">Story Title *</Label>
                  <Input
                    id="story-title"
                    placeholder="Enter story title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story-slug">URL Slug *</Label>
                  <div className="space-y-2">
                    <Input
                      id="story-slug"
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
                  <Label htmlFor="story-category">Category *</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="story-tags">Tags</Label>
                  <Input
                    id="story-tags"
                    placeholder="Enter tags separated by commas..."
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="story-meta">Meta Description</Label>
                  <Textarea
                    id="story-meta"
                    placeholder="Brief description for search engines..."
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-sm text-gray-500">{formData.metaDescription.length}/160 characters</p>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Featured Story</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleInputChange("featured", checked)}
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
                  disabled={!formData.title || frames.length === 0}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>

                {isScheduled ? (
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleSave("scheduled")}
                    disabled={isSaving || !formData.title || !formData.category || !publishDate || frames.length === 0}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {isSaving ? "Scheduling..." : "Schedule"}
                  </Button>
                ) : (
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => handleSave("published")}
                    disabled={isSaving || !formData.title || !formData.category || frames.length === 0}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSaving ? "Publishing..." : "Publish Now"}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Story Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Story Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Frames:</span>
                  <span className="font-medium">{frames.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Duration:</span>
                  <span className="font-medium">{getTotalDuration()}s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Avg Frame Duration:</span>
                  <span className="font-medium">{Math.round(getTotalDuration() / frames.length)}s</span>
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
              <DialogDescription>Create a new category for your web stories.</DialogDescription>
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
