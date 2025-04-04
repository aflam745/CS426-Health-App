"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockReminders = [
  "Refill Prescription",
  "Take blood pressure medicine",
  "Record blood sugar",
  "Contact doctor for follow-up",
]

export function RemindersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4 space-y-1">
          {mockReminders.map((reminder, idx) => (
            <li key={idx}>{reminder}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
