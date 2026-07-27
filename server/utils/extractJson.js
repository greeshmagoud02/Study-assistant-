/**
 * Claude is instructed to return raw JSON only, but this strips accidental
 * markdown fences or stray whitespace/text so parsing stays resilient.
 */
export function extractJson(raw) {
  if (typeof raw !== "string") return null;

  let text = raw.trim();

  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch) {
    text = fenceMatch[1].trim();
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    return null;
  }

  const candidate = text.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}
