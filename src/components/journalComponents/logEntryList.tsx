// src/components/journalComponents/logEntryList.tsx
import { format, parseISO } from "date-fns"

interface Entry {
  date: string
  value: number
  note?: string
}

export function LogEntryList({
  entries,
  unit,
}: {
  entries: Entry[]
  unit: string
}) {
  return (
    <div className="space-y-4">
      {entries.map((entry, index) => (
        <div key={index} className="border p-4 rounded-md">
          <div className="text-lg font-semibold">
            {entry.value} {unit}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(parseISO(entry.date), "PPPP")}
          </div>
          {entry.note && (
            <div className="mt-2 text-sm">
              Note: {entry.note}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
