export const MODES = {
  FLASHCARDS: "flashcards",
  QUIZ: "quiz",
};

export const MAX_INPUT_CHARS = 12000;
export const MIN_INPUT_CHARS = 3;

export const STORAGE_KEYS = {
  THEME: "studyAssistant.theme",
  HISTORY: "studyAssistant.history",
};

export const MAX_HISTORY_ITEMS = 10;

export const REQUEST_TIMEOUT_MS = 45000;

export const KEYBOARD_SHORTCUTS = {
  FLIP: " ",
  NEXT: "ArrowRight",
  PREV: "ArrowLeft",
  SHUFFLE: "s",
  RESTART: "r",
};

export const API_ERROR_MESSAGES = {
  DEFAULT: "Something went wrong. Please try again.",
  NETWORK: "Couldn't reach the server. Check your connection and try again.",
  TIMEOUT: "The request took too long. Please try again.",
  ABORTED: "Request cancelled.",
};
