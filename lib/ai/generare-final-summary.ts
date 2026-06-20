// import {summarySchema} from './../zod-schema/summary-schema'
// import {cloudfareAI} from '../cloudfare/ai';
import {buildSummaryPrompt} from './../prompts/build-summary-prompt'
import { FINAL_SUMMARY_PROMPT } from '../prompts/finalSummary';
import { Clause, Contract } from '@/generated/prisma/client';
import {streamText} from 'ai'
import {google} from "@ai-sdk/google";

type contactWithClause = Contract & {
  clauses: Clause[];
}
export async function generateFinalSummary(contract : contactWithClause) {
    
    const result = streamText ({
        model : google('gemini-2.5-flash'),
        system : FINAL_SUMMARY_PROMPT,
        prompt : buildSummaryPrompt(contract),
        temperature : 0.2
    })

    return result;
}