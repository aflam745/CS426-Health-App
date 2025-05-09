// React & UI library imports
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Custom hooks and components
import { useMetrics, MetricEntry } from "@/hooks/useMetrics"
import { MetricDropdown } from "./metricDropdown"
import { MetricSummaryCard } from "./metricSummaryCard"
import { MetricChart } from "./metricChart"
import { LogEntryForm } from "./logEntryForm"
import { LogEntryList } from "./logEntryList"
import { AddMetricForm } from "./addMetricForm"
import { useAuth } from "@/context/authContext"

export default function JournalPage() {
  // Get authenticated user
  const { user } = useAuth()
  const userId = user?.id

  // Fetch metrics-related data and functions from custom hook
  const {
    types,              // All metric types
    entries,            // Metric entries grouped by type ID
    summary,            // Summary stats like overall average
    loading,            // Loading state
    loadEntries,        // Function to fetch entries
    loadSummary,        // Function to fetch summary
    addMetricType,      // Add a new metric type
    deleteMetricType,   // Delete a metric type
    addEntry,           // Add a new metric entry
  } = useMetrics(userId)

  // UI state
  const [selectedMetricId, setSelectedMetricId] = useState<number | undefined>()
  const [showForm, setShowForm] = useState(false)            // Controls Add Entry form
  const [showAddMetric, setShowAddMetric] = useState(false)  // Controls Add Metric form

  // Load entries and summary when a metric is selected
  useEffect(() => {
    if (selectedMetricId != null) {
      loadEntries(selectedMetricId)
      loadSummary(selectedMetricId)
    }
  }, [selectedMetricId, loadEntries, loadSummary])

  // Automatically select the first available metric when metrics are loaded
  useEffect(() => {
    if (types.length > 0 && selectedMetricId == null) {
      setSelectedMetricId(types[0].id)
    }
  }, [types, selectedMetricId])

  // Handle edge cases
  if (!userId) return <div>Loading user...</div>
  if (loading) return <div className="p-4 max-w-4xl mx-auto">Loading…</div>

  // Show prompt to add a metric if none exist
  if (types.length === 0 && !showAddMetric) {
    return (
      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>No metrics yet. Add one to get started.</div>
          <Button variant="outline" onClick={() => setShowAddMetric(true)}>
            + Add New Metric
          </Button>
        </div>
      </div>
    )
  }

  // Process entries and chart data for the selected metric
  const rawEntries: MetricEntry[] =
    selectedMetricId != null ? entries[selectedMetricId] || [] : []

  const entryListItems = rawEntries.map((e) => ({
    date: e.entry_date.split("T")[0],
    value: e.value,
    note: e.note ?? "",
  }))

  const chartData = entryListItems.map((e) => ({
    date: e.date,
    value: e.value,
  }))

  const metricType = types.find((t) => t.id === selectedMetricId)
  const average = summary?.overall_avg ?? 0
  const latest = rawEntries[0]?.value ?? 0

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Header controls: metric selector + add/delete buttons */}
      <div className="flex items-center justify-between space-x-4">
        {metricType && (
          <div className="flex space-x-2">
            <MetricDropdown
              metrics={types.map((t) => ({
                id: t.id.toString(),
                name: t.name,
              }))}
              selectedMetricId={selectedMetricId!.toString()}
              onSelect={(id) => {
                setSelectedMetricId(Number(id))
                setShowForm(false)
                setShowAddMetric(false)
              }}
            />
            <Button
              variant="destructive"
              onClick={() => {
                if (window.confirm("Delete this metric and all its entries?")) {
                  deleteMetricType(selectedMetricId!).then(() => {
                    const remaining = types.filter((t) => t.id !== selectedMetricId)
                    if (remaining.length > 0) {
                      const first = remaining[0]
                      setSelectedMetricId(first.id)
                      loadEntries(first.id)
                      loadSummary(first.id)
                    } else {
                      setSelectedMetricId(undefined)
                    }
                    setShowAddMetric(false)
                  })
                }
              }}
            >
              Delete
            </Button>
          </div>
        )}

        {/* Toggle add metric form */}
        {!showAddMetric ? (
          <Button variant="outline" onClick={() => setShowAddMetric(true)}>
            + Add New Metric
          </Button>
        ) : (
          <AddMetricForm
            existingNames={types.map((t) => t.name)}
            onCancel={() => setShowAddMetric(false)}
            onSubmit={({ name, unit, goal }) =>
              addMetricType(name, unit, goal).then((newType) => {
                setSelectedMetricId(newType.id)
                setShowAddMetric(false)
              })
            }
          />
        )}
      </div>

      {/* Main content: summary, chart, entry form, and log list */}
      {metricType && (
        <>
          {/* Summary card showing goal, average, and latest */}
          <MetricSummaryCard
            name={metricType.name}
            unit={metricType.unit ?? ""}
            goal={metricType.goal ?? 0}
            average={average}
            latest={latest}
          />

          {/* Trend chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">{metricType.name} Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <MetricChart entries={chartData} />
            </CardContent>
          </Card>

          {/* Toggle log entry form */}
          {!showForm ? (
            <Button className="w-full" onClick={() => setShowForm(true)}>
              + Add Entry
            </Button>
          ) : (
            <LogEntryForm
              metric={{
                id: metricType.id.toString(),
                name: metricType.name,
                unit: metricType.unit ?? "",
              }}
              onCancel={() => setShowForm(false)}
              onSubmit={({ date, value, note }) =>
                addEntry(selectedMetricId!, date, value, note).then(() => setShowForm(false))
              }
            />
          )}

          {/* Log entry list below the form */}
          <LogEntryList entries={entryListItems} unit={metricType.unit ?? ""} />
        </>
      )}
    </div>
  )
}
