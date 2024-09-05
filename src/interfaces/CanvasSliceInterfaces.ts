import { Canvas, Image, Text } from "fabric/fabric-impl";
import { Ref } from "react";

interface ArticleSideInfo {
  name: string;
  src: string;
  texts: Text[];
  images: Image[];
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
  readyToExport: boolean;
  // isEditing: boolean;
}

export type { CanvasSliceState, Article, SelectedLayer, ArticleSideInfo };
