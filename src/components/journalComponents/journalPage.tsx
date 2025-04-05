
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { mockMetrics } from "./mockData"
import { MetricDropdown } from "./metricDropdown.tsx"
import { MetricChart } from "./metricChart"
import { MetricSummaryCard } from "./metricSummaryCard"
import { LogEntryForm } from "./logEntryForm.tsx"
import { LogEntryList } from "./logEntryList.tsx"

export default function JournalPage() {
  const [selectedMetricId, setSelectedMetricId] = useState("blood_sugar")
  const [showForm, setShowForm] = useState(false)

  const selectedMetric = useMemo(() => {
    return mockMetrics.find((metric) => metric.id === selectedMetricId)
  }, [selectedMetricId])

  if (!selectedMetric) {
    return <div>No metric selected</div>
  }

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Top Section: Dropdown + Add Metric */}
      <div className="flex items-center justify-between">
        <MetricDropdown
          metrics={mockMetrics}
          selectedMetricId={selectedMetricId}
          onSelect={setSelectedMetricId}
        />
        <Button variant="outline">+ Add New Metric</Button>
      </div>

      {/* Summary Card */}
      <MetricSummaryCard metric={selectedMetric} />

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">
            {selectedMetric.name} Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MetricChart entries={selectedMetric.entries} />
        </CardContent>
      </Card>

      {/* Log Entry Form Toggle */}
      {!showForm && (
        <Button className="w-full" onClick={() => setShowForm(true)}>
          + Add Entry
        </Button>
      )}

      {showForm && (
        <LogEntryForm
          metric={selectedMetric}
          onCancel={() => setShowForm(false)}
          onSubmit={(entry) => {
            console.log("Mock save:", entry)
            setShowForm(false)
          }}
        />
      )}

      {/* Entry List */}
      <LogEntryList entries={selectedMetric.entries} unit={selectedMetric.unit} />
    </div>
  )
}