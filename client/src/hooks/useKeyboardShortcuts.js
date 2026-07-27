import { useEffect } from "react";

/**
 * Registers global keydown handlers. `handlers` maps a key (as reported by
 * KeyboardEvent.key) to a callback. Ignores keystrokes while typing in
 * inputs/textareas so shortcuts never hijack form entry.
 */
export function useKeyboardShortcuts(handlers, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    function onKeyDown(event) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if (isTyping) return;

      const handler = handlers[event.key];
      if (handler) {
        event.preventDefault();
        handler(event);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlers, enabled]);
}
