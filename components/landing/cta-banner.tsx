import Link from "next/link"

import { sectionWrap } from "@/lib/layout"

export function CtaBanner() {
  return (
    <section className="pb-4 pt-16 sm:pb-6 sm:pt-20">
      <div className={sectionWrap}>
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0f2744] sm:text-3xl">
              Download Abay Bus and{" "}
              <span className="text-brand">book your next trip</span>
            </h2>
            <p className="mt-2 max-w-md text-muted-foreground">
              Get live tracking, mobile tickets, and instant booking from your
              phone.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <Link
              href="#"
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#0f2744] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Download on the App Store
            </Link>
            <Link
              href="#"
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#0f2744] px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                <path d="M3.609 1.814 13.792 12 3.61 22.186a1.003 1.003 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198 2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658 16.802 8.99l-2.303 2.303-8.635-8.635z" />
              </svg>
              Get it on Google Play
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
