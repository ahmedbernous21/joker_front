import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";

interface ColorPickerProps {
  type: "text" | "articleBackGround";
}

const ColorPicker = ({ type }: ColorPickerProps) => {
  const [fill, setFill] = useState("#000000"); 
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);

  return (
    <div className="flex w-full">
      <input
        className="h-4 w-full bg-transparent "
        type="color"
        value={fill}
        onChange={(event) => {
          const newColor = event.target.value;
          setFill(newColor); 
          
          if (type === "articleBackGround") {
            dispatch(canvasActions.setArticleBackground(newColor));
          } else if (selectedLayer) {
            dispatch(
              canvasActions.editText({ id: selectedLayer.id, fill: newColor })
            );
          }
        }}
      />
    </div>
  );
};

export default ColorPicker;
