import { v4 as uuid } from "uuid";
import { Article } from "../interfaces/CanvasSliceInterfaces";

const articlesInitialState: Article[] = [
  {
    id: uuid(),
    articleName: "tshirt",
    articleFrontSideInfo: {
      name: "front",
      src: "/crew_front.png",
      texts: [],
      images: [],
    },
    articleBackSideInfo: {
      name: "back",
      src: "/crew_back.png",
      texts: [],
      images: [],
    },
    active: "front",
    articlePrice: 5000,
    articleBackground: "#ffffff",
  },
  {
    id: uuid(),
    articleName: "cool tshirt",
    articleFrontSideInfo: {
      name: "front",
      src: "/tshirt.png",
      texts: [],
      images: [],
    },
    articleBackSideInfo: null,
    active: "front",
    articlePrice: 3400,
    articleBackground: "#ffffff",
  },
];

export default articlesInitialState;
