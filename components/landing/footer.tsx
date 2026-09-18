"use client"

import * as React from "react"
import Link from "next/link"

import { CompanyLogo } from "@/components/brand/company-logo"
import { sectionWrap } from "@/lib/layout"
import { cn } from "@/lib/utils"

const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About us", href: "#" },
  { label: "Routes", href: "#routes" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#" },
  { label: "News", href: "#" },
  { label: "Contact us", href: "#" },
  { label: "Careers", href: "#" },
]

const products = [
  { label: "Passenger app", href: "#" },
  { label: "Online booking", href: "#" },
  { label: "Track my bus", href: "#" },
  { label: "Corporate travel", href: "#" },
]

const aboutProduct = [
  { label: "Demo", href: "#" },
  { label: "Updates", href: "#" },
  { label: "API integration", href: "#" },
]

const legalLinks = [
  { label: "Terms and conditions", href: "#" },
  { label: "Privacy policy", href: "#" },
  { label: "Data deletion", href: "#" },
]

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/90">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/55 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialRail() {
  return (
    <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col gap-1 rounded-l-xl border border-white/10 bg-[#0c1f18]/95 py-3 pl-3 pr-2 shadow-xl backdrop-blur-sm">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="flex size-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-4 right-4 z-50 flex size-10 items-center justify-center rounded-lg bg-brand text-brand-foreground shadow-lg transition-all hover:bg-brand/90 sm:bottom-6 sm:right-6 sm:size-11",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  )
}

export function Footer({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <footer className="border-t border-border/60 bg-muted/20 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Abay Bus Transport
        </p>
      </footer>
    )
  }

  return (
    <>
      <SocialRail />
      <BackToTop />

      <footer className="relative mt-4 overflow-hidden rounded-t-[2.5rem] bg-[#0a1a14] text-white sm:mt-6 sm:rounded-t-[3rem]">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(8,163,110,0.12),transparent_70%)]"
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span className="select-none whitespace-nowrap text-[clamp(5rem,18vw,14rem)] font-bold leading-none tracking-tight text-white/[0.04]">
            AbayBus
          </span>
        </div>

        <div className={`${sectionWrap} relative py-14 sm:py-16 lg:py-20`}>
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 lg:gap-8 xl:gap-12">
            <div className="lg:col-span-3">
              <CompanyLogo
                wordmarkClassName="text-xl text-white"
                imageClassName="h-10 sm:h-11"
              />
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
                Ethiopia&apos;s trusted way to book intercity travel — safe,
                simple, and on time, everywhere.
              </p>

              <div className="mt-6 flex gap-2 lg:hidden">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex size-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <FooterColumn title="Quick links" links={quickLinks} />
            </div>

            <div className="lg:col-span-2">
              <FooterColumn title="Products" links={products} />
            </div>

            <div className="lg:col-span-2">
              <FooterColumn title="About product" links={aboutProduct} />
            </div>

            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-white/90">Contact</h3>
              <div className="mt-4 space-y-5 text-sm text-white/55">
                <div>
                  <p className="font-semibold text-white/80">Addis Ababa</p>
                  <p className="mt-1.5 leading-relaxed">
                    Abay Bus Transport | Bole | Near Atlas Hotel | 4th Floor,
                    Office No. 402
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-white/80">Call us</p>
                  <p className="mt-1.5">
                    <a href="tel:+251911234567" className="transition-colors hover:text-white">
                      +251 911 234 567
                    </a>
                  </p>
                  <p className="mt-1">
                    <a href="tel:+251922345678" className="transition-colors hover:text-white">
                      +251 922 345 678
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/45">
              &copy; {new Date().getFullYear()} Abay Bus Transport. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/45 transition-colors hover:text-white/80"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
