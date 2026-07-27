import { Button } from "../Common/Button";

const IconPrev = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const IconNext = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
const IconShuffle = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
  </svg>
);
const IconRestart = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 4v6h6M23 20v-6h-6" />
    <path d="M20.49 9A9 9 0 105.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
  </svg>
);

export function FlashcardControls({ onPrev, onNext, onShuffle, onRestart }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary" size="md" onClick={onPrev} icon={<IconPrev />} aria-label="Previous card">
        Prev
      </Button>
      <Button variant="primary" size="md" onClick={onNext} icon={<IconNext />} aria-label="Next card">
        Next
      </Button>
      <Button variant="secondary" size="md" onClick={onShuffle} icon={<IconShuffle />} aria-label="Shuffle cards">
        Shuffle
      </Button>
      <Button variant="ghost" size="md" onClick={onRestart} icon={<IconRestart />} aria-label="Restart deck">
        Restart
      </Button>
    </div>
  );
}
