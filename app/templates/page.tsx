import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"

export default function TemplatesPage() {
  // Mock data for templates
  const templates = [
    {
      id: "1",
      name: "Basic Newsletter",
      description: "A clean, simple newsletter template",
      category: "newsletter",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      name: "Product Announcement",
      description: "Perfect for announcing new products or features",
      category: "announcement",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      name: "Weekly Digest",
      description: "Summarize content from the past week",
      category: "newsletter",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      name: "Welcome Email",
      description: "Greet new subscribers with this friendly template",
      category: "onboarding",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "5",
      name: "Event Invitation",
      description: "Invite subscribers to your upcoming event",
      category: "event",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "6",
      name: "Promotional Offer",
      description: "Highlight special offers and promotions",
      category: "promotional",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "7",
      name: "Content Roundup",
      description: "Curate and share interesting content",
      category: "newsletter",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "8",
      name: "Feedback Request",
      description: "Ask subscribers for their opinions",
      category: "engagement",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <DashboardShell>
      <DashboardHeader heading="Templates" text="Choose from our library of newsletter templates">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 w-full max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search templates..." className="w-full pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="newsletter">Newsletters</TabsTrigger>
            <TabsTrigger value="announcement">Announcements</TabsTrigger>
            <TabsTrigger value="promotional">Promotional</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card key={template.id} className="overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      className="object-cover w-full h-full transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button size="sm">Use Template</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="newsletter" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates
                .filter((template) => template.category === "newsletter")
                .map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="object-cover w-full h-full transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="announcement" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates
                .filter((template) => template.category === "announcement")
                .map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="object-cover w-full h-full transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="promotional" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates
                .filter((template) => template.category === "promotional")
                .map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="object-cover w-full h-full transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
          <TabsContent value="onboarding" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates
                .filter((template) => template.category === "onboarding")
                .map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="object-cover w-full h-full transition-all hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button size="sm">Use Template</Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

