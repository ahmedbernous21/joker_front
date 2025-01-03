import { createSlice } from "@reduxjs/toolkit";

interface LoadersSliceState {
    imagesLoad   : boolean[] | null;
}

const initialState: LoadersSliceState = {
    imagesLoad : null,
};


const loadersSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    setImagesLoad: (state,action) => {
      state.imagesLoad = action.payload;
    },
    removeImageLoading: (state) => {
      if (state.imagesLoad !=  null) {
        state.imagesLoad.pop();
      }
    }
    
  },
});

const loadersActions = loadersSlice.actions;
const loadersReducer = loadersSlice.reducer;

export default loadersReducer;
export { loadersActions };
