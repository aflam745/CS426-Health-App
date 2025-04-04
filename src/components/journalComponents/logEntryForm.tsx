import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DatePicker } from "../infoComponents/DatePicker"

interface LogEntry {
  date: string
  value: number
  note?: string
}

interface LogEntryFormProps {
  metric: {
    id: string
    name: string
    unit: string
  }
  onCancel: () => void
  onSubmit: (entry: LogEntry) => void
}

export function LogEntryForm({ metric, onCancel, onSubmit }: LogEntryFormProps) {
  const [value, setValue] = useState("")
  const [note, setNote] = useState("")
  const [date, setDate] = useState<Date | null>(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value || !date) return

    onSubmit({
      date: date.toISOString().split("T")[0],
      value: parseFloat(value),
      note: note.trim(),
    })

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-xl shadow-sm bg-white">
      <div>
        <Label>Value ({metric.unit})</Label>
        <Input
          type="number"
          step="any"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter ${metric.name.toLowerCase()} value`}
          required
        />
      </div>

      <div>
        <Label>Date</Label>
        <DatePicker value={date} onChange={setDate} />
      </div>

      <div>
        <Label>Note (optional)</Label>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add any notes or observations"
        />
      </div>

      <div className="flex justify-between">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Entry</Button>
      </div>
    </form>
  )
}
