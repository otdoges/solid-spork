"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Download, TrendingUp, Users, DollarSign, RefreshCw } from "lucide-react"
import { RevenueChart } from "@/components/revenue-chart"
import Link from "next/link"

export function RevenueSnapshot() {
  const [period, setPeriod] = useState("30days")

  // Mock revenue data
  const revenueData = {
    mrr: 24892,
    growth: 9.4,
    arpu: 68.42,
    ltv: 824,
    churnRate: 2.1,
    activeSubscribers: 364,
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Revenue Analytics</h2>
          <p className="text-muted-foreground">Track your subscription revenue and growth</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={setPeriod}>
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
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.mrr.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-500">+{revenueData.growth}%</span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Revenue Per User</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.arpu}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-500">+2.8%</span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Customer Lifetime Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${revenueData.ltv}</div>
              <div className="flex items-center mt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-500">+5.2%</span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Churn Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revenueData.churnRate}%</div>
              <div className="flex items-center mt-1">
                <RefreshCw className="mr-1 h-3 w-3 text-amber-500" />
                <span className="text-xs text-amber-500">+0.3%</span>
                <span className="text-xs text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revenueData.activeSubscribers}</div>
              <div className="flex items-center mt-1">
                <Users className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-500">+24</span>
                <span className="text-xs text-muted-foreground ml-1">new this month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(revenueData.mrr * 12).toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <DollarSign className="mr-1 h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-500">Projected</span>
                <span className="text-xs text-muted-foreground ml-1">based on current MRR</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <Card>
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>Monthly recurring revenue over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <RevenueChart />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/revenue-analytics">
                View Detailed Revenue Analytics
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <Tabs defaultValue="plans" className="mt-8">
        <TabsList>
          <TabsTrigger value="plans">Plan Distribution</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="forecasts">Revenue Forecasts</TabsTrigger>
        </TabsList>
        <TabsContent value="plans" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan Distribution</CardTitle>
              <CardDescription>Breakdown of subscribers by plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                      <p className="text-sm font-medium">Professional Plan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">42% (153 subscribers)</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                      <p className="text-sm font-medium">Starter Plan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">35% (128 subscribers)</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-purple-500" style={{ width: "35%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <p className="text-sm font-medium">Free Plan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">18% (65 subscribers)</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-amber-500" style={{ width: "18%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                      <p className="text-sm font-medium">Enterprise Plan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">5% (18 subscribers)</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: "5%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest subscription payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Customer</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Plan</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Apr 5, 2025</td>
                        <td className="p-4 align-middle font-medium">Sarah Johnson</td>
                        <td className="p-4 align-middle">Professional</td>
                        <td className="p-4 align-middle">$79.00</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Successful
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Apr 4, 2025</td>
                        <td className="p-4 align-middle font-medium">Michael Smith</td>
                        <td className="p-4 align-middle">Starter</td>
                        <td className="p-4 align-middle">$29.00</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Successful
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Apr 3, 2025</td>
                        <td className="p-4 align-middle font-medium">Emma Wilson</td>
                        <td className="p-4 align-middle">Professional</td>
                        <td className="p-4 align-middle">$79.00</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Successful
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Apr 2, 2025</td>
                        <td className="p-4 align-middle font-medium">James Brown</td>
                        <td className="p-4 align-middle">Enterprise</td>
                        <td className="p-4 align-middle">$249.00</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
                            Successful
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">Apr 1, 2025</td>
                        <td className="p-4 align-middle font-medium">Olivia Davis</td>
                        <td className="p-4 align-middle">Starter</td>
                        <td className="p-4 align-middle">$29.00</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                            Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forecasts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasts</CardTitle>
              <CardDescription>Projected revenue for the next 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <p className="text-muted-foreground">Revenue forecast visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

