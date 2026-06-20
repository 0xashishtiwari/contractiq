import { generateObject } from 'ai'
import {summarySchema} from './../zod-schema/summary-schema'
import {cloudfareAI} from '../cloudfare/ai';
import {buildSummaryPrompt} from './../prompts/build-summary-prompt'
import { FINAL_SUMMARY_PROMPT } from '../prompts/finalSummary';
import { Clause, Contract } from '@/generated/prisma/client';

type contactWithClause = Contract & {
  clauses: Clause[];
}
export async function generateFinalSummary(contract : contactWithClause) {
    
    const result = await generateObject ({
        model : cloudfareAI('@cf/openai/gpt-oss-120b'),
        schema : summarySchema,
        system : FINAL_SUMMARY_PROMPT,
        prompt : buildSummaryPrompt(contract),
        temperature : 0.2
    })

    return result.object;
}