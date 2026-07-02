"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section id="cta" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" as const }}
          className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/15 via-background to-sky-500/10 px-8 py-14 md:px-12 md:py-20"
        >
          <motion.div
            animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.05, 1] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const }}
            className="pointer-events-none absolute -left-16 top-8 h-48 w-48 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const }}
            className="pointer-events-none absolute right-0 top-12 h-56 w-56 rounded-full bg-sky-400/10 blur-3xl"
          />

          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Get Started</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">Ready to Review Contracts Smarter?</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Upload your first contract and receive a clause-by-clause AI review in minutes.
            </p>

            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="#top">Get Started</Link>
              </Button>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 hero-grid opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}