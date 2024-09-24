import { useDispatch, useSelector } from "react-redux";
import FontFamilyCustomize from "./FontFamilyCustomize";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { getCurrentSelectedText } from "../../store/selectors/canvasSelectors";

const FontStyleCustomize = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const text = useSelector((state: IRootState) =>
    getCurrentSelectedText(state),
  );
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="font-bold">Font Style</p>
        <div className="flex overflow-hidden rounded-xl border-2 border-blue-500">
          <FaItalic
            className="h-[25px] w-1/3 cursor-pointer bg-blue-500 p-1 text-white"
            style={{
              background:
                text?.fontStyle == "italic" ? "rgb(59 130 246)" : "transparent",
              color: text?.fontStyle == "italic" ? "white" : "black",
            }}
            onClick={() => {
              if (text?.fontStyle == "italic") {
                dispatch(
                  canvasActions.editText({
                    id: selectedLayer?.id,
                    fontStyle: "normal",
                  }),
                );
              } else {
                dispatch(
                  canvasActions.editText({
                    id: selectedLayer?.id,
                    fontStyle: "italic",
                  }),
                );
              }
            }}
          />
          <FaBold
            onClick={() => {
              if (text?.fontWeight == "bold") {
                dispatch(
                  canvasActions.editText({
                    id: selectedLayer?.id,
                    fontWeight: "normal",
                  }),
                );
              } else {
                dispatch(
                  canvasActions.editText({
                    id: selectedLayer?.id,
                    fontWeight: "bold",
                  }),
                );
              }
            }}
            style={{
              background:
                text?.fontWeight == "bold" ? "rgb(59 130 246)" : "transparent",
              color: text?.fontWeight == "bold" ? "white" : "black",
            }}
            className="h-[25px] w-1/3 cursor-pointer border-x-2 p-1"
          />
          <FaUnderline
            onClick={() => {
              dispatch(
                canvasActions.editText({
                  id: selectedLayer?.id,
                  underline: !text.underline,
                }),
              );
            }}
            style={{
              background: text?.underline ? "rgb(59 130 246)" : "transparent",
              color: text?.underline ? "white" : "black",
            }}
            className="h-[25px] w-1/3 cursor-pointer p-1"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p>Font Family</p>
        <FontFamilyCustomize canvasText={text} />
      </div>
    </>
  );
};
export default FontStyleCustomize;
