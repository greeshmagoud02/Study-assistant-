import { PageLayout } from "./components/Layout/PageLayout";
import { Home } from "./pages/Home";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <PageLayout theme={theme} onToggleTheme={toggleTheme}>
      <Home />
    </PageLayout>
  );
}
