// UI card components used to layout the summary
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Props interface for the MetricSummaryCard
export interface MetricSummaryCardProps {
  name: string        // Metric name (e.g., "Heart Rate")
  unit: string        // Unit of measurement (e.g., "bpm")
  goal: number        // Target goal value for the metric
  average: number     // Average value of entries
  latest: number      // Most recent entry value
}

// Component to display a summary overview of a metric
export function MetricSummaryCard({
  name,
  unit,
  goal,
  average,
  latest,
}: MetricSummaryCardProps) {
  // Determine status based on goal and average value
  const status =
    goal === 0           // If no goal is set
      ? "No Goal"
      : average >= goal  // Compare average to goal
      ? "Above Goal"
      : "Below Goal"

  return (
    <Card>
      {/* Card header with the metric name */}
      <CardHeader>
        <CardTitle>{name} Overview</CardTitle>
      </CardHeader>

      {/* Card content with goal, average, and latest values */}
      <CardContent className="space-y-2">
        <div>Status: <strong>{status}</strong></div>
        <div>Goal: <strong>{goal} {unit}</strong></div>
        <div>Average: <strong>{average.toFixed(1)} {unit}</strong></div>
        <div>Latest Entry: <strong>{latest} {unit}</strong></div>
      </CardContent>
    </Card>
  )
}
