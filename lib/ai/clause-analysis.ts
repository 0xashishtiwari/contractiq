import {generateObject} from 'ai';
import {ollama} from 'ollama-ai-provider-v2';
import {ClauseAnalysisSchema} from './clause-analysis-schema';
import {ANALYSE_CLAUSE_PROMPT} from '../prompts/clause-analysis';
import {cloudfareAI} from '../cloudfare/ai';

export async function analyseClause(clauseText: string) {
    const result = await generateObject({
        model : cloudfareAI('@cf/openai/gpt-oss-120b'),
        schema: ClauseAnalysisSchema,
        prompt: `${ANALYSE_CLAUSE_PROMPT} Clause text: ${clauseText}`
    })
    
    return result.object;
}
