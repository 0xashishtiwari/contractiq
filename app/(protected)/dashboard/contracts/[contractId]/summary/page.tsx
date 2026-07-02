import SummaryViewer from "./SummaryViewer";
import { prisma } from "@/lib/prisma";
import { auth } from '@trigger.dev/sdk/v3'
export default async function Page({
    params,
}: {
    params: Promise<{ contractId: string }>;
}) {
    const { contractId } = await params;
    let contract = null;
    for (let i = 0; i < 5; i++) {

        try {
            contract = await prisma.contract.findUnique({
                where: {
                    id: contractId
                },
                select: {
                    summaryGenerationRunId: true,
                    finalSummary: true
                }
            })
        } catch (error) {
            console.error("Error fetching contract:", error);
        }

        if (contract?.summaryGenerationRunId) {
            break;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait for 2 seconds before retrying

    }


    if (!contract) {
        return <div>Contract not found</div>;
    }

    if (!contract.summaryGenerationRunId) {
        return <div>Summary generation has not started yet.</div>;
    }

    const accessToken = await auth.createPublicToken({
        scopes: {
            read: {
                runs: contract.summaryGenerationRunId
            }
        }
    })

    return <SummaryViewer runId={contract.summaryGenerationRunId} accessToken={accessToken} initialSummary={contract.finalSummary ?? "No summary available."} />;
}