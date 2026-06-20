import "dotenv/config";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import {google} from "@ai-sdk/google";
// const google = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
// });

async function test() {
  console.log("=== GEMINI STREAM TEST ===\n");

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: "You are a helpful assistant.",
    prompt:
      "Write a 200-word summary of an employment contract and explain its major risks.",
    temperature: 0.2,
  });

  let text = "";

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
    text += chunk;
  }

  console.log("\n\n=== FINAL OUTPUT ===\n");
  console.log(text);
}

test().catch(console.error);