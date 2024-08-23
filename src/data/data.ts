import { v4 as uuid } from "uuid";

const articlesInitialState = [
  {
    id: uuid(),
    articleName: "tshirt",
    firstImage: {
      name: "front",
      src: "/crew_front.png",
      canvasTexts: [],
      images: [],
    },
    secondImage: {
      name: "back",
      src: "/crew_back.png",
      canvasTexts: [],
      images: [],
    },
    active: "front",
  },
  {
    id: uuid(),
    articleName: "chope",
    firstImage: {
      name: "front",
      src: "/cuptest.png",
      canvasTexts: [],
      images: [],
    },
    secondImage: null,
    active: "front",
  },
  {
    id: uuid(),
    articleName: "casquette",
    firstImage: {
      name: "front",
      src: "/hat.png",
      canvasTexts: [],
      images: [],
    },
    secondImage: null,
    active: "front",
  },
];

export default articlesInitialState;
