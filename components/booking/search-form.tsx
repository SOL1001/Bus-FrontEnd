"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDataTransferHorizontalIcon,
  ArrowRight01Icon,
  Calendar03Icon,
  Location01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { cities, popularRoutes, type SearchParams } from "@/lib/booking-demo"
import { buildSearchUrl } from "@/lib/booking-search"
import { cn } from "@/lib/utils"

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-[#0f2744] outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 [color-scheme:light]"

type SearchFormProps = {
  initial: SearchParams
  className?: string
  variant?: "default" | "hero" | "compact" | "bar"
}

export function SearchForm({ initial, className, variant = "default" }: SearchFormProps) {
  const router = useRouter()
  const [from, setFrom] = React.useState(initial.from)
  const [to, setTo] = React.useState(initial.to)
  const [date, setDate] = React.useState(initial.date)
  const [passengers, setPassengers] = React.useState(initial.passengers)

  React.useEffect(() => {
    setFrom(initial.from)
    setTo(initial.to)
    setDate(initial.date)
    setPassengers(initial.passengers)
  }, [initial.from, initial.to, initial.date, initial.passengers])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (from === to) return
    router.push(buildSearchUrl({ from, to, date, passengers, sort: initial.sort }))
  }

  function swapRoute() {
    setFrom(to)
    setTo(from)
  }

  function applyPopularRoute(routeFrom: string, routeTo: string) {
    setFrom(routeFrom)
    setTo(routeTo)
  }

  const showFilters = variant === "hero" || variant === "compact"

  const compact = variant === "hero" || variant === "compact"

  return (
    <div className={cn(compact ? "space-y-3" : "space-y-4", className)}>
      <form onSubmit={handleSubmit} className={cn(compact ? "space-y-2.5" : "space-y-3")}>
        {/* Route row: from · swap · to */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-2 sm:gap-3">
          <Field label="From" htmlFor="search-from">
            <SelectWithIcon id="search-from" value={from} onChange={setFrom} />
          </Field>

          <button
            type="button"
            onClick={swapRoute}
            aria-label="Swap from and to"
            className="mb-0.5 flex size-11 shrink-0 items-center justify-center rounded-lg border border-input bg-background text-muted-foreground transition-colors hover:border-brand/40 hover:bg-brand-muted hover:text-brand"
          >
            <HugeiconsIcon icon={ArrowDataTransferHorizontalIcon} strokeWidth={2} className="size-4" />
          </button>

          <Field label="To" htmlFor="search-to">
            <SelectWithIcon id="search-to" value={to} onChange={setTo} />
          </Field>
        </div>

        {/* Date + passengers */}
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
          <Field label="Travel date" htmlFor="search-date">
            <div className="relative">
              <HugeiconsIcon
                icon={Calendar03Icon}
                strokeWidth={2}
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="search-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>

          <Field label="Passengers" htmlFor="search-passengers">
            <select
              id="search-passengers"
              value={passengers}
              onChange={(event) => setPassengers(Number(event.target.value))}
              className={inputClass}
            >
              {[1, 2, 3, 4].map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "passenger" : "passengers"}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Button
          type="submit"
          disabled={from === to}
          className="h-11 w-full bg-brand text-sm text-brand-foreground hover:bg-brand/90"
        >
          Search buses
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </Button>
      </form>

      {showFilters && (
        <div className="hero-popular-routes viewport-short:hidden space-y-1.5 border-t border-border/50 pt-3">
          <p className="text-xs font-medium text-muted-foreground">Popular routes</p>
          <div className="scrollbar-brand -mx-1 flex flex-nowrap gap-1.5 overflow-x-auto px-1 pb-0.5 sm:gap-2">
            {popularRoutes.map((route) => {
              const active = from === route.from && to === route.to
              return (
                <button
                  key={route.label}
                  type="button"
                  onClick={() => applyPopularRoute(route.from, route.to)}
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-1 text-[0.6875rem] font-semibold transition-colors sm:px-3 sm:py-1.5 sm:text-xs",
                    active
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-background text-foreground hover:border-brand/40 hover:bg-brand-muted"
                  )}
                >
                  {route.label}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  )
}

function SelectWithIcon({
  id,
  value,
  onChange,
}: {
  id: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <HugeiconsIcon
        icon={Location01Icon}
        strokeWidth={2}
        className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`${inputClass} appearance-none pl-10`}
      >
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  )
}
