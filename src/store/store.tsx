
import { configureStore } from '@reduxjs/toolkit';
import userLocationReducer from './slices/userLocationSlice';
import pinsReducer from "./slices/pinsSlice";

export const store = configureStore({
  reducer: {
    userLocation: userLocationReducer,
    pins: pinsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;