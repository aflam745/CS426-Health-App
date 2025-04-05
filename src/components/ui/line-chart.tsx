"use client"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineChartProps {
  data: ChartData<"line">
  options?: ChartOptions<"line">
  className?: string
}

export function LineChartWrapper({ data, options, className }: LineChartProps) {
  return (
    <div className={className}>
      <Line data={data} options={options} />
    </div>
  )
}
