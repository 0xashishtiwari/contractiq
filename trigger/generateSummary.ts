import {task} from '@trigger.dev/sdk/v3'
import {prisma} from '@/lib/prisma'
import { generateFinalSummary } from '@/lib/ai/generare-final-summary';
import { sendSummaryEmail } from '@/lib/email/sendSummaryEmail';

export const generateFinalSummaryTask = task({
    id  : "generate-final-summary",
    

    run : async (payload : any)=>{
        const { contractId } = payload;
        const contract = await prisma.contract.findUniqueOrThrow({
            where: {
                id : contractId
            },
            include :{
                clauses : {
                    orderBy : {
                        number : 'asc'
                    }
                },
                user : true
            }
         })
                
       const summary = await generateFinalSummary(contract);
       const summaryText = typeof summary === 'string' ? summary : summary.FinalSummary;

       await prisma.contract.update({
        where : {
            id : contractId
        },
        data : {
            finalSummary : summaryText,
            status : "Summary Generated"
        }
       });

       console.log("Final summary generated for contract", contractId, summaryText);

       await sendSummaryEmail(contract);
       

       return {
        summary : summaryText
       }

    }

})