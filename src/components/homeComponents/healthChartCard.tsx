"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChartWrapper } from "@/components/ui/line-chart"
import type { ChartData, ChartOptions, TooltipItem } from "chart.js"

type MetricEntry = {
  metric_type_id: number
  entry_date: string
  value: number
  note?: string
  created_at: string
}

type MetricType = {
  id: number
  name: string
}

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

export function HealthChartCard({
  selectedMetric,
  data,
}: {
  selectedMetric: MetricType | null
  data: MetricEntry[]
}) {
  if (!selectedMetric || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{selectedMetric?.name ? formatLabel(selectedMetric.name) : "Health Metric"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Begin journaling your health to track your progress.
          </p>
        </CardContent>
      </Card>
    )
  }

  const formattedLabel = formatLabel(selectedMetric.name)
  const labels = data.map((item) =>
    new Date(item.entry_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
  )
  const dataValues = data.map((item) => item.value)

  const chartData: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: formattedLabel,
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
        text: `${formattedLabel} Over Time`,
        color: "black",
        font: { size: 20, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line">) {
            const value = context.raw
            return `${formattedLabel}: ${value}`
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
        title: { display: true, text: formattedLabel },
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
