"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Mar 1", value: 11200 },
  { date: "Mar 5", value: 11350 },
  { date: "Mar 10", value: 11580 },
  { date: "Mar 15", value: 11720 },
  { date: "Mar 20", value: 11940 },
  { date: "Mar 25", value: 12180 },
  { date: "Apr 1", value: 12380 },
  { date: "Apr 5", value: 12546 },
]

export function SubscriberGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

