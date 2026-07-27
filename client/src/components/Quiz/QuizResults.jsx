import { Button } from "../Common/Button";
import { Badge } from "../Common/Badge";
import { QuizQuestion } from "./QuizQuestion";
import { formatTime } from "../../utils/formatTime";

const SCORE_TONES = {
  high: { textClass: "text-emerald-600 dark:text-emerald-400", badge: "green", label: "Great job!" },
  mid: { textClass: "text-amber-600 dark:text-amber-400", badge: "amber", label: "Good effort" },
  low: { textClass: "text-red-600 dark:text-red-400", badge: "red", label: "Keep practicing" },
};

function getScoreTone(percent) {
  if (percent >= 80) return SCORE_TONES.high;
  if (percent >= 50) return SCORE_TONES.mid;
  return SCORE_TONES.low;
}

export function QuizResults({ results, elapsedSeconds, round, onRetryIncorrect, onRestart }) {
  const { items, correctCount, total, scorePercent, incorrectQuestions } = results;
  const tone = getScoreTone(scorePercent);

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
        <p className={`mt-2 text-5xl font-extrabold ${tone.textClass}`}>{scorePercent}%</p>
        <Badge tone={tone.badge} className="mt-3">
          {tone.label}
        </Badge>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
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
