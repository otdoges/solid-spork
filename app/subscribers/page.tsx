"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UserPlus,
  Download,
  Search,
  Filter,
  Upload,
  Trash2,
  MoreHorizontal,
  Tag,
  FileText,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function SubscribersPage() {
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [isAddSubscriberDialogOpen, setIsAddSubscriberDialogOpen] = useState(false)
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [isSegmentDialogOpen, setIsSegmentDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [sortColumn, setSortColumn] = useState<string | null>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for subscribers
  const subscribers = [
    {
      id: "1",
      email: "sarah.johnson@example.com",
      name: "Sarah Johnson",
      status: "active",
      joinedDate: "2025-01-15",
      source: "Website",
      openRate: "68%",
      clickRate: "24%",
      tags: ["Premium", "Newsletter A"],
    },
    {
      id: "2",
      email: "michael.smith@example.com",
      name: "Michael Smith",
      status: "active",
      joinedDate: "2025-02-03",
      source: "Referral",
      openRate: "72%",
      clickRate: "31%",
      tags: ["Premium"],
    },
    {
      id: "3",
      email: "emma.wilson@example.com",
      name: "Emma Wilson",
      status: "active",
      joinedDate: "2025-02-18",
      source: "Social Media",
      openRate: "54%",
      clickRate: "19%",
      tags: ["Newsletter B"],
    },
    {
      id: "4",
      email: "james.brown@example.com",
      name: "James Brown",
      status: "inactive",
      joinedDate: "2024-11-05",
      source: "Website",
      openRate: "23%",
      clickRate: "8%",
      tags: [],
    },
    {
      id: "5",
      email: "olivia.davis@example.com",
      name: "Olivia Davis",
      status: "active",
      joinedDate: "2025-03-10",
      source: "Webinar",
      openRate: "81%",
      clickRate: "37%",
      tags: ["Premium", "Newsletter A", "Newsletter B"],
    },
    {
      id: "6",
      email: "william.jones@example.com",
      name: "William Jones",
      status: "active",
      joinedDate: "2025-01-28",
      source: "Referral",
      openRate: "65%",
      clickRate: "22%",
      tags: ["Newsletter A"],
    },
    {
      id: "7",
      email: "sophia.miller@example.com",
      name: "Sophia Miller",
      status: "unsubscribed",
      joinedDate: "2024-10-12",
      source: "Website",
      openRate: "45%",
      clickRate: "15%",
      tags: [],
    },
  ]

  // Mock data for tags and segments
  const availableTags = ["Premium", "Newsletter A", "Newsletter B", "New User", "Engaged", "Inactive", "Product Interest"]
  const segments = [
    { id: "all", name: "All Subscribers" },
    { id: "active", name: "Active Subscribers" },
    { id: "inactive", name: "Inactive Subscribers" },
    { id: "premium", name: "Premium Subscribers" },
    { id: "engaged", name: "Highly Engaged" },
    { id: "recent", name: "Recently Added" },
  ]

  // Sort and filter subscribers
  const sortedAndFilteredSubscribers = [...subscribers]
    .filter(subscriber => {
      // Apply search filter
      const matchesSearch = 
        subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subscriber.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Apply tag filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => subscriber.tags.includes(tag))
      
      // Apply segment filter
      let matchesSegment = true
      if (selectedSegment) {
        switch (selectedSegment) {
          case "active":
            matchesSegment = subscriber.status === "active"
            break
          case "inactive":
            matchesSegment = subscriber.status === "inactive"
            break
          case "premium":
            matchesSegment = subscriber.tags.includes("Premium")
            break
          case "engaged":
            matchesSegment = Number.parseInt(subscriber.openRate) > 60
            break
          case "recent":
            matchesSegment = new Date(subscriber.joinedDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            break
        }
      }
      
      return matchesSearch && matchesTags && matchesSegment
    })
    .sort((a, b) => {
      if (!sortColumn) return 0
      
      let valueA, valueB
      
      switch (sortColumn) {
        case "name":
          valueA = a.name
          valueB = b.name
          break
        case "email":
          valueA = a.email
          valueB = b.email
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        case "joinedDate":
          valueA = new Date(a.joinedDate).getTime()
          valueB = new Date(b.joinedDate).getTime()
          break
        case "openRate":
          valueA = Number.parseInt(a.openRate)
          valueB = Number.parseInt(b.openRate)
          break
        case "clickRate":
          valueA = Number.parseInt(a.clickRate)
          valueB = Number.parseInt(b.clickRate)
          break
        default:
          return 0
      }
      
      if (sortDirection === "asc") {
        return valueA > valueB ? 1 : -1
      } else {
        return valueA < valueB ? 1 : -1
      }
    })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSubscribers(sortedAndFilteredSubscribers.map(s => s.id))
    } else {
      setSelectedSubscribers([])
    }
  }

  const handleSelectSubscriber = (id: string) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter(s => s !== id))
    } else {
      setSelectedSubscribers([...selectedSubscribers, id])
    }
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleExportCSV = () => {
    setIsExportDialogOpen(true)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  }

  return (
    <DashboardShell>
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <DashboardHeader heading="Subscribers" text="Manage your newsletter subscribers">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Import Subscribers</DialogTitle>
                  <DialogDescription>
                    Upload a CSV file with your subscribers data. The file should include email, name, and other
                    optional fields.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="file">CSV File</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">Drag and drop your CSV file here</p>
                      <p className="text-xs text-muted-foreground mb-2">or click to browse files</p>
                      <Input id="file" type="file" accept=".csv" className="hidden" />
                      <Button variant="outline" size="sm">Browse Files</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skip-header" />
                      <Label htmlFor="skip-header">First row contains headers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="update-existing" />
                      <Label htmlFor="update-existing">Update existing subscribers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="add-tag" />
                      <Label htmlFor="add-tag">Add tag to imported subscribers</Label>
                    </div>
                    <div className="pl-6">
                      <Select disabled={true}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tag" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTags.map(tag => (
                            <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Import Subscribers</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isAddSubscriberDialogOpen} onOpenChange={setIsAddSubscriberDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Subscriber
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Subscriber</DialogTitle>
                  <DialogDescription>Enter the details of the new subscriber.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="justify-between w-full">
                          {selectedTags.length > 0 ? `${selectedTags.length} tags selected` : "Select tags"}
                          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search tags..." />
                          <CommandList>
                            <CommandEmpty>No tags found.</CommandEmpty>
                            <CommandGroup>
                              <ScrollArea className="h-[200px]">
                                {availableTags.map(tag => (
                                  <CommandItem
                                    key={tag}
                                    onSelect={() => {
                                      setSelectedTags(prev => 
                                        prev.includes(tag) 
                                          ? prev.filter(t => t !== tag)
                                          : [...prev, tag]
                                      )
                                    }}
                                  >
                                    <Checkbox
                                      checked={selectedTags.includes(tag)}
                                      className="mr-2"
                                    />
                                    {tag}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="source">Source</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="webinar">Webinar</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" placeholder="Add any additional information about this subscriber" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="send-welcome" />
                    <Label htmlFor="send-welcome">Send welcome email</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddSubscriberDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Add Subscriber</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </DashboardHeader>
      </motion.div>

      <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-2 w-full max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search subscribers..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? "bg-muted" : ""}
            >
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            {selectedSubscribers.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{selectedSubscribers.length} selected</span>
                <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Tag className="mr-2 h-4 w-4" />
                      <span>Manage Tags</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Manage Tags</DialogTitle>
                      <DialogDescription>
                        Add or remove tags for {selectedSubscribers.length} selected subscribers.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Add Tags</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-between w-full">
                              Select tags to add
                              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search tags..." />
                              <CommandList>
                                <CommandEmpty>No tags found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="h-[200px]">
                                    {availableTags.map(tag => (
                                      <CommandItem
                                        key={tag}
                                        onSelect={() => {
                                          setSelectedTags(prev => 
                                            prev.includes(tag) 
                                              ? prev.filter(t => t !== tag)
                                              : [...prev, tag]
                                          )
                                        }}
                                      >
                                        <Checkbox
                                          checked={selectedTags.includes(tag)}
                                          className="mr-2"
                                        />
                                        {tag}
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Remove Tags</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-between w-full">
                              Select tags to remove
                              <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder="Search tags..." />
                              <CommandList>
                                <CommandEmpty>No tags found.</CommandEmpty>
                                <CommandGroup>
                                  <ScrollArea className="h-[200px]">
                                    {availableTags.map(tag => (
                                      <CommandItem
                                        key={tag}
                                        onSelect={() => {
                                          // Logic for removing tags
                                        }}
                                      >
                                        <Checkbox className="mr-2" />
                                        {tag}
                                      </CommandItem>
                                    ))}
                                  </ScrollArea>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button>Apply Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </div>
            )}
            <p className="text-sm text-muted-foreground ml-4">
              Showing <strong>{sortedAndFilteredSubscribers.length}</strong> of <strong>{subscribers.length}</strong> subscribers
            </p>
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Advanced Filters</CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Segment</Label>
                      <Select value={selectedSegment || "all"} onValueChange={setSelectedSegment}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select segment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subscribers</SelectItem>
                          {segments.map(segment => (
                            <SelectItem key={segment.id} value={segment.id}>{segment.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tags</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="justify-between w-full">
                            {selectedTags.length > 0 ? `${selectedTags.length} tags selected` : "Filter by tags"}
                            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search tags..." />
                            <CommandList>
                              <CommandEmpty>No tags found.</CommandEmpty>
                              <CommandGroup>
                                <ScrollArea className="h-[200px]">
                                  {availableTags.map(tag => (
                                    <CommandItem
                                      key={tag}
                                      onSelect={() => {
                                        setSelectedTags(prev => 
                                          prev.includes(tag) 
                                            ? prev.filter(t => t !== tag)
                                            : [...prev, tag]
                                      )
                                    }}
                                  >
                                    <Checkbox
                                      checked={selectedTags.includes(tag)}
                                      className="mr-2"
                                    />
                                    {tag}
                                  </CommandItem>
                                ))}
                              </ScrollArea>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </div>
                    <div className="space-y-2">
                      <Label>Subscription Date</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any time</SelectItem>
                          <SelectItem value="last7">Last 7 days</SelectItem>
                          <SelectItem value="last30">Last 30 days</SelectItem>
                          <SelectItem value="last90">Last 90 days</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="space-y-2">
                      <Label>Engagement Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any engagement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any engagement</SelectItem>
                          <SelectItem value="high">Highly engaged (>60% open rate)</SelectItem>
                          <SelectItem value="medium">Medium engagement (30-60% open rate)</SelectItem>
                          <SelectItem value="low">Low engagement (<30% open rate)</SelectItem>
                          <SelectItem value="inactive">Inactive (no opens in 30 days)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Source</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any source</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="referral">Referral</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Any status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any status</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    setSelectedTags([])
                    setSelectedSegment(null)
                    setSearchQuery("")
                  }}>
                    Reset Filters
                  </Button>
                  <Button>Apply Filters</Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Subscribers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="unsubscribed">Unsubscribed</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[40px]">
                        <Checkbox
                          checked={
                            sortedAndFilteredSubscribers.length > 0 &&
                            selectedSubscribers.length === sortedAndFilteredSubscribers.length
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead 
                        className="w-[300px] cursor-pointer"
                        onClick={() => handleSort("email")}
                      >
                        <div className="flex items-center">
                          Email
                          {sortColumn === "email" && (
                            sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("name")}
                      >
                        <div className="flex items-center">
                          Name
                          {sortColumn === "name" && (
                            sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center">
                          Status
                          {sortColumn === "status" && (
                            sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("joinedDate")}
                      >
                        <div className="flex items-center">
                          Joined
                          {sortColumn === "joinedDate" && (
                            sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("openRate")}
                      >
                        <div className="flex items-center">
                          Open Rate
                          {sortColumn === "openRate" && (
                            sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => handleSort("clickRate")}
                      >
                        <div className="flex items-center">
                          Click Rate
                          {sortColumn === "clickRate" && (
                            sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
                          )}
                        </div>
                      </TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence>
                      {sortedAndFilteredSubscribers.map((subscriber) => (
                        <motion.tr
                          key={subscriber.id}
                          className="group"
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          layout
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedSubscribers.includes(subscriber.id)}
                              onCheckedChange={() => handleSelectSubscriber(subscriber.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{subscriber.email}</TableCell>
                          <TableCell>{subscriber.name}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                subscriber.status === "active"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                                  : subscriber.status === "inactive"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                              }`}
                            >
                              {subscriber.status.charAt(0).toUpperCase() + subscriber.status.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell>{subscriber.joinedDate}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {subscriber.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{subscriber.openRate}</TableCell>
                          <TableCell>{subscriber.clickRate}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Tag className="mr-2 h-4 w-4" />
                                  Manage Tags
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {sortedAndFilteredSubscribers.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Search className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">No subscribers found</p>
                            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="active" className="space-y-4">
            {/* Similar table structure for active subscribers */}
          </TabsContent>
          <TabsContent value="inactive" className="space-y-4">
            {/* Similar table structure for inactive subscribers */}
          </TabsContent>
          <TabsContent value="unsubscribed" className="space-y-4">
            {/* Similar table structure for unsubscribed subscribers */}
          </TabsContent>
        </Tabs>
        
        <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Export Subscribers</DialogTitle>
              <DialogDescription>
                Choose which subscribers and fields to export to CSV.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Subscribers to Export</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select subscribers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="selected">Selected Subscribers ({selectedSubscribers.length})</SelectItem>
                    <SelectItem value="filtered">Filtered Subscribers ({sortedAndFilteredSubscribers.length})</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Fields to Export</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-email" defaultChecked />
                    <Label htmlFor="field-email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-name" defaultChecked />
                    <Label htmlFor="field-name">Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-status" defaultChecked />
                    <Label htmlFor="field-status">Status</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-joined" defaultChecked />
                    <Label htmlFor="field-joined">Joined Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-tags" defaultChecked />
                    <Label htmlFor="field-tags">Tags</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-source" defaultChecked />
                    <Label htmlFor="field-source">Source</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-openrate" defaultChecked />
                    <Label htmlFor="field-openrate">Open Rate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="field-clickrate" defaultChecked />
                    <Label htmlFor="field-clickrate">Click Rate</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>File Format</Label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                Cancel
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </DashboardShell>
  )
}

