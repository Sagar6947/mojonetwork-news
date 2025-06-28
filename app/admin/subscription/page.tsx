"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Crown, Check, X, CreditCard, ArrowRight, Star } from "lucide-react"
import AdminLayout from "@/components/admin/admin-layout"

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 15000,
    period: "month",
    description: "Perfect for small news websites getting started",
    features: [
      "Basic CMS functionality",
      "1 custom domain",
      "AI content tools",
      "Basic analytics",
      "Email support",
      "5GB storage",
      "Up to 10,000 monthly views",
      "Basic SEO tools",
    ],
    limitations: ["Limited customization", "No advanced analytics", "No priority support"],
    popular: false,
    color: "blue",
  },
  {
    id: "pro",
    name: "Pro",
    price: 30000,
    period: "month",
    description: "Ideal for growing news portals with multiple contributors",
    features: [
      "Advanced CMS features",
      "Multi-user access (up to 10 users)",
      "Advanced analytics & reporting",
      "Custom themes & layouts",
      "Priority email support",
      "50GB storage",
      "Up to 100,000 monthly views",
      "Advanced SEO tools",
      "Social media integration",
      "Newsletter management",
      "Comment moderation tools",
    ],
    limitations: ["Limited to 10 users", "No phone support"],
    popular: true,
    color: "red",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 60000,
    period: "month",
    description: "For large news organizations with advanced requirements",
    features: [
      "Full CMS capabilities",
      "Unlimited users",
      "Advanced analytics & insights",
      "Custom development support",
      "Dedicated account manager",
      "Unlimited storage",
      "Unlimited monthly views",
      "White-label solution",
      "API access",
      "Custom integrations",
      "24/7 phone & chat support",
      "Government compliance tools",
      "Advanced security features",
      "Custom domain management",
    ],
    limitations: [],
    popular: false,
    color: "purple",
  },
]

