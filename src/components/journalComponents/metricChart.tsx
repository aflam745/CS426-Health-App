// Recharts components for rendering a responsive line chart
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

// date-fns utilities for formatting ISO date strings
import { format, parseISO } from "date-fns"

// Entry shape expected by the chart component
interface Entry {
  date: string       // Date in "YYYY-MM-DD" format
  value: number      // Numeric value to plot
}

// Component to render a line chart for metric entries
export function MetricChart({ entries }: { entries: Entry[] }) {
  return (
    // Makes the chart responsive to container width/height
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={entries}  // Data points passed into the chart
        margin={{ top: 10, right: 30, left: 0, bottom: 20 }} // Chart padding
      >
        {/* Adds a grid with dashed lines */}
        <CartesianGrid strokeDasharray="3 3" />

        {/* X-axis shows the entry date formatted as "MMM d" (e.g., May 9) */}
        <XAxis
          dataKey="date"
          tickFormatter={(d) => format(parseISO(d), "MMM d")}
          style={{ fontSize: 12 }}
        />

        {/* Y-axis shows numeric values with no decimals */}
        <YAxis
          allowDecimals={false}
          style={{ fontSize: 12 }}
        />

        {/* Tooltip appears on hover with full date and value */}
        <Tooltip
          labelFormatter={(label) => format(parseISO(label), "PPPP")} // e.g., Friday, May 9th, 2025
          formatter={(value: number) => [`${value}`, "Value"]}
        />

        {/* The line itself: red, smooth curve, styled dots */}
        <Line
          type="monotone"          // Smooth line
          dataKey="value"          // Maps to the value in data
          stroke="#DB1212FF"       // Line color (red)
          strokeWidth={2}
          dot={{ r: 4 }}           // Circle dot on each point
          activeDot={{ r: 6 }}     // Larger dot when hovered
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
