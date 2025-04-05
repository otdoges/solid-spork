"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertCircle, CheckCircle2, CreditCard, Download, Info, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BillingPage() {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDowngrading, setIsDowngrading] = useState(false)
  const [isUpgrading, setIsUpgrading] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  // Mock data for current subscription
  const subscription = {
    plan: "Professional",
    status: "active",
    billingPeriod: "monthly",
    amount: 79,
    nextBillingDate: "May 15, 2025",
    paymentMethod: {
      brand: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
    },
    usage: {
      subscribers: {
        current: 12546,
        limit: 25000,
        percentage: 50,
      },
      emails: {
        current: 98750,
        limit: 250000,
        percentage: 39,
      },
    },
  }

  // Mock data for billing history
  const billingHistory = [
    {
      id: "INV-001",
      date: "Apr 15, 2025",
      amount: "$79.00",
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-002",
      date: "Mar 15, 2025",
      amount: "$79.00",
      status: "paid",
      description: "Professional Plan - Monthly",
    },
    {
      id: "INV-003",
      date: "Feb 15, 2025",
      amount: "$79.00",
      status: "paid",
      description: "Professional Plan - Monthly",
    },
  ]

  const handleUpgrade = () => {
    setIsUpgrading(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpgrading(false)
      // Redirect to upgrade page or show success message
    }, 1500)
  }

  const handleDowngrade = () => {
    setIsDowngrading(true)
    // Simulate API call
    setTimeout(() => {
      setIsDowngrading(false)
      setShowCancelDialog(false)
      // Show success message or update UI
    }, 1500)
  }

  const handleUpdatePaymentMethod = () => {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false)
      // Show success message or update UI
    }, 1500)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <DashboardShell>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <DashboardHeader heading="Billing & Subscription" text="Manage your subscription and billing information" />
      </motion.div>

      <Tabs defaultValue="subscription" className="space-y-4">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Your current subscription details</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                  >
                    {subscription.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Plan</p>
                    <p className="text-xl font-bold">{subscription.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Billing Period</p>
                    <p className="text-xl font-bold capitalize">{subscription.billingPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Amount</p>
                    <p className="text-xl font-bold">
                      ${subscription.amount}.00/{subscription.billingPeriod === "monthly" ? "mo" : "yr"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Next Billing Date</p>
                    <p className="text-xl font-bold">{subscription.nextBillingDate}</p>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Plan Benefits</AlertTitle>
                  <AlertDescription>
                    Your {subscription.plan} plan includes up to {subscription.usage.subscribers.limit.toLocaleString()}{" "}
                    subscribers,
                    {subscription.usage.emails.limit.toLocaleString()} emails per month, advanced analytics, and
                    priority support.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-x-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/pricing">Compare Plans</Link>
                  </Button>
                  <Button onClick={handleUpgrade} disabled={isUpgrading}>
                    {isUpgrading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Upgrade Plan
                  </Button>
                </div>
                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="text-destructive hover:text-destructive">
                      Cancel Subscription
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Cancel Your Subscription</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to cancel your subscription? You'll lose access to premium features at the
                        end of your billing period.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">What happens when you cancel:</h4>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          <li>Your subscription will remain active until {subscription.nextBillingDate}</li>
                          <li>You'll be downgraded to the Free plan after that date</li>
                          <li>If you exceed Free plan limits, some features may be restricted</li>
                          <li>You can resubscribe at any time</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Would you like to tell us why you're leaving?</h4>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="too-expensive">Too expensive</SelectItem>
                            <SelectItem value="missing-features">Missing features I need</SelectItem>
                            <SelectItem value="not-using">Not using it enough</SelectItem>
                            <SelectItem value="switching">Switching to another service</SelectItem>
                            <SelectItem value="other">Other reason</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                        Keep Subscription
                      </Button>
                      <Button variant="destructive" onClick={handleDowngrade} disabled={isDowngrading}>
                        {isDowngrading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Confirm Cancellation
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Plan Usage</CardTitle>
                <CardDescription>Monitor your current usage against plan limits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Subscribers</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.usage.subscribers.current.toLocaleString()} /{" "}
                        {subscription.usage.subscribers.limit.toLocaleString()}
                      </p>
                    </div>
                    <Progress value={subscription.usage.subscribers.percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {100 - subscription.usage.subscribers.percentage}% of your subscriber limit remaining
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Monthly Emails</p>
                      <p className="text-sm text-muted-foreground">
                        {subscription.usage.emails.current.toLocaleString()} /{" "}
                        {subscription.usage.emails.limit.toLocaleString()}
                      </p>
                    </div>
                    <Progress value={subscription.usage.emails.percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {100 - subscription.usage.emails.percentage}% of your monthly email limit remaining
                    </p>
                  </div>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Usage Resets</AlertTitle>
                  <AlertDescription>
                    Your email usage resets on the 1st of each month. Subscriber limits are based on your current plan.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link href="/pricing">Upgrade for Higher Limits</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium capitalize">
                        {subscription.paymentMethod.brand} •••• {subscription.paymentMethod.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {subscription.paymentMethod.expMonth}/{subscription.paymentMethod.expYear}
                      </p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdatePaymentMethod} disabled={isUpdating}>
                  {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Update Payment Method
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <th className="h-12 px-4 text-left align-middle font-medium">Invoice</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                          <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {billingHistory.map((invoice) => (
                          <tr key={invoice.id} className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle font-medium">{invoice.id}</td>
                            <td className="p-4 align-middle">{invoice.date}</td>
                            <td className="p-4 align-middle">{invoice.amount}</td>
                            <td className="p-4 align-middle">
                              <Badge
                                variant="outline"
                                className={
                                  invoice.status === "paid"
                                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                                    : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
                                }
                              >
                                {invoice.status === "paid" ? (
                                  <CheckCircle2 className="mr-1 h-3 w-3" />
                                ) : (
                                  <AlertCircle className="mr-1 h-3 w-3" />
                                )}
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="p-4 align-middle text-right">
                              <Button variant="ghost" size="sm">
                                <Download className="mr-2 h-4 w-4" />
                                PDF
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

