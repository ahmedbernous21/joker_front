import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./slices/canvasSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
