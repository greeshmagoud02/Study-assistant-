import Anthropic from "@anthropic-ai/sdk";
import { env } from "../config/env.js";
import { getSystemPrompt } from "../prompts/systemPrompt.js";
import { AppError } from "../utils/AppError.js";
import { extractJson } from "../utils/extractJson.js";

const anthropic = new Anthropic({ apiKey: env.anthropicApiKey });

const REQUEST_TIMEOUT_MS = 30000;
const MAX_OUTPUT_TOKENS = 4096;

/**
 * Calls Claude with the mode-specific system prompt and returns the parsed
 * JSON payload. Throws AppError for every known failure mode so the
 * controller can map it to a clean HTTP response.
 */
export async function generateStructuredContent({ text, mode }) {
  const systemPrompt = getSystemPrompt(mode);

  let response;
  try {
    response = await anthropic.messages.create(
      {
        model: env.claudeModel,
        max_tokens: MAX_OUTPUT_TOKENS,
        system: systemPrompt,
        messages: [{ role: "user", content: text }],
      },
      { timeout: REQUEST_TIMEOUT_MS }
    );
  } catch (err) {
    throw mapAnthropicError(err);
  }

  const rawText = response?.content?.find((block) => block.type === "text")?.text;

  if (!rawText || !rawText.trim()) {
    throw new AppError(
      "The AI returned an empty response. Please try again.",
      502,
      "EMPTY_RESPONSE"
    );
  }

  const parsed = extractJson(rawText);
  if (!parsed) {
    throw new AppError(
      "The AI response could not be parsed as valid JSON. Please try again.",
      502,
      "INVALID_JSON"
    );
  }

  return parsed;
}

function mapAnthropicError(err) {
  if (err?.name === "APIConnectionTimeoutError" || err?.code === "ETIMEDOUT") {
    return new AppError(
      "The AI took too long to respond. Please try again.",
      504,
      "TIMEOUT"
    );
  }

  const status = err?.status;

  if (status === 429) {
    return new AppError(
      "We're receiving too many requests right now. Please wait a moment and try again.",
      429,
      "RATE_LIMITED"
    );
  }

  if (status === 401 || status === 403) {
    return new AppError(
      "The AI service is not configured correctly. Please contact the site administrator.",
      500,
      "AUTH_ERROR"
    );
  }

  if (status >= 500) {
    return new AppError(
      "The AI service is temporarily unavailable. Please try again shortly.",
      502,
      "UPSTREAM_ERROR"
    );
  }

  if (err?.code === "ENOTFOUND" || err?.code === "ECONNREFUSED" || err?.code === "ECONNRESET") {
    return new AppError(
      "Network error while contacting the AI service. Please check your connection and try again.",
      503,
      "NETWORK_ERROR"
    );
  }

  return new AppError(
    "Something went wrong while generating content. Please try again.",
    500,
    "UNKNOWN_ERROR"
  );
}
