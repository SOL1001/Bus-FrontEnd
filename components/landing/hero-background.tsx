"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=80",
    alt: "Open highway at golden hour",
  },
  // {
  //   url: "https://images.unsplash.com/photo-1544628907-3ad0d7d39076?auto=format&fit=crop&w=2400&q=80",
  //   alt: "Coach bus on a scenic road",
  // },
  {
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80",
    alt: "Mountain landscape at sunrise",
  },
  {
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80",
    alt: "Lake and mountains along a travel route",
  },
  // {
  //   url: "https://images.unsplash.com/photo-1570125909232-e097023875bb?auto=format&fit=crop&w=2400&q=80",
  //   alt: "Bus traveling through the countryside",
  // },
]

const INTERVAL_MS = 5000
const FADE_MS = 1000

export function HeroBackground() {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [incomingIndex, setIncomingIndex] = React.useState<number | null>(null)
  const [incomingVisible, setIncomingVisible] = React.useState(false)
  const currentIndexRef = React.useRef(0)
  const isAnimatingRef = React.useRef(false)

  React.useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  const transitionTo = React.useCallback((next: number) => {
    if (isAnimatingRef.current || next === currentIndexRef.current) {
      return
    }

    isAnimatingRef.current = true
    setIncomingIndex(next)
    setIncomingVisible(false)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIncomingVisible(true)
      })
    })

    window.setTimeout(() => {
      setCurrentIndex(next)
      currentIndexRef.current = next
      setIncomingIndex(null)
      setIncomingVisible(false)
      isAnimatingRef.current = false
    }, FADE_MS)
  }, [])

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      const next = (currentIndexRef.current + 1) % HERO_IMAGES.length
      transitionTo(next)
    }, INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [transitionTo])

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Preload every slide */}
        <div className="hidden">
          {HERO_IMAGES.map((image) => (
            <img key={image.url} src={image.url} alt="" />
          ))}
        </div>

        <img
          src={HERO_IMAGES[currentIndex].url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        {incomingIndex !== null && (
          <img
            src={HERO_IMAGES[incomingIndex].url}
            alt=""
            className="absolute inset-0 z-10 h-full w-full object-cover transition-opacity ease-in-out"
            style={{
              opacity: incomingVisible ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
          />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/40 dark:bg-black/50"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-linear-to-t from-background to-transparent"
        aria-hidden
      />

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_IMAGES.map((image, index) => (
          <button
            key={image.url}
            type="button"
            aria-label={`Show slide ${index + 1}: ${image.alt}`}
            aria-current={index === currentIndex ? "true" : undefined}
            onClick={() => transitionTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-7 bg-brand"
                : "w-1.5 bg-white/60 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </>
  )
}
