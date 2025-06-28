"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Globe, Palette, Bell, Shield, Upload, Save, Eye, Share } from "lucide-react"
import Image from "next/image"
import AdminLayout from "@/components/admin/admin-layout"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "भारत न्यूज़",
    siteTagline: "India's Leading News Portal",
    siteDescription:
      "Get latest news updates from India and around the world. Breaking news, politics, sports, entertainment, business and more.",
    contactEmail: "contact@bharatnews.com",
    contactPhone: "+91 11 1234 5678",
    address: "New Delhi, India 110001",

    // Theme Settings
    selectedTheme: "default",
    primaryColor: "#dc2626",
    secondaryColor: "#16a34a",
    accentColor: "#2563eb",

    // Layout Settings
    headerLayout: "modern",
    sidebarPosition: "right",
    showBreadcrumbs: true,
    showSocialShare: true,
    showComments: true,
    showRelatedPosts: true,

    // SEO Settings
    metaTitle: "भारत न्यूज़ - Latest Indian News",
    metaDescription:
      "Stay updated with latest news from India. Breaking news, politics, sports, entertainment, business updates and more.",
    metaKeywords: "indian news, breaking news, politics, sports, entertainment, business",
    googleAnalytics: "",
    facebookPixel: "",

    // Social Media
    facebookUrl: "https://facebook.com/bharatnews",
    twitterUrl: "https://twitter.com/bharatnews",
    instagramUrl: "https://instagram.com/bharatnews",
    youtubeUrl: "https://youtube.com/bharatnews",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    commentNotifications: true,
    newsletterEnabled: true,

    // Performance Settings
    enableCaching: true,
    enableCompression: true,
    enableLazyLoading: true,
    enableAMP: false,
  })

  const [logo, setLogo] = useState<string | null>("/placeholder.svg?height=60&width=200&text=भारत+न्यूज़&bg=dc2626")
  const [favicon, setFavicon] = useState<string | null>("/placeholder.svg?height=32&width=32&text=भ&bg=dc2626")
  const [isSaving, setIsSaving] = useState(false)

  const themes = [
    { id: "default", name: "Default", preview: "/placeholder.svg?height=100&width=150&text=Default+Theme&bg=dc2626" },
    { id: "modern", name: "Modern", preview: "/placeholder.svg?height=100&width=150&text=Modern+Theme&bg=2563eb" },
    { id: "classic", name: "Classic", preview: "/placeholder.svg?height=100&width=150&text=Classic+Theme&bg=16a34a" },
    { id: "minimal", name: "Minimal", preview: "/placeholder.svg?height=100&width=150&text=Minimal+Theme&bg=7c3aed" },
    {
      id: "magazine",
      name: "Magazine",
      preview: "/placeholder.svg?height=100&width=150&text=Magazine+Theme&bg=db2777",
    },
    {
      id: "newspaper",
      name: "Newspaper",
      preview: "/placeholder.svg?height=100&width=150&text=Newspaper+Theme&bg=059669",
    },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFavicon(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saving settings:", settings)
      alert("Settings saved successfully!")
    } catch (error) {
      alert("Error saving settings. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1">Configure your news portal settings and preferences</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview Changes
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-red-600 hover:bg-red-700">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Share className="w-4 h-4" />
              Social
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input
                      id="site-name"
                      value={settings.siteName}
                      onChange={(e) => handleSettingChange("siteName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-tagline">Tagline</Label>
                    <Input
                      id="site-tagline"
                      value={settings.siteTagline}
                      onChange={(e) => handleSettingChange("siteTagline", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site-description">Description</Label>
                    <Textarea
                      id="site-description"
                      value={settings.siteDescription}
                      onChange={(e) => handleSettingChange("siteDescription", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleSettingChange("contactEmail", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      value={settings.contactPhone}
                      onChange={(e) => handleSettingChange("contactPhone", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={settings.address}
                      onChange={(e) => handleSettingChange("address", e.target.value)}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label>Logo</Label>
                    <div className="space-y-3">
                      {logo && (
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <Image
                            src={logo || "/placeholder.svg"}
                            alt="Logo"
                            width={200}
                            height={60}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logo-upload"
                        />
                        <Label htmlFor="logo-upload" className="cursor-pointer">
                          <Button variant="outline" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Logo
                            </span>
                          </Button>
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Favicon</Label>
                    <div className="space-y-3">
                      {favicon && (
                        <div className="border rounded-lg p-4 bg-gray-50 w-fit">
                          <Image
                            src={favicon || "/placeholder.svg"}
                            alt="Favicon"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFaviconUpload}
                          className="hidden"
                          id="favicon-upload"
                        />
                        <Label htmlFor="favicon-upload" className="cursor-pointer">
                          <Button variant="outline" asChild>
                            <span>
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Favicon
                            </span>
                          </Button>
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all ${
                        settings.selectedTheme === theme.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleSettingChange("selectedTheme", theme.id)}
                    >
                      <Image
                        src={theme.preview || "/placeholder.svg"}
                        alt={theme.name}
                        width={150}
                        height={100}
                        className="rounded object-cover w-full h-20"
                      />
                      <p className="text-sm font-medium mt-2 text-center">{theme.name}</p>
                      {settings.selectedTheme === theme.id && (
                        <Badge className="absolute top-2 right-2 bg-red-600">Active</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => handleSettingChange("primaryColor", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => handleSettingChange("secondaryColor", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => handleSettingChange("accentColor", e.target.value)}
                        className="w-12 h-10 rounded border"
                      />
                      <Input
                        value={settings.accentColor}
                        onChange={(e) => handleSettingChange("accentColor", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Header Layout</Label>
                    <Select
                      value={settings.headerLayout}
                      onValueChange={(value) => handleSettingChange("headerLayout", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Sidebar Position</Label>
                    <Select
                      value={settings.sidebarPosition}
                      onValueChange={(value) => handleSettingChange("sidebarPosition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                        <SelectItem value="none">No Sidebar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Show Breadcrumbs</Label>
                      <Switch
                        checked={settings.showBreadcrumbs}
                        onCheckedChange={(checked) => handleSettingChange("showBreadcrumbs", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Show Social Share</Label>
                      <Switch
                        checked={settings.showSocialShare}
                        onCheckedChange={(checked) => handleSettingChange("showSocialShare", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Show Comments</Label>
                      <Switch
                        checked={settings.showComments}
                        onCheckedChange={(checked) => handleSettingChange("showComments", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Show Related Posts</Label>
                      <Switch
                        checked={settings.showRelatedPosts}
                        onCheckedChange={(checked) => handleSettingChange("showRelatedPosts", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Meta Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta-title">Meta Title</Label>
                    <Input
                      id="meta-title"
                      value={settings.metaTitle}
                      onChange={(e) => handleSettingChange("metaTitle", e.target.value)}
                      maxLength={60}
                    />
                    <p className="text-sm text-gray-500">{settings.metaTitle.length}/60 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta-description">Meta Description</Label>
                    <Textarea
                      id="meta-description"
                      value={settings.metaDescription}
                      onChange={(e) => handleSettingChange("metaDescription", e.target.value)}
                      maxLength={160}
                      rows={3}
                    />
                    <p className="text-sm text-gray-500">{settings.metaDescription.length}/160 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="meta-keywords">Meta Keywords</Label>
                    <Textarea
                      id="meta-keywords"
                      value={settings.metaKeywords}
                      onChange={(e) => handleSettingChange("metaKeywords", e.target.value)}
                      rows={2}
                      placeholder="Separate keywords with commas"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="google-analytics">Google Analytics ID</Label>
                    <Input
                      id="google-analytics"
                      value={settings.googleAnalytics}
                      onChange={(e) => handleSettingChange("googleAnalytics", e.target.value)}
                      placeholder="G-XXXXXXXXXX"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="facebook-pixel">Facebook Pixel ID</Label>
                    <Input
                      id="facebook-pixel"
                      value={settings.facebookPixel}
                      onChange={(e) => handleSettingChange("facebookPixel", e.target.value)}
                      placeholder="123456789012345"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Social Media Settings */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="facebook-url">Facebook URL</Label>
                    <Input
                      id="facebook-url"
                      value={settings.facebookUrl}
                      onChange={(e) => handleSettingChange("facebookUrl", e.target.value)}
                      placeholder="https://facebook.com/yourpage"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="twitter-url">Twitter URL</Label>
                    <Input
                      id="twitter-url"
                      value={settings.twitterUrl}
                      onChange={(e) => handleSettingChange("twitterUrl", e.target.value)}
                      placeholder="https://twitter.com/yourhandle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instagram-url">Instagram URL</Label>
                    <Input
                      id="instagram-url"
                      value={settings.instagramUrl}
                      onChange={(e) => handleSettingChange("instagramUrl", e.target.value)}
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="youtube-url">YouTube URL</Label>
                    <Input
                      id="youtube-url"
                      value={settings.youtubeUrl}
                      onChange={(e) => handleSettingChange("youtubeUrl", e.target.value)}
                      placeholder="https://youtube.com/yourchannel"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-600">Send push notifications to subscribers</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Comment Notifications</Label>
                    <p className="text-sm text-gray-600">Get notified when someone comments on articles</p>
                  </div>
                  <Switch
                    checked={settings.commentNotifications}
                    onCheckedChange={(checked) => handleSettingChange("commentNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Newsletter</Label>
                    <p className="text-sm text-gray-600">Enable newsletter subscription for visitors</p>
                  </div>
                  <Switch
                    checked={settings.newsletterEnabled}
                    onCheckedChange={(checked) => handleSettingChange("newsletterEnabled", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Caching</Label>
                    <p className="text-sm text-gray-600">Improve site performance with caching</p>
                  </div>
                  <Switch
                    checked={settings.enableCaching}
                    onCheckedChange={(checked) => handleSettingChange("enableCaching", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Compression</Label>
                    <p className="text-sm text-gray-600">Compress files to reduce loading time</p>
                  </div>
                  <Switch
                    checked={settings.enableCompression}
                    onCheckedChange={(checked) => handleSettingChange("enableCompression", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Lazy Loading</Label>
                    <p className="text-sm text-gray-600">Load images only when they're visible</p>
                  </div>
                  <Switch
                    checked={settings.enableLazyLoading}
                    onCheckedChange={(checked) => handleSettingChange("enableLazyLoading", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>AMP Support</Label>
                    <p className="text-sm text-gray-600">Enable Accelerated Mobile Pages</p>
                  </div>
                  <Switch
                    checked={settings.enableAMP}
                    onCheckedChange={(checked) => handleSettingChange("enableAMP", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
