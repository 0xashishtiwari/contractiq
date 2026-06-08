// scripts/test-ollama.ts

import { generateText } from "ai";
import { ollama } from "ollama-ai-provider-v2";

const result = await generateText({
  model: ollama("qwen2.5:3b"),
  prompt: "Say hello",
});

console.log(result.text);