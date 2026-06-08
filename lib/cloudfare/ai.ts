import {createOpenAI} from '@ai-sdk/openai'

export const cloudfareAI = createOpenAI({
    apiKey : process.env.CLOUDFLARE_API_TOKEN,
    baseURL : `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`
})