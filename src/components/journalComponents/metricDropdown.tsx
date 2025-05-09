import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MetricDropdownProps {
  metrics: { id: string; name: string }[]
  selectedMetricId: string
  onSelect: (id: string) => void
}

export function MetricDropdown({ metrics, selectedMetricId, onSelect }: MetricDropdownProps) {
  return (
    <Select value={selectedMetricId} onValueChange={onSelect}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Metric" />
      </SelectTrigger>
      <SelectContent>
        {metrics.map((m) => (
          <SelectItem key={m.id} value={m.id}>
            {m.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
