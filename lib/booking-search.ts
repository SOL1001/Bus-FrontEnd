import { demoSearch, type SearchParams } from "@/lib/booking-demo"

export function buildSearchUrl(params: SearchParams) {
  const search = new URLSearchParams({
    from: params.from,
    to: params.to,
    date: params.date,
    passengers: String(params.passengers),
  })

  if (params.sort && params.sort !== "departure") {
    search.set("sort", params.sort)
  }

  return `/search?${search.toString()}`
}

export type BookStep = "seats" | "passenger" | "payment" | "confirm"

export type BookQuery = SearchParams & {
  trip: string
  seat?: string
  step?: BookStep
  ref?: string
}

export function buildBookUrl(params: BookQuery) {
  const search = new URLSearchParams({
    trip: params.trip,
    from: params.from,
    to: params.to,
    date: params.date,
    passengers: String(params.passengers),
  })

  if (params.sort && params.sort !== "departure") {
    search.set("sort", params.sort)
  }

  if (params.seat) {
    search.set("seat", params.seat)
  }

  if (params.step && params.step !== "seats") {
    search.set("step", params.step)
  }

  if (params.ref) {
    search.set("ref", params.ref)
  }

  return `/book?${search.toString()}`
}

export function parseBookQuery(
  searchParams: Record<string, string | string[] | undefined>
): BookQuery | null {
  const base = parseSearchParams(searchParams)
  const trip = getParam(searchParams.trip)
  const seat = getParam(searchParams.seat)
  const stepRaw = getParam(searchParams.step)
  const ref = getParam(searchParams.ref)

  if (!base || !trip) return null

  const step: BookStep | undefined =
    stepRaw === "passenger" ||
    stepRaw === "payment" ||
    stepRaw === "confirm" ||
    stepRaw === "seats"
      ? stepRaw
      : undefined

  return { ...base, trip, seat, step, ref }
}

export function parseSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): SearchParams | null {
  const from = getParam(searchParams.from)
  const to = getParam(searchParams.to)
  const date = getParam(searchParams.date)
  const passengersRaw = getParam(searchParams.passengers)
  const sort = getParam(searchParams.sort)

  if (!from || !to || !date) return null

  const passengers = passengersRaw ? Number(passengersRaw) : 1
  if (Number.isNaN(passengers) || passengers < 1) return null

  return {
    from,
    to,
    date,
    passengers,
    sort:
      sort === "price-asc" || sort === "price-desc" || sort === "departure"
        ? sort
        : "departure",
  }
}

export function getDefaultSearchParams(): SearchParams {
  return { ...demoSearch, sort: "departure" }
}

function getParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0]
  return value
}
