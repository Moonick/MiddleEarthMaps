import { configureStore } from "@reduxjs/toolkit";
import userLocationReducer from "./slices/userLocationSlice";
import pinsReducer from "./slices/pinsSlice";

export const store = configureStore({
  reducer: {
    userLocationState: userLocationReducer,
    pinsState: pinsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
