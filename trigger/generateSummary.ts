import { task } from '@trigger.dev/sdk/v3'
import { prisma } from '@/lib/prisma'
import { generateFinalSummary } from '@/lib/ai/generare-final-summary';
import { sendSummaryEmail } from '@/lib/email/sendSummaryEmail';
import { summaryOutputStream } from './stream';

export const generateFinalSummaryTask = task({
    id: "generate-final-summary",


    run: async (payload: any) => {
        const { contractId } = payload;
        const contract = await prisma.contract.findUniqueOrThrow({
            where: {
                id: contractId
            },
            include: {
                clauses: {
                    orderBy: {
                        number: 'asc'
                    }
                },
                user: true
            }
        })

        const result = await generateFinalSummary(contract);

        const {stream : readableStream , waitUntilComplete} =  summaryOutputStream.pipe(result.textStream);

        let finalSummary = '';
        for await (const chunk of readableStream) {
            console.log(`Received chunk: ${chunk}`);

            finalSummary += chunk;

        }

        await waitUntilComplete();

        await prisma.contract.update({
            where: {
                id: contractId
            },
            data: {
                finalSummary: finalSummary,
                status: "Summary Generated"
            }
        })

        console.log(`Final summary generated for contract ${contractId}: ${finalSummary}`);




        await sendSummaryEmail(contract);



    }

})