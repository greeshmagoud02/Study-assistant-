/**
 * @typedef {Object} Flashcard
 * @property {number} id
 * @property {string} question
 * @property {string} answer
 */

/**
 * @typedef {Object} FlashcardSet
 * @property {"flashcards"} type
 * @property {string} title
 * @property {Flashcard[]} cards
 */

/**
 * @typedef {Object} QuizQuestion
 * @property {number} id
 * @property {string} question
 * @property {string[]} options
 * @property {string} correctAnswer
 * @property {string} explanation
 */

/**
 * @typedef {Object} Quiz
 * @property {"quiz"} type
 * @property {string} title
 * @property {QuizQuestion[]} questions
 */

/**
 * @typedef {Object} HistoryEntry
 * @property {string} id
 * @property {"flashcards"|"quiz"} mode
 * @property {string} title
 * @property {string} inputText
 * @property {FlashcardSet|Quiz} data
 * @property {number} createdAt
 */

export {};
