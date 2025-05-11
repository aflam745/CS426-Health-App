"use client"

import React, { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import { HealthChartCard } from "./healthChartCard"
import { MetricDropdown } from "./metricDropdown"
import { RemindersCard } from "./remindersCard"
import { useAuth } from "@/context/authContext"

type MetricType = {
  id: number
  name: string
}

type MetricEntry = {
  metric_type_id: number
  entry_date: string
  value: number
  note?: string
  created_at: string
}

type Prescription = {
  id: number
  user_id: number
  name: string
  dosage?: string
  frequency?: string
  supply_remaining?: number
  next_refill_date?: string
  prescribing_doctor?: string
  pharmacy?: string
  instructions?: string
  created_at: string
}

export function HomePage() {
  const { user, loading } = useAuth()

  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null)
  const [availableMetrics, setAvailableMetrics] = useState<MetricType[]>([])
  const [metricEntries, setMetricEntries] = useState<MetricEntry[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const userId = user?.id
  

  useEffect(() => {
    if (!userId) return

    const fetchMetricsAndPrescriptions = async () => {
      const [metricsRes, prescriptionsRes] = await Promise.all([
        fetch(`http://localhost:4000/api/metrics/types/${userId}`),
        fetch(`http://localhost:4000/api/prescriptions/${userId}`)
      ])
      const metricsData = await metricsRes.json()
      const prescriptionsData = await prescriptionsRes.json()

      setAvailableMetrics(metricsData)
      if (metricsData.length > 0) setSelectedMetric(metricsData[0])
      setPrescriptions(prescriptionsData)
    }

    fetchMetricsAndPrescriptions()
  }, [userId])

  useEffect(() => {
    if (!selectedMetric) return

    const fetchEntries = async () => {
      const res = await fetch(`http://localhost:4000/api/metrics/entries/${selectedMetric.id}`)
      const data = await res.json()
      setMetricEntries(data)
    }

    fetchEntries()
  }, [selectedMetric])

  if (loading) return <div className="p-4 text-center">Loading...</div>
  if (!user) return null

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">
        Welcome{user.name ? `, ${user.name}` : ""}!
      </h2>
      <p className="text-sm text-muted-foreground">Track your health at a glance</p>
      <Separator className="my-4" />

      <div className="flex gap-4">
        <div className="w-2/3 space-y-4">
          <HealthChartCard selectedMetric={selectedMetric} data={metricEntries} />
          <MetricDropdown
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
            availableMetrics={availableMetrics}
          />
        </div>
        <div className="w-1/3">
          <RemindersCard reminders={prescriptions} />
        </div>
      </div>
    </div>
  )
}

export default HomePage
