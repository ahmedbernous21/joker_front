import { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { tShirtActions } from "../../store/slices/tShirtSlice";

// Define the type for the props
interface ColorPickerProps {
  type: "front" | "back" | "";
}

const ColorPicker: React.FC<ColorPickerProps> = ({ type }) => {
  const [showSketchPicker, setShowSketchPicker] = useState(false);
  const dispatch = useDispatch();
  const { bgCanvas, frontTextColor, backTextColor } = useSelector(
    (state: IRootState) => state.tShirt,
  );

  return (
    <>
      <button
        onClick={() => setShowSketchPicker(!showSketchPicker)}
        className="h-4 w-4 rounded-full bg-blue-500 text-white"
        style={{
          backgroundColor:
            type == "back"
              ? backTextColor
              : type == "front"
                ? frontTextColor
                : bgCanvas,
        }}
      ></button>
      {showSketchPicker && (
        <>
          <div
            className="fixed left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-50"
            onClick={() => setShowSketchPicker(false)}
          ></div>
          <div
            className="absolute right-0 top-0 z-50"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the picker
          >
            <SketchPicker
              color={
                type == "back"
                  ? backTextColor
                  : type == "front"
                    ? frontTextColor
                    : bgCanvas
              }
              onChange={(e) => {
                type == ""
                  ? dispatch(tShirtActions.setCanvasBG(e.hex))
                  : dispatch(
                      tShirtActions.setTextColor({ type, value: e.hex }),
                    );
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ColorPicker;
