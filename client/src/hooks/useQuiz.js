import { useCallback, useMemo, useState } from "react";
import { useQuizTimer } from "./useQuizTimer";

export function useQuiz(allQuestions) {
  const [activeQuestions, setActiveQuestions] = useState(allQuestions);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("active"); // active | submitted
  const [round, setRound] = useState(1);

  const { elapsedSeconds, reset: resetTimer } = useQuizTimer(phase === "active");

  const currentQuestion = activeQuestions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const isLastQuestion = currentIndex === activeQuestions.length - 1;

  const selectAnswer = useCallback((questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  }, []);

  const goTo = useCallback(
    (index) => {
      setCurrentIndex(Math.max(0, Math.min(index, activeQuestions.length - 1)));
    },
    [activeQuestions.length]
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  const submit = useCallback(() => {
    setPhase("submitted");
  }, []);

  const results = useMemo(() => {
    if (phase !== "submitted") return null;

    const items = activeQuestions.map((question) => {
      const selected = answers[question.id] ?? null;
      const isCorrect = selected === question.correctAnswer;
      return { question, selected, isCorrect };
    });

    const correctCount = items.filter((i) => i.isCorrect).length;

    return {
      items,
      correctCount,
      total: items.length,
      scorePercent: items.length ? Math.round((correctCount / items.length) * 100) : 0,
      incorrectQuestions: items.filter((i) => !i.isCorrect).map((i) => i.question),
    };
  }, [phase, activeQuestions, answers]);

  const retryIncorrect = useCallback(() => {
    if (!results || results.incorrectQuestions.length === 0) return;
    setActiveQuestions(results.incorrectQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setPhase("active");
    setRound((r) => r + 1);
    resetTimer();
  }, [results, resetTimer]);

  const restart = useCallback(() => {
    setActiveQuestions(allQuestions);
    setAnswers({});
    setCurrentIndex(0);
    setPhase("active");
    setRound(1);
    resetTimer();
  }, [allQuestions, resetTimer]);

  return {
    activeQuestions,
    currentQuestion,
    currentIndex,
    total: activeQuestions.length,
    answers,
    answeredCount,
    isLastQuestion,
    phase,
    round,
    elapsedSeconds,
    selectAnswer,
    next,
    prev,
    goTo,
    submit,
    results,
    retryIncorrect,
    restart,
  };
}
