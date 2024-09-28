import { useSelector,useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import FontSizeCustomize from "../textCustomize/FontSizeCustomize";
import { canvasActions } from "../../store/slices/canvasSlice";
import { FaBold, FaItalic, FaTrash, FaUnderline } from "react-icons/fa6";
import FontFamilyCustomize from "../textCustomize/FontFamilyCustomize";
import TextColorCustomize from "../textCustomize/FontColorCustomize";
import CreatText from "../../components/createText/CreateText";
import { getCurrentSelectedText } from "../../store/selectors/canvasSelectors";


const TextCustomize = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const text = useSelector((state: IRootState) =>
    getCurrentSelectedText(state),
  );
  return (
    <div className="flex flex-wrap items-center  gap-6 p-8 bg-[#f9f9f9] rounded-md">
      <CreatText />
      {selectedLayer ? (
        selectedLayer.type === "text" && text ? (
          <>
            <div className="flex flex-col gap-3  p-4">
              <TextColorCustomize />
            </div>
            <FontSizeCustomize canvasText={text} />
            <div className="flex flex-col gap-2">
              <p className="font-medium text--black">Style</p>
              <div className="flex gap-2">
                <button
                  className={`flex items-center justify-center h-[30px] w-[40px] rounded-md p-1 ${
                    text?.fontStyle === "italic"
                      ? "bg-[#141E46] text-white"
                      : "bg-gray-200 text-gray-800"
                  } transition-colors hover:bg-blue-100`}
                  onClick={() => {
                    dispatch(
                      canvasActions.editText({
                        id: selectedLayer.id,
                        fontStyle: text?.fontStyle === "italic" ? "normal" : "italic",
                      }),
                    );
                  }}
                >
                  <FaItalic />
                </button>
                <button
                  className={`flex items-center justify-center h-[30px] w-[40px] rounded-md p-1 ${
                    text?.fontWeight === "bold"
                      ? "bg-[#141E46] text-white"
                      : "bg-gray-200 text-gray-800"
                  } transition-colors hover:bg-blue-100`}
                  onClick={() => {
                    dispatch(
                      canvasActions.editText({
                        id: selectedLayer.id,
                        fontWeight: text?.fontWeight === "bold" ? "normal" : "bold",
                      }),
                    );
                  }}
                >
                  <FaBold />
                </button>
                <button
                  className={`flex items-center justify-center h-[30px] w-[40px] rounded-md p-1 ${
                    text?.underline
                      ? "bg-[#141E46] text-white"
                      : "bg-gray-200 text-gray-800"
                  } transition-colors hover:bg-blue-100`}
                  onClick={() => {
                    dispatch(
                      canvasActions.editText({
                        id: selectedLayer.id,
                        underline: !text?.underline,
                      }),
                    );
                  }}
                >
                  <FaUnderline />
                </button>
              </div>
              
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium text-black">Font</p>
              <FontFamilyCustomize canvasText={text} />
            </div>
           
          </>
        ) : null
      ) : (
        <p className="text-center text-base text-gray-600">Sélectionnez le texte à modifier</p>
      )}
      {selectedLayer && (
        <button
          onClick={() => dispatch(canvasActions.deleteLayer(selectedLayer))}
          className="flex items-center mt-8 gap-2 bg-red-500 text-white p-2 rounded-md text-2xl transition-colors hover:bg-red-600"
        >
          <FaTrash />
    
        </button>
      )}
    </div>
  );
};

export default TextCustomize;
