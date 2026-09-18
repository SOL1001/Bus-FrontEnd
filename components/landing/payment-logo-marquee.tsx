"use client"

import * as React from "react"

type PaymentLogo = {
  name: string
  src: string
}

const paymentLogos: PaymentLogo[] = [
  { name: "Siinqee Bank", src: "https://www.google.com/s2/favicons?domain=siinqeebank.com&sz=128" },
  {
    name: "Cooperative Bank of Oromia",
    src: "https://www.google.com/s2/favicons?domain=coopbankoromia.com.et&sz=128",
  },
  {
    name: "Commercial Bank of Ethiopia",
    src: "https://www.google.com/s2/favicons?domain=combanketh.et&sz=128",
  },
  { name: "Awash Bank", src: "https://www.google.com/s2/favicons?domain=awashbank.com&sz=128" },
  { name: "Yaya Wallet", src: "https://www.google.com/s2/favicons?domain=yayawallet.et&sz=128" },
  { name: "Zemen Bank", src: "https://www.google.com/s2/favicons?domain=zemenbank.com&sz=128" },
  {
    name: "Bank of Abyssinia",
    src: "https://www.google.com/s2/favicons?domain=bankofabyssinia.com&sz=128",
  },
  { name: "Dashen Bank", src: "https://www.google.com/s2/favicons?domain=dashenbanksc.com&sz=128" },
  { name: "Nib Bank", src: "https://www.google.com/s2/favicons?domain=nibbanksc.com&sz=128" },
  { name: "Telebirr", src: "https://www.google.com/s2/favicons?domain=telebirr.et&sz=128" },
  { name: "Chapa", src: "https://www.google.com/s2/favicons?domain=chapa.co&sz=128" },
  { name: "Visa", src: "https://cdn.simpleicons.org/visa/1A1F71" },
  { name: "Mastercard", src: "https://cdn.simpleicons.org/mastercard/EB001B" },
  { name: "PayPal", src: "https://cdn.simpleicons.org/paypal/003087" },
  { name: "Google Pay", src: "https://cdn.simpleicons.org/googlepay/4285F4" },
  { name: "Apple Pay", src: "https://cdn.simpleicons.org/applepay/000000" },
  { name: "M-Pesa", src: "https://cdn.simpleicons.org/safaricom/43B02A" },
]

const loop = [...paymentLogos, ...paymentLogos]

function LogoItem({ logo }: { logo: PaymentLogo }) {
  const [failed, setFailed] = React.useState(false)

  if (failed) {
    return (
      <span className="shrink-0 px-3 text-sm font-semibold text-[#0f2744]/70">
        {logo.name}
      </span>
    )
  }

  return (
    <img
      src={logo.src}
      alt={logo.name}
      className="h-14 w-auto shrink-0 object-contain sm:h-16 md:h-[4.5rem]"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export function PaymentLogoMarquee() {
  return (
    <div className="mb-16 sm:mb-20">
      <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
        <p className="text-3xl font-bold tracking-tight text-[#0f2744] sm:text-4xl">
          Over {paymentLogos.length}+
        </p>
        <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
          <span className="text-brand">Local & International</span>{" "}
          <span className="text-[#0f2744]">Payment Integrations</span>
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-muted/30 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-muted/30 to-transparent sm:w-24" />

        <div className="flex w-max animate-marquee items-center gap-12 py-4 hover:[animation-play-state:paused] sm:gap-16 md:gap-20">
          {loop.map((logo, index) => (
            <LogoItem key={`${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  )
}
