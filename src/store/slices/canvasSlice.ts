import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import articlesInitialState from "../../data/data";
import { CanvasSliceState } from "../../interfaces/CanvasSliceInterfaces";
import { WritableDraft } from "immer";

const initialState: CanvasSliceState = {
  canvasRef: null,
  articles: articlesInitialState,
  selectedArticleIndex: 0,
  selectedLayer: null,
  frontCanvas: null,
  backCanvas: null,
};

const getCurrentArticle = (state: WritableDraft<CanvasSliceState>) => {
  return state.articles[state.selectedArticleIndex];
};

const getCurrentSide = (state: WritableDraft<CanvasSliceState>) => {
  const currentArticle = getCurrentArticle(state);
  return currentArticle.active === "front"
    ? currentArticle.articleFrontSideInfo
    : currentArticle.articleBackSideInfo;
};

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
    createImage(state, action) {
      getCurrentSide(state)?.images.push(action.payload);
    },
    editText(state, action) {
      const currentArticle = getCurrentArticle(state);
      const isExist = currentArticle.articleFrontSideInfo.texts.find(
        (text) => text.id == action.payload.id,
      );
      if (isExist) {
        currentArticle.articleFrontSideInfo.texts =
          currentArticle.articleFrontSideInfo.texts.map((text) =>
            text.id === action.payload.id
              ? { ...text, ...action.payload }
              : text,
          );
      } else {
        if (currentArticle.articleBackSideInfo) {
          currentArticle.articleBackSideInfo.texts =
            currentArticle.articleBackSideInfo.texts.map((text) =>
              text.id === action.payload.id
                ? { ...text, ...action.payload }
                : text,
            );
        }
      }
    },
    editImage(state, action) {
      const currentArticle = getCurrentArticle(state);
      const isExist = currentArticle.articleFrontSideInfo.images.find(
        (image) => image.id == action.payload.id,
      );
      if (isExist) {
        currentArticle.articleFrontSideInfo.images =
          currentArticle.articleFrontSideInfo.images.map((image) =>
            image.id === action.payload.id
              ? { ...image, ...action.payload }
              : image,
          );
      } else {
        if (currentArticle.articleBackSideInfo) {
          currentArticle.articleBackSideInfo.images =
            currentArticle.articleBackSideInfo.images.map((image) =>
              image.id === action.payload.id
                ? { ...image, ...action.payload }
                : image,
            );
        }
      }
    },

    setSelectedLayer(state, action) {
      state.selectedLayer = action.payload;
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
    setActiveSide(state, action: PayloadAction<"front" | "back">) {
      getCurrentArticle(state).active = action.payload;

      state.selectedLayer = null;
    },

    changeArticle(state, action) {
      const articleIndex = state.articles.findIndex(
        (article) => article.articleName === action.payload.articleName,
      );
      if (articleIndex !== -1) {
        state.selectedArticleIndex = articleIndex;
      }

      if (
        state.articles[state.selectedArticleIndex].articleBackSideInfo == null
      ) {
        state.backCanvas = null;
      }

      state.selectedLayer = null;
    },
    setFrontCanvas(state, action) {
      state.frontCanvas = action.payload;
    },
    setBackCanvas(state, action) {
      state.backCanvas = action.payload;
    },
  },
});

const canvasActions = canvasSlice.actions;
const canvasReducer = canvasSlice.reducer;

export default canvasReducer;
export { canvasActions };