export default function SubscriptionPage() {
  const [currentPlan, setCurrentPlan] = useState("starter")
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)

  const currentPlanData = plans.find((p) => p.id === currentPlan)

  const usage = {
    domains: { used: 1, limit: 1 },
    users: { used: 2, limit: currentPlan === "starter" ? 1 : currentPlan === "pro" ? 10 : 999 },
    storage: { used: 2.3, limit: currentPlan === "starter" ? 5 : currentPlan === "pro" ? 50 : 999 },
    views: { used: 8500, limit: currentPlan === "starter" ? 10000 : currentPlan === "pro" ? 100000 : 999999 },
  }

  const handleUpgrade = (plan: any) => {
    setSelectedPlan(plan)
    setShowUpgradeDialog(true)
  }

  const confirmUpgrade = () => {
    // Handle upgrade logic here
    console.log("Upgrading to:", selectedPlan)
    setCurrentPlan(selectedPlan.id)
    setShowUpgradeDialog(false)
    setSelectedPlan(null)
  }

  const getUsagePercentage = (used: number, limit: number) => {
    if (limit === 999 || limit === 999999) return 0
    return Math.min((used / limit) * 100, 100)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscription & Billing</h1>
            <p className="text-gray-600 mt-1">Manage your subscription plan and billing information</p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <Crown className="w-4 h-4" />
            Current: {currentPlanData?.name}
          </Badge>
        </div>

        {/* Current Plan Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-600" />
              Current Plan: {currentPlanData?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Domains</span>
                  <span className="text-sm font-medium">
                    {usage.domains.used}/{usage.domains.limit === 999 ? "∞" : usage.domains.limit}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usage.domains.used, usage.domains.limit)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Users</span>
                  <span className="text-sm font-medium">
                    {usage.users.used}/{usage.users.limit === 999 ? "∞" : usage.users.limit}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usage.users.used, usage.users.limit)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Storage (GB)</span>
                  <span className="text-sm font-medium">
                    {usage.storage.used}/{usage.storage.limit === 999 ? "∞" : usage.storage.limit}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usage.storage.used, usage.storage.limit)} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Views</span>
                  <span className="text-sm font-medium">
                    {usage.views.used.toLocaleString()}/
                    {usage.views.limit === 999999 ? "∞" : usage.views.limit.toLocaleString()}
                  </span>
                </div>
                <Progress value={getUsagePercentage(usage.views.used, usage.views.limit)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1 rounded-lg">
            <Button
              variant={billingCycle === "monthly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
              className={billingCycle === "monthly" ? "bg-white shadow-sm" : ""}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "yearly" ? "default" : "ghost"}
              size="sm"
              onClick={() => setBillingCycle("yearly")}
              className={billingCycle === "yearly" ? "bg-white shadow-sm" : ""}
            >
              Yearly (Save 20%)
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isCurrentPlan = plan.id === currentPlan
            const price = billingCycle === "yearly" ? plan.price * 12 * 0.8 : plan.price

            return (
              <Card
                key={plan.id}
                className={`relative ${plan.popular ? "ring-2 ring-red-500" : ""} ${isCurrentPlan ? "bg-gray-50" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-red-600 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Crown className={`w-5 h-5 text-${plan.color}-600`} />
                    {plan.name}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      {formatPrice(price)}
                      <span className="text-lg font-normal text-gray-600">
                        /{billingCycle === "yearly" ? "year" : "month"}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <Badge variant="outline" className="text-green-600">
                        Save {formatPrice(plan.price * 12 * 0.2)}
                      </Badge>
                    )}
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Features included:</h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-gray-600">Limitations:</h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4">
                    {isCurrentPlan ? (
                      <Button disabled className="w-full">
                        <Check className="w-4 h-4 mr-2" />
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        className={`w-full ${plan.popular ? "bg-red-600 hover:bg-red-700" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleUpgrade(plan)}
                      >
                        {plan.id === "enterprise" ? "Contact Sales" : "Upgrade Now"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Feature Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Starter</th>
                    <th className="text-center py-3 px-4">Pro</th>
                    <th className="text-center py-3 px-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-3 px-4 font-medium">Custom Domains</td>
                    <td className="text-center py-3 px-4">1</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Users</td>
                    <td className="text-center py-3 px-4">1</td>
                    <td className="text-center py-3 px-4">10</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Storage</td>
                    <td className="text-center py-3 px-4">5GB</td>
                    <td className="text-center py-3 px-4">50GB</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Monthly Views</td>
                    <td className="text-center py-3 px-4">10K</td>
                    <td className="text-center py-3 px-4">100K</td>
                    <td className="text-center py-3 px-4">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Advanced Analytics</td>
                    <td className="text-center py-3 px-4">
                      <X className="w-4 h-4 text-red-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">Priority Support</td>
                    <td className="text-center py-3 px-4">
                      <X className="w-4 h-4 text-red-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">API Access</td>
                    <td className="text-center py-3 px-4">
                      <X className="w-4 h-4 text-red-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <X className="w-4 h-4 text-red-500 mx-auto" />
                    </td>
                    <td className="text-center py-3 px-4">
                      <Check className="w-4 h-4 text-green-600 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2024-01-01", amount: 15000, status: "paid", plan: "Starter" },
                { date: "2023-12-01", amount: 15000, status: "paid", plan: "Starter" },
                { date: "2023-11-01", amount: 15000, status: "paid", plan: "Starter" },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium">{invoice.plan} Plan</p>
                      <p className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">{formatPrice(invoice.amount)}</span>
                    <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Dialog */}
        <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upgrade to {selectedPlan?.name}</DialogTitle>
              <DialogDescription>
                You're about to upgrade to the {selectedPlan?.name} plan. Your new features will be available
                immediately.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Plan:</span>
                  <span className="font-medium">{selectedPlan?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Price:</span>
                  <span className="font-medium">
                    {selectedPlan &&
                      formatPrice(billingCycle === "yearly" ? selectedPlan.price * 12 * 0.8 : selectedPlan.price)}
                    /{billingCycle === "yearly" ? "year" : "month"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Billing:</span>
                  <span className="font-medium">{billingCycle === "yearly" ? "Yearly" : "Monthly"}</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmUpgrade} className="bg-red-600 hover:bg-red-700">
                Confirm Upgrade
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
