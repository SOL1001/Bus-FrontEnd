import { Geist_Mono, Outfit } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { cn } from "@/lib/utils"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Abay Bus — Travel Smarter Across Ethiopia",
  description:
    "Book intercity bus tickets, track your ride in real time, and travel comfortably with Abay Bus.",
  icons: {
    icon: "/abay-bus-logo.png",
    apple: "/abay-bus-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn("light antialiased", fontMono.variable, "font-sans", outfit.variable)}
    >
      <body>{children}</body>
    </html>
  )
}
