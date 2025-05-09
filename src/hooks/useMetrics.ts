import { useState, useEffect, useCallback } from "react"

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000"

export interface MetricType {
  id: number
  user_id: number
  name: string
  unit: string | null
  goal: number | null
  created_at: string
}

export interface MetricEntry {
  id: number
  metric_type_id: number
  entry_date: string
  value: number
  note: string | null
  created_at: string
}

export interface DailyAverage {
  day: string
  daily_avg: number
}

export interface SummaryData {
  days: DailyAverage[]
  overall_avg: number
}

export function useMetrics(userId: number) {
  const [types, setTypes] = useState<MetricType[]>([])
  const [entries, setEntries] = useState<Record<number, MetricEntry[]>>({})
  const [loading, setLoading] = useState<boolean>(false)
  const [summary, setSummary] = useState<SummaryData | null>(null)

  // Fetch all metric types for the user
  const loadTypes = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/metrics/types/${userId}`)
      if (!res.ok) throw new Error("Failed to load metric types")
      const data = (await res.json()) as MetricType[]
      setTypes(data)
    } finally {
      setLoading(false)
    }
  }, [userId])

  // Fetch all entries for a specific metric type
  const loadEntries = useCallback(async (metricTypeId: number) => {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/metrics/entries/${metricTypeId}`)
      if (!res.ok) throw new Error("Failed to load entries")
      const data = (await res.json()) as MetricEntry[]
      setEntries((prev) => ({ ...prev, [metricTypeId]: data }))
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch the summary data (daily and overall average) for a metric type
  const loadSummary = useCallback(async (metricTypeId: number) => {
    const res = await fetch(`${API_BASE}/api/metrics/daily-averages/${metricTypeId}`)
    if (!res.ok) throw new Error("Failed to load summary")
    const data = (await res.json()) as SummaryData
    setSummary(data)
  }, [])

  // Add a new metric type for the user
  const addMetricType = useCallback(
    async (name: string, unit: string | null, goal: number | null) => {
      const res = await fetch(`${API_BASE}/api/metrics/types`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, name, unit, goal }),
      })

      if (!res.ok) {
        if (res.status === 409) throw new Error("Metric name already exists.")
        else throw new Error("Failed to create metric type")
      }

      const newType = (await res.json()) as MetricType
      setTypes((prev) => [...prev, newType])
      return newType
    },
    [userId]
  )

  // Delete a metric type and its associated entries
  const deleteMetricType = useCallback(async (metricTypeId: number) => {
    const res = await fetch(`${API_BASE}/api/metrics/types/${metricTypeId}`, {
      method: "DELETE",
    })

    if (!res.ok) throw new Error("Failed to delete metric type")

    // Remove from metric types
    setTypes((prev) => prev.filter((t) => t.id !== metricTypeId))

    // Remove associated entries
    setEntries((prev) => {
      const { [metricTypeId]: _, ...rest } = prev
      return rest
    })
  }, [])

  // Add a new entry to a metric
  const addEntry = useCallback(
    async (metricTypeId: number, entry_date: string, value: number, note?: string) => {
      const res = await fetch(`${API_BASE}/api/metrics/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metric_type_id: metricTypeId, entry_date, value, note }),
      })

      if (!res.ok) throw new Error("Failed to create entry")

      const newEntry = (await res.json()) as MetricEntry

      // Add new entry to the beginning of the list
      setEntries((prev) => ({
        ...prev,
        [metricTypeId]: [newEntry, ...(prev[metricTypeId] || [])],
      }))

      return newEntry
    },
    []
  )

  // Load metric types on component mount
  useEffect(() => {
    loadTypes()
  }, [loadTypes])

  // Return all state and operations for use in components
  return {
    types,
    entries,
    loading,
    summary,
    loadEntries,
    loadSummary,
    addMetricType,
    deleteMetricType,
    addEntry,
  }
}
