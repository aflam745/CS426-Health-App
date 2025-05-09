// Importing custom UI components for building a select dropdown
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Props interface for the MetricDropdown component
interface MetricDropdownProps {
  metrics: { id: string; name: string }[]  // Array of metric options
  selectedMetricId: string                 // ID of currently selected metric
  onSelect: (id: string) => void           // Callback when a new metric is selected
}

// Dropdown component to select from available metrics
export function MetricDropdown({
  metrics,
  selectedMetricId,
  onSelect,
}: MetricDropdownProps) {
  return (
    // Root Select component with controlled value and change handler
    <Select value={selectedMetricId} onValueChange={onSelect}>
      
      {/* Button-like trigger that shows the current value or placeholder */}
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select Metric" />
      </SelectTrigger>

      {/* Dropdown menu content with all metric options */}
      <SelectContent>
        {metrics.map((m) => (
          <SelectItem key={m.id} value={m.id}>
            {m.name} {/* Display the metric name in the dropdown */}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
