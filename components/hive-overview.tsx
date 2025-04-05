"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { HiveStatusBadge } from "@/components/hive-status-badge"

export function HiveOverview() {
  // Mock data for hives
  const hives = [
    {
      id: 1,
      name: "Hive Alpha",
      location: "North Field",
      status: "healthy",
      temperature: "34°C",
      humidity: "65%",
      population: "Strong",
    },
    {
      id: 2,
      name: "Hive Beta",
      location: "South Garden",
      status: "attention",
      temperature: "32°C",
      humidity: "70%",
      population: "Medium",
    },
    {
      id: 3,
      name: "Hive Gamma",
      location: "East Orchard",
      status: "healthy",
      temperature: "35°C",
      humidity: "62%",
      population: "Strong",
    },
    {
      id: 4,
      name: "Hive Delta",
      location: "West Meadow",
      status: "critical",
      temperature: "30°C",
      humidity: "75%",
      population: "Weak",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {hives.map((hive) => (
        <Link href={`/hives/${hive.id}`} key={hive.id}>
          <Card className="hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{hive.name}</h3>
                <HiveStatusBadge status={hive.status as "healthy" | "attention" | "critical"} />
              </div>
              <div className="text-sm text-muted-foreground mb-2">{hive.location}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Temp: </span>
                  <span>{hive.temperature}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Humidity: </span>
                  <span>{hive.humidity}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground">Population: </span>
                  <span>{hive.population}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

