"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Edit02Icon } from "@hugeicons/core-free-icons"

import { SearchForm } from "@/components/booking/search-form"
import { TripFilters } from "@/components/booking/trip-filters"
import { TripResults } from "@/components/booking/trip-results"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { filterAndSortTrips, formatDate, getTrips, type SearchParams } from "@/lib/booking-demo"
import { buildSearchUrl, getDefaultSearchParams, parseSearchParams } from "@/lib/booking-search"
import { pageWrap } from "@/lib/layout"

export function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const parsed = parseSearchParams(Object.fromEntries(searchParams.entries()))
  const search = parsed ?? getDefaultSearchParams()
  const trips = getTrips(search.from, search.to)
  const searchWithDefaults: SearchParams = {
    ...search,
    sort: search.sort ?? "departure",
  }

  const filteredTrips = filterAndSortTrips(trips, searchWithDefaults)
  const [mobileSearchOpen, setMobileSearchOpen] = React.useState(false)

  React.useEffect(() => {
    setMobileSearchOpen(false)
  }, [search.from, search.to, search.date, search.passengers])

  function updateFilters(next: Partial<SearchParams>) {
    router.push(buildSearchUrl({ ...searchWithDefaults, ...next }))
  }

  return (
    <div className="flex min-h-svh flex-col bg-white text-[#0f2744] [color-scheme:light]">
      <Header />

      <main className="flex-1 pt-[5.25rem] sm:pt-28">
        <div className={`${pageWrap} space-y-4 pb-8 sm:space-y-6 sm:pb-16`}>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to home
            </Link>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#0f2744] sm:text-3xl">
              Available buses
            </h1>
            <p className="mt-1 flex flex-wrap items-center gap-2 text-muted-foreground">
              <span>{search.from}</span>
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-4 text-brand" />
              <span>{search.to}</span>
            </p>
          </div>

          {/* Mobile: collapsed search summary so results stay visible */}
          <div className="lg:hidden">
            {mobileSearchOpen ? (
              <div className="rounded-2xl border border-border/60 bg-white p-3 shadow-sm">
                <SearchForm initial={searchWithDefaults} variant="bar" />
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(false)}
                  className="mt-3 w-full rounded-lg border border-border/60 py-2.5 text-sm font-semibold text-[#0f2744] transition-colors hover:bg-muted/50"
                >
                  Done
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setMobileSearchOpen(true)}
                className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border/60 bg-white p-4 text-left shadow-sm transition-colors hover:border-brand/30 active:bg-muted/30"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#0f2744]">
                    {search.from} → {search.to}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {formatDate(search.date)} · {search.passengers}{" "}
                    {search.passengers === 1 ? "passenger" : "passengers"}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-brand">
                  <HugeiconsIcon icon={Edit02Icon} strokeWidth={2} className="size-4" />
                  Edit
                </span>
              </button>
            )}
          </div>

          {/* Desktop: sticky full search form */}
          <div className="hidden rounded-2xl border border-border/60 bg-white/95 p-5 shadow-sm backdrop-blur-md lg:block lg:sticky lg:top-[5.25rem] lg:z-30">
            <SearchForm initial={searchWithDefaults} variant="bar" />
          </div>

          <TripFilters
            search={searchWithDefaults}
            totalCount={trips.length}
            filteredCount={filteredTrips.length}
            sort={searchWithDefaults.sort ?? "departure"}
            onSortChange={(sort) => updateFilters({ sort })}
            layout="bar"
          />

          <TripResults
            search={searchWithDefaults}
            trips={filteredTrips}
            sort={searchWithDefaults.sort ?? "departure"}
          />
        </div>
      </main>

      <Footer variant="compact" />
    </div>
  )
}
