"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Edit, MoreHorizontal, Plus, Send, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/ui/date-picker"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    name: "Monthly Newsletter - April",
    status: "scheduled",
    scheduledFor: "2025-04-10T09:00:00",
    recipients: 2547,
    progress: 0,
  },
  {
    id: 2,
    name: "Product Launch Announcement",
    status: "draft",
    scheduledFor: null,
    recipients: 3200,
    progress: 0,
  },
  {
    id: 3,
    name: "Weekly Update - Week 14",
    status: "sending",
    scheduledFor: "2025-04-05T15:30:00",
    recipients: 2100,
    progress: 45,
  },
  {
    id: 4,
    name: "Special Promotion",
    status: "completed",
    scheduledFor: "2025-04-01T10:00:00",
    recipients: 3000,
    progress: 100,
  },
]

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(mockCampaigns)
  const [activeTab, setActiveTab] = useState("all")

  const filteredCampaigns =
    activeTab === "all" ? campaigns : campaigns.filter((campaign) => campaign.status === activeTab)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500"
      case "draft":
        return "bg-gray-500"
      case "sending":
        return "bg-yellow-500"
      case "completed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not scheduled"
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Campaigns</h1>
          <p className="text-muted-foreground">Create, schedule, and manage your email campaigns</p>
        </div>
        <Button asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href="/campaigns/create">
              <Plus className="mr-2 h-4 w-4" /> Create Campaign
            </a>
          </motion.div>
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Input placeholder="Search campaigns..." className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Filter</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Date Range</DropdownMenuItem>
              <DropdownMenuItem>Recipient Count</DropdownMenuItem>
              <DropdownMenuItem>Performance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="sending">Sending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge className={`${getStatusColor(campaign.status)} text-white capitalize`}>
                          {campaign.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" /> Send Now
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardTitle className="text-xl mt-2">{campaign.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDate(campaign.scheduledFor)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Recipients:</span>
                          <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                        </div>
                        {campaign.status === "sending" && (
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress:</span>
                              <span className="font-medium">{campaign.progress}%</span>
                            </div>
                            <Progress value={campaign.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        {campaign.status === "draft" ? "Edit Draft" : "View Details"}
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Schedule a Campaign</CardTitle>
            <CardDescription>Choose when to send your campaign to your subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="campaign">Campaign</Label>
                <select
                  id="campaign"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select a campaign</option>
                  {campaigns
                    .filter((c) => c.status === "draft")
                    .map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Send Date</Label>
                <DatePicker />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Send Time</Label>
                <div className="flex items-center space-x-2">
                  <Input id="time" type="time" className="flex-1" />
                  <select className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="user">Recipient's Time Zone</option>
                    <option value="est">EST</option>
                    <option value="cst">CST</option>
                    <option value="mst">MST</option>
                    <option value="pst">PST</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="segment">Recipient Segment</Label>
                <select
                  id="segment"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="all">All Subscribers</option>
                  <option value="active">Active Subscribers</option>
                  <option value="new">New Subscribers</option>
                  <option value="engaged">Highly Engaged</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Schedule Campaign</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

