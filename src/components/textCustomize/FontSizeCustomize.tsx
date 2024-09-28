import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { getCurrentSelectedText } from "../../store/selectors/canvasSelectors";

const FontSizeCustomize = () => {
  const text = useSelector((state: IRootState) =>
    getCurrentSelectedText(state),
  );
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
          values={[text?.fontSize || 0]}
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
                  text?.fontSize
                }%, #ddd ${text?.fontSize}%)`,
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
          <span>{text?.fontSize}</span>
          <span>px</span>
        </div>
      </div>
    </div>
  );
};
export default FontSizeCustomize;
