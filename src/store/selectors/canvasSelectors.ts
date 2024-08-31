// selectors/canvasSelectors.ts
import { IRootState } from "../../store/store";
import { CanvasSliceState } from "../../interfaces/CanvasSliceInterfaces";

export const getCurrentArticle = (
  state: IRootState,
): CanvasSliceState["articles"][number] =>
  state.canvas.articles[state.canvas.selectedArticleIndex];
export const getCurrentSide = (state: IRootState) => {
  const article = getCurrentArticle(state);
  return article.active === "front"
    ? article.articleFrontSideInfo
    : article.articleBackSideInfo;
};

export const getCurrentSideTexts = (state: IRootState) =>
  getCurrentSide(state)?.texts || [];

export const getCurrentSideImage = (state: IRootState) =>
  getCurrentSide(state)?.src;
export const getCurrentSideImages = (state: IRootState) =>
  getCurrentSide(state)?.images || [];

export const getCurrentSelectedText = (state: IRootState) =>
  getCurrentSideTexts(state).find(
    (text) => text.id === state.canvas.selectedLayer?.id,
  );

export const getCurrentSelectedImage = (state: IRootState) =>
  getCurrentSideImages(state).find(
    (image) => image.id === state.canvas.selectedLayer?.id,
  );
