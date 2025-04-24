import React, { createContext, useState, useEffect } from "react";
import { fabric } from "fabric";

// Define a more complete default article
const defaultArticle = {
  articleId: "",
  articleName: "",
  articleType: "t_shirt",
  articleColor: "white",
  articlePrice: 0,
  articleBackground: "#ffffff",
  isDoubleSided: false,
  active: "front",
  articleFrontSide: {
    texts: [],
    images: [],
    src: "",
  },
  articleBackSide: null,
};

export const ShopContext = createContext({
  currentArticle: defaultArticle,
  setCurrentArticle: (article: any) => {},
  frontCanvas: null as fabric.Canvas | null,
  setFrontCanvas: (canvas: fabric.Canvas | null) => {},
  backCanvas: null as fabric.Canvas | null,
  setBackCanvas: (canvas: fabric.Canvas | null) => {},
});

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentArticle, setCurrentArticle] = useState(defaultArticle);
  const [frontCanvas, setFrontCanvas] = useState<fabric.Canvas | null>(null);
  const [backCanvas, setBackCanvas] = useState<fabric.Canvas | null>(null);

  return (
    <ShopContext.Provider
      value={{
        currentArticle,
        setCurrentArticle,
        frontCanvas,
        setFrontCanvas,
        backCanvas,
        setBackCanvas,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
