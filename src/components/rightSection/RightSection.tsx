import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import ColorPicker from "../colorPicker/ColorPicker";
import { tShirtActions } from "../../store/slices/tShirtSlice";
import LeftSideSubmitButton from "../leftSideCustomize/LeftSideSubmitButton";
import { Range } from "react-range";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa6";
import TextFontFamily from "../textFontFamily/TextFontFamily";

const RightSection = () => {
  const dispatch = useDispatch();
  const { selectedId, frontTexts } = useSelector(
    (state: IRootState) => state.tShirt,
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(tShirtActions.editText({ id: selectedId, text: e.target.value }));
  };

  return (
    <div className="flex w-[300px] flex-col gap-2">
      <div className="flex max-h-[430px] flex-1 flex-col gap-6 overflow-auto rounded-xl bg-white p-4">
        {selectedId ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <p className="font-bold">Font Size</p>
              <div className="flex items-center gap-2">
                <Range
                  step={0.1}
                  min={0}
                  max={100}
                  values={[
                    frontTexts.find((text) => text.id === selectedId)?.fontSize,
                  ]}
                  onChange={(value) => {
                    dispatch(
                      tShirtActions.setTextSize({
                        id: selectedId,
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
                      }}
                      className="bg-blue-500"
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
                      className="bg-blue-500"
                    />
                  )}
                />
                {/* Display the current value */}
                <div className="flex">
                  <span>
                    {
                      frontTexts.find((text) => text.id === selectedId)
                        ?.fontSize
                    }
                  </span>
                  <span>px</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Rotate</p>
              <div className="flex items-center gap-2">
                <Range
                  step={0.1}
                  min={0}
                  max={360}
                  values={[
                    frontTexts.find((text) => text.id === selectedId)?.rotation,
                  ]}
                  onChange={(value) => {
                    dispatch(
                      tShirtActions.setTextRotation({
                        id: selectedId,
                        rotation: value,
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
                      }}
                      className="bg-blue-500"
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
                      className="bg-blue-500"
                    />
                  )}
                />
                {/* Display the current value */}
                <div className="flex">
                  <span>
                    {
                      frontTexts.find((text) => text.id === selectedId)
                        ?.rotation
                    }
                  </span>
                  <span>deg</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Text</p>
              <textarea
                value={frontTexts.find((text) => text.id === selectedId)?.text}
                onChange={handleInputChange}
                autoFocus
                className="bg-[#f2f2f2] p-2 focus:outline-none"
              />
              <ColorPicker type="id" id={selectedId} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold">Font Style</p>
              <div className="flex overflow-hidden rounded-xl border-2 border-blue-500">
                <FaItalic
                  className="h-[25px] w-1/3 cursor-pointer bg-blue-500 p-1 text-white"
                  style={{
                    background: frontTexts.find(
                      (text) => text.id === selectedId,
                    )?.italic
                      ? "rgb(59 130 246)"
                      : "transparent",
                    color: frontTexts.find((text) => text.id === selectedId)
                      ?.italic
                      ? "white"
                      : "black",
                  }}
                  onClick={() => {
                    dispatch(
                      tShirtActions.changeFontStyle({
                        id: selectedId,
                        style: "italic",
                      }),
                    );
                  }}
                />
                <FaBold
                  onClick={() => {
                    dispatch(
                      tShirtActions.changeFontStyle({
                        id: selectedId,
                        style: "bold",
                      }),
                    );
                  }}
                  style={{
                    background: frontTexts.find(
                      (text) => text.id === selectedId,
                    )?.bold
                      ? "rgb(59 130 246)"
                      : "transparent",
                    color: frontTexts.find((text) => text.id === selectedId)
                      ?.bold
                      ? "white"
                      : "black",
                  }}
                  className="h-[25px] w-1/3 cursor-pointer border-x-2 p-1"
                />
                <FaUnderline
                  onClick={() => {
                    dispatch(
                      tShirtActions.changeFontStyle({
                        id: selectedId,
                        style: "underline",
                      }),
                    );
                  }}
                  style={{
                    background: frontTexts.find(
                      (text) => text.id === selectedId,
                    )?.underline
                      ? "rgb(59 130 246)"
                      : "transparent",
                    color: frontTexts.find((text) => text.id === selectedId)
                      ?.underline
                      ? "white"
                      : "black",
                  }}
                  className="h-[25px] w-1/3 cursor-pointer p-1"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p>Font Family</p>
              <TextFontFamily id={selectedId} />
            </div>
          </div>
        ) : (
          <p className="text-center">Select an object to edit its parameters</p>
        )}
      </div>
      <LeftSideSubmitButton />
    </div>
  );
};

export default RightSection;
