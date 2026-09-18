import { Suspense } from "react"
import type { Metadata } from "next"

import { BookPageContent } from "@/components/booking/book-page-content"

export const metadata: Metadata = {
  title: "Book Ticket — Abay Bus",
  description: "Select your seat and complete your Abay Bus booking.",
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
          Loading booking…
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  )
}
