import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageLayout({ theme, onToggleTheme, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
