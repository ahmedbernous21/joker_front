import { createSlice } from "@reduxjs/toolkit";
import articlesInitialState from "../../data/data";
import { CanvasSliceState } from "../../interfaces/CanvasSliceInterfaces";

const initialState: CanvasSliceState = {
  articles: articlesInitialState,
  selectedArticleIndex: 0,
  selectedLayer: null,
  readyToExport: false,
};

const getCurrentArticle = (state: CanvasSliceState) => {
  return state.articles[state.selectedArticleIndex];
};

const getCurrentSide = (state) => {
  const currentArticle = getCurrentArticle(state);
  return currentArticle.active === "front"
    ? currentArticle.articleFrontSideInfo
    : currentArticle.articleBackSideInfo;
};
const updateLayer = (layers: any[], payload: any) =>
  layers.map((layer) =>
    layer.id === payload.id ? { ...layer, ...payload } : layer,
  );

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setArticleBackground(state, action) {
      getCurrentArticle(state).articleBackground = action.payload;
    },
    createText(state, action) {
      getCurrentSide(state)?.texts.push(action.payload);
    },
    editText(state, action) {
      const currentSide = getCurrentSide(state);
      if (currentSide) {
        currentSide.texts = currentSide.texts.map((text) =>
          text.id === action.payload.id ? { ...text, ...action.payload } : text,
        );
        const selectedArticle = getCurrentArticle(state);
        if (selectedArticle.active === "front") {
          selectedArticle.articleFrontSideInfo.texts = currentSide.texts;
        } else {
          if (selectedArticle.articleBackSideInfo != null) {
            selectedArticle.articleBackSideInfo.texts = currentSide.texts;
          }
        }
      }
    },
    readyToExportToggle(state, action) {
      state.readyToExport = action.payload === "1";
    },
    setSelectedLayer(state, action) {
      state.selectedLayer = action.payload;
    },
    createImage(state, action) {
      getCurrentSide(state)?.images.push(action.payload);
    },
    editImage(state, action) {
      const currentSide = getCurrentSide(state);
      if (currentSide) {
        currentSide.images = updateLayer(currentSide.images, action.payload);
      }
    },
    deleteLayer(state, action) {
      const currentSide = getCurrentSide(state);
      if (currentSide) {
        if (action.payload.type === "text") {
          currentSide.texts = currentSide.texts.filter(
            (text) => text.id !== action.payload.id,
          );
        } else {
          currentSide.images = currentSide.images.filter(
            (image) => image.id !== action.payload.id,
          );
        }
        state.selectedLayer = null;
      }
    },
    setActiveSide(state, action) {
      getCurrentArticle(state).active = action.payload;
      state.selectedLayer = null;
    },
    changeArticle(state, action) {
      const articleIndex = initialState.articles.findIndex(
        (article) => article.articleName === action.payload.articleName,
      );
      if (articleIndex !== -1) {
        state.selectedArticleIndex = articleIndex;
      }
      state.selectedLayer = null;
    },
  },
});

const canvasActions = canvasSlice.actions;
const canvasReducer = canvasSlice.reducer;

export default canvasReducer;
export { canvasActions };
