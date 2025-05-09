// src/components/journalComponents/JournalPage.tsx
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useMetrics, MetricEntry } from "@/hooks/useMetrics"
import { MetricDropdown } from "./metricDropdown"
import { MetricSummaryCard } from "./metricSummaryCard"
import { MetricChart } from "./metricChart"
import { LogEntryForm } from "./logEntryForm"
import { LogEntryList } from "./logEntryList"
import { AddMetricForm } from "./addMetricForm"

export default function JournalPage() {
  const userId = 1
  const {
    types,
    entries,
    summary,
    loading,
    loadEntries,
    loadSummary,
    addMetricType,
    deleteMetricType,
    addEntry,
  } = useMetrics(userId)

  const [selectedMetricId, setSelectedMetricId] = useState<number | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [showAddMetric, setShowAddMetric] = useState(false)

  // Load entries & summary when a metric is selected
  useEffect(() => {
    if (selectedMetricId != null) {
      loadEntries(selectedMetricId)
      loadSummary(selectedMetricId)
    }
  }, [selectedMetricId, loadEntries, loadSummary])

  // Auto-select first metric on initial load
  useEffect(() => {
    if (types.length > 0 && selectedMetricId == null) {
      setSelectedMetricId(types[0].id)
    }
  }, [types, selectedMetricId])

  if (loading) {
    return <div className="p-4 max-w-4xl mx-auto">Loading…</div>
  }

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

  // Raw entries for the selected metric
  const rawEntries: MetricEntry[] =
    selectedMetricId != null ? entries[selectedMetricId] || [] : []

  // Normalize date for list & chart
  const entryListItems = rawEntries.map((e) => ({
    date: e.entry_date.split("T")[0],
    value: e.value,
    note: e.note ?? "",
  }))
  const chartData = entryListItems.map((e) => ({
    date: e.date,
    value: e.value,
  }))

  // Find the selected metric type
  const metricType = types.find((t) => t.id === selectedMetricId)

  // Summary stats from API
  const average = summary?.overall_avg ?? 0
  const latest = rawEntries[0]?.value ?? 0

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Top Controls */}
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
                if (
                  window.confirm("Delete this metric and all its entries?")
                ) {
                  deleteMetricType(selectedMetricId!).then(() => {
                    const remaining = types.filter(
                      (t) => t.id !== selectedMetricId
                    )
                    if (remaining.length > 0) {
                      setSelectedMetricId(remaining[0].id)
                      loadEntries(remaining[0].id)
                      loadSummary(remaining[0].id)
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

      {/* Main Content */}
      {metricType && (
        <>
          <MetricSummaryCard
            name={metricType.name}
            unit={metricType.unit ?? ""}
            goal={metricType.goal ?? 0}
            average={average}
            latest={latest}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">
                {metricType.name} Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MetricChart entries={chartData} />
            </CardContent>
          </Card>

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
                addEntry(
                  selectedMetricId!,
                  date,
                  value,
                  note
                ).then(() => setShowForm(false))
              }
            />
          )}

          <LogEntryList entries={entryListItems} unit={metricType.unit ?? ""} />
        </>
      )}
    </div>
  )
}
