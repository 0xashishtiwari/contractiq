
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
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

function parseList(text: string | null): string[] {
  if (!text) return [];

  // Try JSON first
  try {
    const parsed = JSON.parse(text);

    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Ignore JSON parsing errors
  }

  // Fallback: split by new lines
  return text
    .split("\n")
    .map((item) => item.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);
}

function parseRecommendations(text: string | null): string[] {
  if (!text) return [];

  return text
    .split(/\n|\d+\.\s/)
    .map((item) => item.trim())
    .filter(Boolean);
}


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

  const ambiguousTermsList = parseList(clause.ambiguousTerms);
  const recommendationsList = parseRecommendations(clause.recommendations);

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

          {ambiguousTermsList.length > 0 ? (
            <ul className="list-disc space-y-2 pl-5">
              {ambiguousTermsList.map((term, index) => (
                <li key={index} className="leading-7 text-foreground">
                  {term}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ambiguous terms detected.</p>
          )}
        </section>

        {/* Recommendations */}
        <section className="rounded-2xl border border-border/60 bg-background/50 p-6 backdrop-blur-sm transition-colors hover:bg-background/70">
  <div className="mb-3 flex items-center gap-2">
    <Lightbulb className="size-4 text-violet-400" />

    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
      Recommendations
    </h3>
  </div>

  {clause.recommendations ? (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mb-3 text-xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 text-lg font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 text-base font-semibold">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-3 leading-7 text-foreground">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-4 list-disc space-y-2 pl-6">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-decimal space-y-3 pl-6">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="leading-7">{children}</li>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">
            {children}
          </strong>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-primary pl-4 italic">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
            {children}
          </code>
        ),
      }}
    >
      {clause.recommendations}
    </ReactMarkdown>
  ) : (
    <p>No recommendations were generated.</p>
  )}
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

