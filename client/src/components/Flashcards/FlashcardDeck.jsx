import { useMemo } from "react";
import { Flashcard } from "./Flashcard";
import { FlashcardControls } from "./FlashcardControls";
import { ProgressBar } from "../Common/ProgressBar";
import { Button } from "../Common/Button";
import { useFlashcards } from "../../hooks/useFlashcards";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";
import { downloadJson, slugify } from "../../utils/download";
import { KEYBOARD_SHORTCUTS } from "../../constants";

export function FlashcardDeck({ deck }) {
  const {
    currentCard,
    currentIndex,
    total,
    isFlipped,
    viewedCount,
    flip,
    next,
    prev,
    shuffleCards,
    restart,
  } = useFlashcards(deck.cards);

  const shortcuts = useMemo(
    () => ({
      [KEYBOARD_SHORTCUTS.FLIP]: flip,
      [KEYBOARD_SHORTCUTS.NEXT]: next,
      [KEYBOARD_SHORTCUTS.PREV]: prev,
      [KEYBOARD_SHORTCUTS.SHUFFLE]: shuffleCards,
      [KEYBOARD_SHORTCUTS.RESTART]: restart,
    }),
    [flip, next, prev, shuffleCards, restart]
  );
  useKeyboardShortcuts(shortcuts);

  if (!currentCard) return null;

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{deck.title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {total} flashcards &middot; {viewedCount} viewed
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => downloadJson(deck, `${slugify(deck.title)}-flashcards`)}
        >
          Download JSON
        </Button>
      </div>

      <ProgressBar current={currentIndex + 1} total={total} label="Progress" />

      <Flashcard card={currentCard} isFlipped={isFlipped} onFlip={flip} />

      <FlashcardControls onPrev={prev} onNext={next} onShuffle={shuffleCards} onRestart={restart} />

      <p className="text-center text-xs text-gray-400 dark:text-gray-600">
        Shortcuts: Space to flip &middot; ← → to navigate &middot; S to shuffle &middot; R to restart
      </p>
    </div>
  );
}
