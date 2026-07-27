import { generateStructuredContent } from "../services/claudeService.js";
import { generateRequestSchema, getResponseSchema } from "../validators/schemas.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const generate = asyncHandler(async (req, res) => {
  const parsedRequest = generateRequestSchema.safeParse(req.body);

  if (!parsedRequest.success) {
    throw new AppError(
      "Invalid request.",
      400,
      "VALIDATION_ERROR",
      parsedRequest.error.flatten().fieldErrors
    );
  }

  const { text, mode } = parsedRequest.data;

  const aiPayload = await generateStructuredContent({ text, mode });

  const responseSchema = getResponseSchema(mode);
  const parsedResponse = responseSchema.safeParse(aiPayload);

  if (!parsedResponse.success) {
    throw new AppError(
      "The AI returned data in an unexpected format. Please try again.",
      502,
      "SCHEMA_MISMATCH",
      parsedResponse.error.flatten()
    );
  }

  res.status(200).json({ success: true, data: parsedResponse.data });
});
