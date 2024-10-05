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

  // Define a set of specified colors
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F1C40F", 
    "#8E44AD", "#E74C3C", "#2ECC71"
  ];

  const handleColorChange = (color: string) => {
    setFill(color);

    if (type === "articleBackGround") {
      dispatch(canvasActions.setArticleBackground(color));
    } else if (selectedLayer) {
      dispatch(
        canvasActions.editText({ id: selectedLayer.id, fill: color })
      );
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <div
          key={color}
          className={`cursor-pointer transition-all duration-200 border-2 ${
            fill === color ? 'border-black' : 'border-transparent'
          } ${
            type === "articleBackGround"
              ? 'w-3 h-10 rounded-full' // Pill shape for article background
              : 'w-8 h-8 rounded-full'  // Default circle shape for text
          }`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
