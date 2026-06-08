import {task} from '@trigger.dev/sdk/v3'
import {analyseClause} from '../lib/ai/clause-analysis';
import {prisma} from '../lib/prisma';
import {logger} from '@trigger.dev/sdk/v3';

export const analyseClauseTask = task({
    id: "analyse-clause",

    queue : {
        concurrencyLimit : 1
    },

    retry : {
        maxAttempts : 3,
    },
    
    run : async (payload : { clauseId: string , clauseText: string }) => {
        const { clauseId, clauseText } = payload;
        logger.info("Starting clause analysis", {
            clauseId,
            clauseText
        })
        if(!clauseText  || !clauseId){
            logger.warn("Clause text or ID is missing, skipping analysis", {
                clauseId
            })
            return;
        }

        try{    
            const analysis = await analyseClause(clauseText);

            await prisma.clause.update({
                where: { id: clauseId },
                data: {
                    riskLevel: analysis.riskLevel,
                    riskExplanation: analysis.riskExplanation,
                    ambiguousTerms: JSON.stringify(analysis.ambiguousTerms),
                    recommendations: analysis.recommendations
                }
            })
            logger.info("Clause analysis completed", {
                clauseId,
                analysis
            })
        }catch(error){
            logger.error("Error analyzing clause", {
                clauseId,
                clauseText,
                error
            })
            throw error;
        }
    }
})