import { configureStore } from "@reduxjs/toolkit";
import tShirtReducer from "./slices/tShirtSlice";

const store = configureStore({
  reducer: {
    tShirt: tShirtReducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export default store;
