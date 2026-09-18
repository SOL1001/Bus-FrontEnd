"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Ticket03Icon } from "@hugeicons/core-free-icons"

import { TicketQr } from "@/components/booking/ticket-qr"
import {
  buildTicketQrPayload,
  formatDate,
  formatPrice,
  type SearchParams,
  type Trip,
} from "@/lib/booking-demo"

type PrintableTicketProps = {
  bookingRef: string
  passenger: string
  search: SearchParams
  trip: Trip
  seat: string
  total: number
  paymentLabel: string
}

export function PrintableTicket({
  bookingRef,
  passenger,
  search,
  trip,
  seat,
  total,
  paymentLabel,
}: PrintableTicketProps) {
  const qrPayload = buildTicketQrPayload({
    ref: bookingRef,
    passenger,
    from: search.from,
    to: search.to,
    date: search.date,
    departure: trip.departure,
    seat,
    busType: trip.busType,
    total,
    payment: paymentLabel,
  })

  return (
    <div
      id="printable-ticket"
      className="print-ticket rounded-xl border-2 border-dashed border-brand/40 bg-brand-muted/30 p-5 text-left print:rounded-none print:border print:border-[#0f2744]/20 print:bg-white print:p-8 print:shadow-none"
    >
      <div className="hidden print:block print:mb-6 print:border-b print:border-[#0f2744]/15 print:pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#08a36e]">
          Abay Bus
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#0f2744]">Boarding Pass</h1>
        <p className="mt-1 text-sm text-[#0f2744]/70">
          Present this ticket when boarding · Valid for one passenger
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between print:flex-row print:items-start print:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-brand print:text-[#08a36e]">
            <HugeiconsIcon icon={Ticket03Icon} strokeWidth={2} className="size-5" />
            <span className="text-sm font-semibold">Abay Bus E-Ticket</span>
          </div>
          <p className="mt-3 font-mono text-lg font-bold tracking-wide text-[#0f2744] print:text-xl">
            {bookingRef}
          </p>
          <div className="mt-4 space-y-2 text-sm print:space-y-2.5 print:text-base">
            <p>
              <span className="text-muted-foreground print:text-[#0f2744]/65">Passenger:</span>{" "}
              <strong className="text-[#0f2744]">{passenger}</strong>
            </p>
            <p>
              <span className="text-muted-foreground print:text-[#0f2744]/65">Route:</span>{" "}
              <strong className="text-[#0f2744]">
                {search.from} → {search.to}
              </strong>
            </p>
            <p>
              <span className="text-muted-foreground print:text-[#0f2744]/65">Date & time:</span>{" "}
              <strong className="text-[#0f2744]">
                {formatDate(search.date)} · {trip.departure}
              </strong>
            </p>
            <p>
              <span className="text-muted-foreground print:text-[#0f2744]/65">Arrival:</span>{" "}
              <strong className="text-[#0f2744]">{trip.arrival}</strong>
            </p>
            <p>
              <span className="text-muted-foreground print:text-[#0f2744]/65">Seat:</span>{" "}
              <strong className="text-[#0f2744]">{seat}</strong> · {trip.busType}
            </p>
            <p>
              <span className="text-muted-foreground print:text-[#0f2744]/65">Paid:</span>{" "}
              <strong className="text-brand print:text-[#08a36e]">{formatPrice(total)}</strong> via{" "}
              {paymentLabel}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end print:items-center">
          <TicketQr value={qrPayload} size={140} className="print:border-[#0f2744]/15 print:p-4" />
          <p className="text-center text-xs text-muted-foreground print:text-sm print:text-[#0f2744]/70">
            Scan at boarding
          </p>
        </div>
      </div>

      <div className="mt-5 hidden border-t border-[#0f2744]/10 pt-4 print:mt-8 print:block print:pt-5">
        <div className="flex items-end justify-between gap-4 text-xs text-[#0f2744]/60">
          <p>
            Issued by Abay Bus Transport · Addis Ababa, Ethiopia
            <br />
            Support: +251 911 234 567 · www.abaybus.et
          </p>
          <p className="text-right font-mono">{bookingRef}</p>
        </div>
      </div>
    </div>
  )
}
