import { useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { tShirtActions } from "../../store/slices/tShirtSlice";

// Define the type for the props
interface ColorPickerProps {
  type: "id" | "";
  id: string | null;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ type, id }) => {
  const [showSketchPicker, setShowSketchPicker] = useState(false);
  const dispatch = useDispatch();
  const { bgCanvas, frontTexts } = useSelector(
    (state: IRootState) => state.tShirt,
  );

  return (
    <>
      <button
        onClick={() => setShowSketchPicker(!showSketchPicker)}
        className="h-4 w-full text-white"
        style={{
          backgroundColor:
            type == ""
              ? bgCanvas
              : frontTexts.find((text) => text.id === id)?.color,
        }}
      ></button>
      {showSketchPicker && (
        <>
          <div
            className="fixed left-0 top-0 z-10 h-screen w-screen bg-black bg-opacity-50"
            onClick={() => setShowSketchPicker(false)}
          ></div>
          <div
            className="fixed right-0 top-1/2 z-50 -translate-y-1/2"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the picker
          >
            <SketchPicker
              // color={
              //   type == ""
              //     ? bgCanvas
              //     : frontTexts.find((text) => text.id === id)?.color
              // }
              color="#fff"
              onChange={(e) => {
                type == ""
                  ? dispatch(tShirtActions.setCanvasBG(e.hex))
                  : dispatch(tShirtActions.setTextColor({ id, color: e.hex }));
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ColorPicker;
