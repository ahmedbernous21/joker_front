import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import FontSizeCustomize from "../textCustomize/FontSizeCustomize";
import { canvasActions } from "../../store/slices/canvasSlice";
import { FaBold, FaItalic, FaTrash, FaUnderline } from "react-icons/fa6";
import FontFamilyCustomize from "../textCustomize/FontFamilyCustomize";
import TextColorCustomize from "../textCustomize/FontColorCustomize";
import CreatText from "../../components/createText/CreateText";
import { getCurrentSelectedText } from "../../store/selectors/canvasSelectors";
import DeleteLayer from "../deleteLayer/DeleteLayer";

const TextCustomize = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const text = useSelector((state: IRootState) =>
    getCurrentSelectedText(state),
  );

  return (
    <div className="flex flex-wrap gap-6 p-6 bg-[#fcfbfb] rounded-md shadow-md md:p-6 md:px-">
      {/* Top Buttons (Add and Delete) */}
      <div className="flex justify-between w-full gap-4">
  <CreatText />
  {selectedLayer && selectedLayer.type === "text" && (
   <DeleteLayer/>
  )}
</div>


      {/* Main Content: Only show when a text layer is selected */}
      {selectedLayer && selectedLayer.type === "text" && text ? (
        <>
          {/* Flexbox for font size, text style, and font family */}
          <div className="flex flex-col w-full gap-6">
          <div className="flex flex-col gap-3">
              <p className="font-medium text-gray-700">Couleur du texte</p>
              <div className="flex gap-2">
                <TextColorCustomize />
              </div>
            </div>
            {/* Font Size, Font Family, and Text Style Customization */}
            <div className="flex flex-wrap gap-6 w-full">
       
              {/* Font Size Customization */}
              <div className="flex flex-col gap-3">
                <p className="font-medium text-gray-700">Taille de la police</p>
                <FontSizeCustomize canvasText={text} />
              </div>

              {/* Font Family Customization */}
              <div className="flex flex-col gap-3">
                <p className="font-medium text-gray-700">Police d'écriture</p>
                <FontFamilyCustomize canvasText={text} />
              </div>

              {/* Text Style Customization */}
              <div className="flex flex-col gap-3">
                <p className="font-medium text-gray-700">Style du texte</p>
                <div className="flex gap-2">
                  <button
                    className={`flex items-center justify-center h-8 w-8 rounded-md p-2 transition-colors ${
                      text?.fontStyle === "italic"
                        ? "bg-[#141E46] text-white"
                        : "bg-gray-200 text-gray-800"
                    } hover:bg-[#141E46] hover:text-white`}
                    onClick={() =>
                      dispatch(
                        canvasActions.editText({
                          id: selectedLayer.id,
                          fontStyle:
                            text?.fontStyle === "italic" ? "normal" : "italic",
                        }),
                      )
                    }
                    aria-label="Italic Text"
                  >
                    <FaItalic />
                  </button>

                  <button
                    className={`flex items-center justify-center h-8 w-8 rounded-md p-2 transition-colors ${
                      text?.fontWeight === "bold"
                        ? "bg-[#141E46] text-white"
                        : "bg-gray-200 text-gray-800"
                    } hover:bg-[#141E46] hover:text-white`}
                    onClick={() =>
                      dispatch(
                        canvasActions.editText({
                          id: selectedLayer.id,
                          fontWeight:
                            text?.fontWeight === "bold" ? "normal" : "bold",
                        }),
                      )
                    }
                    aria-label="Bold Text"
                  >
                    <FaBold />
                  </button>

                  <button
                    className={`flex items-center justify-center h-8 w-8 rounded-md p-2 transition-colors ${
                      text?.underline
                        ? "bg-[#141E46] text-white"
                        : "bg-gray-200 text-gray-800"
                    } hover:bg-[#141E46] hover:text-white`}
                    onClick={() =>
                      dispatch(
                        canvasActions.editText({
                          id: selectedLayer.id,
                          underline: !text?.underline,
                        }),
                      )
                    }
                    aria-label="Underline Text"
                  >
                    <FaUnderline />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-center w-full text-gray-600">
          Sélectionnez le texte à modifier
        </p>
      )}
    </div>
  );
};

export default TextCustomize;
