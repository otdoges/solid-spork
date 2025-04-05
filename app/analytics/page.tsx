import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubscriberGrowthChart } from "@/components/subscriber-growth-chart"
import { EngagementChart } from "@/components/engagement-chart"
import { ClickMapChart } from "@/components/click-map-chart"
import { GeographyChart } from "@/components/geography-chart"
import { Download, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Track and analyze your newsletter performance">
        <div className="flex items-center space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.8%</div>
            <p className="text-xs text-muted-foreground">Industry average: 21.3%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.3%</div>
            <p className="text-xs text-muted-foreground">Industry average: 7.8%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.4%</div>
            <p className="text-xs text-muted-foreground">+3.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsubscribe Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.8%</div>
            <p className="text-xs text-muted-foreground">Industry average: 0.5%</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Subscriber Growth</CardTitle>
                <CardDescription>New subscribers over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SubscriberGrowthChart />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
                <CardDescription>Open and click rates over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <EngagementChart />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Performance</CardTitle>
              <CardDescription>Comparison of recent newsletters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="h-12 px-4 text-left align-middle font-medium">Newsletter</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Sent Date</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Recipients</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Opens</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Clicks</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Unsubscribes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Weekly Digest #12</td>
                      <td className="p-4 align-middle">Apr 3, 2025</td>
                      <td className="p-4 align-middle">12,546</td>
                      <td className="p-4 align-middle">5,872 (46.8%)</td>
                      <td className="p-4 align-middle">2,384 (19.0%)</td>
                      <td className="p-4 align-middle">24 (0.2%)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Product Update</td>
                      <td className="p-4 align-middle">Mar 28, 2025</td>
                      <td className="p-4 align-middle">12,498</td>
                      <td className="p-4 align-middle">6,124 (49.0%)</td>
                      <td className="p-4 align-middle">2,749 (22.0%)</td>
                      <td className="p-4 align-middle">37 (0.3%)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Weekly Digest #11</td>
                      <td className="p-4 align-middle">Mar 27, 2025</td>
                      <td className="p-4 align-middle">12,482</td>
                      <td className="p-4 align-middle">5,742 (46.0%)</td>
                      <td className="p-4 align-middle">2,246 (18.0%)</td>
                      <td className="p-4 align-middle">25 (0.2%)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle font-medium">Special Announcement</td>
                      <td className="p-4 align-middle">Mar 20, 2025</td>
                      <td className="p-4 align-middle">12,375</td>
                      <td className="p-4 align-middle">6,682 (54.0%)</td>
                      <td className="p-4 align-middle">3,094 (25.0%)</td>
                      <td className="p-4 align-middle">62 (0.5%)</td>
                    </tr>
                    <tr>
                      <td className="p-4 align-middle font-medium">Weekly Digest #10</td>
                      <td className="p-4 align-middle">Mar 20, 2025</td>
                      <td className="p-4 align-middle">12,310</td>
                      <td className="p-4 align-middle">5,539 (45.0%)</td>
                      <td className="p-4 align-middle">2,093 (17.0%)</td>
                      <td className="p-4 align-middle">31 (0.3%)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Click Map</CardTitle>
                <CardDescription>Where subscribers click in your newsletters</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ClickMapChart />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>How subscribers view your newsletters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Mobile</p>
                      <p className="text-sm text-muted-foreground">68%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Desktop</p>
                      <p className="text-sm text-muted-foreground">24%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "24%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Tablet</p>
                      <p className="text-sm text-muted-foreground">8%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "8%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Reading Time</CardTitle>
              <CardDescription>How long subscribers spend reading your newsletters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">Less than 10 seconds</p>
                    <p className="text-2xl font-bold">18%</p>
                    <p className="text-xs text-muted-foreground">Likely just skimming</p>
                  </div>
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">10-30 seconds</p>
                    <p className="text-2xl font-bold">24%</p>
                    <p className="text-xs text-muted-foreground">Quick reading</p>
                  </div>
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">30-60 seconds</p>
                    <p className="text-2xl font-bold">32%</p>
                    <p className="text-xs text-muted-foreground">Reading key sections</p>
                  </div>
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">Over 1 minute</p>
                    <p className="text-2xl font-bold">26%</p>
                    <p className="text-xs text-muted-foreground">Thorough reading</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="subscribers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Subscriber Growth</CardTitle>
                <CardDescription>New subscribers over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SubscriberGrowthChart />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Subscriber Sources</CardTitle>
                <CardDescription>Where your subscribers come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Website</p>
                      <p className="text-sm text-muted-foreground">42%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "42%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Social Media</p>
                      <p className="text-sm text-muted-foreground">28%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "28%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Referrals</p>
                      <p className="text-sm text-muted-foreground">18%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "18%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Other</p>
                      <p className="text-sm text-muted-foreground">12%</p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Activity</CardTitle>
              <CardDescription>Engagement levels of your subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">Highly Engaged</p>
                    <p className="text-2xl font-bold">28%</p>
                    <p className="text-xs text-muted-foreground">Open & click regularly</p>
                  </div>
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">Engaged</p>
                    <p className="text-2xl font-bold">35%</p>
                    <p className="text-xs text-muted-foreground">Open regularly</p>
                  </div>
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">Occasional</p>
                    <p className="text-2xl font-bold">24%</p>
                    <p className="text-xs text-muted-foreground">Open sometimes</p>
                  </div>
                  <div className="space-y-2 border rounded-lg p-4">
                    <p className="text-sm font-medium">Dormant</p>
                    <p className="text-2xl font-bold">13%</p>
                    <p className="text-xs text-muted-foreground">Rarely engage</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscriber Geography</CardTitle>
              <CardDescription>Where your subscribers are located</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <GeographyChart />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Locations</CardTitle>
              <CardDescription>Countries with the most subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">United States</p>
                    <p className="text-sm text-muted-foreground">42%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "42%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">United Kingdom</p>
                    <p className="text-sm text-muted-foreground">18%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "18%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Canada</p>
                    <p className="text-sm text-muted-foreground">12%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "12%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Australia</p>
                    <p className="text-sm text-muted-foreground">8%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "8%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Germany</p>
                    <p className="text-sm text-muted-foreground">6%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "6%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Other</p>
                    <p className="text-sm text-muted-foreground">14%</p>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 rounded-full bg-primary" style={{ width: "14%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

