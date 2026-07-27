/**
 * Lightweight client-side heuristic for a "difficulty" badge — the AI
 * schema intentionally has no difficulty field, so this estimates it from
 * average question/option length rather than fabricating AI output.
 */
export function estimateDifficulty(questions) {
  if (!questions.length) return "Standard";

  const avgLength =
    questions.reduce((sum, q) => sum + q.question.length + q.options.join("").length, 0) /
    questions.length;

  if (avgLength > 260) return "Hard";
  if (avgLength > 150) return "Medium";
  return "Easy";
}
