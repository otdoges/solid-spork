"use client"

import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface PlanUsageIndicatorProps {
  current: number
  limit: number
  label: string
  warningThreshold?: number
  criticalThreshold?: number
}

export function PlanUsageIndicator({
  current,
  limit,
  label,
  warningThreshold = 80,
  criticalThreshold = 90,
}: PlanUsageIndicatorProps) {
  const percentage = Math.min(Math.round((current / limit) * 100), 100)
  const isWarning = percentage >= warningThreshold
  const isCritical = percentage >= criticalThreshold

  const getProgressColor = () => {
    if (isCritical) return "bg-red-500"
    if (isWarning) return "bg-amber-500"
    return "bg-primary"
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          {current.toLocaleString()} / {limit.toLocaleString()}
        </p>
      </div>
      <Progress value={percentage} className="h-2" indicatorClassName={getProgressColor()} />
      <p className="text-xs text-muted-foreground">{100 - percentage}% remaining</p>

      {isCritical && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've reached {percentage}% of your {label.toLowerCase()} limit. Consider upgrading your plan to avoid
            service interruptions.
          </AlertDescription>
        </Alert>
      )}

      {isWarning && !isCritical && (
        <Alert
          variant="warning"
          className="mt-2 bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You're approaching your {label.toLowerCase()} limit. Consider upgrading your plan soon.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

