import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import ColorPicker from "../colorPicker/ColorPicker";
import { canvasActions } from "../../store/slices/canvasSlice";
import SubmitOrderButton from "../submitOrderButton/SubmitOrderButton";
import { Range } from "react-range";
import { FaBold, FaItalic, FaTrash, FaUnderline } from "react-icons/fa6";
import TextFontFamily from "../textFontFamily/TextFontFamily";

const RightSectionCustomize = () => {
  const dispatch = useDispatch();
  const { selectedLayer, articles, selectedArticleIndex } = useSelector(
    (state: IRootState) => state.canvas,
  );
  const { images } =
    articles[selectedArticleIndex].active == "front"
      ? articles[selectedArticleIndex].firstImage
      : articles[selectedArticleIndex].secondImage;
  const { canvasTexts } =
    articles[selectedArticleIndex].active == "front"
      ? articles[selectedArticleIndex].firstImage
      : articles[selectedArticleIndex].secondImage;
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      canvasActions.editText({ id: selectedLayer.id, text: e.target.value }),
    );
  };

  return (
    <div className="flex w-[300px] flex-col gap-2">
      <div className="flex max-h-[430px] flex-1 flex-col gap-6 overflow-x-auto rounded-xl bg-white p-4">
        {selectedLayer ? (
          <div className="flex flex-col gap-6">
            {selectedLayer.type == "text" && (
              <div className="flex flex-col">
                <p className="font-bold">Font Size</p>
                <div className="flex items-center gap-2">
                  <Range
                    step={0.1}
                    min={0}
                    max={100}
                    values={[
                      canvasTexts.find(
                        (canvasText) => canvasText.id === selectedLayer.id,
                      )?.fontSize,
                    ]}
                    onChange={(value) => {
                      dispatch(
                        canvasActions.setTextSize({
                          id: selectedLayer.id,
                          fontSize: value,
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
                            canvasTexts.find(
                              (canvasText) =>
                                canvasText.id === selectedLayer.id,
                            )?.fontSize
                          }%, #ddd ${
                            canvasTexts.find(
                              (canvasText) =>
                                canvasText.id === selectedLayer.id,
                            )?.fontSize
                          }%)`,
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
                    <span>
                      {
                        canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.fontSize
                      }
                    </span>
                    <span>px</span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <p className="font-bold">Rotate</p>
              <div className="flex items-center gap-2">
                <Range
                  step={0.1}
                  min={0}
                  max={360}
                  values={[
                    selectedLayer.type == "text"
                      ? canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.rotation
                      : images.find((image) => image.id === selectedLayer.id)
                          ?.rotation,
                  ]}
                  onChange={(value) => {
                    dispatch(
                      canvasActions.setTextRotation({
                        id: selectedLayer.id,
                        rotation: value,
                        type: selectedLayer.type,
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
                        background:
                          selectedLayer.type == "text"
                            ? `linear-gradient(to right, #007bff ${
                                canvasTexts.find(
                                  (canvasText: any) =>
                                    canvasText.id === selectedLayer.id,
                                )?.rotation *
                                (100 / 360)
                              }%, #ddd ${
                                canvasTexts.find(
                                  (canvasText: any) =>
                                    canvasText.id === selectedLayer.id,
                                )?.rotation *
                                (100 / 360)
                              }%)`
                            : `linear-gradient(to right, #007bff ${
                                images.find(
                                  (image: any) => image.id === selectedLayer.id,
                                )?.rotation *
                                (100 / 360)
                              }%, #ddd ${
                                images.find(
                                  (image: any) => image.id === selectedLayer.id,
                                )?.rotation *
                                (100 / 360)
                              }%)`,
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
                  <span>
                    {selectedLayer.type == "text" ? (
                      <>
                        {
                          canvasTexts.find(
                            (canvasText) => canvasText.id === selectedLayer.id,
                          )?.rotation
                        }
                      </>
                    ) : (
                      <>
                        {
                          images.find((image) => image.id === selectedLayer.id)
                            ?.rotation
                        }
                      </>
                    )}
                  </span>
                  <span>deg</span>
                </div>
              </div>
            </div>
            {selectedLayer.type == "text" && (
              <>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">Text</p>
                  <textarea
                    value={
                      canvasTexts.find(
                        (canvasText) => canvasText.id === selectedLayer.id,
                      )?.text
                    }
                    onChange={handleInputChange}
                    autoFocus
                    className="bg-[#f2f2f2] p-2 focus:outline-none"
                  />
                  <p className="font-bold">Color</p>
                  <div className="relative">
                    <ColorPicker type="id" id={selectedLayer.id} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold">Font Style</p>
                  <div className="flex overflow-hidden rounded-xl border-2 border-blue-500">
                    <FaItalic
                      className="h-[25px] w-1/3 cursor-pointer bg-blue-500 p-1 text-white"
                      style={{
                        background: canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.italic
                          ? "rgb(59 130 246)"
                          : "transparent",
                        color: canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.italic
                          ? "white"
                          : "black",
                      }}
                      onClick={() => {
                        dispatch(
                          canvasActions.changeFontStyle({
                            id: selectedLayer.id,
                            style: "italic",
                          }),
                        );
                      }}
                    />
                    <FaBold
                      onClick={() => {
                        dispatch(
                          canvasActions.changeFontStyle({
                            id: selectedLayer.id,
                            style: "bold",
                          }),
                        );
                      }}
                      style={{
                        background: canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.bold
                          ? "rgb(59 130 246)"
                          : "transparent",
                        color: canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.bold
                          ? "white"
                          : "black",
                      }}
                      className="h-[25px] w-1/3 cursor-pointer border-x-2 p-1"
                    />
                    <FaUnderline
                      onClick={() => {
                        dispatch(
                          canvasActions.changeFontStyle({
                            id: selectedLayer.id,
                            style: "underline",
                          }),
                        );
                      }}
                      style={{
                        background: canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.underline
                          ? "rgb(59 130 246)"
                          : "transparent",
                        color: canvasTexts.find(
                          (canvasText) => canvasText.id === selectedLayer.id,
                        )?.underline
                          ? "white"
                          : "black",
                      }}
                      className="h-[25px] w-1/3 cursor-pointer p-1"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <p>Font Family</p>
                  <TextFontFamily id={selectedLayer.id} />
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
