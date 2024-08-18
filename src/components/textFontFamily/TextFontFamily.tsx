import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { tShirtActions } from "../../store/slices/tShirtSlice";

interface TextFontFamilyProps {
  type: "front" | "back";
}
const TextFontFamily = ({ type }: TextFontFamilyProps) => {
  const dispatch = useDispatch();
  const fonts = [
    { name: "Grey Qo", value: '"Grey Qo", cursive' },
    { name: "Inter", value: '"Inter", sans-serif' },
    { name: "Lora", value: '"Lora", serif' },
    { name: "Moderustic", value: '"Moderustic", sans-serif' },
    { name: "New Amsterdam", value: '"New Amsterdam", sans-serif' },
  ];
  const { frontFontFamily, backFontFamily } = useSelector(
    (state: IRootState) => state.tShirt,
  );
  return (
    <select
      value={type == "back" ? backFontFamily : frontFontFamily}
      onChange={(e) =>
        dispatch(tShirtActions.setFontFamily({ value: e.target.value, type }))
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
