import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
  interface Metric {
    id: string
    name: string
  }
  
  interface MetricDropdownProps {
    metrics: Metric[]
    selectedMetricId: string
    onSelect: (id: string) => void
  }
  
  export function MetricDropdown({
    metrics,
    selectedMetricId,
    onSelect,
  }: MetricDropdownProps) {
    return (
      <Select value={selectedMetricId} onValueChange={onSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Metric" />
        </SelectTrigger>
        <SelectContent>
          {metrics.map((metric) => (
            <SelectItem key={metric.id} value={metric.id}>
              {metric.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }
  