"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface InspectionHistoryProps {
  hiveId: number
}

export function InspectionHistory({ hiveId }: InspectionHistoryProps) {
  // Mock data for inspections
  const inspections = [
    {
      id: 1,
      date: "2025-04-01",
      inspector: "John Smith",
      queenSeen: true,
      broodPattern: "Excellent",
      honeyStores: "Medium",
      population: "Strong",
      temperament: "Calm",
      disease: "None",
      treatment: "None",
      notes: "Healthy hive with good honey production. Queen is laying well.",
    },
    {
      id: 2,
      date: "2025-03-15",
      inspector: "Sarah Johnson",
      queenSeen: true,
      broodPattern: "Good",
      honeyStores: "Low",
      population: "Medium",
      temperament: "Calm",
      disease: "None",
      treatment: "None",
      notes: "Added a honey super. Colony is building up well for spring.",
    },
    {
      id: 3,
      date: "2025-03-01",
      inspector: "John Smith",
      queenSeen: false,
      broodPattern: "Good",
      honeyStores: "Low",
      population: "Medium",
      temperament: "Calm",
      disease: "None",
      treatment: "None",
      notes: "Queen not seen but fresh eggs present. Colony recovering well from winter.",
    },
    {
      id: 4,
      date: "2025-02-15",
      inspector: "Sarah Johnson",
      queenSeen: true,
      broodPattern: "Fair",
      honeyStores: "Low",
      population: "Medium",
      temperament: "Calm",
      disease: "None",
      treatment: "None",
      notes: "Winter cluster looks good. Provided supplemental feeding.",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Inspector</TableHead>
          <TableHead>Queen Seen</TableHead>
          <TableHead>Brood Pattern</TableHead>
          <TableHead>Honey Stores</TableHead>
          <TableHead>Population</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inspections.map((inspection) => (
          <TableRow key={inspection.id}>
            <TableCell>{inspection.date}</TableCell>
            <TableCell>{inspection.inspector}</TableCell>
            <TableCell>{inspection.queenSeen ? "Yes" : "No"}</TableCell>
            <TableCell>{inspection.broodPattern}</TableCell>
            <TableCell>{inspection.honeyStores}</TableCell>
            <TableCell>{inspection.population}</TableCell>
            <TableCell className="max-w-xs truncate">{inspection.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

