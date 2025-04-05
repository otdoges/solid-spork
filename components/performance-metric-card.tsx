"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PerformanceMetricCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  secondaryText?: string
  icon: React.ReactNode
}

export function PerformanceMetricCard({
  title,
  value,
  change,
  changeLabel,
  secondaryText,
  icon,
}: PerformanceMetricCardProps) {
  const isPositiveChange = change && change > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary/10 to-purple-400/10">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{value}</div>
          {change !== undefined ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-muted-foreground flex items-center"
            >
              {isPositiveChange ? (
                <ChevronUp className="mr-1 h-4 w-4 text-emerald-500" />
              ) : (
                <ChevronDown className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span className={isPositiveChange ? "text-emerald-500" : "text-red-500"}>{Math.abs(change)}%</span>{" "}
              {changeLabel}
            </motion.p>
          ) : secondaryText ? (
            <p className="text-xs text-muted-foreground">{secondaryText}</p>
          ) : null}
        </CardContent>
      </Card>
    </motion.div>
  )
}

