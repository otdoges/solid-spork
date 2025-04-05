"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DateRangePicker } from "@/components/date-range-picker"
import { Download, TrendingUp, TrendingDown, Users, DollarSign, Calendar, BarChart3 } from "lucide-react"
import { RevenueChart } from "@/components/revenue-chart"
import { SubscriptionGrowthChart } from "@/components/subscription-growth-chart"
import { ChurnRateChart } from "@/components/churn-rate-chart"
import { LTVChart } from "@/components/ltv-chart"

export default function RevenueAnalyticsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()

  // Mock data for revenue metrics
  const metrics = {
    mrr: {
      value: 24892,
      change: 18.5,
      trend: "up",
    },
    arr: {
      value: 298704,
      change: 18.5,
      trend: "up",
    },
    activeSubscribers: {
      value: 312,
      change: 8.2,
      trend: "up",
    },
    churnRate: {
      value: 3.2,
      change: -0.8,
      trend: "down",
    },
    averageLtv: {
      value: 798,
      change: 5.4,
      trend: "up",
    },
    conversionRate: {
      value: 4.8,
      change: 1.2,
      trend: "up",
    },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <DashboardShell>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <DashboardHeader heading="Revenue Analytics" text="Track your subscription revenue and key metrics">
          <div className="flex items-center gap-2">
            <DateRangePicker date={dateRange} setDate={setDateRange} />
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </DashboardHeader>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-purple-400/10">
              <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">${metrics.mrr.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.mrr.trend === "up" ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.mrr.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                  {metrics.mrr.change}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-purple-400/10">
              <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">${metrics.arr.value.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.arr.trend === "up" ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.arr.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                  {metrics.arr.change}%
                </span>{" "}
                from last year
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-purple-400/10">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{metrics.activeSubscribers.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.activeSubscribers.trend === "up" ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.activeSubscribers.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                  {metrics.activeSubscribers.change}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-purple-400/10">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{metrics.churnRate.value}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.churnRate.trend === "down" ? (
                  <TrendingDown className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingUp className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.churnRate.trend === "down" ? "text-emerald-500" : "text-red-500"}>
                  {Math.abs(metrics.churnRate.change)}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-purple-400/10">
              <CardTitle className="text-sm font-medium">Average LTV</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">${metrics.averageLtv.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.averageLtv.trend === "up" ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.averageLtv.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                  {metrics.averageLtv.change}%
                </span>{" "}
                from last quarter
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-purple-400/10">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{metrics.conversionRate.value}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {metrics.conversionRate.trend === "up" ? (
                  <TrendingUp className="mr-1 h-4 w-4 text-emerald-500" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                )}
                <span className={metrics.conversionRate.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                  {metrics.conversionRate.change}%
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Tabs defaultValue="revenue" className="space-y-4 mt-8">
          <TabsList>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="churn">Churn</TabsTrigger>
            <TabsTrigger value="ltv">Customer LTV</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Revenue Growth</CardTitle>
                  <CardDescription>Monthly recurring revenue over time</CardDescription>
                </div>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="12months">Last 12 months</SelectItem>
                    <SelectItem value="24months">Last 24 months</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pl-2">
                <RevenueChart />
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Total Revenue</p>
                  <p className="text-2xl font-bold">$298,704</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Growth Rate</p>
                  <p className="text-2xl font-bold text-emerald-500">+18.5%</p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="subscriptions" className="space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Subscription Growth</CardTitle>
                  <CardDescription>Active subscribers over time</CardDescription>
                </div>
                <Select defaultValue="6months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="12months">Last 12 months</SelectItem>
                    <SelectItem value="24months">Last 24 months</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pl-2">
                <SubscriptionGrowthChart />
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div>
                    <p className="text-sm font-medium">Free Plan</p>
                    <p className="text-xl font-bold">1,245</p>
                    <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Starter Plan</p>
                    <p className="text-xl font-bold">187</p>
                    <p className="text-xs text-muted-foreground">+8.7% from last month</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Professional Plan</p>
                    <p className="text-xl font-bold">125</p>
                    <p className="text-xs text-muted-foreground">+12.3% from last month</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="churn" className="space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Churn Rate</CardTitle>
                  <CardDescription>Monthly subscriber churn rate</CardDescription>
                </div>
                <Select defaultValue="12months">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="12months">Last 12 months</SelectItem>
                    <SelectItem value="24months">Last 24 months</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pl-2">
                <ChurnRateChart />
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div>
                    <p className="text-sm font-medium">Starter Plan</p>
                    <p className="text-xl font-bold">4.2%</p>
                    <p className="text-xs text-muted-foreground">-0.5% from last month</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Professional Plan</p>
                    <p className="text-xl font-bold">2.8%</p>
                    <p className="text-xs text-muted-foreground">-0.3% from last month</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Overall</p>
                    <p className="text-xl font-bold">3.2%</p>
                    <p className="text-xs text-muted-foreground">-0.8% from last month</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="ltv" className="space-y-4">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <div>
                  <CardTitle>Customer Lifetime Value</CardTitle>
                  <CardDescription>Average revenue per customer over their lifetime</CardDescription>
                </div>
                <Select defaultValue="alltime">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12months">Last 12 months</SelectItem>
                    <SelectItem value="24months">Last 24 months</SelectItem>
                    <SelectItem value="alltime">All time</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="pl-2">
                <LTVChart />
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-3 gap-4 w-full">
                  <div>
                    <p className="text-sm font-medium">Starter Plan</p>
                    <p className="text-xl font-bold">$498</p>
                    <p className="text-xs text-muted-foreground">Avg. 7 months retention</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Professional Plan</p>
                    <p className="text-xl font-bold">$1,264</p>
                    <p className="text-xs text-muted-foreground">Avg. 16 months retention</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Overall</p>
                    <p className="text-xl font-bold">$798</p>
                    <p className="text-xs text-muted-foreground">+5.4% from last quarter</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardShell>
  )
}

