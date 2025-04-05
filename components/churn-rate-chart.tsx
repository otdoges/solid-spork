"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "May 2024", overall: 4.8, starter: 5.9, professional: 3.7 },
  { month: "Jun 2024", overall: 4.6, starter: 5.7, professional: 3.5 },
  { month: "Jul 2024", overall: 4.5, starter: 5.5, professional: 3.5 },
  { month: "Aug 2024", overall: 4.3, starter: 5.3, professional: 3.3 },
  { month: "Sep 2024", overall: 4.0, starter: 5.0, professional: 3.0 },
  { month: "Oct 2024", overall: 3.9, starter: 4.9, professional: 2.9 },
  { month: "Nov 2024", overall: 3.8, starter: 4.8, professional: 2.8 },
  { month: "Dec 2024", overall: 3.7, starter: 4.7, professional: 2.8 },
  { month: "Jan 2025", overall: 3.6, starter: 4.6, professional: 2.6 },
  { month: "Feb 2025", overall: 3.5, starter: 4.5, professional: 2.5 },
  { month: "Mar 2025", overall: 3.4, starter: 4.3, professional: 2.5 },
  { month: "Apr 2025", overall: 3.2, starter: 4.2, professional: 2.2 },
]

export function ChurnRateChart() {
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
          tickFormatter={(value) => `${value}%`}
          domain={[0, "dataMax + 1"]}
        />
        <Tooltip
          formatter={(value: number) => [`${value}%`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="overall"
          name="Overall Churn"
          stroke="#8b5cf6"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="starter"
          name="Starter Plan"
          stroke="#f97316"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="professional"
          name="Professional Plan"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

