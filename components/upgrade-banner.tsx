"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowRight, X } from "lucide-react"

interface UpgradeBannerProps {
  planName: string
  limitType: string
  percentage: number
}

export function UpgradeBanner({ planName, limitType, percentage }: UpgradeBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <Alert className="mb-6 bg-primary/10 border-primary/20">
      <div className="flex items-start justify-between">
        <div>
          <AlertTitle>Upgrade your plan</AlertTitle>
          <AlertDescription>
            You've used {percentage}% of your {limitType} on the {planName} plan. Upgrade now to get more {limitType}{" "}
            and additional features.
          </AlertDescription>
          <Button asChild className="mt-3" size="sm">
            <Link href="/pricing">
              View Plans <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setDismissed(true)} className="h-8 w-8">
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </Button>
      </div>
    </Alert>
  )
}

