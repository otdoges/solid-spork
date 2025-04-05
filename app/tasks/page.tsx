"use client"

import { useState } from "react"
import { CalendarIcon, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function TasksPage() {
  const [tasks, setTasks] = useState([
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
    {
      id: 4,
      title: "Replace Queen in Hive Delta",
      description: "Queen is aging and needs replacement",
      dueDate: "2025-04-20",
      hive: "Hive Delta",
      priority: "medium",
      completed: false,
    },
    {
      id: 5,
      title: "Harvest Honey",
      description: "Extract honey from supers in Hives Alpha and Gamma",
      dueDate: "2025-04-25",
      hive: "Multiple",
      priority: "low",
      completed: true,
    },
  ])

  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string().optional(),
    dueDate: z.date({
      required_error: "A due date is required.",
    }),
    hive: z.string({
      required_error: "Please select a hive.",
    }),
    priority: z.string({
      required_error: "Please select a priority.",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTask = {
      id: tasks.length + 1,
      title: values.title,
      description: values.description || "",
      dueDate: format(values.dueDate, "yyyy-MM-dd"),
      hive: values.hive,
      priority: values.priority,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setOpen(false)
    form.reset()
  }

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

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
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Create a new beekeeping task. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Inspect hive" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Task details" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Due Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="hive"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hive</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a hive" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Hive Alpha">Hive Alpha</SelectItem>
                          <SelectItem value="Hive Beta">Hive Beta</SelectItem>
                          <SelectItem value="Hive Gamma">Hive Gamma</SelectItem>
                          <SelectItem value="Hive Delta">Hive Delta</SelectItem>
                          <SelectItem value="All Hives">All Hives</SelectItem>
                          <SelectItem value="Multiple">Multiple</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save Task</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {tasks.map((task) => (
              <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => toggleTaskCompletion(task.id)}
                    />
                    <CardTitle className={cn("text-lg", task.completed && "line-through")}>{task.title}</CardTitle>
                    <span className={`ml-auto text-sm font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  </div>
                  <CardDescription>{task.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Due Date: </span>
                      <span>{task.dueDate}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hive: </span>
                      <span>{task.hive}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <Card key={task.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`task-${task.id}-pending`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <span className={`ml-auto text-sm font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Due Date: </span>
                        <span>{task.dueDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hive: </span>
                        <span>{task.hive}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {tasks
              .filter((task) => task.completed)
              .map((task) => (
                <Card key={task.id} className="opacity-60">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`task-${task.id}-completed`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskCompletion(task.id)}
                      />
                      <CardTitle className="text-lg line-through">{task.title}</CardTitle>
                      <span className={`ml-auto text-sm font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                    <CardDescription>{task.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Due Date: </span>
                        <span>{task.dueDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hive: </span>
                        <span>{task.hive}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

