export type City = {
  id: string
  name: string
}

export type Trip = {
  id: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  busType: "Standard" | "Deluxe" | "VIP"
  price: number
  availableSeats: number
  amenities: string[]
}

export type PassengerDetails = {
  fullName: string
  phone: string
  email: string
}

export type PaymentMethod = "telebirr" | "chapa" | "card"

export const cities: City[] = [
  { id: "addis", name: "Addis Ababa" },
  { id: "bahir-dar", name: "Bahir Dar" },
  { id: "hawassa", name: "Hawassa" },
  { id: "gondar", name: "Gondar" },
  { id: "dire-dawa", name: "Dire Dawa" },
  { id: "mekelle", name: "Mekelle" },
]

export type SearchParams = {
  from: string
  to: string
  date: string
  passengers: number
  sort?: "departure" | "price-asc" | "price-desc"
}

export const demoSearch: SearchParams = {
  from: "Addis Ababa",
  to: "Bahir Dar",
  date: "2026-09-20",
  passengers: 1,
}

export const popularRoutes = [
  { from: "Addis Ababa", to: "Bahir Dar", label: "Addis → Bahir Dar" },
  { from: "Addis Ababa", to: "Hawassa", label: "Addis → Hawassa" },
  { from: "Addis Ababa", to: "Gondar", label: "Addis → Gondar" },
  { from: "Addis Ababa", to: "Dire Dawa", label: "Addis → Dire Dawa" },
  { from: "Hawassa", to: "Addis Ababa", label: "Hawassa → Addis" },
  { from: "Bahir Dar", to: "Gondar", label: "Bahir Dar → Gondar" },
] as const

export const demoPassenger: PassengerDetails = {
  fullName: "Solomon Bekele",
  phone: "+251 911 234 567",
  email: "solomon@example.com",
}

const tripCatalog: Record<string, Trip[]> = {
  "Addis Ababa|Bahir Dar": [
    {
      id: "trip-1",
      from: "Addis Ababa",
      to: "Bahir Dar",
      departure: "06:00 AM",
      arrival: "02:30 PM",
      duration: "8h 30m",
      busType: "Standard",
      price: 450,
      availableSeats: 18,
      amenities: ["AC", "Wi‑Fi", "USB"],
    },
    {
      id: "trip-2",
      from: "Addis Ababa",
      to: "Bahir Dar",
      departure: "08:30 AM",
      arrival: "05:00 PM",
      duration: "8h 30m",
      busType: "Deluxe",
      price: 550,
      availableSeats: 12,
      amenities: ["AC", "Wi‑Fi", "Snacks", "Recliner"],
    },
    {
      id: "trip-3",
      from: "Addis Ababa",
      to: "Bahir Dar",
      departure: "02:00 PM",
      arrival: "10:30 PM",
      duration: "8h 30m",
      busType: "Standard",
      price: 450,
      availableSeats: 24,
      amenities: ["AC", "USB"],
    },
    {
      id: "trip-4",
      from: "Addis Ababa",
      to: "Bahir Dar",
      departure: "06:30 PM",
      arrival: "03:00 AM",
      duration: "8h 30m",
      busType: "VIP",
      price: 650,
      availableSeats: 8,
      amenities: ["AC", "Wi‑Fi", "Meal", "Blanket"],
    },
  ],
  "Addis Ababa|Hawassa": [
    {
      id: "trip-5",
      from: "Addis Ababa",
      to: "Hawassa",
      departure: "07:00 AM",
      arrival: "11:15 AM",
      duration: "4h 15m",
      busType: "Standard",
      price: 280,
      availableSeats: 20,
      amenities: ["AC", "USB"],
    },
    {
      id: "trip-6",
      from: "Addis Ababa",
      to: "Hawassa",
      departure: "02:30 PM",
      arrival: "06:45 PM",
      duration: "4h 15m",
      busType: "Deluxe",
      price: 350,
      availableSeats: 14,
      amenities: ["AC", "Wi‑Fi"],
    },
  ],
  "Addis Ababa|Gondar": [
    {
      id: "trip-7",
      from: "Addis Ababa",
      to: "Gondar",
      departure: "05:30 AM",
      arrival: "04:15 PM",
      duration: "10h 45m",
      busType: "Standard",
      price: 520,
      availableSeats: 16,
      amenities: ["AC", "USB"],
    },
  ],
}

export function getTrips(from: string, to: string): Trip[] {
  const key = `${from}|${to}`
  const reverseKey = `${to}|${from}`

  if (tripCatalog[key]) return tripCatalog[key]

  if (tripCatalog[reverseKey]) {
    return tripCatalog[reverseKey].map((trip) => ({
      ...trip,
      from,
      to,
      id: `${trip.id}-rev`,
    }))
  }

  return [
    {
      id: "trip-fallback",
      from,
      to,
      departure: "09:00 AM",
      arrival: "05:00 PM",
      duration: "8h 00m",
      busType: "Standard",
      price: 400,
      availableSeats: 22,
      amenities: ["AC", "USB"],
    },
  ]
}

export function getTripById(from: string, to: string, tripId: string): Trip | undefined {
  return getTrips(from, to).find((trip) => trip.id === tripId)
}

function parseTime(time: string) {
  const [clock, period] = time.split(" ")
  const [hoursRaw, minutesRaw] = clock.split(":")
  let hours = Number(hoursRaw)
  const minutes = Number(minutesRaw)
  if (period === "PM" && hours !== 12) hours += 12
  if (period === "AM" && hours === 12) hours = 0
  return hours * 60 + minutes
}

export function filterAndSortTrips(trips: Trip[], search: SearchParams) {
  let result = [...trips]

  switch (search.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price)
      break
    case "price-desc":
      result.sort((a, b) => b.price - a.price)
      break
    default:
      result.sort((a, b) => parseTime(a.departure) - parseTime(b.departure))
  }

  return result
}

export const occupiedSeats = new Set([
  "1A",
  "1B",
  "2C",
  "2D",
  "3A",
  "4B",
  "5C",
  "6A",
  "7D",
  "8B",
  "9C",
  "10A",
  "11B",
  "12D",
])

export const seatRows = ["A", "B", "C", "D"] as const
export const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export function formatSeat(row: number, col: (typeof seatRows)[number]) {
  return `${row}${col}`
}

export function formatPrice(amount: number) {
  return `${amount.toLocaleString()} ETB`
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-ET", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function generateBookingRef() {
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `AB-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${suffix}`
}

export type TicketQrData = {
  ref: string
  passenger: string
  from: string
  to: string
  date: string
  departure: string
  seat: string
  busType: string
  total: number
  payment: string
}

export function buildTicketQrPayload(ticket: TicketQrData) {
  return JSON.stringify({
    ref: ticket.ref,
    passenger: ticket.passenger,
    route: `${ticket.from} → ${ticket.to}`,
    date: ticket.date,
    departure: ticket.departure,
    seat: ticket.seat,
    bus: ticket.busType,
    total: ticket.total,
    payment: ticket.payment,
    issuer: "Abay Bus",
  })
}

export const paymentMethods: { id: PaymentMethod; label: string; hint: string }[] = [
  { id: "telebirr", label: "Telebirr", hint: "Pay from your mobile wallet" },
  { id: "chapa", label: "Chapa", hint: "Card or mobile checkout" },
  { id: "card", label: "Bank card", hint: "Visa · Mastercard · CBE" },
]
