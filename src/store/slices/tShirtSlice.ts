import { createSlice } from "@reduxjs/toolkit";

const canvasSlice = createSlice({
  name: "tShirt",
  initialState: {
    bgCanvas: "#9a9996",
    frontText: "",
    backText: "",
    frontTextSize: 16,
    backTextSize: 16,
    isFrontTextBold: false,
    isBackTextBold: false,
    frontFontFamily: '"Grey Qo", cursive',
    backFontFamily: '"Grey Qo", cursive',
    frontTextColor: "black",
    backTextColor: "black",
    frontImageUrl: null,
    backImageUrl: null,
    readyToExport: false,
  },
  reducers: {
    setCanvasBG(state, action) {
      state.bgCanvas = action.payload;
    },
    setFrontText(state, action) {
      state.frontText = action.payload;
    },
    setBackText(state, action) {
      state.backText = action.payload;
    },
    setFrontTextSize(state, action) {
      state.frontTextSize = action.payload;
    },
    setBackTextSize(state, action) {
      state.backTextSize = action.payload;
    },
    FrontTextBoldToggle(state, action) {
      if (action.payload === "1") {
        state.isFrontTextBold = true;
      } else {
        state.isFrontTextBold = false;
      }
    },
    BackTextBoldToggle(state, action) {
      if (action.payload === "1") {
        state.isBackTextBold = true;
      } else {
        state.isBackTextBold = false;
      }
    },
    setFontFamily(state, action) {
      if (action.payload.type == "front") {
        state.frontFontFamily = action.payload.value;
      } else {
        state.backFontFamily = action.payload.value;
      }
    },
    setTextColor(state, action) {
      if (action.payload.type == "front") {
        state.frontTextColor = action.payload.value;
      } else {
        state.backTextColor = action.payload.value;
      }
    },
    setFrontImageUrl(state, action) {
      state.frontImageUrl = action.payload;
      console.log(state.frontImageUrl);
    },
    setBackImageUrl(state, action) {
      state.backImageUrl = action.payload;
    },
    readyToExportToggle(state, action) {
      if (action.payload == "1") {
        state.readyToExport = true;
      } else {
        state.readyToExport = false;
      }
    },
  },
});

const tShirtActions = canvasSlice.actions;

const tShirtReducer = canvasSlice.reducer;

export default tShirtReducer;

export { tShirtActions };
