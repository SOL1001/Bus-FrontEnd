"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Clock01Icon,
  SeatSelectorIcon,
} from "@hugeicons/core-free-icons"

import { CompanyLogoMark } from "@/components/brand/company-logo"
import { formatPrice, type SearchParams, type Trip } from "@/lib/booking-demo"
import { buildBookUrl } from "@/lib/booking-search"
import { cn } from "@/lib/utils"

type TripResultsProps = {
  search: SearchParams
  trips: Trip[]
  sort: SearchParams["sort"]
}

export function TripResults({ search, trips, sort }: TripResultsProps) {
  if (trips.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-4 py-12 text-center sm:px-6 sm:py-16">
        <p className="text-lg font-semibold">No buses match your filters</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Try a different sort option for {search.from} → {search.to}.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="hidden grid-cols-[88px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.2fr)_140px_160px] gap-x-6 px-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground xl:grid">
        <span />
        <span>Schedule</span>
        <span>Trip info</span>
        <span>Amenities</span>
        <span className="text-right">Price</span>
        <span />
      </div>

      {trips.map((trip, index) => {
        const bookUrl = buildBookUrl({ ...search, trip: trip.id })

        return (
          <Link
            key={trip.id}
            href={bookUrl}
            className={cn(
              "group block rounded-2xl border border-border/60 bg-white p-4 transition-all",
              "hover:border-brand/30 hover:shadow-md active:scale-[0.995] active:border-brand/40",
              "sm:p-5"
            )}
          >
            <div className="flex gap-3 sm:gap-4 xl:grid xl:grid-cols-[88px_minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.2fr)_140px_160px] xl:items-center xl:gap-x-6">
              <CompanyLogoMark className="size-14 shrink-0 sm:size-16 xl:size-16 xl:h-[4.5rem] xl:w-[5.5rem]" />

              <div className="min-w-0 flex-1 xl:col-start-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-[#0f2744] sm:text-lg xl:text-lg">{trip.departure}</h3>
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4 shrink-0 text-brand" />
                  <h3 className="text-base font-bold text-[#0f2744] sm:text-lg xl:text-lg">{trip.arrival}</h3>
                  {index === 0 && sort === "departure" && (
                    <span className="rounded-full bg-brand px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-foreground">
                      Earliest
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[#0f2744]/60">
                  {search.from} → {search.to}
                </p>
              </div>

              <div className="hidden flex-col items-start gap-1.5 text-sm text-muted-foreground xl:flex">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-4 shrink-0" />
                  {trip.duration}
                </span>
                <span className="font-medium text-[#0f2744]">{trip.busType}</span>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={SeatSelectorIcon} strokeWidth={2} className="size-4 shrink-0" />
                  {trip.availableSeats} seats left
                </span>
              </div>

              <div className="hidden flex-wrap content-start gap-1.5 xl:flex">
                {trip.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="hidden text-right xl:block">
                <p className="text-xs text-muted-foreground">From</p>
                <p className="text-2xl font-bold text-brand">{formatPrice(trip.price)}</p>
                <p className="text-xs text-muted-foreground">per seat</p>
              </div>

              <span
                className={cn(
                  "hidden h-11 items-center justify-center gap-1 rounded-full bg-brand text-sm font-semibold text-brand-foreground xl:inline-flex",
                  "group-hover:bg-brand/90"
                )}
              >
                Select bus
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
              </span>
            </div>

            {/* Mobile & tablet details */}
            <div className="mt-3 space-y-3 xl:hidden">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#0f2744]/60">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-4 shrink-0" />
                  {trip.duration}
                </span>
                <span className="font-medium text-[#0f2744]">{trip.busType}</span>
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={SeatSelectorIcon} strokeWidth={2} className="size-4 shrink-0" />
                  {trip.availableSeats} seats left
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {trip.amenities.map((amenity) => (
                  <span
                    key={amenity}
                    className="rounded-full bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
                <div>
                  <p className="text-xs text-[#0f2744]/55">From</p>
                  <p className="text-xl font-bold text-brand">{formatPrice(trip.price)}</p>
                  <p className="text-xs text-[#0f2744]/55">per seat · tap to select</p>
                </div>
                <span className="inline-flex h-11 shrink-0 items-center justify-center gap-1 rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground group-active:bg-brand/90">
                  Select
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
