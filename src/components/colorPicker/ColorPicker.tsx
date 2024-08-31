import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import {
  getCurrentSelectedText,
  getCurrentArticle,
} from "../../store/selectors/canvasSelectors";
import { canvasActions } from "../../store/slices/canvasSlice";
interface ColorPickerProps {
  type: "text" | "articleBackGround";
}

const ColorPicker: React.FC<ColorPickerProps> = ({ type }) => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );

  const selectedText = useSelector((state: IRootState) =>
    getCurrentSelectedText(state),
  );

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
        {popularColors.map((color, index) => (
          <button
            key={color + index + type} // Use color as a stable key
            onClick={() => {
              if (type == "articleBackGround") {
                dispatch(canvasActions.setArticleBackground(color));
              } else {
                dispatch(
                  canvasActions.editText({ id: selectedLayer?.id, color }),
                );
              }
            }}
            className="h-6 w-6 rounded-full text-white outline outline-1 outline-black"
            style={{
              backgroundColor: color,
              outline:
                type == "articleBackGround"
                  ? color == currentArticle.articleBackground
                    ? "3px solid black"
                    : ""
                  : color == selectedText?.color
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
