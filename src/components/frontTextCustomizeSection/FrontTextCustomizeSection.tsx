import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { tShirtActions } from "../../store/slices/tShirtSlice";
import TextFontFamily from "../textFontFamily/TextFontFamily";
import ColorPicker from "../colorPicker/ColorPicker";

const FrontTextCustomizeSection = () => {
  const dispatch = useDispatch();

  const { frontText, frontTextSize, isFrontTextBold } = useSelector(
    (state: IRootState) => state.tShirt,
  );
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-2">
      <p className="my-2 text-center font-bold">Front</p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <input
            value={frontText}
            onChange={(e) =>
              dispatch(tShirtActions.setFrontText(e.target.value))
            }
            name=""
            id=""
            className="w-[40%] rounded-lg border-2 border-[#00d5ff] pl-4 focus:outline-none"
          />

          <input
            type="number"
            name=""
            onChange={(e) =>
              dispatch(tShirtActions.setFrontTextSize(e.target.value))
            }
            value={frontTextSize}
            id=""
            className="w-[18%] rounded-lg border-2 border-[#00d5ff] pl-4 focus:outline-none"
          />
          <ColorPicker type="front" />
        </div>
        <div className="flex items-center justify-center gap-2">
          <select
            name=""
            id=""
            onChange={(e) =>
              dispatch(tShirtActions.FrontTextBoldToggle(e.target.value))
            }
            className="cursor-pointer rounded-xl px-4 py-1"
          >
            <option value="0">Normal</option>
            <option value="1">Bold</option>
          </select>
          <TextFontFamily type="front" />
        </div>
      </div>
      <div className="image-front my-4">
        <label
          htmlFor="image-front"
          className="mt-6 cursor-pointer rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Upload front Image
        </label>
        <input
          type="file"
          name=""
          onChange={(e) => {
            if (e.target.files) {
              dispatch(tShirtActions.setFrontImageUrl(e.target.files[0]));
            }
          }}
          id="image-front"
          className="hidden"
        />
      </div>
    </div>
  );
};
export default FrontTextCustomizeSection;
