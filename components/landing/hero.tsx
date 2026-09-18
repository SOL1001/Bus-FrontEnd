import { HeroBackground } from "@/components/landing/hero-background"
import { QuickBooking } from "@/components/landing/quick-booking"
import { sectionX } from "@/lib/layout"

const stats = [
  { value: "40+", label: "Daily routes" },
  { value: "12K+", label: "Passengers / month" },
  { value: "98%", label: "On-time rate" },
]

export function Hero() {
  return (
    <section className="relative min-h-svh w-full md:h-svh md:overflow-hidden">
      <HeroBackground />

      <div className={`relative z-10 flex min-h-svh flex-col md:h-full ${sectionX}`}>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 pt-[4.75rem] pb-6 sm:gap-4 sm:pt-[5.25rem] md:min-h-0 md:overflow-hidden md:pb-0 lg:gap-5 lg:pt-[5.5rem]">
          <div className="max-w-3xl shrink-0 text-center text-white drop-shadow-sm">
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl 2xl:text-7xl">
              Find & book your bus{" "}
              <span className="text-brand">in seconds</span>
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-3 sm:text-base lg:text-lg">
              Search routes, pick your seat, and pay — all from one quick booking
              form.
            </p>
          </div>

          <div className="w-full max-w-5xl shrink-0">
            <QuickBooking />
          </div>
        </div>

        <dl className="grid shrink-0 grid-cols-3 gap-3 border-t border-white/20 py-3 text-center text-white sm:gap-6 sm:py-4 md:pb-4 lg:max-w-3xl lg:self-center lg:pb-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-lg font-bold sm:text-xl lg:text-2xl">{stat.value}</dt>
              <dd className="mt-0.5 text-[0.65rem] text-white/75 sm:text-xs lg:text-sm">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
