import { z } from "zod";

export const generateRequestSchema = z.object({
  text: z
    .string({ required_error: "text is required" })
    .trim()
    .min(3, "Please provide at least 3 characters of notes or a topic.")
    .max(12000, "Text is too long (max 12,000 characters)."),
  mode: z.enum(["flashcards", "quiz"], {
    errorMap: () => ({ message: 'mode must be either "flashcards" or "quiz"' }),
  }),
});

const flashcardSchema = z.object({
  id: z.number().int(),
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
});

export const flashcardsResponseSchema = z.object({
  type: z.literal("flashcards"),
  title: z.string().trim().min(1),
  cards: z.array(flashcardSchema).min(1, "Flashcard set must contain at least one card."),
});

const quizQuestionSchema = z
  .object({
    id: z.number().int(),
    question: z.string().trim().min(1),
    options: z.array(z.string().trim().min(1)).length(4, "Each question must have exactly 4 options."),
    correctAnswer: z.string().trim().min(1),
    explanation: z.string().trim().min(1),
  })
  .refine((q) => q.options.includes(q.correctAnswer), {
    message: "correctAnswer must match one of the provided options.",
    path: ["correctAnswer"],
  });

export const quizResponseSchema = z.object({
  type: z.literal("quiz"),
  title: z.string().trim().min(1),
  questions: z.array(quizQuestionSchema).min(1, "Quiz must contain at least one question."),
});

export function getResponseSchema(mode) {
  return mode === "quiz" ? quizResponseSchema : flashcardsResponseSchema;
}
