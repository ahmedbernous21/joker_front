import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import {
  getCurrentSelectedText,
} from "../../store/selectors/canvasSelectors";

const TextFontFamily = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);

  const text = useSelector((state) => getCurrentSelectedText(state));
  const fonts = [
    { name: "Grey Qo", value: '"Grey Qo", cursive' },
    { name: "Inter", value: '"Inter", sans-serif' },
    { name: "Lora", value: '"Lora", serif' },
    { name: "Moderustic", value: '"Moderustic", sans-serif' },
    { name: "New Amsterdam", value: '"New Amsterdam", sans-serif' },
  ];

  return (
    <select
      value={text?.fontFamily}
      onChange={(e) =>
        dispatch(
          canvasActions.editText({
            id: selectedLayer?.id,
            fontFamily: e.target.value,
          }),
        )
      }
      className="cursor-pointer rounded-xl px-4 py-1"
    >
      {fonts.map((font, index) => (
        <option key={index} value={font.value}>
          {font.name}
        </option>
      ))}
    </select>
  );
};
export default TextFontFamily;
