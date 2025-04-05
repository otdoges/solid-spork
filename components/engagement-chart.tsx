"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Weekly Digest #8", opens: 42, clicks: 16 },
  { name: "Product Update", opens: 49, clicks: 22 },
  { name: "Weekly Digest #9", opens: 44, clicks: 18 },
  { name: "Special Announcement", opens: 54, clicks: 25 },
  { name: "Weekly Digest #10", opens: 45, clicks: 17 },
  { name: "Weekly Digest #11", opens: 46, clicks: 18 },
  { name: "Weekly Digest #12", opens: 47, clicks: 19 },
]

export function EngagementChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="opens" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="clicks" stroke="#22c55e" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

