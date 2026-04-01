import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { toggleTheme, setTheme } from './themeSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return {
    mode,
    isDark: mode === 'dark',
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (theme: 'light' | 'dark') => dispatch(setTheme(theme)),
  };
};
