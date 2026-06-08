import { task } from "@trigger.dev/sdk/v3";
import { splitContractIntoClauses } from "@/lib/ai/split-contract";
import { prisma } from "@/lib/prisma";
import { analyseClauseTask } from "./analyseClause";

export const splitContractClauses = task({
    id: "split-contract-clauses",

    run: async (payload: any) => {
        const { contractId } = payload;

        const contract = await prisma.contract.findUnique({
            where: { id: contractId }
        })

        if (!contract) {
            throw new Error("Contract not found");
        }

        if (!contract.extractedText) {
            throw new Error("Contract text not extracted yet");
        }


        try {


            await prisma.contract.update({
                where: { id: contractId },
                data: { status: "splitting" }
            })

            const clauses = await splitContractIntoClauses(contract.extractedText);

            await prisma.clause.deleteMany({
                where: {
                    contractId: contract.id,
                },
            });

            // createMany returns a BatchPayload which doesn't include created records,
            // so create clauses individually to get their ids for further processing
            const savedClauses = await Promise.all(
                clauses.map((clause: any, index: number) =>
                    prisma.clause.create({
                        data: {
                            contractId,
                            content: clause.content,
                            number: index + 1,
                        },
                    })
                )
            );
            await prisma.contract.update({
                where: { id: contractId },
                data: { status: "Split Complete" }
            })

            await prisma.contract.update({
                where: { id: contractId },
                data: { status: "Analyzing" }
            })

            console.log("Saved clauses:", savedClauses);

            // Trigger analysis for each clause
            for (const clause of savedClauses) {
                await analyseClauseTask.triggerAndWait({
                    clauseId: clause.id,
                    clauseText: clause.content,
                });
                console.log(`Triggered analysis for clause ${clause.id}`);
            }

        } catch (error) {
            throw new Error("Failed to split contract clauses");
        }

    }
})