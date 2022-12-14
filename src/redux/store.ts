import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filterSlice';
import tasksSlice from './tasksSlice';
import themeSlice from './themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    tasks: tasksSlice,
    filter: filterSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
