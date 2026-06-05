"use client";

import { motion } from "framer-motion";
import {
  TriangleAlert,
  FileSearch,
  ListTodo,
  PauseCircle,
  RefreshCcw,
  Layers3,
} from "lucide-react";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Risk Detection",
    description: "Find risky language instantly.",
    icon: TriangleAlert,
  },
  {
    title: "Clause Analysis",
    description: "Review every clause independently.",
    icon: FileSearch,
  },
  {
    title: "Obligation Tracking",
    description: "Identify responsibilities and deadlines.",
    icon: ListTodo,
  },
  {
    title: "Human Approval",
    description: "Pause workflows for review.",
    icon: PauseCircle,
  },
  {
    title: "Real-Time Updates",
    description: "Live progress tracking.",
    icon: RefreshCcw,
  },
  {
    title: "Multi-LLM Support",
    description: "Works with OpenAI, Claude and Gemini.",
    icon: Layers3,
  },
];

const gridVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary">Features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">Everything You Need for Contract Review</h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
            A focused toolkit for legal teams that want a simpler, faster review experience.
          </p>
        </motion.div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={cardVariants} whileHover={{ y: -8, scale: 1.01 }} transition={{ duration: 0.25 }}>
                <Card className="glass-card group h-full rounded-[1.75rem] border-border/60 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5">
                  <CardHeader className="space-y-4">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-sm leading-7">{feature.description}</CardDescription>
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