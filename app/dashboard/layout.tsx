import type React from "react"
import Link from "next/link"
import {
  Mail,
  LayoutDashboard,
  Send,
  Users,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  CreditCard,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/sidebar"

export default function DashboardLayout({
children,
}: {
children: React.ReactNode
}) {
return (
  <div className="flex min-h-screen">
    <AppSidebar />
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4">
        {/* Header content here */}
      </header>
      <main className="flex-1 space-y-4 p-4">
        {children}
      </main>
    </div>
  </div>
)
}

