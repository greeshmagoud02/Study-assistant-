import { useMemo } from "react";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { QuizTimer } from "./QuizTimer";
import { Button } from "../Common/Button";
import { Badge } from "../Common/Badge";
import { ProgressBar } from "../Common/ProgressBar";
import { useQuiz } from "../../hooks/useQuiz";
import { downloadJson, slugify } from "../../utils/download";
import { estimateDifficulty } from "../../utils/difficulty";

const DIFFICULTY_TONE = { Easy: "green", Medium: "amber", Hard: "red" };

export function QuizContainer({ quiz }) {
  const {
    currentQuestion,
    currentIndex,
    total,
    answers,
    answeredCount,
    isLastQuestion,
    phase,
    round,
    elapsedSeconds,
    selectAnswer,
    next,
    prev,
    submit,
    results,
    retryIncorrect,
    restart,
  } = useQuiz(quiz.questions);

  const difficulty = useMemo(() => estimateDifficulty(quiz.questions), [quiz.questions]);
  const allAnswered = answeredCount === total;

  if (phase === "submitted" && results) {
    return (
      <QuizResults
        results={results}
        elapsedSeconds={elapsedSeconds}
        round={round}
        onRetryIncorrect={retryIncorrect}
        onRestart={restart}
      />
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{quiz.title}</h2>
            <Badge tone={DIFFICULTY_TONE[difficulty]}>{difficulty}</Badge>
            {round > 1 && <Badge tone="brand">Retry round {round}</Badge>}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {answeredCount} of {total} answered
          </p>
        </div>
        <div className="flex items-center gap-2">
          <QuizTimer elapsedSeconds={elapsedSeconds} />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => downloadJson(quiz, `${slugify(quiz.title)}-quiz`)}
          >
            Download JSON
          </Button>
        </div>
      </div>

      <ProgressBar current={currentIndex + 1} total={total} label="Question" />

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">
        <QuizQuestion
          question={currentQuestion}
          selected={answers[currentQuestion.id] ?? null}
          onSelect={(option) => selectAnswer(currentQuestion.id, option)}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <Button variant="secondary" onClick={prev} disabled={currentIndex === 0}>
          Previous
        </Button>

        {isLastQuestion ? (
          <Button variant="primary" onClick={submit} disabled={!allAnswered}>
            Submit quiz
          </Button>
        ) : (
          <Button variant="primary" onClick={next} disabled={!answers[currentQuestion.id]}>
            Next
          </Button>
        )}
      </div>

      {isLastQuestion && !allAnswered && (
        <p className="text-center text-xs text-amber-600 dark:text-amber-400">
          Answer all questions before submitting.
        </p>
      )}
    </div>
  );
}
