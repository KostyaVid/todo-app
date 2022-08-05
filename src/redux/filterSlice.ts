import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IFilterState {
  filter: 'all' | 'active' | 'completed';
}

const initialState: IFilterState = {
  filter: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state: IFilterState, action: PayloadAction<IFilterState>) => {
      state.filter = action.payload.filter;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
