"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Apr 1", value: 30 },
  { date: "Apr 2", value: 30.2 },
  { date: "Apr 3", value: 30.5 },
  { date: "Apr 4", value: 30.8 },
  { date: "Apr 5", value: 31 },
  { date: "Apr 6", value: 31.2 },
  { date: "Apr 7", value: 31.5 },
  { date: "Apr 8", value: 31.7 },
  { date: "Apr 9", value: 31.8 },
  { date: "Apr 10", value: 32 },
  { date: "Apr 11", value: 32.1 },
  { date: "Apr 12", value: 32.3 },
  { date: "Apr 13", value: 32.5 },
  { date: "Apr 14", value: 32.8 },
]

export function HiveWeightChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} kg`}
          domain={["dataMin - 1", "dataMax + 1"]}
        />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

