import { streams  , InferStreamType} from '@trigger.dev/sdk/v3'

export const summaryOutputStream = streams.define<string>({
    id : "summary-output"
})

export type InferAIStreamType = InferStreamType<typeof summaryOutputStream>