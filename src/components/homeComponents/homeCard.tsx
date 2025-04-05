"use client"

import React from "react"
import { Separator } from "@/components/ui/separator"
import { HealthChartCard } from "./healthChartCard"
import { MetricDropdown } from "./metricDropdown"
import { RemindersCard } from "./remindersCard"

export type MetricKey =
  | "weight"
  | "bloodPressure"
  | "bloodSugar"
  | "heartRate"

export function HomePage() {
  const [selectedMetric, setSelectedMetric] = React.useState<MetricKey>("weight")

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Home Page</h2>
      <p className="text-sm text-muted-foreground">Track your health at a glance</p>
      <Separator className="my-4" />

      <div className="flex gap-4">
        <div className="w-2/3 space-y-4">
          <HealthChartCard selectedMetric={selectedMetric} />
          <MetricDropdown
            selectedMetric={selectedMetric}
            setSelectedMetric={setSelectedMetric}
          />
        </div>
        <div className="w-1/3">
          <RemindersCard />
        </div>
      </div>
    </div>
  )
}

export default HomePage
