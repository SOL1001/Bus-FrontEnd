"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { PrintableTicket } from "@/components/booking/printable-ticket"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { Button } from "@/components/ui/button"
import {
  demoPassenger,
  formatDate,
  formatPrice,
  formatSeat,
  generateBookingRef,
  getTripById,
  occupiedSeats,
  paymentMethods,
  seatNumbers,
  seatRows,
  type PassengerDetails,
  type PaymentMethod,
  type Trip,
} from "@/lib/booking-demo"
import {
  buildBookUrl,
  buildSearchUrl,
  getDefaultSearchParams,
  parseBookQuery,
  type BookQuery,
  type BookStep,
} from "@/lib/booking-search"
import {
  readBookingSession,
  writeBookingSession,
  type BookingSession,
} from "@/lib/booking-session"
import { pageWrap } from "@/lib/layout"
import { cn } from "@/lib/utils"

const inputClass =
  "h-11 w-full rounded-lg border border-input bg-white px-3 text-sm text-[#0f2744] outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 [color-scheme:light]"

const steps: { id: BookStep; label: string }[] = [
  { id: "seats", label: "Seat" },
  { id: "passenger", label: "Passenger" },
  { id: "payment", label: "Payment" },
  { id: "confirm", label: "Confirm" },
]

export function BookPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryKey = searchParams.toString()

  const query = React.useMemo(() => {
    const params = Object.fromEntries(searchParams.entries())
    return parseBookQuery(params)
  }, [queryKey, searchParams])

  const trip = query ? getTripById(query.from, query.to, query.trip) : undefined
  const step = query?.step ?? "seats"

  const [session, setSession] = React.useState<BookingSession | null>(null)
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setSession(readBookingSession())
    setReady(true)
  }, [queryKey])

  const seat = query?.seat ?? session?.seat

  React.useEffect(() => {
    if (!ready || !query) return

    if (step !== "seats" && !seat) {
      router.replace(buildBookUrl({ ...query, step: "seats" }))
      return
    }

    if (step === "payment" && !session?.passenger) {
      router.replace(buildBookUrl({ ...query, seat, step: "passenger" }))
      return
    }

    if (step === "confirm" && (!session?.bookingRef || session.bookingRef !== query.ref)) {
      router.replace(buildBookUrl({ ...query, seat, step: "seats" }))
    }
  }, [ready, step, seat, session, query, router])

  if (!ready) return null

  if (!query) {
    const fallback = getDefaultSearchParams()

    return (
      <BookShell>
        <div className="flex flex-1 items-center justify-center px-4">
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
        </div>
      </BookShell>
    )
  }

  if (!trip) {
    return (
      <BookShell>
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="max-w-md rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <p className="text-lg font-semibold">Trip not found</p>
            <Link
              href={buildSearchUrl(query)}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-brand px-6 text-sm font-medium text-brand-foreground hover:bg-brand/90"
            >
              Back to search
            </Link>
          </div>
        </div>
      </BookShell>
    )
  }

  if (step === "passenger" && seat) {
    return (
      <BookShell query={query} trip={trip} step={step} seat={seat}>
        <PassengerStep
          seat={seat}
          initial={session?.passenger ?? demoPassenger}
          onBack={() => router.push(buildBookUrl({ ...query, seat, step: "seats" }))}
          onSubmit={(passenger) => {
            writeBookingSession({ seat, passenger })
            setSession(readBookingSession())
            router.push(buildBookUrl({ ...query, seat, step: "payment" }))
          }}
        />
      </BookShell>
    )
  }

  if (step === "payment" && seat && session?.passenger) {
    return (
      <BookShell query={query} trip={trip} step={step} seat={seat}>
        <PaymentStep
          trip={trip}
          seat={seat}
          passenger={session.passenger}
          onBack={() => router.push(buildBookUrl({ ...query, seat, step: "passenger" }))}
          onSubmit={(payment) => {
            const bookingRef = generateBookingRef()
            writeBookingSession({ seat, passenger: session.passenger, payment, bookingRef })
            setSession(readBookingSession())
            router.push(
              buildBookUrl({ ...query, seat, step: "confirm", ref: bookingRef })
            )
          }}
        />
      </BookShell>
    )
  }

  if (
    step === "confirm" &&
    seat &&
    session?.passenger &&
    session.payment &&
    session.bookingRef
  ) {
    const paymentLabel =
      paymentMethods.find((method) => method.id === session.payment)?.label ?? session.payment

    return (
      <BookShell query={query} trip={trip} step={step} seat={seat} hideProgress>
        <ConfirmStep
          query={query}
          trip={trip}
          seat={seat}
          passenger={session.passenger}
          bookingRef={session.bookingRef}
          paymentLabel={paymentLabel}
        />
      </BookShell>
    )
  }

  return (
    <BookShell query={query} trip={trip} step="seats" seat={seat}>
      <SeatStep
        trip={trip}
        selectedSeat={seat}
        onSelectSeat={(nextSeat) => {
          writeBookingSession({ seat: nextSeat })
          setSession(readBookingSession())
          router.push(buildBookUrl({ ...query, seat: nextSeat, step: "seats" }))
        }}
        onContinue={() => {
          if (!seat) return
          router.push(buildBookUrl({ ...query, seat, step: "passenger" }))
        }}
      />
    </BookShell>
  )
}

