import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { TextOptionsId } from "../../interfaces/CanvasSliceInterfaces";

interface FontSizeCustomizeProps {
  canvasText: TextOptionsId;
}

const FontSizeCustomize = ({ canvasText }: FontSizeCustomizeProps) => {
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col">
      <p className="font-bold">Font Size</p>
      <div className="flex items-center gap-2">
        <Range
          step={0.1}
          min={0}
          max={100}
          values={[canvasText?.fontSize || 0]}
          onChange={(value) => {
            dispatch(
              canvasActions.editText({
                id: selectedLayer?.id,
                fontSize: value[0],
              }),
            );
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                background: `linear-gradient(to right, #007bff ${
                  canvasText?.fontSize
                }%, #ddd ${canvasText?.fontSize}%)`,
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: "12px",
                width: "12px",
              }}
              className="rounded-full bg-blue-500"
            />
          )}
        />
        {/* Display the current value */}
        <div className="flex">
          <span>{canvasText?.fontSize}</span>
          <span>px</span>
        </div>
      </div>
    </div>
  );
};
export default FontSizeCustomize;
