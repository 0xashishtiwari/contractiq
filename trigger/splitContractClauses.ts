import { task } from "@trigger.dev/sdk";
import { splitContractIntoClauses } from "@/lib/ai/split-contract";
import { prisma } from "@/lib/prisma";

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

        await prisma.clause.createMany({
            data: clauses.map((clause: any, index: number) => ({
                contractId,
                content: clause.content,
                number : index + 1,
            }))
        })
        await prisma.contract.update({
            where: { id: contractId },
            data: { status: "split complete" }
        })

        return {
            clausesCreated : clauses.length
        };
    }
})