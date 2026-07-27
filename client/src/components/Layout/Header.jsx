import { ThemeToggle } from "./ThemeToggle";

export function Header({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm shadow-brand-600/30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 4L2 9l10 5 10-5-10-5z" />
              <path d="M2 14l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
            Study Assistant
          </span>
        </div>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
