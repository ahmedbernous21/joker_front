import { createSlice } from "@reduxjs/toolkit";
import articlesInitialState from "../../data/data";

interface canvasSliceState {
  articles: any;
  selectedArticleIndex: number;
  selectedLayer: any | null;
  readyToExport: boolean;
}

const initialState: canvasSliceState = {
  articles: articlesInitialState,
  selectedArticleIndex: 0,
  selectedLayer: null,
  readyToExport: false,
};
const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setArticleBackground(state, action) {
      state.articles[state.selectedArticleIndex].articleBackground =
        action.payload;
    },
    createText(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.canvasTexts.push(
          action.payload,
        );
      } else {
        state.articles[state.selectedArticleIndex].secondImage.canvasTexts.push(
          action.payload,
        );
      }
    },
    editText(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.canvasTexts =
          state.articles[state.selectedArticleIndex].firstImage.canvasTexts.map(
            (canvasText: any) => {
              if (canvasText.id == action.payload.id) {
                canvasText = { ...canvasText, ...action.payload };
              }
              return canvasText;
            },
          );
      } else {
        state.articles[state.selectedArticleIndex].secondImage.canvasTexts =
          state.articles[
            state.selectedArticleIndex
          ].secondImage.canvasTexts.map((canvasText: any) => {
            if (canvasText.id == action.payload.id) {
              canvasText = { ...canvasText, ...action.payload };
            }
            return canvasText;
          });
      }
    },
    readyToExportToggle(state, action) {
      if (action.payload == "1") {
        state.readyToExport = true;
      } else {
        state.readyToExport = false;
      }
    },
    setSelectedLayer(state, action) {
      state.selectedLayer = action.payload;
    },

    createImage(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.images.push(
          action.payload,
        );
      } else {
        state.articles[state.selectedArticleIndex].secondImage.images.push(
          action.payload,
        );
      }
    },
    editImage(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.images =
          state.articles[state.selectedArticleIndex].firstImage.images.map(
            (image: any) => {
              if (image.id == action.payload.id) {
                image = { ...image, ...action.payload };
              }
              return image;
            },
          );
      } else {
        state.articles[state.selectedArticleIndex].secondImage.images =
          state.articles[state.selectedArticleIndex].secondImage.images.map(
            (image: any) => {
              if (image.id == action.payload.id) {
                image = { ...image, ...action.payload };
              }
              return image;
            },
          );
      }
    },
    deleteLayer(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        if (action.payload.type == "text") {
          state.articles[state.selectedArticleIndex].firstImage.canvasTexts =
            state.articles[
              state.selectedArticleIndex
            ].firstImage.canvasTexts.filter(
              (canvasText: any) => canvasText.id != action.payload.id,
            );
        } else {
          state.articles[state.selectedArticleIndex].firstImage.images =
            state.articles[state.selectedArticleIndex].firstImage.images.filter(
              (image: any) => image.id != action.payload.id,
            );
        }
      } else {
        if (action.payload.type == "text") {
          state.articles[state.selectedArticleIndex].secondImage.canvasTexts =
            state.articles[
              state.selectedArticleIndex
            ].secondImage.canvasTexts.filter(
              (canvasText: any) => canvasText.id != action.payload.id,
            );
        } else {
          state.articles[state.selectedArticleIndex].secondImage.images =
            state.articles[
              state.selectedArticleIndex
            ].secondImage.images.filter(
              (image: any) => image.id != action.payload.id,
            );
        }
      }

      state.selectedLayer = null;
    },
    setActiveSide(state, action) {
      state.articles[state.selectedArticleIndex].active = action.payload;
      state.selectedLayer = null;
    },
    changeArticle(state, action) {
      articlesInitialState.forEach((article, index) => {
        if (article.articleName == action.payload.articleName) {
          state.selectedArticleIndex = index;
        }
      });
      state.selectedLayer = null;
    },
  },
});

const canvasActions = canvasSlice.actions;

const canvasReducer = canvasSlice.reducer;

export default canvasReducer;

export { canvasActions };
