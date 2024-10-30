import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

// Import your reducers here
// import authReducer from './features/auth/authSlice';
// import todoReducer from './features/todo/todoSlice';

import authReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types and hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;