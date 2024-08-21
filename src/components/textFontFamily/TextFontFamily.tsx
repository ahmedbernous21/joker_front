import { useDispatch, useSelector } from "react-redux";
import { tShirtActions } from "../../store/slices/tShirtSlice";

interface TextFontFamilyProps {
  id: string;
}
const TextFontFamily = ({ id }: TextFontFamilyProps) => {
  const dispatch = useDispatch();
  const { frontTexts } = useSelector((state: any) => state.tShirt);
  const fonts = [
    { name: "Grey Qo", value: '"Grey Qo", cursive' },
    { name: "Inter", value: '"Inter", sans-serif' },
    { name: "Lora", value: '"Lora", serif' },
    { name: "Moderustic", value: '"Moderustic", sans-serif' },
    { name: "New Amsterdam", value: '"New Amsterdam", sans-serif' },
  ];

  return (
    <select
      value={frontTexts.find((text) => text.id === id)?.fontFamily}
      onChange={(e) =>
        dispatch(
          tShirtActions.changeFontFamily({
            id: id,
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
