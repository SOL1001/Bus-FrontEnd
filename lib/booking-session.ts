import type { PassengerDetails, PaymentMethod } from "@/lib/booking-demo"

const STORAGE_KEY = "abay-bus-booking"

export type BookingSession = {
  seat?: string
  passenger?: PassengerDetails
  payment?: PaymentMethod
  bookingRef?: string
}

export function readBookingSession(): BookingSession | null {
  if (typeof window === "undefined") return null

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as BookingSession
  } catch {
    return null
  }
}

export function writeBookingSession(data: BookingSession) {
  if (typeof window === "undefined") return

  const existing = readBookingSession() ?? {}
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...existing, ...data }))
}

export function clearBookingSession() {
  if (typeof window === "undefined") return
  sessionStorage.removeItem(STORAGE_KEY)
}
