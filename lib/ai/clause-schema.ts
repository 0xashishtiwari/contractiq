import {z} from "zod";

export const ClauseSchema = z.object({
    clauses : z.array(
        z.object({
            content : z.string()
        })
    )
})

export type ClauseResult = z.infer<typeof ClauseSchema>