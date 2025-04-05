"use client"

import { Cloud, CloudRain, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    condition: "sunny",
    temperature: "24°C",
    humidity: "45%",
    wind: "8 km/h",
  })

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-5 w-5 text-amber-500" />
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Sun className="h-5 w-5 text-amber-500" />
    }
  }

  return (
    <Button variant="outline" className="flex items-center space-x-2">
      {getWeatherIcon(weather.condition)}
      <span>{weather.temperature}</span>
    </Button>
  )
}

