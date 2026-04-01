import { createSlice } from '@reduxjs/toolkit';

type ThemeState = {
  mode: 'light' | 'dark';
};

const getInitialTheme = (): 'light' | 'dark' => {
  const stored = localStorage.getItem('adminTheme');
  if (stored === 'dark' || stored === 'light') return stored;
  // Respect system preference as fallback
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  return 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('adminTheme', state.mode);
    },
    setTheme(state, action: { payload: 'light' | 'dark' }) {
      state.mode = action.payload;
      localStorage.setItem('adminTheme', state.mode);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
