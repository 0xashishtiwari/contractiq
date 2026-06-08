import { z } from "zod";

export const ClauseAnalysisSchema = z.object({
    riskLevel: z.enum(["Low", "Medium", "High"]),
    riskExplanation: z.string(),
    ambiguousTerms: z.array(z.string()),
    recommendations : z.string()
})

export type ClauseAnalysis = z.infer<typeof ClauseAnalysisSchema>