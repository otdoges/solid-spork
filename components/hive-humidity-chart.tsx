"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Apr 1", value: 65 },
  { date: "Apr 2", value: 64 },
  { date: "Apr 3", value: 66 },
  { date: "Apr 4", value: 67 },
  { date: "Apr 5", value: 65 },
  { date: "Apr 6", value: 63 },
  { date: "Apr 7", value: 64 },
  { date: "Apr 8", value: 65 },
  { date: "Apr 9", value: 66 },
  { date: "Apr 10", value: 65 },
  { date: "Apr 11", value: 64 },
  { date: "Apr 12", value: 63 },
  { date: "Apr 13", value: 65 },
  { date: "Apr 14", value: 67 },
]

export function HiveHumidityChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          domain={["dataMin - 5", "dataMax + 5"]}
        />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

