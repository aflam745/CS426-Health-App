"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChartWrapper } from "@/components/ui/line-chart"
import type { ChartData, ChartOptions, TooltipItem } from "chart.js"
import { MetricKey } from "./homeCard"

const mockHealthData = [
  { date: "2025-01-01", weight: 180, bloodPressure: 120, bloodSugar: 90, heartRate: 7,  },
  { date: "2025-01-02", weight: 179, bloodPressure: 118, bloodSugar: 95, heartRate: 74 },
  { date: "2025-01-03", weight: 181, bloodPressure: 115, bloodSugar: 100, heartRate: 75 },
  { date: "2025-01-04", weight: 180, bloodPressure: 117, bloodSugar: 92, heartRate: 73 },
]

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

export function HealthChartCard({ selectedMetric }: { selectedMetric: MetricKey }) {
  const labels = mockHealthData.map((item) =>
    new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  )
  const dataValues = mockHealthData.map((item) => item[selectedMetric])
  const formattedMetricLabel = formatLabel(selectedMetric)

  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: formattedMetricLabel,
        data: dataValues,
        borderColor: "#800020",
        backgroundColor: "rgba(128, 0, 32, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: `${formattedMetricLabel} Over Time`,
        color: "black",
        font: { size: 20, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const value = context.raw
            return `${formattedMetricLabel}: ${value}`
          },
        },
      },
    },
    layout: { padding: 16 },
    scales: {
      x: {
        title: { display: true, text: "Date" },
        ticks: { autoSkip: true, maxRotation: 0, minRotation: 0 },
      },
      y: {
        title: { display: true, text: formattedMetricLabel },
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Metrics Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <LineChartWrapper data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  )
}
