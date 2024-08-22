import { createSlice } from "@reduxjs/toolkit";
import articlesInitialState from "../../data/data";

interface canvasSliceState {
  articles: any;
  selectedArticleIndex: number;
  bgCanvas: string;
  selectedLayer: any | null;
  readyToExport: boolean;
}

const initialState: canvasSliceState = {
  articles: articlesInitialState,
  selectedArticleIndex: 0,
  bgCanvas: "#9a9996",
  selectedLayer: null,
  readyToExport: false,
};
const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setCanvasBG(state, action) {
      state.bgCanvas = action.payload;
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
                canvasText.text = action.payload.text;
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
              canvasText.text = action.payload.text;
            }
            return canvasText;
          });
      }
    },
    setTextSize(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.canvasTexts =
          state.articles[state.selectedArticleIndex].firstImage.canvasTexts.map(
            (canvasText: any) => {
              if (canvasText.id == action.payload.id) {
                canvasText.fontSize = action.payload.fontSize;
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
              canvasText.fontSize = action.payload.fontSize;
            }
            return canvasText;
          });
      }
    },
    setTextColor(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.canvasTexts =
          state.articles[state.selectedArticleIndex].firstImage.canvasTexts.map(
            (canvasText: any) => {
              if (canvasText.id == action.payload.id) {
                canvasText.color = action.payload.color;
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
              canvasText.color = action.payload.color;
            }
            return canvasText;
          });
      }
    },
    setTextRotation(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        if (action.payload.type == "text") {
          state.articles[state.selectedArticleIndex].firstImage.canvasTexts =
            state.articles[
              state.selectedArticleIndex
            ].firstImage.canvasTexts.map((canvasText: any) => {
              if (canvasText.id == action.payload.id) {
                canvasText.rotation = action.payload.rotation;
              }
              return canvasText;
            });
        } else {
          state.articles[state.selectedArticleIndex].firstImage.images =
            state.articles[state.selectedArticleIndex].firstImage.images.map(
              (image: any) => {
                if (image.id == action.payload.id) {
                  image.rotation = action.payload.rotation;
                }
                return image;
              },
            );
        }
      } else {
        if (action.payload.type == "text") {
          state.articles[state.selectedArticleIndex].secondImage.canvasTexts =
            state.articles[
              state.selectedArticleIndex
            ].secondImage.canvasTexts.map((canvasText: any) => {
              if (canvasText.id == action.payload.id) {
                canvasText.rotation = action.payload.rotation;
              }
              return canvasText;
            });
        } else {
          state.articles[state.selectedArticleIndex].secondImage.images =
            state.articles[state.selectedArticleIndex].secondImage.images.map(
              (image: any) => {
                if (image.id == action.payload.id) {
                  image.rotation = action.payload.rotation;
                }
                return image;
              },
            );
        }
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
    changeFontStyle(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.canvasTexts =
          state.articles[state.selectedArticleIndex].firstImage.canvasTexts.map(
            (canvasText: any) => {
              if (canvasText.id == action.payload.id) {
                if (action.payload.style === "italic") {
                  canvasText.italic = !canvasText.italic;
                } else if (action.payload.style == "bold") {
                  canvasText.bold = !canvasText.bold;
                } else {
                  canvasText.underline = !canvasText.underline;
                }
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
              if (action.payload.style === "italic") {
                canvasText.italic = !canvasText.italic;
              } else if (action.payload.style == "bold") {
                canvasText.bold = !canvasText.bold;
              } else {
                canvasText.underline = !canvasText.underline;
              }
            }
            return canvasText;
          });
      }
    },
    changeFontFamily(state, action) {
      if (state.articles[state.selectedArticleIndex].active == "front") {
        state.articles[state.selectedArticleIndex].firstImage.canvasTexts =
          state.articles[state.selectedArticleIndex].firstImage.canvasTexts.map(
            (canvasText: any) => {
              if (canvasText.id == action.payload.id) {
                canvasText.fontFamily = action.payload.fontFamily;
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
              canvasText.fontFamily = action.payload.fontFamily;
            }
            return canvasText;
          });
      }
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
    },
  },
});

const canvasActions = canvasSlice.actions;

const canvasReducer = canvasSlice.reducer;

export default canvasReducer;

export { canvasActions };
