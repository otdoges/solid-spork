"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { name: "Header", clicks: 42 },
  { name: "First Link", clicks: 68 },
  { name: "Main CTA", clicks: 82 },
  { name: "Image 1", clicks: 35 },
  { name: "Second Link", clicks: 52 },
  { name: "Footer", clicks: 22 },
]

export function ClickMapChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip />
        <Bar dataKey="clicks" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

