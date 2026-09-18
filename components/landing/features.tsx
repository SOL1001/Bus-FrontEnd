import { HugeiconsIcon } from "@hugeicons/react"

import { PaymentLogoMarquee } from "@/components/landing/payment-logo-marquee"
import { sectionWrap } from "@/lib/layout"
import {
  Bus01Icon,
  Clock01Icon,
  Location01Icon,
  Shield01Icon,
  Ticket03Icon,
} from "@hugeicons/core-free-icons"

const features = [
  {
    icon: Ticket03Icon,
    title: "Easy online booking",
    description:
      "Reserve your seat from anywhere. No queues, no hassle — just pick a route, date, and go.",
  },
  {
    icon: Location01Icon,
    title: "Live bus tracking",
    description:
      "See exactly where your bus is on the map and get accurate arrival estimates in real time.",
  },
  {
    icon: Clock01Icon,
    title: "Reliable schedules",
    description:
      "We run on time, every time. Get SMS alerts for delays, gate changes, and boarding reminders.",
  },
  {
    icon: Shield01Icon,
    title: "Safe & comfortable",
    description:
      "Modern fleets with trained drivers, seat belts, and air conditioning for a smooth ride.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-y border-border/60 bg-white py-16 sm:py-20 md:py-24">
      <div className={sectionWrap}>
        <PaymentLogoMarquee />

        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-medium text-brand">Why Abay Bus</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Built for modern travel
          </h2>
          <p className="mt-3 text-muted-foreground">
            Everything you need for a stress-free journey, from booking to arrival.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="group rounded-xl border border-border/60 bg-card p-6 transition-shadow hover:shadow-md hover:shadow-brand/5"
            >
              <span className="flex size-11 items-center justify-center rounded-lg bg-brand-muted text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                <HugeiconsIcon icon={feature.icon} strokeWidth={2} className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-dashed border-brand/30 bg-brand-muted/50 px-4 py-4 text-sm text-muted-foreground sm:mt-12 sm:flex-row sm:items-center sm:px-6">
          <HugeiconsIcon icon={Bus01Icon} strokeWidth={2} className="size-5 shrink-0 text-brand" />
          <span>
            Fleet of <strong className="text-foreground">60+ modern coaches</strong> serving
            passengers across the country
          </span>
        </div>
      </div>
    </section>
  )
}
