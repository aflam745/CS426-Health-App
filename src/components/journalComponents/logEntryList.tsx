import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

interface LogEntry {
  date: string 
  value: number
  note?: string
}

interface LogEntryListProps {
  entries: LogEntry[]
  unit: string
}

export function LogEntryList({ entries, unit }: LogEntryListProps) {
  // Sort by date descending
  const sorted = [...entries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <div className="space-y-3">
      {sorted.map((entry, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-red-600">
              {entry.value} {unit}
            </CardTitle>
            <Badge variant="outline">{format(new Date(entry.date), "PPP")}</Badge>
          </CardHeader>
          {entry.note && (
            <CardContent className="text-sm text-muted-foreground">
              Note: {entry.note}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}
