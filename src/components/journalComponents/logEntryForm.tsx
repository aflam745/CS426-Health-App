// React state hook
import { useState } from "react"

// UI components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Props for the LogEntryForm component
export interface LogEntryFormProps {
  metric: {
    id: string          // Metric identifier (string form)
    name: string        // Metric name (e.g., Heart Rate)
    unit: string        // Unit associated with the metric (e.g., bpm)
  }
  onCancel: () => void  // Function called when the cancel button is clicked
  onSubmit: (entry: {
    date: string        // Entry date (YYYY-MM-DD format)
    value: number       // Numerical value entered by user
    note?: string       // Optional note for the entry
  }) => Promise<void>   // Async function to handle form submission
}

// Component for submitting a new metric entry
export function LogEntryForm({ metric, onCancel, onSubmit }: LogEntryFormProps) {
  // Form state: date (default to today), value (string for input), and optional note
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [value, setValue] = useState("")
  const [note, setNote] = useState("")

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsedValue = parseFloat(value)  // Convert input string to number
    if (isNaN(parsedValue)) return         // Prevent submission if input is invalid
    await onSubmit({ date, value: parsedValue, note })  // Submit the entry
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Date input */}
      <div>
        <label className="block text-sm font-medium">Date</label>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Value input with metric name and unit */}
      <div>
        <label className="block text-sm font-medium">
          {metric.name} ({metric.unit})
        </label>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${metric.name}`}
        />
      </div>

      {/* Optional note input */}
      <div>
        <label className="block text-sm font-medium">Note (optional)</label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {/* Cancel and Submit buttons */}
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Entry
        </Button>
      </div>
    </form>
  )
}
