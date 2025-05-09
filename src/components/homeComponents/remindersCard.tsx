"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Prescription = {
  id: number
  name: string
  next_refill_date?: string
  dosage?: string
  frequency?: string
  pharmacy?: string
  instructions?: string
}

export function RemindersCard({ reminders }: { reminders: Prescription[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4 space-y-1">
          {reminders.length > 0 ? (
            reminders.map((rx) => (
              <li key={rx.id}>
                {rx.name} – Refill by {new Date(rx.next_refill_date!).toLocaleDateString("en-US")}
              </li>
            ))
          ) : (
            <li>No upcoming reminders</li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
