import React, { createContext, useState } from "react";
import * as fabric from "fabric";
import { Article } from "../interfaces/CanvasSliceInterfaces";

// Define default article with proper structure
const defaultArticle: Article = {
  id: "",
  articleId: "",
  articleName: "Unknown Article",
  articleType: "t_shirt",
  articleColor: "white",
  articlePrice: 0,
  articleBackground: "#ffffff",
  isDoubleSided: false,
  active: "front",
  articleFrontSideInfo: {
    name: "front",
    src: "",
    texts: [],
    images: [],
  },
  articleBackSideInfo: null,
};

interface ShopContextType {
  currentArticle: Article;
  setCurrentArticle: (article: Article) => void;
  frontCanvas: fabric.Canvas | null;
  setFrontCanvas: (canvas: fabric.Canvas | null) => void;
  backCanvas: fabric.Canvas | null;
  setBackCanvas: (canvas: fabric.Canvas | null) => void;
}

export const ShopContext = createContext<ShopContextType>({
  currentArticle: defaultArticle,
  setCurrentArticle: () => {},
  frontCanvas: null,
  setFrontCanvas: () => {},
  backCanvas: null,
  setBackCanvas: () => {},
});

interface ShopProviderProps {
  children: React.ReactNode;
}

export const ShopProvider = ({ children }) => {
  const [currentArticle, setCurrentArticle] = useState<Article>(defaultArticle);
  const [frontCanvas, setFrontCanvas] = useState<fabric.Canvas | null>(null);
  const [backCanvas, setBackCanvas] = useState<fabric.Canvas | null>(null);

  // Make sure contextValue includes the canvas objects
  const contextValue = {
    currentArticle,
    setCurrentArticle,
    frontCanvas,
    setFrontCanvas,
    backCanvas,
    setBackCanvas,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
