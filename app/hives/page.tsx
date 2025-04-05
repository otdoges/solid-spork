import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HiveStatusBadge } from "@/components/hive-status-badge"

export default function HivesPage() {
  // Mock data for hives
  const hives = [
    {
      id: 1,
      name: "Hive Alpha",
      location: "North Field",
      queenAge: "1 year",
      lastInspection: "2025-03-28",
      status: "healthy",
      temperature: "34°C",
      humidity: "65%",
      population: "Strong",
    },
    {
      id: 2,
      name: "Hive Beta",
      location: "South Garden",
      queenAge: "2 years",
      lastInspection: "2025-04-01",
      status: "attention",
      temperature: "32°C",
      humidity: "70%",
      population: "Medium",
    },
    {
      id: 3,
      name: "Hive Gamma",
      location: "East Orchard",
      queenAge: "6 months",
      lastInspection: "2025-04-03",
      status: "healthy",
      temperature: "35°C",
      humidity: "62%",
      population: "Strong",
    },
    {
      id: 4,
      name: "Hive Delta",
      location: "West Meadow",
      queenAge: "1.5 years",
      lastInspection: "2025-03-25",
      status: "critical",
      temperature: "30°C",
      humidity: "75%",
      population: "Weak",
    },
    {
      id: 5,
      name: "Hive Epsilon",
      location: "Central Garden",
      queenAge: "8 months",
      lastInspection: "2025-04-02",
      status: "healthy",
      temperature: "34°C",
      humidity: "64%",
      population: "Strong",
    },
    {
      id: 6,
      name: "Hive Zeta",
      location: "Riverside",
      queenAge: "2.5 years",
      lastInspection: "2025-03-30",
      status: "attention",
      temperature: "33°C",
      humidity: "68%",
      population: "Medium",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Hives</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Hive
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {hives.map((hive) => (
          <Link href={`/hives/${hive.id}`} key={hive.id} className="group">
            <Card className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>{hive.name}</CardTitle>
                  <HiveStatusBadge status={hive.status} />
                </div>
                <CardDescription>{hive.location}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Temperature</span>
                    <span className="font-medium">{hive.temperature}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Humidity</span>
                    <span className="font-medium">{hive.humidity}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Queen Age</span>
                    <span className="font-medium">{hive.queenAge}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Population</span>
                    <span className="font-medium">{hive.population}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">Last inspection: {hive.lastInspection}</CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

