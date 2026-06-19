
"use client";

import React from "react";
import {
  AlertTriangle,
  FileText,
  Lightbulb,
  Search,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { updateClauseReview } from '@/app/actions/review';
import {useEffect} from "react";

type ClauseCardProps = {
  clause: {
    id: string;
    number: number;
    content: string;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    riskExplanation: string | null;
    ambiguousTerms: string | null;
    recommendations: string | null;
    reviewStatus: "PENDING" | "APPROVED" | "REJECTED";
    reviewNote: string | null;
  };
};

export default function ClauseCard({ clause }: ClauseCardProps) {
  const [status, setStatus] = React.useState(clause.reviewStatus);
  const [note, setNote] = React.useState(clause.reviewNote || "");

  const riskClass =
    clause.riskLevel === "HIGH"
      ? "border-red-500/20 bg-red-500/10 text-red-400"
      : clause.riskLevel === "MEDIUM"
      ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
      : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";

  const statusClass =
    status === "APPROVED"
      ? "border-green-500/20 bg-green-500/10 text-green-400"
      : status === "REJECTED"
      ? "border-red-500/20 bg-red-500/10 text-red-400"
      : "border-amber-500/20 bg-amber-500/10 text-amber-400";


        // auto save review status and note when they change
    useEffect(() => {
      const timer = setTimeout(async () => {
        // only send a single payload object to match updateClauseReview signature
        if (status !== clause.reviewStatus || note !== clause.reviewNote) {
          await updateClauseReview({ clauseId: clause.id, reviewStatus: status, reviewNote: note });
        }
      }, 3000); // debounce by 3 seconds

      return () => clearTimeout(timer);
    }, [status, note, clause.id, clause.reviewStatus, clause.reviewNote]);

  return (
    <Card className="glass-card glow-border relative mx-auto mb-6 w-full max-w-7xl overflow-hidden rounded-[2rem] border border-border/60">
      {/* Background Grid */}
      <div className="hero-grid absolute inset-0 opacity-20" />

      {/* Decorative Dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute left-8 top-8 size-2 animate-pulse rounded-full bg-primary/50" />
        <span className="absolute right-10 top-16 size-2 animate-pulse rounded-full bg-sky-400/50" />
        <span className="absolute bottom-10 left-20 size-1.5 animate-pulse rounded-full bg-violet-400/50" />
      </div>

      {/* Header */}
      <CardHeader className="relative border-b border-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              Clause {clause.number}
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              AI Contract Review Analysis
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className={`rounded-full px-4 py-1 ${statusClass}`}
            >
              {status}
            </Badge>

            <Badge
              variant="outline"
              className={`rounded-full px-4 py-1 ${riskClass}`}
            >
              {clause.riskLevel} RISK
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="relative space-y-4 p-8">
        {/* Original Clause */}
        <section className="rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-background/70">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="size-4 text-primary" />

            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Original Clause
            </h3>
          </div>

          <p className="leading-7 text-foreground">
            {clause.content}
          </p>
        </section>

        {/* Risk Analysis */}
        <section className="rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-background/70">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-400" />

            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Risk Analysis
            </h3>
          </div>

          <p className="leading-7 text-foreground">
            {clause.riskExplanation ||
              "No risk explanation was generated for this clause."}
          </p>
        </section>

        {/* Ambiguous Terms */}
        <section className="rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-background/70">
          <div className="mb-3 flex items-center gap-2">
            <Search className="size-4 text-cyan-400" />

            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Ambiguous Terms
            </h3>
          </div>

          <p className="leading-7 text-foreground">
            {clause.ambiguousTerms || "No ambiguous terms detected."}
          </p>
        </section>

        {/* Recommendations */}
        <section className="rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-background/70">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="size-4 text-violet-400" />

            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Recommendations
            </h3>
          </div>

          <p className="leading-7 text-foreground">
            {clause.recommendations ||
              "No recommendations were generated."}
          </p>
        </section>

        {/* Human Review */}
        <section className="rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-background/70">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="size-4 text-green-400" />

            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Human Review
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatus("APPROVED")}
              className="border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
            >
              Approve Clause
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setStatus("REJECTED")}
              className="border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
            >
              Reject Clause
            </Button>

            <Badge
              variant="outline"
              className={`rounded-full px-3 py-1 ${statusClass}`}
            >
              Current Status: {status}
            </Badge>
          </div>

          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add reviewer notes, observations, or approval comments..."
            className="mt-4 min-h-[120px] resize-none rounded-xl border-border/60 bg-background/50"
          />
        </section>
      </CardContent>
    </Card>
  );
}

