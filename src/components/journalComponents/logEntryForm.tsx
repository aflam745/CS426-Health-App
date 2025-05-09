// src/components/journalComponents/logEntryForm.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export interface LogEntryFormProps {
  metric: { id: string; name: string; unit: string }
  onCancel: () => void
  onSubmit: (entry: { date: string; value: number; note?: string }) => Promise<void>
}

export function LogEntryForm({ metric, onCancel, onSubmit }: LogEntryFormProps) {
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [value, setValue] = useState("")
  const [note, setNote] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsedValue = parseFloat(value)
    if (isNaN(parsedValue)) return
    await onSubmit({ date, value: parsedValue, note })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Date</label>
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
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
      <div>
        <label className="block text-sm font-medium">Note (optional)</label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Entry</Button>
      </div>
    </form>
  )
}
