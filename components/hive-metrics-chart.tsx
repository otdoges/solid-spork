"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    date: "Jan",
    temperature: 32,
    humidity: 65,
    weight: 28,
  },
  {
    date: "Feb",
    temperature: 33,
    humidity: 62,
    weight: 29,
  },
  {
    date: "Mar",
    temperature: 34,
    humidity: 60,
    weight: 30,
  },
  {
    date: "Apr",
    temperature: 35,
    humidity: 63,
    weight: 32,
  },
  {
    date: "May",
    temperature: 36,
    humidity: 65,
    weight: 35,
  },
  {
    date: "Jun",
    temperature: 37,
    humidity: 68,
    weight: 38,
  },
]

export function HiveMetricsChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

