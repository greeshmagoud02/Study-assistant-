import { cn } from "../../utils/cn";

export function Flashcard({ card, isFlipped, onFlip }) {
  return (
    <div className="perspective mx-auto h-72 w-full max-w-xl sm:h-80">
      <button
        type="button"
        onClick={onFlip}
        aria-label="Flip flashcard"
        className={cn(
          "preserve-3d relative h-full w-full cursor-pointer rounded-3xl text-left transition-transform duration-500 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950",
          isFlipped && "rotate-y-180"
        )}
      >
        <div className="backface-hidden absolute inset-0 flex flex-col rounded-3xl border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Question
          </span>
          <div className="mt-4 flex flex-1 items-center justify-center overflow-y-auto scrollbar-thin">
            <p className="text-center text-xl font-semibold leading-snug text-gray-900 sm:text-2xl dark:text-gray-50">
              {card.question}
            </p>
          </div>
          <span className="text-center text-xs text-gray-400 dark:text-gray-600">
            Click or press space to flip
          </span>
        </div>

        <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 to-white p-8 shadow-md dark:border-brand-900 dark:from-brand-950 dark:to-gray-900">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            Answer
          </span>
          <div className="mt-4 flex flex-1 items-center justify-center overflow-y-auto scrollbar-thin">
            <p className="text-center text-lg font-medium leading-relaxed text-gray-800 sm:text-xl dark:text-gray-100">
              {card.answer}
            </p>
          </div>
          <span className="text-center text-xs text-gray-400 dark:text-gray-600">
            Click or press space to flip back
          </span>
        </div>
      </button>
    </div>
  );
}
