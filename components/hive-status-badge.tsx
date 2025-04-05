import { Badge } from "@/components/ui/badge"

interface HiveStatusBadgeProps {
  status: "healthy" | "attention" | "critical"
}

export function HiveStatusBadge({ status }: HiveStatusBadgeProps) {
  const statusConfig = {
    healthy: {
      label: "Healthy",
      variant: "outline" as const,
      className: "border-green-500 text-green-500 hover:bg-green-500/10",
    },
    attention: {
      label: "Needs Attention",
      variant: "outline" as const,
      className: "border-amber-500 text-amber-500 hover:bg-amber-500/10",
    },
    critical: {
      label: "Critical",
      variant: "outline" as const,
      className: "border-red-500 text-red-500 hover:bg-red-500/10",
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  )
}

