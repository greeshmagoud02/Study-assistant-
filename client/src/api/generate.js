import axios from "axios";
import { apiClient } from "./client";

/**
 * Requests structured study content from the backend.
 * @param {{ text: string, mode: "flashcards"|"quiz", signal: AbortSignal }} params
 */
export async function generateContent({ text, mode, signal }) {
  try {
    const response = await apiClient.post("/api/generate", { text, mode }, { signal });
    return response.data.data;
  } catch (err) {
    throw normalizeError(err);
  }
}

function normalizeError(err) {
  if (axios.isCancel(err) || err.code === "ERR_CANCELED") {
    const cancelError = new Error("Request cancelled.");
    cancelError.isCancelled = true;
    return cancelError;
  }

  if (err.code === "ECONNABORTED") {
    return new Error("The request took too long. Please try again.");
  }

  if (!err.response) {
    return new Error("Couldn't reach the server. Check your connection and try again.");
  }

  const serverMessage = err.response.data?.error?.message;
  return new Error(serverMessage || "Something went wrong. Please try again.");
}
