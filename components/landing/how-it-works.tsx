"use client";

import { motion } from "framer-motion";
import { FileUp, ScanText, BrainCircuit, FileOutput } from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Upload PDF",
    description: "Upload any legal contract.",
    icon: FileUp,
  },
  {
    title: "Extract Clauses",
    description: "Automatically identify and separate clauses.",
    icon: ScanText,
  },
  {
    title: "AI Analysis",
    description: "Analyze every clause independently.",
    icon: BrainCircuit,
  },
  {
    title: "Generate Report",
    description: "Receive risks, obligations and recommendations.",
    icon: FileOutput,
  },
];

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Workflow</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">How ContractIQ Works</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
            A simple legal-tech workflow that keeps the experience fast, clear, and reviewable.
          </p>
        </motion.div>

        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-14 grid gap-6 lg:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.title} variants={itemVariants} whileHover={{ y: -6, scale: 1.01 }} transition={{ duration: 0.25 }}>
                <Card className="glass-card relative h-full overflow-hidden rounded-[1.75rem] border-border/60">
                  <CardHeader className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="size-5 transition-transform duration-300 group-hover:rotate-6" />
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">0{index + 1}</span>
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                    <CardDescription className="text-sm leading-7">{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}