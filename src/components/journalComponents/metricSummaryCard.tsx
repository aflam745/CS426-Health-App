// src/components/journalComponents/MetricSummaryCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface MetricSummaryCardProps {
  name: string
  unit: string
  goal: number
  average: number
  latest: number
}

export function MetricSummaryCard({
  name,
  unit,
  goal,
  average,
  latest,
}: MetricSummaryCardProps) {
  const status =
    goal === 0
      ? "No Goal"
      : average >= goal
      ? "Above Goal"
      : "Below Goal"

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name} Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>Status: <strong>{status}</strong></div>
        <div>Goal: <strong>{goal} {unit}</strong></div>
        <div>Average: <strong>{average.toFixed(1)} {unit}</strong></div>
        <div>Latest Entry: <strong>{latest} {unit}</strong></div>
      </CardContent>
    </Card>
  )
}
