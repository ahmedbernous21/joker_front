import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { tShirtActions } from "../../store/slices/tShirtSlice";
import TextFontFamily from "../textFontFamily/TextFontFamily";
import ColorPicker from "../colorPicker/ColorPicker";

const BackTextCustomizeSection = () => {
  const dispatch = useDispatch();
  const { backText, backTextSize } = useSelector(
    (state: IRootState) => state.tShirt,
  );
  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-2">
      <p className="my-2 text-center font-bold">Back</p>
      <div className="flex items-center justify-center gap-2">
        {/*  to do color of the font  */}
        <input
          value={backText}
          onChange={(e) => dispatch(tShirtActions.setBackText(e.target.value))}
          name=""
          id=""
          className="w-[40%] rounded-lg border-2 border-[#00d5ff] pl-4 focus:outline-none"
        />

        <input
          type="number"
          name=""
          onChange={(e) =>
            dispatch(tShirtActions.setBackTextSize(e.target.value))
          }
          value={backTextSize}
          id=""
          className="w-[18%] rounded-lg border-2 border-[#00d5ff] pl-4 focus:outline-none"
        />
        <ColorPicker type="back" />
      </div>
      <div className="flex gap-2">
        <select
          name=""
          id=""
          onChange={(e) =>
            dispatch(tShirtActions.BackTextBoldToggle(e.target.value))
          }
          className="rounded-xl px-4 py-1 cursor-pointer"
        >
          <option value="0">Normal</option>
          <option value="1">Bold</option>
        </select>
        <TextFontFamily type="back" />
      </div>
      <div className="image-front my-4">
        <label
          htmlFor="image-back"
          className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          Upload back Image
        </label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files) {
              dispatch(tShirtActions.setBackImageUrl(e.target.files[0]));
            }
          }}
          name=""
          id="image-back"
          className="hidden"
        />
      </div>
    </div>
  );
};
export default BackTextCustomizeSection;
