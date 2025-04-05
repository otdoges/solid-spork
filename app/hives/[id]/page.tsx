import Link from "next/link"
import { ArrowLeft, Calendar, Download, Edit, Thermometer, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HiveStatusBadge } from "@/components/hive-status-badge"
import { HiveTemperatureChart } from "@/components/hive-temperature-chart"
import { HiveHumidityChart } from "@/components/hive-humidity-chart"
import { HiveWeightChart } from "@/components/hive-weight-chart"
import { InspectionHistory } from "@/components/inspection-history"
import { HiveNotes } from "@/components/hive-notes"

export default function HiveDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a specific hive
  const hive = {
    id: Number.parseInt(params.id),
    name: `Hive ${params.id === "1" ? "Alpha" : params.id === "2" ? "Beta" : "Gamma"}`,
    location: "North Field",
    queenAge: "1 year",
    queenColor: "Blue",
    queenBreed: "Italian",
    installed: "2024-04-15",
    lastInspection: "2025-04-01",
    status: "healthy",
    temperature: "34°C",
    humidity: "65%",
    weight: "32 kg",
    population: "Strong",
    honeyStores: "Medium",
    broodPattern: "Excellent",
    notes: "Healthy hive with good honey production. Queen is laying well.",
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/hives">
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">{hive.name}</h2>
          <HiveStatusBadge status={hive.status as "healthy" | "attention" | "critical"} />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Inspection
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperature</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hive.temperature}</div>
            <p className="text-xs text-muted-foreground">+1°C from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humidity</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hive.humidity}</div>
            <p className="text-xs text-muted-foreground">-2% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{hive.weight}</div>
            <p className="text-xs text-muted-foreground">+0.5 kg from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Queen</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 6l4 6 5-4-2 10H5L3 8l5 4z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-md font-medium">{hive.queenBreed}</div>
            <p className="text-xs text-muted-foreground">
              Age: {hive.queenAge}, Color: {hive.queenColor}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="inspections">Inspections</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>
        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Temperature History</CardTitle>
                <CardDescription>Last 30 days temperature readings</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <HiveTemperatureChart />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
                <CardDescription>Overall hive health assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Population</p>
                      <p className="text-sm">{hive.population}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Honey Stores</p>
                      <p className="text-sm">{hive.honeyStores}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Brood Pattern</p>
                      <p className="text-sm">{hive.broodPattern}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Last Inspection</p>
                      <p className="text-sm">{hive.lastInspection}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Humidity History</CardTitle>
                <CardDescription>Last 30 days humidity readings</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <HiveHumidityChart />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weight History</CardTitle>
                <CardDescription>Last 30 days weight readings</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <HiveWeightChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="inspections">
          <Card>
            <CardHeader>
              <CardTitle>Inspection History</CardTitle>
              <CardDescription>Record of all inspections for this hive</CardDescription>
            </CardHeader>
            <CardContent>
              <InspectionHistory hiveId={hive.id} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Hive Notes</CardTitle>
              <CardDescription>Notes and observations about this hive</CardDescription>
            </CardHeader>
            <CardContent>
              <HiveNotes hiveId={hive.id} initialNotes={hive.notes} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Hive Details</CardTitle>
              <CardDescription>Complete information about this hive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Hive ID</p>
                  <p className="text-sm">{hive.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">{hive.location}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Installation Date</p>
                  <p className="text-sm">{hive.installed}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Queen Breed</p>
                  <p className="text-sm">{hive.queenBreed}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Queen Age</p>
                  <p className="text-sm">{hive.queenAge}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Queen Color</p>
                  <p className="text-sm">{hive.queenColor}</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Details
                </Button>
                <Button variant="destructive" size="icon">
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

