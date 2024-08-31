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
    articleBackground: "#ffffff",
  },
  {
    id: uuid(),
    articleName: "chope",
    articleFrontSideInfo: {
      name: "front",
      src: "/cuptest.png",
      texts: [],
      images: [],
    },
    articleBackSideInfo: null,
    active: "front",
    articleBackground: "#ffffff",
  },
  {
    id: uuid(),
    articleName: "casquette",
    articleFrontSideInfo: {
      name: "front",
      src: "/hat.png",
      texts: [],
      images: [],
    },
    articleBackSideInfo: null,
    active: "front",
    articleBackground: "#ffffff",
  },
];

export default articlesInitialState;
