"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { ArrowLeft, Save, Sparkles } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CreateNewsletterPage() {
  const [activeTab, setActiveTab] = useState("edit")
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [showTestEmailDialog, setShowTestEmailDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("basic")
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [subject, setSubject] = useState("")
  const [preheader, setPreheader] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduleDate, setScheduleDate] = useState<string>("")
  const [scheduleTime, setScheduleTime] = useState<string>("")
  const editorRef = useRef<HTMLDivElement>(null)
  
  // Mock data for segments
  const segments = [
    { value: "all", label: "All Subscribers" },
    { value: "active", label: "Active Subscribers" },
    { value: "new", label: "New Subscribers (last 30 days)" },
    { value: "premium", label: "Premium Subscribers" },
    { value: "free", label: "Free Tier Subscribers" },
    { value: "engaged", label: "Highly Engaged (>60% open rate)" },
  ]
  
  // Mock data for templates
  const templates = [
    { id: "basic", name: "Basic", description: "A simple, clean layout" },
    { id: "announcement", name: "Announcement", description: "Highlight important news" },
    { id: "digest", name: "Weekly Digest", description: "Summarize multiple topics" },
    { id: "promotional", name: "Promotional", description: "Showcase products or offers" },
    { id: "welcome", name: "Welcome Email", description: "Greet new subscribers" },
  ]
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
  
  const handleEditorCommand = (command: string) => {
    if (!editorRef.current) return
    
    document.execCommand(command, false)
    editorRef.current.focus()
  }
  
  const handleAIGenerate = (type: string) => {
    // In a real app, this would call an AI service
    setShowAIDialog(false)
    // Mock AI generation result
    if (type === "subject") {
      setSubject("Introducing Our Latest Features: What You Need to Know")
    } else if (type === "preheader") {
      setPreheader("Discover the new tools that will transform your workflow")
    }
  }

  return (
    <DashboardShell>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="flex items-center"
      >
        <Link href="/newsletters" className="mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <DashboardHeader heading="Create Newsletter" text="Compose and send a new newsletter" />
      </motion.div>

      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Newsletter Details</CardTitle>
              <CardDescription>Set the basic information for your newsletter</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="subject">Subject Line</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-muted-foreground"
                            onClick={() => setShowAIDialog(true)}
                          >
                            <Sparkles className="mr-1 h-3.5 w-3.5" />
                            AI Suggestions
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate subject line ideas with AI</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="subject" 
                    placeholder="Enter a compelling subject line..." 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {subject.length} characters (recommended: 40-60)
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="preheader">Preheader</Label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 text-muted-foreground"
                            onClick={() => setShowAIDialog(true)}
                          >
                            <Sparkles className="mr-1 h-3.5 w-3.5" />
                            AI Suggestions
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate preheader ideas with AI</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input 
                    id="preheader" 
                    placeholder="Brief summary that appears after the subject line..." 
                    value={preheader}
                    onChange={(e) => setPreheader(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    {preheader.length} characters (recommended: 85-100)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">HTML</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
              </div>
            </div>
            
            <TabsContent value="edit" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-1 border-b pb-4">
                      \

