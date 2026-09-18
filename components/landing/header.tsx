"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { CompanyLogo } from "@/components/brand/company-logo"
import { cn } from "@/lib/utils"
import { sectionWrap } from "@/lib/layout"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#routes", label: "Routes" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#", label: "FAQ" },
  { href: "/#", label: "Contact us" },
]

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export function Header() {
  const pathname = usePathname()
  const [scrolledPastHero, setScrolledPastHero] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const isHome = pathname === "/"
  const overLight = !isHome || scrolledPastHero

  React.useEffect(() => {
    if (!isHome) return

    function onScroll() {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.65)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
        <div className={sectionWrap}>
          <div
            className={cn(
              "flex h-[4rem] items-center justify-between gap-2 rounded-2xl px-3 transition-all duration-300 sm:h-[4.5rem] sm:gap-4 sm:px-6 lg:grid lg:h-[4.5rem] lg:grid-cols-[auto_1fr_auto] lg:px-8",
              "backdrop-blur-3xl backdrop-saturate-180",
              overLight
                ? "border border-white/60 bg-white/45 shadow-[0_8px_32px_rgba(15,39,68,0.1),inset_0_1px_0_0_rgba(255,255,255,0.85)]"
                : "border border-white/25 bg-white/12 shadow-[0_8px_40px_rgba(0,0,0,0.22),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
            )}
          >
            <CompanyLogo
              onClick={() => setMenuOpen(false)}
              wordmarkClassName={cn(
                "transition-colors duration-300",
                overLight ? "text-[#0f2744]" : "text-white"
              )}
            />

            <nav className="hidden min-w-0 items-center justify-center gap-5 lg:flex xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "whitespace-nowrap text-[0.9375rem] font-semibold transition-colors duration-300",
                    overLight
                      ? "text-[#0f2744]/80 hover:text-[#0f2744]"
                      : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
              <button
                type="button"
                aria-label="Search"
                className={cn(
                  "hidden size-9 items-center justify-center rounded-xl transition-colors sm:inline-flex",
                  overLight
                    ? "text-[#0f2744]/60 hover:bg-black/5 hover:text-[#0f2744]"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                )}
              >
                <SearchIcon className="size-[1.125rem]" />
              </button>

              <Link
                href="#"
                className={cn(
                  "hidden text-[0.9375rem] font-semibold transition-colors duration-300 md:inline",
                  overLight
                    ? "text-[#0f2744]/70 hover:text-[#0f2744]"
                    : "text-white/80 hover:text-white"
                )}
              >
                Sign in
              </Link>

              <Link
                href="#"
                className="hidden h-10 items-center rounded-full bg-brand px-5 text-sm font-semibold text-brand-foreground shadow-sm transition-all hover:bg-brand/90 sm:inline-flex sm:px-6 sm:text-[0.9375rem]"
              >
                Create account
              </Link>

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                className={cn(
                  "inline-flex size-10 items-center justify-center rounded-xl transition-colors lg:hidden",
                  overLight
                    ? "text-[#0f2744] hover:bg-black/5"
                    : "text-white hover:bg-white/10"
                )}
              >
                {menuOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      <div
        className={cn(
          "scrollbar-brand fixed inset-x-3 top-[4.75rem] z-50 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border transition-all duration-300 sm:inset-x-4 sm:top-[5.25rem] lg:hidden",
          overLight
            ? "border-white/60 bg-white/55 shadow-xl backdrop-blur-3xl backdrop-saturate-180"
            : "border-white/15 bg-[#0a1a14]/75 shadow-2xl backdrop-blur-3xl backdrop-saturate-180",
          menuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <nav className="flex flex-col p-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "rounded-xl px-4 py-3 text-base font-semibold transition-colors",
                overLight
                  ? "text-[#0f2744]/80 hover:bg-black/5 hover:text-[#0f2744]"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div
          className={cn(
            "flex flex-col gap-2 border-t p-4",
            overLight ? "border-black/[0.06]" : "border-white/10"
          )}
        >
          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            className={cn(
              "flex h-11 items-center justify-center rounded-xl text-base font-semibold transition-colors",
              overLight
                ? "text-[#0f2744]/80 hover:bg-black/5"
                : "text-white/85 hover:bg-white/10"
            )}
          >
            Sign in
          </Link>
          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 items-center justify-center rounded-full bg-brand text-base font-semibold text-brand-foreground hover:bg-brand/90"
          >
            Create account
          </Link>
        </div>
      </div>
    </>
  )
}
