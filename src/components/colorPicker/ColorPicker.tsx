import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";

interface ColorPickerProps {
  type: "id" | "bgCanvas";
  id: string | null;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ type, id }) => {
  const dispatch = useDispatch();
  const { articles, selectedArticleIndex } = useSelector(
    (state: IRootState) => state.canvas,
  );
  const { canvasTexts } =
    articles[selectedArticleIndex].active === "front"
      ? articles[selectedArticleIndex].firstImage
      : articles[selectedArticleIndex].secondImage;
  const { articleBackground } = articles[selectedArticleIndex];

  const [popularColors] = useState([
    "#ffffff",
    "#000000",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#8bc34a",
    "#cddc39",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#607d8b",
    "#C0C0C0",
    "#C9AE5D",
  ]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-[230px] flex-wrap justify-center gap-2">
        {type === "bgCanvas" &&
          popularColors.map((color, index) => (
            <button
              key={color + index + type} // Use color as a stable key
              onClick={() =>
                dispatch(canvasActions.setArticleBackground(color))
              }
              className="h-6 w-6 rounded-full text-white outline outline-1 outline-black"
              style={{
                backgroundColor: color,
                outline: articleBackground === color ? "3px solid black" : "",
              }}
            ></button>
          ))}
        {type === "id" &&
          popularColors.map((color, index) => (
            <button
              key={color + index + type}
              onClick={() =>
                dispatch(canvasActions.editText({ id: id, color }))
              }
              className="h-6 w-6 rounded-full text-white outline outline-1 outline-black"
              style={{
                backgroundColor: color,
                outline:
                  canvasTexts.find((text) => text.id === id)?.color === color
                    ? "3px solid black"
                    : "",
              }}
            ></button>
          ))}
      </div>
    </div>
  );
};

export default ColorPicker;
