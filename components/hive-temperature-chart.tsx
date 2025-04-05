"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  { date: "Apr 1", value: 34 },
  { date: "Apr 2", value: 33 },
  { date: "Apr 3", value: 34 },
  { date: "Apr 4", value: 35 },
  { date: "Apr 5", value: 34 },
  { date: "Apr 6", value: 33 },
  { date: "Apr 7", value: 34 },
  { date: "Apr 8", value: 35 },
  { date: "Apr 9", value: 36 },
  { date: "Apr 10", value: 35 },
  { date: "Apr 11", value: 34 },
  { date: "Apr 12", value: 33 },
  { date: "Apr 13", value: 34 },
  { date: "Apr 14", value: 35 },
]

export function HiveTemperatureChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}°C`}
          domain={["dataMin - 2", "dataMax + 2"]}
        />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

