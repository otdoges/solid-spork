"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "Oct 2024", mrr: 15200, newMrr: 2100, churnMrr: 800 },
  { month: "Nov 2024", mrr: 16500, newMrr: 2300, churnMrr: 1000 },
  { month: "Dec 2024", mrr: 17800, newMrr: 2500, churnMrr: 1200 },
  { month: "Jan 2025", mrr: 19100, newMrr: 2700, churnMrr: 1400 },
  { month: "Feb 2025", mrr: 21000, newMrr: 3000, churnMrr: 1100 },
  { month: "Mar 2025", mrr: 22800, newMrr: 3200, churnMrr: 1400 },
  { month: "Apr 2025", mrr: 24892, newMrr: 3500, churnMrr: 1408 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} />
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="mrr"
          name="Monthly Recurring Revenue"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="newMrr"
          name="New MRR"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="churnMrr"
          name="Churned MRR"
          stroke="#ef4444"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

