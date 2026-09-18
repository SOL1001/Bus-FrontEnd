import { CtaBanner } from "@/components/landing/cta-banner"
import { Features } from "@/components/landing/features"
import { Footer } from "@/components/landing/footer"
import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Routes } from "@/components/landing/routes"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main>
        <Hero />
        <Features />
        <Routes />
        <HowItWorks />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
