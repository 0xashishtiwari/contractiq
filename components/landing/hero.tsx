"use client";

import Link from "next/link";
import { motion  , type Variants} from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, ScanText, ShieldAlert, Sparkles, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const workflowItems = [
  { label: "Contract Uploaded", icon: Upload, accent: "text-sky-400" },
  { label: "Text Extracted", icon: ScanText, accent: "text-emerald-400" },
  { label: "58 Clauses Found", icon: FileText, accent: "text-cyan-400" },
  { label: "AI Analysis Running", icon: Sparkles, accent: "text-violet-400" },
  { label: "Human Approval Pending", icon: ShieldAlert, accent: "text-amber-400" },
  { label: "Final Report Ready", icon: CheckCircle2, accent: "text-primary" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const, } },
};

export default function Hero() {
  return (
    <section id="top" className="section-padding relative overflow-hidden pt-0 md:pt-4">
      <div className="pointer-events-none absolute inset-0 opacity-40 hero-grid" />
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />

      <div className="section-container relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-0 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground shadow-sm backdrop-blur-xl">
              Durable AI workflows for legal teams
            </div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              AI-Powered <span className="gradient-text">Contract Review</span> in Minutes
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Upload a PDF and let AI extract clauses, analyze risks, identify obligations, and generate a complete review using durable AI workflows.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/signin">
                  Analyze Contract
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                <Link href="#how-it-works">View Demo</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-sky-500/10 blur-2xl" />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Card className="glass-card glow-border relative overflow-hidden rounded-[2rem] border-border/60 bg-background/75">
                <div className="hero-grid absolute inset-0 opacity-40" />
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <span className="absolute left-10 top-8 size-2 rounded-full bg-primary/60 animate-pulse" />
                  <span className="absolute right-12 top-20 size-2 rounded-full bg-sky-400/70 animate-pulse" />
                  <span className="absolute bottom-24 left-24 size-1.5 rounded-full bg-cyan-300/70 animate-pulse" />
                  <span className="absolute bottom-16 right-20 size-1.5 rounded-full bg-violet-300/70 animate-pulse" />
                </div>

                <CardHeader className="relative border-b border-border/60 pb-5">
                  <CardTitle className="text-lg">Review Workflow</CardTitle>
                  <CardDescription>Live contract review status</CardDescription>
                </CardHeader>
                <CardContent className="relative space-y-4 pt-6">
                  {workflowItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.55, delay: 0.35 + index * 0.08 }}
                        className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 py-3 backdrop-blur-sm"
                      >
                        <span className={`flex size-10 items-center justify-center rounded-2xl bg-foreground/5 ${item.accent}`}>
                          <Icon className="size-4" />
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground">Automatically updating review state</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}