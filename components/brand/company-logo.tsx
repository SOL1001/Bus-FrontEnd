import Image from "next/image"
import Link from "next/link"

import companyLogo from "@/assets/image.png"
import { cn } from "@/lib/utils"

type CompanyLogoMarkProps = {
  className?: string
  imageClassName?: string
}

export function CompanyLogoMark({ className, imageClassName }: CompanyLogoMarkProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#0a0a0a]",
        className
      )}
    >
      <Image
        src={companyLogo}
        alt="Abay Bus"
        width={96}
        height={56}
        className={cn("h-full w-full object-contain p-1", imageClassName)}
      />
    </div>
  )
}

type CompanyLogoProps = {
  href?: string
  showWordmark?: boolean
  wordmarkClassName?: string
  className?: string
  imageClassName?: string
  onClick?: () => void
}

export function CompanyLogo({
  href = "/",
  showWordmark = true,
  wordmarkClassName,
  className,
  imageClassName,
  onClick,
}: CompanyLogoProps) {
  const content = (
    <>
      <Image
        src={companyLogo}
        alt="Abay Bus"
        width={120}
        height={64}
        priority
        className={cn("h-9 w-auto object-contain sm:h-10", imageClassName)}
      />
      {showWordmark && (
        <span
          className={cn(
            "hidden text-base font-bold tracking-tight min-[480px]:inline sm:text-lg",
            wordmarkClassName ?? "text-[#0f2744]"
          )}
        >
          Abay<span className="text-brand">Bus</span>
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn("flex shrink-0 items-center gap-2.5", className)}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className={cn("flex shrink-0 items-center gap-2.5", className)}>
      {content}
    </div>
  )
}
