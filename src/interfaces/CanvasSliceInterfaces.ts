import { ImageConfig } from "konva/lib/shapes/Image";
import { TextConfig } from "konva/lib/shapes/Text";

interface ArticleSideInfo {
  name: string;
  src: string;
  texts: TextConfig[];
  images: ImageConfig[];
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
  articles: Article[];
  selectedArticleIndex: number;
  selectedLayer: SelectedLayer | null;
  readyToExport: boolean;
  // isEditing: boolean;
}

export type { CanvasSliceState, Article, SelectedLayer, ArticleSideInfo };
