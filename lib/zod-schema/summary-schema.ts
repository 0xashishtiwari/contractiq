import {z} from "zod";


export const summarySchema = z.object({
    FinalSummary : z.string(),
})

export type SummaryResult = z.infer<typeof summarySchema>