function BookShell({
  children,
  query,
  trip,
  step,
  seat,
  hideProgress,
}: {
  children: React.ReactNode
  query?: BookQuery
  trip?: Trip
  step?: BookStep
  seat?: string
  hideProgress?: boolean
}) {
  const currentIndex = step ? steps.findIndex((item) => item.id === step) : -1

  return (
    <div className="flex min-h-svh flex-col bg-white text-[#0f2744] [color-scheme:light]">
      <Header />
      <main className="flex-1 pt-[5.25rem] sm:pt-28">
        <div className={`${pageWrap} space-y-6 pb-12 sm:pb-16`}>
          {query && trip && (
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Link
                  href={buildSearchUrl(query)}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  ← Back to results
                </Link>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Complete your booking</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {query.from} → {query.to} · {formatDate(query.date)} · {trip.departure}
                  {seat ? ` · Seat ${seat}` : ""}
                </p>
              </div>
            </div>
          )}

          {!hideProgress && step && (
            <ol className="flex gap-2">
              {steps.map((item, index) => (
                <li
                  key={item.id}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    index <= currentIndex ? "bg-brand" : "bg-muted"
                  )}
                  aria-hidden
                />
              ))}
            </ol>
          )}

          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function SeatStep({
  trip,
  selectedSeat,
  onSelectSeat,
  onContinue,
}: {
  trip: Trip
  selectedSeat?: string
  onSelectSeat: (seat: string) => void
  onContinue: () => void
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Select your seat</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {trip.busType} · {formatPrice(trip.price)}
          </p>
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
                  onClick={() => onSelectSeat(seat)}
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
      </div>

      {selectedSeat && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brand/20 bg-brand-muted/40 px-4 py-4 sm:px-6">
          <p className="text-sm">
            Seat <span className="font-bold text-brand">{selectedSeat}</span> selected
          </p>
          <Button
            type="button"
            onClick={onContinue}
            className="h-11 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
          >
            Continue to passenger details
          </Button>
        </div>
      )}
    </div>
  )
}

