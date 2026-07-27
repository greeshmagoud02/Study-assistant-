import { Button } from "../Common/Button";
import { Badge } from "../Common/Badge";
import { QuizQuestion } from "./QuizQuestion";
import { formatTime } from "../../utils/formatTime";

function scoreTone(percent) {
  if (percent >= 80) return "green";
  if (percent >= 50) return "amber";
  return "red";
}

export function QuizResults({ results, elapsedSeconds, round, onRetryIncorrect, onRestart }) {
  const { items, correctCount, total, scorePercent, incorrectQuestions } = results;

  return (
    <div className="animate-fade-in space-y-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {round > 1 && (
          <Badge tone="brand" className="mb-3">
            Retry round {round}
          </Badge>
        )}
        <p className="text-sm font-medium uppercase tracking-wide text-gray-400 dark:text-gray-500">
          Your score
        </p>
        <p className="mt-2 text-5xl font-extrabold text-gray-900 dark:text-white">
          {scorePercent}%
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {correctCount} out of {total} correct &middot; {formatTime(elapsedSeconds)}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {incorrectQuestions.length > 0 && (
            <Button variant="primary" onClick={onRetryIncorrect}>
              Retry {incorrectQuestions.length} incorrect
            </Button>
          )}
          <Button variant="secondary" onClick={onRestart}>
            Restart quiz
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Review answers</h3>
        {items.map(({ question, selected, isCorrect }, index) => (
          <div
            key={question.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 dark:text-gray-600">
                Question {index + 1}
              </span>
              <Badge tone={isCorrect ? "green" : "red"}>{isCorrect ? "Correct" : "Incorrect"}</Badge>
              {!selected && <Badge tone="gray">Skipped</Badge>}
            </div>
            <QuizQuestion question={question} selected={selected} reviewMode />
          </div>
        ))}
      </div>
    </div>
  );
}
