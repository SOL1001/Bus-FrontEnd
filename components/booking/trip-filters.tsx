"use client"

import { formatDate, type SearchParams } from "@/lib/booking-demo"
import { cn } from "@/lib/utils"

const sortOptions = [
  { id: "departure" as const, label: "Earliest" },
  { id: "price-asc" as const, label: "Lowest price" },
  { id: "price-desc" as const, label: "Highest price" },
]

type TripFiltersProps = {
  search: SearchParams
  totalCount: number
  filteredCount: number
  sort: SearchParams["sort"]
  onSortChange: (sort: SearchParams["sort"]) => void
  layout?: "sidebar" | "bar"
}

export function TripFilters({
  search,
  totalCount,
  filteredCount,
  sort,
  onSortChange,
  layout = "bar",
}: TripFiltersProps) {
  if (layout === "sidebar") {
    return (
      <div className="space-y-5 rounded-2xl border border-border/60 bg-white p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Results
          </p>
          <p className="mt-2 text-2xl font-bold text-[#0f2744]">{filteredCount}</p>
          <p className="text-sm text-muted-foreground">
            of {totalCount} buses · {formatDate(search.date)}
          </p>
        </div>
        <SortControl sort={sort} onSortChange={onSortChange} vertical />
      </div>
    )
  }

  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-white px-4 py-4 text-[#0f2744] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:space-y-0 sm:px-5">
      <div className="space-y-1 text-sm">
        <p className="font-semibold text-[#0f2744]">
          {filteredCount} of {totalCount} buses
        </p>
        <p className="text-[#0f2744]/60">
          {formatDate(search.date)} · {search.passengers}{" "}
          {search.passengers === 1 ? "passenger" : "passengers"}
        </p>
      </div>

      <SortControl sort={sort} onSortChange={onSortChange} />
    </div>
  )
}

function SortControl({
  sort,
  onSortChange,
  vertical,
}: {
  sort: SearchParams["sort"]
  onSortChange: (sort: SearchParams["sort"]) => void
  vertical?: boolean
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        vertical ? "w-full flex-col items-stretch" : "w-full sm:w-auto"
      )}
    >
      {!vertical && (
        <span className="shrink-0 text-xs font-medium text-[#0f2744]/60">Sort</span>
      )}
      <select
        value={sort}
        onChange={(event) => onSortChange(event.target.value as SearchParams["sort"])}
        className="h-9 w-full rounded-lg border border-input bg-white px-3 text-sm text-[#0f2744] outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 [color-scheme:light] sm:min-w-[160px]"
      >
        {sortOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
