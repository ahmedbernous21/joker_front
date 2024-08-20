import { createSlice } from "@reduxjs/toolkit";

interface tshirtSliceState {
  bgCanvas: string;
  selectedId: number | null;
  frontTexts: any[]; // any for now
  images: any[]; // any for now
  readyToExport: boolean;
}

const initialState: tshirtSliceState = {
  bgCanvas: "#9a9996",
  selectedId: null,
  frontTexts: [],
  images: [],
  readyToExport: false,
};
const canvasSlice = createSlice({
  name: "tShirt",
  initialState,
  reducers: {
    setCanvasBG(state, action) {
      state.bgCanvas = action.payload;
    },
    createText(state, action) {
      state.frontTexts.push(action.payload);
    },
    editText(state, action) {
      state.frontTexts = state.frontTexts.map((frontText: any) => {
        if (frontText.id == action.payload.id) {
          frontText.text = action.payload.text;
        }
        return frontText;
      });
    },
    setTextSize(state, action) {
      state.frontTexts = state.frontTexts.map((frontText: any) => {
        if (frontText.id == action.payload.id) {
          frontText.fontSize = action.payload.fontSize;
        }
        return frontText;
      });
    },
    setFontFamily(state: any, action) {
      if (action.payload.type == "front") {
        state.frontFontFamily = action.payload.value;
      } else {
        state.backFontFamily = action.payload.value;
      }
    },
    setTextColor(state: any, action) {
      console.log(action.payload);
      state.frontTexts = state.frontTexts.map((frontText: any) => {
        if (frontText.id == action.payload.id) {
          frontText.color = action.payload.color;
        }
        return frontText;
      });
    },
    setTextRotation(state, action) {
      state.frontTexts = state.frontTexts.map((frontText: any) => {
        if (frontText.id == action.payload.id) {
          frontText.rotation = action.payload.rotation;
        }
        return frontText;
      });
    },
    readyToExportToggle(state, action) {
      if (action.payload == "1") {
        state.readyToExport = true;
      } else {
        state.readyToExport = false;
      }
    },
    setSelectedId(state, action) {
      state.selectedId = action.payload;
    },
    changeFontStyle(state, action) {
      state.frontTexts = state.frontTexts.map((frontText: any) => {
        if (frontText.id == action.payload.id) {
          if (action.payload.style === "italic") {
            frontText.italic = !frontText.italic;
          } else if (action.payload.style == "bold") {
            frontText.bold = !frontText.bold;
          } else {
            frontText.underline = !frontText.underline;
          }
        }
        return frontText;
      });
    },
    changeFontFamily(state, action) {
      state.frontTexts = state.frontTexts.map((frontText: any) => {
        if (frontText.id == action.payload.id) {
          frontText.fontFamily = action.payload.fontFamily;
        }
        return frontText;
      });
    },
    createImage(state, action) {
      state.images.push(action.payload);
    },
    // now am gonna do the same for images
  },
});

const tShirtActions = canvasSlice.actions;

const tShirtReducer = canvasSlice.reducer;

export default tShirtReducer;

export { tShirtActions };
