import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { NewsletterList } from "@/components/newsletter-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MailPlus } from "lucide-react"

export default function NewslettersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Newsletters" text="Create and manage your newsletters">
        <Button>
          <MailPlus className="mr-2 h-4 w-4" />
          New Newsletter
        </Button>
      </DashboardHeader>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="sent">Sent</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <NewsletterList />
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          <NewsletterList filterStatus="draft" />
        </TabsContent>
        <TabsContent value="scheduled" className="space-y-4">
          <NewsletterList filterStatus="scheduled" />
        </TabsContent>
        <TabsContent value="sent" className="space-y-4">
          <NewsletterList filterStatus="sent" />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

