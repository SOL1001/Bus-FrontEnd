"use client"

import QRCode from "react-qr-code"

import { cn } from "@/lib/utils"

type TicketQrProps = {
  value: string
  className?: string
  size?: number
}

export function TicketQr({ value, className, size = 128 }: TicketQrProps) {
  return (
    <div
      className={cn(
        "inline-flex shrink-0 rounded-xl border border-border/60 bg-white p-3 shadow-sm",
        className
      )}
    >
      <QRCode
        value={value}
        size={size}
        level="M"
        bgColor="#ffffff"
        fgColor="#0f2744"
        aria-label="Ticket QR code"
      />
    </div>
  )
}
