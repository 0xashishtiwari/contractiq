"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRealtimeStream } from "@trigger.dev/react-hooks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summaryOutputStream } from "@/trigger/stream";
import { Loader2 } from "lucide-react";


export default function SummaryViewer({
    runId,
    accessToken,
    initialSummary
}: {
    runId: string;
    accessToken : string;
    initialSummary: string ;
}) {
    const stream = useRealtimeStream( summaryOutputStream, runId  , {
        accessToken
    });

    const StreamedMarkdown = Array.isArray(stream.parts) ? stream.parts.join("") : stream.parts ?? "";

    const markdown = StreamedMarkdown || initialSummary || "No summary available.";

    // console.log("StreamedMarkdown:", StreamedMarkdown);
    // console.log("initialSummary:", initialSummary);

    const isLoading =  (!StreamedMarkdown && !initialSummary);

    if (isLoading) {
        return (
            <div className="mx-auto max-w-2xl rounded-xl border mt-8 p-8">
                <Loader2 className="mb-4 h-6 w-6 animate-spin" />

                <h2 className="text-xl font-semibold">
                    Creating your final report
                </h2>

                <p className="mt-2 text-muted-foreground">
                    We're analyzing all clauses, reviewer decisions,
                    and annotations to generate a consolidated summary.
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
                    <article className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {markdown}
                        </ReactMarkdown>
                    </article>
                </CardContent>
            </Card>
        </div>
    );
}