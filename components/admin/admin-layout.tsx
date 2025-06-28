"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  FileText,
  FolderOpen,
  Settings,
  Globe,
  Bell,
  LogOut,
  User,
  Plus,
  Eye,
  Palette,
  Crown,
  Play,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"

const menuItems = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: BarChart3,
      },
      {
        title: "Analytics",
        url: "/admin/analytics",
        icon: Eye,
      },
    ],
  },
  {
    title: "Content Management",
    items: [
      {
        title: "News Posts",
        url: "/admin/news",
        icon: FileText,
      },
      {
        title: "Categories",
        url: "/admin/categories",
        icon: FolderOpen,
      },
      {
        title: "Add News",
        url: "/admin/news/add",
        icon: Plus,
      },
      {
        title: "Web Stories",
        url: "/admin/webstories",
        icon: Play,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Domain",
        url: "/admin/domain",
        icon: Globe,
      },
      {
        title: "Subscription",
        url: "/admin/subscription",
        icon: Crown,
      },
    ],
  },
]

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState({
    name: "Admin User",
    email: "admin@mojonetwork.in",
    avatar: "/placeholder.svg?height=32&width=32&text=AU&bg=dc2626",
    plan: "Pro",
  })

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    router.push("/admin/login")
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset" className="border-r">
        <SidebarHeader className="border-b bg-white">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="w-10 h-10 relative">
              <Image src="/images/mojo-logo.jpg" alt="MojoNetwork" fill className="object-contain" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-bold text-lg text-gray-900 truncate">MojoNetwork</h2>
              <p className="text-xs text-gray-600">Admin Panel</p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="bg-white">
          {menuItems.map((group) => (
            <SidebarGroup key={group.title} className="px-3 py-2">
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className="w-full justify-start px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100 data-[active=true]:bg-red-50 data-[active=true]:text-red-700 data-[active=true]:border-red-200"
                      >
                        <Link href={item.url} className="flex items-center gap-3">
                          <item.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        <SidebarFooter className="border-t bg-white">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg" className="data-[state=open]:bg-gray-50 w-full justify-start px-3 py-3">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="rounded-lg bg-red-600 text-white text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs text-gray-600">{user.email}</span>
                    </div>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {user.plan}
                    </Badge>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-red-600 text-white">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{user.name}</span>
                       
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-white">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 px-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              System Online
            </Badge>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-6">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
