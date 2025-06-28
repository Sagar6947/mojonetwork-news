"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Globe,
  Plus,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Copy,
  Trash2,
  Settings,
  Crown,
  Zap,
} from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

const domains = [
  {
    id: 1,
    domain: "news.mojonetwork.in",
    type: "subdomain",
    status: "active",
    isPrimary: true,
    sslStatus: "active",
    createdAt: "2024-01-01",
    plan: "free",
  },
  {
    id: 2,
    domain: "bharatnews.com",
    type: "custom",
    status: "pending",
    isPrimary: false,
    sslStatus: "pending",
    createdAt: "2024-01-15",
    plan: "pro",
  },
]

export default function DomainManagement() {
  const [domainList, setDomainList] = useState(domains)
  const [newDomain, setNewDomain] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [currentPlan, setCurrentPlan] = useState("starter")

  const handleAddDomain = async () => {
    if (!newDomain.trim()) return

    setIsConnecting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const domain = {
        id: domainList.length + 1,
        domain: newDomain,
        type: "custom",
        status: "pending",
        isPrimary: false,
        sslStatus: "pending",
        createdAt: new Date().toISOString().split("T")[0],
        plan: currentPlan,
      }

      setDomainList((prev) => [...prev, domain])
      setNewDomain("")
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding domain:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const handleMakePrimary = (domainId: number) => {
    setDomainList((prev) =>
      prev.map((domain) => ({
        ...domain,
        isPrimary: domain.id === domainId,
      })),
    )
  }

  const handleDeleteDomain = (domainId: number) => {
    setDomainList((prev) => prev.filter((domain) => domain.id !== domainId))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getSSLBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">SSL Active</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">SSL Pending</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">SSL Error</Badge>
      default:
        return <Badge variant="outline">No SSL</Badge>
    }
  }

  const canAddCustomDomain = currentPlan !== "free"

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Domain Management</h1>
            <p className="text-gray-600 mt-1">Manage your custom domains and DNS settings</p>
          </div>
          <div className="flex items-center gap-3">
            {!canAddCustomDomain && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Crown className="w-3 h-3" />
                Upgrade for Custom Domains
              </Badge>
            )}
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              disabled={!canAddCustomDomain}
              className="bg-red-600 hover:bg-red-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Connect Domain
            </Button>
          </div>
        </div>

        {/* Current Domain Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Domains</p>
                  <p className="text-2xl font-bold">{domainList.filter((d) => d.status === "active").length}</p>
                </div>
                <Globe className="w-5 h-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Setup</p>
                  <p className="text-2xl font-bold">{domainList.filter((d) => d.status === "pending").length}</p>
                </div>
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">SSL Certificates</p>
                  <p className="text-2xl font-bold">{domainList.filter((d) => d.sslStatus === "active").length}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upgrade Notice for Free Plan */}
        {!canAddCustomDomain && (
          <Alert>
            <Crown className="h-4 w-4" />
            <AlertDescription>
              You're currently on the free plan with a subdomain. Upgrade to Pro or Enterprise to connect your own
              custom domain and unlock advanced features.
              <Button variant="link" className="p-0 h-auto ml-2 text-red-600">
                Upgrade Now →
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Domains Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Domains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Domain</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>SSL</TableHead>
                    <TableHead>Primary</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {domainList.map((domain) => (
                    <TableRow key={domain.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{domain.domain}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                                onClick={() => window.open(`https://${domain.domain}`, "_blank")}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Visit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 text-xs text-gray-600 hover:text-gray-800"
                                onClick={() => navigator.clipboard.writeText(domain.domain)}
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Copy
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{domain.type === "subdomain" ? "Subdomain" : "Custom"}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(domain.status)}</TableCell>
                      <TableCell>{getSSLBadge(domain.sslStatus)}</TableCell>
                      <TableCell>
                        {domain.isPrimary ? (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Primary</Badge>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMakePrimary(domain.id)}
                            disabled={domain.status !== "active"}
                          >
                            Make Primary
                          </Button>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(domain.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {domain.type === "custom" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteDomain(domain.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* DNS Configuration Help */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              DNS Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                To connect your custom domain, you'll need to update your DNS settings with your domain registrar.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Required DNS Records:</h4>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span>Type: A</span>
                    <span>Name: @</span>
                    <span>Value: 76.76.19.123</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type: CNAME</span>
                    <span>Name: www</span>
                    <span>Value: www.mojontwork.in</span>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  DNS changes can take up to 24-48 hours to propagate globally. Your domain will show as "Pending" until
                  the DNS records are properly configured.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Add Domain Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Custom Domain</DialogTitle>
              <DialogDescription>
                Add your own domain to your news portal. Make sure you own this domain and can modify its DNS settings.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
                <p className="text-sm text-gray-500">Enter your domain without "http://" or "www"</p>
              </div>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertDescription>
                  After adding your domain, you'll need to configure DNS records with your domain registrar. We'll
                  provide the exact records you need.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddDomain}
                disabled={!newDomain.trim() || isConnecting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isConnecting ? "Connecting..." : "Connect Domain"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
