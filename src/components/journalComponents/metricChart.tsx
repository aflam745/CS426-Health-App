import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts"
  import { format, parseISO } from "date-fns"
  
  interface Entry {
    date: string // ISO string
    value: number
  }
  
  interface MetricChartProps {
    entries: Entry[]
  }
  
  export function MetricChart({ entries }: MetricChartProps) {
    // Parse and sort by date (just in case)
    const sorted = [...entries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
  
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sorted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(parseISO(date), "MMM d")}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(label) => format(parseISO(label), "PPP")}
              formatter={(value: number) => [`${value}`, "Value"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#dc2626" 
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )
  }
  