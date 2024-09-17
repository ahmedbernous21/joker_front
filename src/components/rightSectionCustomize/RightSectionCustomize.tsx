import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";
import SubmitOrderButton from "../submitOrderButton/SubmitOrderButton";
import { FaBold, FaItalic, FaTrash, FaUnderline } from "react-icons/fa6";
import FontFamilyCustomize from "../textCustomize/FontFamilyCustomize";
import FontSizeCustomize from "../textCustomize/FontSizeCustomize";
import TextColorCustomize from "../textCustomize/TextColorCustomize";
import { getCurrentSelectedText } from "../../store/selectors/canvasSelectors";

const   RightSectionCustomize = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const text = useSelector((state: IRootState) =>
    getCurrentSelectedText(state),
  );

  return (
    <div className="flex w-[300px] flex-col gap-2">
      <div className="flex max-h-[430px] flex-1 flex-col gap-6 overflow-x-auto rounded-xl bg-white p-4">
        {selectedLayer ? (
          <div className="flex flex-col gap-6">
            {selectedLayer.type == "text" && text && (
              <>
                <FontSizeCustomize canvasText={text} />
                <TextColorCustomize />
                <div className="flex flex-col gap-2">
                  <p className="font-bold">Font Style</p>
                  <div className="flex overflow-hidden rounded-xl border-2 border-blue-500">
                    <FaItalic
                      className="h-[25px] w-1/3 cursor-pointer bg-blue-500 p-1 text-white"
                      style={{
                        background:
                          text?.style == "italic"
                            ? "rgb(59 130 246)"
                            : "transparent",
                        color: text?.style == "italic" ? "white" : "black",
                      }}
                      onClick={() => {
                        if (text?.style == "italic") {
                          dispatch(
                            canvasActions.editText({
                              id: selectedLayer.id,
                              style: "normal",
                            }),
                          );
                        } else {
                          dispatch(
                            canvasActions.editText({
                              id: selectedLayer.id,
                              style: "italic",
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
                              id: selectedLayer.id,
                              fontWeight: "normal",
                            }),
                          );
                        } else {
                          dispatch(
                            canvasActions.editText({
                              id: selectedLayer.id,
                              fontWeight: "bold",
                            }),
                          );
                        }
                      }}
                      style={{
                        background:
                          text?.fontWeight == "bold"
                            ? "rgb(59 130 246)"
                            : "transparent",
                        color: text?.fontWeight == "bold" ? "white" : "black",
                      }}
                      className="h-[25px] w-1/3 cursor-pointer border-x-2 p-1"
                    />
                    <FaUnderline
                      onClick={() => {
                        dispatch(
                          canvasActions.editText({
                            id: selectedLayer.id,
                            underline: !text.underline,
                          }),
                        );
                      }}
                      style={{
                        background: text?.underline
                          ? "rgb(59 130 246)"
                          : "transparent",
                        color: text?.underline ? "white" : "black",
                      }}
                      className="h-[25px] w-1/3 cursor-pointer p-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>Font Family</p>
                  <FontFamilyCustomize canvasText={text}/>
                </div>
              </>
            )}
            <button
              onClick={() => dispatch(canvasActions.deleteLayer(selectedLayer))}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-500 py-1 text-white"
            >
              <p>Delete Object</p>
              <FaTrash />
            </button>
          </div>
        ) : (
          <p className="text-center">Select an object to edit its parameters</p>
        )}
      </div>
      <SubmitOrderButton />
    </div>
  );
};

export default RightSectionCustomize;
