// src/components/journalComponents/metricChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { format, parseISO } from "date-fns"

interface Entry {
  date: string // YYYY-MM-DD
  value: number
}

export function MetricChart({ entries }: { entries: Entry[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={entries}
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(d) => format(parseISO(d), "MMM d")}
          style={{ fontSize: 12 }}
        />
        <YAxis
          allowDecimals={false}
          style={{ fontSize: 12 }}
        />
        <Tooltip
          labelFormatter={(label) => format(parseISO(label), "PPPP")}
          formatter={(value: number) => [`${value}`, "Value"]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#DB1212FF"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
