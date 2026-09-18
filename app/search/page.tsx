import { Suspense } from "react"
import type { Metadata } from "next"

import { SearchPageContent } from "@/components/booking/search-page-content"

export const metadata: Metadata = {
  title: "Search Buses — Abay Bus",
  description: "Find available buses and book your intercity trip with Abay Bus.",
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
          Loading buses…
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  )
}
