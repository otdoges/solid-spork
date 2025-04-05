"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  Edit,
  Eye,
  MailPlus,
  Plus,
  Send,
  Users,
  Download,
  Filter,
  TrendingUp,
  Bell,
  Zap,
  ArrowRight,
} from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NewsletterList } from "@/components/newsletter-list"
import { SubscriberGrowthChart } from "@/components/subscriber-growth-chart"
import { EngagementChart } from "@/components/engagement-chart"
import { RecentActivity } from "@/components/recent-activity"
import { DateRangePicker } from "@/components/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlanUsageIndicator } from "@/components/plan-usage-indicator"
import { UpgradeBanner } from "@/components/upgrade-banner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PerformanceMetricCard } from "@/components/performance-metric-card"
import { RevenueSnapshot } from "@/components/revenue-snapshot"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [showNotifications, setShowNotifications] = useState(false)

  // Mock data for current plan
  const currentPlan = {
    name: "Starter",
    subscribers: {
      current: 4850,
      limit: 5000,
      percentage: 97,
    },
    emails: {
      current: 42500,
      limit: 50000,
      percentage: 85,
    },
  }

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "Approaching subscriber limit",
      description: "You're at 97% of your subscriber limit. Consider upgrading your plan.",
      type: "warning",
    },
    {
      id: 2,
      title: "Weekly report ready",
      description: "Your weekly performance report is now available.",
      type: "info",
    },
    {
      id: 3,
      title: "New subscribers",
      description: "You gained 124 new subscribers this week, a 15% increase!",
      type: "success",
    },
  ]

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
  }

  return (
    <DashboardShell>
      {currentPlan.subscribers.percentage > 90 && (
        <UpgradeBanner
          planName={currentPlan.name}
          limitType="subscriber limit"
          percentage={currentPlan.subscribers.percentage}
        />
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <DashboardHeader heading="Dashboard" text="Overview of your newsletter performance" className="md:mb-0" />

        <div className="flex items-center gap-2">
          <DateRangePicker date={dateRange} setDate={setDateRange} />

          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {notifications.length}
              </span>
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 rounded-md bg-background shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <div className="p-4">
                    <h3 className="text-sm font-medium mb-2">Notifications</h3>
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-md text-sm ${
                            notification.type === "warning"
                              ? "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                              : notification.type === "success"
                                ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                : "bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                          }`}
                        >
                          <p className="font-medium">{notification.title}</p>
                          <p className="text-xs mt-1">{notification.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button>
            <MailPlus className="mr-2 h-4 w-4" />
            New Newsletter
          </Button>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <PerformanceMetricCard
          title="Total Subscribers"
          value={currentPlan.subscribers.current.toLocaleString()}
          change={18}
          changeLabel="from last month"
          icon={<Users className="h-4 w-4 text-primary" />}
        />

        <PerformanceMetricCard
          title="Open Rate"
          value="42.8%"
          change={3.2}
          changeLabel="from last month"
          icon={<Eye className="h-4 w-4 text-primary" />}
        />

        <PerformanceMetricCard
          title="Click Rate"
          value="18.3%"
          change={1.8}
          changeLabel="from last month"
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
        />

        <PerformanceMetricCard
          title="Newsletters Sent"
          value="42"
          secondaryText="Last sent 2 days ago"
          icon={<Send className="h-4 w-4 text-primary" />}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Plan Usage</CardTitle>
              <CardDescription>Your current usage on the {currentPlan.name} plan</CardDescription>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div animate={pulseAnimation}>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/pricing">
                        <Zap className="mr-2 h-4 w-4" />
                        Upgrade
                      </Link>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade to unlock more features and higher limits</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent className="space-y-6">
            <PlanUsageIndicator
              current={currentPlan.subscribers.current}
              limit={currentPlan.subscribers.limit}
              label="Subscribers"
              warningThreshold={80}
              criticalThreshold={90}
            />

            <PlanUsageIndicator
              current={currentPlan.emails.current}
              limit={currentPlan.emails.limit}
              label="Monthly Emails"
              warningThreshold={80}
              criticalThreshold={90}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">Plan renews on May 15, 2025</p>
            <Button variant="link" size="sm" asChild>
              <Link href="/account/billing">
                Manage Subscription
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-5 md:w-auto w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <CardTitle>Subscriber Growth</CardTitle>
                    <CardDescription>New subscribers over the last 30 days</CardDescription>
                  </div>
                  <Select defaultValue="30days">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent className="pl-2">
                  <SubscriberGrowthChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <CardTitle>Engagement Metrics</CardTitle>
                    <CardDescription>Open and click rates for recent newsletters</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent className="pl-2">
                  <EngagementChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Upcoming Newsletters</CardTitle>
                  <CardDescription>Scheduled for the next 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Weekly Digest</p>
                        <div className="flex items-center pt-2">
                          <CalendarDays className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Tomorrow at 8:00 AM</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Product Update</p>
                        <div className="flex items-center pt-2">
                          <CalendarDays className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Apr 8 at 10:00 AM</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Monthly Newsletter</p>
                        <div className="flex items-center pt-2">
                          <CalendarDays className="mr-1 h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Apr 10 at 9:00 AM</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/newsletters">
                      View All Newsletters
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>Comprehensive metrics for all your newsletters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Analytics dashboard content would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="newsletters" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Newsletters</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Select defaultValue="all">
                    <SelectTrigger className="pl-8 w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Newsletters</SelectItem>
                      <SelectItem value="draft">Drafts</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Newsletter
                </Button>
              </div>
            </div>
            <NewsletterList />
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Management</CardTitle>
                <CardDescription>View and manage your subscriber list</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">Subscriber management dashboard would go here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <RevenueSnapshot />
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardShell>
  )
}

