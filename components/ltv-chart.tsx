"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

const data = [
  { month: "1", starter: 79, professional: 79, overall: 79 },
  { month: "3", starter: 237, professional: 237, overall: 237 },
  { month: "6", starter: 474, professional: 474, overall: 474 },
  { month: "9", starter: 498, professional: 711, overall: 605 },
  { month: "12", starter: 498, professional: 948, overall: 723 },
  { month: "18", starter: 498, professional: 1264, overall: 798 },
  { month: "24", starter: 498, professional: 1580, overall: 798 },
]

export function LTVChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#888888" opacity={0.2} />
        <XAxis
          dataKey="month"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: "Months", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value}`, undefined]}
          labelFormatter={(label) => `Month: ${label}`}
        />
        <Legend />
        <Bar dataKey="overall" name="Overall LTV" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="starter" name="Starter Plan" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="professional" name="Professional Plan" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

