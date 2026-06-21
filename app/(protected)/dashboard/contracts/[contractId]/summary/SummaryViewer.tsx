"use client";

import { useRealtimeStream } from "@trigger.dev/react-hooks";
import { Streamdown } from "streamdown";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summaryOutputStream } from "@/trigger/stream";

export default function SummaryViewer({
  runId,
  accessToken,
  initialSummary,
}: {
  runId: string;
  accessToken: string;
  initialSummary: string;
}) {
  const stream = useRealtimeStream(summaryOutputStream, runId, {
    accessToken,
    timeoutInSeconds: 300,
  });

  const streamedMarkdown = Array.isArray(stream.parts)
    ? stream.parts.join("")
    : stream.parts ?? "";

  const markdown = streamedMarkdown || initialSummary || "";

  if (stream.error) {
    return (
      <div className="mx-auto max-w-2xl rounded-xl border mt-8 p-8">
        <h2 className="text-xl font-semibold text-destructive">
          Failed to load summary
        </h2>
        <p className="mt-2 text-muted-foreground">
          {stream.error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="mx-auto max-w-5xl shadow-sm">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">
            Contract Review Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          {!markdown && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border p-4">
              <Loader2 className="h-5 w-5 animate-spin" />
              <div>
                <p className="font-medium">
                  Creating your final report
                </p>
                <p className="text-sm text-muted-foreground">
                  We're analyzing clauses, reviewer decisions, and
                  annotations to generate a consolidated summary.
                </p>
              </div>
            </div>
          )}

          <article className="prose dark:prose-invert max-w-none">
            <Streamdown isAnimating>
              {markdown}
            </Streamdown>
          </article>
        </CardContent>
      </Card>
    </div>
  );
}