"use client";

import { AreaChart } from "@/components/ui/charts/area-chart";
import { CHART_DATA } from "@/components/ui/charts/chart-data";

export function RateAreaChart() {
  return (
    <AreaChart
      className="h-80 bg-white"
      data={CHART_DATA}
      index="date"
      categories={["Rate evolution"]}
      valueFormatter={(number: number) =>
        `${Intl.NumberFormat("us", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number)}%`
      }
      onValueChange={(v) => console.log(v)}
    />
  );
}
