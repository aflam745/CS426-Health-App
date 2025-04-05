"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { MetricKey } from "./homeCard"

function formatLabel(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
}

export function MetricDropdown({
  selectedMetric,
  setSelectedMetric,
}: {
  selectedMetric: MetricKey
  setSelectedMetric: (key: MetricKey) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Metric</CardTitle>
      </CardHeader>
      <CardContent>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border rounded-md w-full px-4 py-2 text-left bg-white">
              {formatLabel(selectedMetric)} ▼
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-full bg-white border z-50">
            {(["weight", "bloodPressure", "bloodSugar", "heartRate", "oxygenLevel"] as MetricKey[]).map(
              (key) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => setSelectedMetric(key)}
                  className="cursor-pointer"
                >
                  {formatLabel(key)}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}
