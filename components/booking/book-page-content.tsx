"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { Button } from "@/components/ui/button"
import {
  formatDate,
  formatPrice,
  formatSeat,
  getTripById,
  occupiedSeats,
  seatNumbers,
  seatRows,
} from "@/lib/booking-demo"
import { buildSearchUrl, getDefaultSearchParams, parseSearchParams } from "@/lib/booking-search"
import { pageWrap } from "@/lib/layout"
import { cn } from "@/lib/utils"

export function BookPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = Object.fromEntries(searchParams.entries())
  const search = parseSearchParams(params)
  const tripId = params.trip
  const trip =
    search && tripId ? getTripById(search.from, search.to, tripId) : undefined

  if (!search || !tripId || !trip) {
    const fallback = search ?? getDefaultSearchParams()

    return (
      <div className="flex min-h-svh flex-col bg-white text-[#0f2744] [color-scheme:light]">
        <Header />
        <main className="flex flex-1 items-center justify-center px-4 pt-[5.25rem] sm:pt-28">
          <div className="max-w-md rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <p className="text-lg font-semibold">Trip not found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              This booking link is invalid or expired. Search again to pick a bus.
            </p>
            <Link
              href={buildSearchUrl(fallback)}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-brand px-6 text-sm font-medium text-brand-foreground hover:bg-brand/90"
            >
              Back to search
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  function selectSeat(seat: string) {
    if (occupiedSeats.has(seat)) return
    router.push(
      `/book?${new URLSearchParams({ ...params, seat }).toString()}`
    )
  }

  const selectedSeat = params.seat

  return (
    <div className="flex min-h-svh flex-col bg-white text-[#0f2744] [color-scheme:light]">
      <Header />

      <main className="flex-1 pt-[5.25rem] sm:pt-28">
        <div className={`${pageWrap} space-y-6 pb-12 sm:pb-16`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <Link
                href={buildSearchUrl(search)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back to results
              </Link>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Select your seat</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {search.from} → {search.to} · {formatDate(search.date)} · {trip.departure}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 px-4 py-3 text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {trip.busType}
              </p>
              <p className="text-lg font-bold">{formatPrice(trip.price)}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
            <div className="mx-auto mb-6 max-w-xs rounded-t-3xl border border-border bg-muted/40 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Front of bus
            </div>

            <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3">
              {seatNumbers.map((row) =>
                seatRows.map((col) => {
                  const seat = formatSeat(row, col)
                  const taken = occupiedSeats.has(seat)
                  const selected = selectedSeat === seat

                  return (
                    <button
                      key={seat}
                      type="button"
                      disabled={taken}
                      onClick={() => selectSeat(seat)}
                      className={cn(
                        "flex h-10 items-center justify-center rounded-lg border text-xs font-semibold transition-colors sm:h-11 sm:text-sm",
                        taken && "cursor-not-allowed border-border/50 bg-muted/50 text-muted-foreground/50",
                        !taken &&
                          !selected &&
                          "border-border bg-background hover:border-brand/40 hover:bg-brand-muted",
                        selected && "border-brand bg-brand text-brand-foreground"
                      )}
                    >
                      {seat}
                    </button>
                  )
                })
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-4 rounded border border-border bg-background" />
                Available
              </span>
              <span className="flex items-center gap-2">
                <span className="size-4 rounded border border-brand bg-brand" />
                Selected
              </span>
              <span className="flex items-center gap-2">
                <span className="size-4 rounded border border-border/50 bg-muted/50" />
                Taken
              </span>
            </div>
          </div>

          {selectedSeat && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand/20 bg-brand-muted/40 px-4 py-4 sm:px-6">
              <p className="text-sm">
                Seat <span className="font-bold text-brand">{selectedSeat}</span> selected
              </p>
              <Button className="bg-brand text-brand-foreground hover:bg-brand/90">
                Continue to passenger details
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
