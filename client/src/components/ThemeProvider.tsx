import { useEffect } from 'react';
import { useTheme } from '../features/theme/useTheme';

/**
 * Syncs the Redux theme state to the <html> element class
 * so Tailwind's class-based dark mode works across the app.
 */
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  return <>{children}</>;
};

export default ThemeProvider;
