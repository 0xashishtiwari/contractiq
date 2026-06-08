import { generateObject } from 'ai'
import { ollama } from 'ollama-ai-provider-v2'
import { ClauseSchema } from './clause-schema'
import {cloudfareAI} from '../cloudfare/ai';

export async function splitContractIntoClauses(contractText: string) {
    const result = await generateObject({
        model: cloudfareAI('@cf/openai/gpt-oss-120b'),
        schema: ClauseSchema,
        prompt: `
You are a legal document parser.

Your job is to split the contract into logical clauses.

Rules:

- Keep original wording.
- Do not summarize.
- Remove obvious page numbers.
- Remove repeated headers and footers.
- Each clause should be a complete legal unit.
- Definitions, warranties, obligations, payment terms,
  confidentiality provisions and termination provisions
  should be separate clauses.

Return only structured data.

Contract:

${contractText}
`
    });

    return result.object.clauses;
}
