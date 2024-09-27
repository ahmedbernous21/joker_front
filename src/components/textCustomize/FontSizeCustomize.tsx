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
      <p className="font-medium mb-1">Font Size</p>
      <div className="flex items-center gap-3">
        <input
          type="number"
          className="w-20 p-1  text-center bg-gray-100 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#141E46] focus:border-transparent transition-all"
          placeholder="16"
          min={0}
          max={100}
          value={canvasText?.fontSize}
          onChange={(value) => {
            dispatch(
              canvasActions.editText({
                id: selectedLayer?.id,
                fontSize: parseInt(value.target.value),
              })
            );
          }}
        />
      </div>
    </div>
  );
};

export default FontSizeCustomize;
