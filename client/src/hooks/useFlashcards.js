import { useCallback, useMemo, useState } from "react";
import { shuffle } from "../utils/shuffle";

export function useFlashcards(cards) {
  const [order, setOrder] = useState(() => cards.map((c) => c.id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewedIds, setViewedIds] = useState(() => new Set());

  const cardsById = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const orderedCards = useMemo(() => order.map((id) => cardsById.get(id)), [order, cardsById]);
  const currentCard = orderedCards[currentIndex];

  const markViewed = useCallback((id) => {
    setViewedIds((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  }, []);

  const flip = useCallback(() => {
    setIsFlipped((prev) => !prev);
    if (currentCard) markViewed(currentCard.id);
  }, [currentCard, markViewed]);

  const goTo = useCallback(
    (index) => {
      const clamped = Math.max(0, Math.min(index, orderedCards.length - 1));
      setCurrentIndex(clamped);
      setIsFlipped(false);
    },
    [orderedCards.length]
  );

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % orderedCards.length);
    setIsFlipped(false);
  }, [orderedCards.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + orderedCards.length) % orderedCards.length);
    setIsFlipped(false);
  }, [orderedCards.length]);

  const shuffleCards = useCallback(() => {
    setOrder((prev) => shuffle(prev));
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const restart = useCallback(() => {
    setOrder(cards.map((c) => c.id));
    setCurrentIndex(0);
    setIsFlipped(false);
    setViewedIds(new Set());
  }, [cards]);

  return {
    currentCard,
    currentIndex,
    total: orderedCards.length,
    isFlipped,
    viewedCount: viewedIds.size,
    flip,
    next,
    prev,
    goTo,
    shuffleCards,
    restart,
  };
}
