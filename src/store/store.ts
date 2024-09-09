import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./slices/canvasSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
