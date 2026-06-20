import { task } from "@trigger.dev/sdk/v3";
import { splitContractIntoClauses } from "@/lib/ai/split-contract";
import { prisma } from "@/lib/prisma";
import { analyseClauseTask } from "./analyseClause";
import { logger } from "@trigger.dev/sdk/v3";
import { wait } from "@trigger.dev/sdk/v3";
import { sendEmail } from "@/lib/email/sendEmail";
import { generateFinalSummaryTask } from "./generateSummary";

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

            const clauseAfterAnalysis = await prisma.clause.findMany({
                where: { contractId },
            });

            const order = {
                HIGH: 1,
                MEDIUM: 2,
                LOW: 3
            }
            // Sort clauses by risk level: HIGH first, then MEDIUM, then LOW, and finally those without a risk level
            const sortedClauses = clauseAfterAnalysis.sort((a, b) => {
                const riskA = a.riskLevel ? order[a.riskLevel as keyof typeof order] : 4;
                const riskB = b.riskLevel ? order[b.riskLevel as keyof typeof order] : 4;
                return riskA - riskB;
            });

            const report = {
                summary: {
                    totalClauses: sortedClauses.length,
                    highRisk: sortedClauses.filter(c => c.riskLevel === "HIGH").length,
                    mediumRisk: sortedClauses.filter(c => c.riskLevel === "MEDIUM").length,
                    lowRisk: sortedClauses.filter(c => c.riskLevel === "LOW").length,
                },
                clauses: sortedClauses

            }

            await prisma.contract.update({
                where: { id: contractId },
                data: {
                    report: report,
                    status: "Waiting for Review"
                }

            });

            // Generate a review token for the contract
            const token = await wait.createToken({
                timeout: '30d',
            });


            // Save the token in the contract for later verification
            await prisma.contract.update({
                where: { id: contractId },
                data: {
                    reviewTokenId: token.id
                }
            })

            //Email the user with the review link
            const contractWithUser = await prisma.contract.findUnique({
                where: { id: contractId },
                include: { user: true }
            });

            const reviewLink = `${process.env.FRONTEND_URL}/dashboard/contracts/${contractId}/review`;
            logger.info("Contract ready for review", {
                contractId,
                reviewLink
            })

            // send email to user with review link using resend
            await sendEmail(contractWithUser, report, reviewLink);


            const reviewResult = await wait.forToken(token.id)
            logger.info("Review completed", {
                contractId,
                reviewResult
            })


            logger.info("Final summary generation triggered", {
                contractId
            })


            await generateFinalSummaryTask.triggerAndWait({
                contractId
            })

            logger.info("Final summary generation completed", {
                contractId
            })

        } catch (error) {
            logger.error("Failed to split contract clauses", {
                contractId,
                error
            });
            throw new Error("Failed to split contract clauses");
        }


    }
})