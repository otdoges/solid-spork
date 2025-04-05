"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, Eye, Image, Link, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { DatePicker } from "@/components/ui/date-picker"
import { RichTextEditor } from "@/components/rich-text-editor"

export default function CreateCampaignPage() {
  const [previewMode, setPreviewMode] = useState(false)
  const [campaignData, setCampaignData] = useState({
    subject: "",
    preheader: "",
    fromName: "Beehive Newsletter",
    fromEmail: "newsletter@beehive.com",
    content: "<p>Write your newsletter content here...</p>",
    scheduledDate: null,
    scheduledTime: "",
    sendToAll: true,
    selectedSegments: [],
  })

  const handleContentChange = (content: string) => {
    setCampaignData({
      ...campaignData,
      content,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCampaignData({
      ...campaignData,
      [name]: value,
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Campaign</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="content">
                <TabsList className="mb-6">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="recipients">Recipients</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Email Subject</Label>
                      <Input 
                        id="subject" 
                        name="subject"
                        placeholder="Enter a compelling subject line" 
                        value={campaignData.subject}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="preheader">Preheader Text</Label>
                      <Input 
                        id="preheader" 
                        name="preheader"
                        placeholder="Brief text that appears after the subject line" 
                        value={campaignData.preheader}
                        onChange={handleInputChange}
                      />
                      <p className="text-sm text-muted-foreground">
                        This text appears in email clients after the subject line
                      </p>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-2">
                        <Label>Email Content</Label>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Image className="h-4 w-4 mr-2" />
                            Add Image
                          </Button>
                          <Button variant="outline" size="sm">
                            <Link className="h-4 w-4 mr-2" />
                            Add Link
                          </Button>
                        </div>
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RichTextEditor 
                          initialContent={campaignData.content}
                          onChange={handleContentChange}
                        />
                      </motion.div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fromName">From Name</Label>
                      <Input 
                        id="fromName" 
                        name="fromName"
                        placeholder="Sender name" 
                        value={campaignData.fromName}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input 
                        id="fromEmail" 
                        name="fromEmail"
                        placeholder="sender@example.com" 
                        value={campaignData.fromEmail}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Advanced Settings</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="trackOpens">Track Opens</Label>
                        <p className="text-sm text-muted-foreground">
                          Track when subscribers open your email
                        </p>
                      </div>
                      <Switch id="trackOpens" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="trackClicks">Track Clicks</Label>
                        <p className="text-sm text-muted-foreground">
                          Track when subscribers click links in your email
                        </p>
                      </div>
                      <Switch id="trackClicks" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoResend">Auto-Resend</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically resend to subscribers who didn't open
                        </p>
                      </div>
                      <Switch id="autoResend" />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="recipients" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sendToAll">Send to All Subscribers</Label>
                        <p className="text-sm text-muted-foreground">
                          Send this campaign to all active subscribers
                        </p>
                      </div>
                      <Switch 
                        id="sendToAll" 
                        checked={campaignData.sendToAll}
                        onCheckedChange={(checked) => 
                          setCampaignData({...campaignData, sendToAll: checked})
                        }
                      />
                    </div>
                    
                    {!campaignData.sendToAll && (
                      <div className="space-y-2">
                        <Label htmlFor="segments">Select Segments</Label>
                        <select
                          id="segments"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          multiple
                        >
                          <option value="active">Active Subscribers</option>
                          <option value="new">New Subscribers (Last 30 days)</option>
                          <option value="engaged">Highly Engaged</option>
                          <option value="unengaged">Unengaged (No opens)</option>
                          <option value="premium">Premium Plan Subscribers</option>
                        </select>
                        <p className="text-sm text-muted-foreground">
                          Hold Ctrl/Cmd to select multiple segments
                        </p>
                      </div>
                    )}
                    
                    <div className="p-4 bg-muted rounded-md">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="font-medium">Estimated Recipients:</span>
                        <span className="ml-2">2,547 subscribers</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="flex-1">Send Immediately</Button>
                      <Button variant="outline" className="flex-1">Schedule for Later</Button>
                    </div>
                    
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Send Date</Label>
                        <DatePicker />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="time">Send Time</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id="time"
                            name="scheduledTime"
                            type="time"
                            className="flex-1"
                            value={campaignData.scheduledTime}
                            onChange={handleInputChange}
                          />
                          <select
                            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="user">Recipient's Time Zone</option>
                            <option value="est">EST</option>
                            <option value="cst">CST</option>
                            <option value="mst">MST</option>
                            <option value="pst">PST</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-md flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>
                        Optimal send time based on past engagement: 
                        <strong className="ml-1">Tuesday at 10:00 AM</strong>
                      </span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Preview</h3>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPreviewMode(!previewMode)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {previewMode ? "Edit" : "Preview"}
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted p-2 flex items-center justify-between text-sm">
                    <div className="truncate max-w-[180px]">
                      {campaignData.subject || "No subject"}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Preview
                    </div>
                  </div>
                  <div className="p-4 bg-background h-[400px] overflow-auto">
                \

