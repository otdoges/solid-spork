"use client"

import { Clock } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export function TasksList() {
  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: "Inspect Hive Alpha",
      description: "Regular inspection of brood pattern and honey stores",
      dueDate: "2025-04-10",
      hive: "Hive Alpha",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Add Super to Hive Beta",
      description: "Add honey super to accommodate growing colony",
      dueDate: "2025-04-12",
      hive: "Hive Beta",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Treat for Varroa Mites",
      description: "Apply organic treatment to all hives",
      dueDate: "2025-04-15",
      hive: "All Hives",
      priority: "high",
      completed: false,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-amber-500"
      case "low":
        return "text-green-500"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-start space-x-3">
          <Checkbox id={`task-${task.id}`} className="mt-1" />
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`task-${task.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task.title}
              </label>
              <span className={`text-xs font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>Due: {task.dueDate}</span>
              <span className="mx-2">•</span>
              <span>{task.hive}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

