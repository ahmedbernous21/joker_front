import { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";

// Define the type for the props
interface ColorPickerProps {
  type: "id" | "";
  id: string | null;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ type, id }) => {
  const [showSketchPicker, setShowSketchPicker] = useState(false);
  const dispatch = useDispatch();
  const { bgCanvas, articles, selectedArticleIndex } = useSelector(
    (state: IRootState) => state.canvas,
  );
  const { canvasTexts } =
    articles[selectedArticleIndex].active == "front"
      ? articles[selectedArticleIndex].firstImage
      : articles[selectedArticleIndex].secondImage;

  return (
    <>
      <button
        onClick={() => setShowSketchPicker(!showSketchPicker)}
        className="h-4 w-full rounded-xl text-white outline outline-1 outline-black"
        style={{
          backgroundColor:
            type == ""
              ? bgCanvas
              : canvasTexts.find((canvasText) => canvasText.id === id)?.color,
        }}
      ></button>
      {showSketchPicker && (
        <>
          <div
            className="fixed left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-50"
            onClick={() => setShowSketchPicker(false)}
          ></div>
          <div
            className="fixed right-8 top-1/2 z-50 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the picker
          >
            <SketchPicker
              color="#fff"
              onChange={(e) => {
                type == ""
                  ? dispatch(canvasActions.setCanvasBG(e.hex))
                  : dispatch(canvasActions.setTextColor({ id, color: e.hex }));
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ColorPicker;
