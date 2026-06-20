import React from 'react'
import { prisma } from '@/lib/prisma';
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import remarkGfm from 'remark-gfm';

const page = async ({ params }: { params: Promise<{ contractId: string }> }) => {
    const { contractId } = await params;

    const contract = await prisma.contract.findUnique({
        where: {
            id: contractId
        },
        select: {
            finalSummary: true
        }
    })

    if (!contract) {
        return <div>No summary found for this contract.</div>
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
                    <article
                        className="
        prose
        prose-slate
        dark:prose-invert
        max-w-none

        prose-headings:scroll-mt-20
        prose-headings:font-semibold

        prose-h1:text-3xl
        prose-h1:mb-6

        prose-h2:text-2xl
        prose-h2:mt-10
        prose-h2:mb-4

        prose-p:leading-7

        prose-ul:my-4
        prose-li:my-1

        prose-strong:text-foreground
      "
                    >
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {contract.finalSummary ?? ""}
                        </ReactMarkdown>
                    </article>
                </CardContent>
            </Card>
        </div>
    )
}

export default page