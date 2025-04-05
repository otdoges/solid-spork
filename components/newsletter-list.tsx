"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, Eye, MoreHorizontal, Send, Trash } from "lucide-react"

interface NewsletterListProps {
  filterStatus?: "draft" | "scheduled" | "sent"
}

export function NewsletterList({ filterStatus }: NewsletterListProps) {
  // Mock data for newsletters
  const allNewsletters = [
    {
      id: "1",
      title: "Weekly Digest #12",
      status: "sent",
      date: "Apr 3, 2025",
      recipients: "12,546",
      openRate: "46.8%",
      clickRate: "19.0%",
    },
    {
      id: "2",
      title: "Product Update",
      status: "sent",
      date: "Mar 28, 2025",
      recipients: "12,498",
      openRate: "49.0%",
      clickRate: "22.0%",
    },
    {
      id: "3",
      title: "Weekly Digest #13",
      status: "scheduled",
      date: "Apr 10, 2025",
      recipients: "~12,600",
      openRate: "-",
      clickRate: "-",
    },
    {
      id: "4",
      title: "Special Announcement",
      status: "draft",
      date: "Not scheduled",
      recipients: "-",
      openRate: "-",
      clickRate: "-",
    },
    {
      id: "5",
      title: "Monthly Newsletter",
      status: "scheduled",
      date: "Apr 15, 2025",
      recipients: "~12,600",
      openRate: "-",
      clickRate: "-",
    },
    {
      id: "6",
      title: "Feature Spotlight",
      status: "draft",
      date: "Not scheduled",
      recipients: "-",
      openRate: "-",
      clickRate: "-",
    },
  ]

  const newsletters = filterStatus
    ? allNewsletters.filter((newsletter) => newsletter.status === filterStatus)
    : allNewsletters

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Sent
          </span>
        )
      case "scheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Scheduled
          </span>
        )
      case "draft":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Draft
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {newsletters.map((newsletter) => (
        <Card key={newsletter.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{newsletter.title}</h3>
                  {getStatusBadge(newsletter.status)}
                </div>
                <p className="text-sm text-muted-foreground">
                  {newsletter.status === "sent"
                    ? `Sent on ${newsletter.date} to ${newsletter.recipients} subscribers`
                    : newsletter.status === "scheduled"
                      ? `Scheduled for ${newsletter.date}`
                      : "Draft - Not scheduled"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {newsletter.status === "sent" && (
                  <div className="text-sm text-muted-foreground mr-4">
                    <span className="font-medium text-foreground">{newsletter.openRate}</span> opens &middot;{" "}
                    <span className="font-medium text-foreground">{newsletter.clickRate}</span> clicks
                  </div>
                )}
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    {newsletter.status !== "sent" && (
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        <span>{newsletter.status === "scheduled" ? "Send Now" : "Schedule"}</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {newsletters.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Send className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No newsletters found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {filterStatus === "draft"
              ? "You don't have any draft newsletters. Create one to get started."
              : filterStatus === "scheduled"
                ? "You don't have any scheduled newsletters."
                : filterStatus === "sent"
                  ? "You haven't sent any newsletters yet."
                  : "You don't have any newsletters yet. Create one to get started."}
          </p>
          <Button className="mt-4" asChild>
            <Link href="/newsletters/create">Create Newsletter</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

