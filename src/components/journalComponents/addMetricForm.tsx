// src/components/journalComponents/addMetricForm.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export interface AddMetricFormProps {
  onCancel: () => void
  onSubmit: (data: { name: string; unit: string; goal: number }) => Promise<void>
  existingNames?: string[] // <-- pass list of names here
}

export function AddMetricForm({
  onCancel,
  onSubmit,
  existingNames = [],
}: AddMetricFormProps) {
  const [name, setName] = useState("")
  const [unit, setUnit] = useState("")
  const [goal, setGoal] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = name.trim().toLowerCase()
    const isDuplicate = existingNames.some(
      (existing) => existing.trim().toLowerCase() === normalized
    )

    if (!name || isNaN(parseFloat(goal))) {
      setError("Please fill out all required fields.")
      return
    }

    if (isDuplicate) {
      setError("You already have a metric with that name.")
      return
    }

    setError("")
    await onSubmit({ name, unit, goal: parseFloat(goal) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Metric Name</label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Heart Rate"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Unit</label>
        <Input
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g., bpm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Goal</label>
        <Input
          type="number"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., 70"
        />
      </div>

      {error && (
        <div className="text-sm text-red-500 font-medium">{error}</div>
      )}

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Add Metric</Button>
      </div>
    </form>
  )
}
