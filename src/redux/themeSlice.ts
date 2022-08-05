import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  theme: string;
}

const initialState: ThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state: any, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state: any) => {
      if (state.theme === 'light') {
        state.theme = 'dark';
      } else {
        state.theme = 'light';
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
