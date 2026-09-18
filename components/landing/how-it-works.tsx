import { sectionWrap } from "@/lib/layout"

const steps = [
  {
    step: "01",
    title: "Search your route",
    description:
      "Enter your departure city, destination, and travel date to see available buses and times.",
  },
  {
    step: "02",
    title: "Choose your seat",
    description:
      "Pick from our interactive seat map, select your preferred spot, and review your trip details.",
  },
  {
    step: "03",
    title: "Pay & board",
    description:
      "Pay securely online or at a station. Show your digital ticket and enjoy the ride.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y border-border/60 bg-white py-20 sm:py-24">
      <div className={sectionWrap}>
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-medium text-brand">How it works</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Three steps to your seat
          </h2>
          <p className="mt-3 text-muted-foreground">
            Booking with Abay Bus takes less than two minutes.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative flex flex-col items-center text-center">
              {index < steps.length - 1 && (
                <div
                  className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] bg-border md:block"
                  aria-hidden
                />
              )}
              <span className="flex size-16 items-center justify-center rounded-2xl bg-brand text-xl font-bold text-brand-foreground">
                {item.step}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
