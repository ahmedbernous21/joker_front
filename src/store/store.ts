import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./slices/canvasSlice";
import loadersReducer from "./slices/lodersSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    loaders : loadersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
