import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format, parseISO } from "date-fns"

interface Entry {
  date: string
  value: number
  note?: string
}

interface MetricSummaryCardProps {
  metric: {
    name: string
    unit: string
    goal: number
    entries: Entry[]
  }
}

export function MetricSummaryCard({ metric }: MetricSummaryCardProps) {
  const entries = metric.entries
  const latest = entries
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]

  const avg =
    entries.reduce((sum, e) => sum + e.value, 0) / (entries.length || 1)
  const isAboveGoal = avg > metric.goal

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{metric.name} Overview</span>
          {entries.length > 0 && (
            <Badge variant={isAboveGoal ? "destructive" : "default"}>
              {isAboveGoal ? "Above Goal" : "On Track"}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <strong>Goal:</strong> {metric.goal} {metric.unit}
        </p>
        <p>
          <strong>Average:</strong> {avg.toFixed(1)} {metric.unit}
        </p>
        {latest ? (
          <>
            <p>
              <strong>Latest Entry:</strong> {latest.value} {metric.unit}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(latest.date), "PPP")}
            </p>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">No entries yet.</p>
        )}
      </CardContent>
    </Card>
  )
}