function PassengerStep({
  seat,
  initial,
  onBack,
  onSubmit,
}: {
  seat: string
  initial: PassengerDetails
  onBack: () => void
  onSubmit: (passenger: PassengerDetails) => void
}) {
  const [passenger, setPassenger] = React.useState(initial)

  return (
    <form
      className="mx-auto w-full max-w-2xl space-y-6 rounded-2xl border border-border bg-white p-4 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(passenger)
      }}
    >
      <div>
        <h2 className="text-xl font-bold">Passenger details</h2>
        <p className="mt-1 text-sm text-muted-foreground">Seat {seat}</p>
      </div>

      <div className="space-y-4">
        <Field label="Full name" htmlFor="fullName" required>
          <input
            id="fullName"
            required
            value={passenger.fullName}
            onChange={(event) => setPassenger({ ...passenger, fullName: event.target.value })}
            className={inputClass}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone number" htmlFor="phone" required>
            <input
              id="phone"
              type="tel"
              required
              value={passenger.phone}
              onChange={(event) => setPassenger({ ...passenger, phone: event.target.value })}
              className={inputClass}
            />
          </Field>

          <Field label="Email" htmlFor="email" required>
            <input
              id="email"
              type="email"
              required
              value={passenger.email}
              onChange={(event) => setPassenger({ ...passenger, email: event.target.value })}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={onBack} className="h-11">
          Back
        </Button>
        <Button
          type="submit"
          className="h-11 flex-1 bg-brand text-brand-foreground hover:bg-brand/90 sm:flex-none sm:px-8"
        >
          Continue to payment
        </Button>
      </div>
    </form>
  )
}

function PaymentStep({
  trip,
  seat,
  passenger,
  onBack,
  onSubmit,
}: {
  trip: Trip
  seat: string
  passenger: PassengerDetails
  onBack: () => void
  onSubmit: (payment: PaymentMethod) => void
}) {
  const [payment, setPayment] = React.useState<PaymentMethod>("telebirr")

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-muted/20 p-4 sm:p-6">
        <h2 className="text-lg font-bold">Order summary</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Passenger</dt>
            <dd className="font-medium">{passenger.fullName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Seat</dt>
            <dd className="font-medium">{seat}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Bus type</dt>
            <dd className="font-medium">{trip.busType}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-border pt-3 text-base">
            <dt className="font-semibold">Total</dt>
            <dd className="font-bold text-brand">{formatPrice(trip.price)}</dd>
          </div>
        </dl>
      </div>

      <form
        className="space-y-4 rounded-2xl border border-border bg-white p-4 sm:p-6"
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit(payment)
        }}
      >
        <h2 className="text-lg font-bold">Payment method</h2>

        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                payment === method.id
                  ? "border-brand bg-brand-muted/40"
                  : "border-border hover:border-brand/30"
              )}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                checked={payment === method.id}
                onChange={() => setPayment(method.id)}
                className="mt-1 accent-brand"
              />
              <span>
                <span className="block font-semibold">{method.label}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{method.hint}</span>
              </span>
            </label>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="h-11">
            Back
          </Button>
          <Button
            type="submit"
            className="h-11 flex-1 bg-brand text-brand-foreground hover:bg-brand/90 sm:flex-none sm:px-8"
          >
            Pay & confirm booking
          </Button>
        </div>
      </form>
    </div>
  )
}

function ConfirmStep({
  query,
  trip,
  seat,
  passenger,
  bookingRef,
  paymentLabel,
}: {
  query: BookQuery
  trip: Trip
  seat: string
  passenger: PassengerDetails
  bookingRef: string
  paymentLabel: string
}) {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-14 text-brand" />
        <h2 className="text-2xl font-bold">Booking confirmed!</h2>
        <p className="text-sm text-muted-foreground">
          Your ticket is ready. Save or print it before you travel.
        </p>
      </div>

      <PrintableTicket
        bookingRef={bookingRef}
        passenger={passenger.fullName}
        search={query}
        trip={trip}
        seat={seat}
        total={trip.price}
        paymentLabel={paymentLabel}
      />

      <div className="flex flex-wrap justify-center gap-3">
        <Button
          type="button"
          onClick={() => window.print()}
          className="h-11 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
        >
          Print ticket
        </Button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-medium hover:bg-muted/50"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs font-medium text-muted-foreground">
        {label}
        {required ? " *" : ""}
      </label>
      {children}
    </div>
  )
}
