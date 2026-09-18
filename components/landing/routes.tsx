import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon, Clock01Icon } from "@hugeicons/core-free-icons"

import { CompanyLogoMark } from "@/components/brand/company-logo"
import { Button } from "@/components/ui/button"
import { sectionWrap } from "@/lib/layout"

const routes = [
  {
    from: "Addis Ababa",
    to: "Bahir Dar",
    duration: "8h 30m",
    price: "450 ETB",
    departures: "6 daily",
    popular: true,
  },
  {
    from: "Addis Ababa",
    to: "Hawassa",
    duration: "4h 15m",
    price: "280 ETB",
    departures: "8 daily",
    popular: true,
  },
  {
    from: "Addis Ababa",
    to: "Gondar",
    duration: "10h 45m",
    price: "520 ETB",
    departures: "4 daily",
    popular: false,
  },
  {
    from: "Addis Ababa",
    to: "Dire Dawa",
    duration: "9h 20m",
    price: "480 ETB",
    departures: "3 daily",
    popular: false,
  },
  {
    from: "Bahir Dar",
    to: "Gondar",
    duration: "3h 10m",
    price: "180 ETB",
    departures: "5 daily",
    popular: false,
  },
  {
    from: "Hawassa",
    to: "Addis Ababa",
    duration: "4h 15m",
    price: "280 ETB",
    departures: "8 daily",
    popular: false,
  },
]

export function Routes() {
  return (
    <section id="routes" className="py-16 sm:py-20 md:py-24">
      <div className={sectionWrap}>
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-medium text-brand">Popular routes</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Where are you headed?
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Explore our most traveled routes across Ethiopia. More destinations
              added every month.
            </p>
          </div>
          <Button variant="outline" className="w-fit shrink-0">
            See all routes
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <article
              key={`${route.from}-${route.to}`}
              className="group relative flex flex-col rounded-xl border border-border/60 bg-card p-5 transition-all hover:border-brand/30 hover:shadow-md hover:shadow-brand/5"
            >
              {route.popular && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-brand px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brand-foreground">
                  Popular
                </span>
              )}

              <div className="flex items-start gap-3">
                <CompanyLogoMark className="size-12 sm:size-14" />
                <div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-semibold">{route.from}</span>
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="size-4 shrink-0 text-brand"
                    />
                    <span className="font-semibold">{route.to}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <HugeiconsIcon icon={Clock01Icon} strokeWidth={2} className="size-3.5" />
                  {route.duration}
                </span>
                <span>{route.departures}</span>
              </div>

              <div className="mt-auto flex items-end justify-between pt-5">
                <div>
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="text-xl font-bold text-brand">{route.price}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground"
                >
                  Book
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
