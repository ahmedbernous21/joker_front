import { Canvas, IImageOptions, TextOptions } from "fabric/fabric-impl";
import { Ref } from "react";

interface TextOptionsId extends TextOptions {
  id: string;
}
interface IImageOptionsId extends IImageOptions {
  id: string;
}

interface ArticleSideInfo {
  name: string;
  src: string;
  texts: TextOptionsId[];
  images: IImageOptionsId[];
}

interface Article {
  id: string;
  articleName: string;
  articleFrontSideInfo: ArticleSideInfo;
  articleBackSideInfo: ArticleSideInfo | null;
  active: "front" | "back";
  articleBackground: string;
}
interface SelectedLayer {
  type: "text" | "image";
  id: string;
}

interface CanvasSliceState {
  canvasRef: Canvas | null | Ref<Canvas>;
  articles: Article[];
  selectedArticleIndex: number;
  selectedLayer: SelectedLayer | null;
  frontCanvas: null | Canvas;
  backCanvas: null | Canvas;
}

export type {
  CanvasSliceState,
  Article,
  SelectedLayer,
  ArticleSideInfo,
  TextOptionsId,
  IImageOptionsId,
};
