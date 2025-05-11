"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

type MetricType = {
  id: number
  name: string
}

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

export function MetricDropdown({
  selectedMetric,
  setSelectedMetric,
  availableMetrics,
}: {
  selectedMetric: MetricType | null
  setSelectedMetric: (metric: MetricType) => void
  availableMetrics: MetricType[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Metric</CardTitle>
      </CardHeader>
      <CardContent>
        {availableMetrics.length > 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="border rounded-md w-full px-4 py-2 text-left bg-white">
                {selectedMetric ? formatLabel(selectedMetric.name) : "Select a Metric"} ▼
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-full bg-white border z-50">
              {availableMetrics.map((metric) => (
                <DropdownMenuItem
                  key={metric.id}
                  onClick={() => setSelectedMetric(metric)}
                  className="cursor-pointer"
                >
                  {formatLabel(metric.name)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <p className="text-sm text-muted-foreground">
            Add your health metrics on the journal page to track your progress.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
