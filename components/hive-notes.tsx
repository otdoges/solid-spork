"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

interface HiveNotesProps {
  hiveId: number
  initialNotes: string
}

export function HiveNotes({ hiveId, initialNotes }: HiveNotesProps) {
  const [notes, setNotes] = useState(initialNotes)
  const [isEditing, setIsEditing] = useState(false)
  const [savedNotes, setSavedNotes] = useState(initialNotes)

  const handleSave = () => {
    setSavedNotes(notes)
    setIsEditing(false)
    // Here you would typically save to a database
  }

  return (
    <div className="space-y-4">
      {isEditing ? (
        <>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[200px]"
            placeholder="Enter notes about this hive..."
          />
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => {
                setNotes(savedNotes)
                setIsEditing(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Notes
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-md border p-4 min-h-[200px]">
            <p className="whitespace-pre-wrap">{savedNotes}</p>
          </div>
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            Edit Notes
          </Button>
        </>
      )}
    </div>
  )
}

