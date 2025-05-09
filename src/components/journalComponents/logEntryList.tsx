// Utility functions from date-fns for formatting dates
import { format, parseISO } from "date-fns"

// Entry interface to define the shape of each log
interface Entry {
  date: string       // ISO string format of the entry date
  value: number      // Numerical value of the entry
  note?: string      // Optional note attached to the entry
}

// Component to display a list of metric entries
export function LogEntryList({
  entries,           // Array of entry objects to display
  unit,              // Unit to display next to each value
}: {
  entries: Entry[]
  unit: string
}) {
  return (
    <div className="space-y-4">
      {/* Loop through and render each entry */}
      {entries.map((entry, index) => (
        <div key={index} className="border p-4 rounded-md">
          {/* Display the value and its unit */}
          <div className="text-lg font-semibold">
            {entry.value} {unit}
          </div>

          {/* Display the date in a human-readable format */}
          <div className="text-sm text-muted-foreground">
            {format(parseISO(entry.date), "PPPP")}
          </div>

          {/* Display note if it exists */}
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
