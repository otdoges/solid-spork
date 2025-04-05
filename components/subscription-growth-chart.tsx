"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Oct 2024", free: 850, starter: 120, professional: 80, enterprise: 10 },
  { month: "Nov 2024", free: 920, starter: 135, professional: 85, enterprise: 12 },
  { month: "Dec 2024", free: 980, starter: 145, professional: 90, enterprise: 14 },
  { month: "Jan 2025", free: 1050, starter: 155, professional: 95, enterprise: 15 },
  { month: "Feb 2025", free: 1120, starter: 165, professional: 105, enterprise: 18 },
  { month: "Mar 2025", free: 1180, starter: 175, professional: 115, enterprise: 20 },
  { month: "Apr 2025", free: 1245, starter: 187, professional: 125, enterprise: 22 },
]

export function SubscriptionGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} />
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="free" name="Free Plan" stackId="a" fill="#94a3b8" radius={[0, 0, 0, 0]} />
        <Bar dataKey="starter" name="Starter Plan" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
        <Bar dataKey="professional" name="Professional Plan" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
        <Bar dataKey="enterprise" name="Enterprise Plan" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

