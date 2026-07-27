import { cn } from "../../utils/cn";

export function QuizQuestion({ question, selected, onSelect, reviewMode = false }) {
  return (
    <div className="space-y-4">
      <p className="text-lg font-semibold leading-snug text-gray-900 dark:text-gray-50">
        {question.question}
      </p>

      <div className="space-y-2.5" role="radiogroup" aria-label={question.question}>
        {question.options.map((option) => {
          const isSelected = selected === option;
          const isCorrectOption = option === question.correctAnswer;

          let stateClasses =
            "border-gray-200 hover:border-brand-300 hover:bg-brand-50/50 dark:border-gray-800 dark:hover:border-brand-800 dark:hover:bg-brand-950/40";

          if (reviewMode) {
            if (isCorrectOption) {
              stateClasses =
                "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40";
            } else if (isSelected && !isCorrectOption) {
              stateClasses = "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40";
            } else {
              stateClasses = "border-gray-200 opacity-60 dark:border-gray-800";
            }
          } else if (isSelected) {
            stateClasses = "border-brand-500 bg-brand-50 ring-1 ring-brand-500 dark:bg-brand-950/50";
          }

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={reviewMode}
              onClick={() => onSelect?.(option)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm font-medium text-gray-800 transition-colors dark:text-gray-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                !reviewMode && "cursor-pointer",
                stateClasses
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2",
                  reviewMode && isCorrectOption
                    ? "border-emerald-500 bg-emerald-500 text-white"
                    : reviewMode && isSelected
                    ? "border-red-500 bg-red-500 text-white"
                    : isSelected
                    ? "border-brand-500 bg-brand-500"
                    : "border-gray-300 dark:border-gray-700"
                )}
              >
                {(isSelected || (reviewMode && isCorrectOption)) && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {reviewMode && (
        <div className="rounded-xl bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
          <span className="font-semibold text-gray-800 dark:text-gray-100">Explanation: </span>
          {question.explanation}
        </div>
      )}
    </div>
  );
}
