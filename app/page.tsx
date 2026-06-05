import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Features from "@/components/landing/features";
import CTA from "@/components/landing/cta";

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-gradient-to-b from-primary/10 to-transparent" />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <CTA />
    </main>
  );
}