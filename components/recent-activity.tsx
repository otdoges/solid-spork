"use client"

import { Clock, Mail, UserPlus, Send, Eye } from "lucide-react"

export function RecentActivity() {
  // Mock data for recent activities
  const activities = [
    {
      id: 1,
      type: "subscriber",
      description: "New subscriber joined",
      detail: "sarah.johnson@example.com",
      time: "10 minutes ago",
    },
    {
      id: 2,
      type: "newsletter",
      description: "Weekly Digest #12 sent",
      detail: "to 12,546 subscribers",
      time: "2 hours ago",
    },
    {
      id: 3,
      type: "engagement",
      description: "High click rate detected",
      detail: "22% on Product Update",
      time: "Yesterday",
    },
    {
      id: 4,
      type: "subscriber",
      description: "5 new subscribers",
      detail: "from website signup form",
      time: "Yesterday",
    },
    {
      id: 5,
      type: "engagement",
      description: "Milestone reached",
      detail: "10,000 subscribers",
      time: "3 days ago",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "subscriber":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "newsletter":
        return <Send className="h-4 w-4 text-purple-500" />
      case "engagement":
        return <Eye className="h-4 w-4 text-amber-500" />
      default:
        return <Mail className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{activity.description}</p>
            <p className="text-sm text-muted-foreground">{activity.detail}</p>
            <p className="text-xs text-muted-foreground flex items-center">
              <Clock className="mr-1 h-3 w-3" /> {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

