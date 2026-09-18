"use client"

import { SearchForm } from "@/components/booking/search-form"
import { demoSearch } from "@/lib/booking-demo"

export function QuickBooking() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl shadow-black/10">
      <div className="border-b border-border/50 bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <h2 className="text-base font-bold text-[#0f2744] sm:text-lg lg:text-xl">
          Quick booking
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
          Search by route, date, and passengers — then book instantly
        </p>
      </div>

      <div className="bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-5">
        <SearchForm initial={demoSearch} variant="hero" />
      </div>
    </div>
  )
}
