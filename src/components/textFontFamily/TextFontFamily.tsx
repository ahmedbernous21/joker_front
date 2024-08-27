import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";

interface TextFontFamilyProps {
  id: string;
}
const TextFontFamily = ({ id }: TextFontFamilyProps) => {
  const dispatch = useDispatch();
  const { articles, selectedArticleIndex } = useSelector(
    (state: IRootState) => state.canvas,
  );
  const { canvasTexts } =
    articles[selectedArticleIndex].active == "front"
      ? articles[selectedArticleIndex].firstImage
      : articles[selectedArticleIndex].secondImage;
  const canvasText = canvasTexts.find((text) => text.id === id);
  const fonts = [
    { name: "Grey Qo", value: '"Grey Qo", cursive' },
    { name: "Inter", value: '"Inter", sans-serif' },
    { name: "Lora", value: '"Lora", serif' },
    { name: "Moderustic", value: '"Moderustic", sans-serif' },
    { name: "New Amsterdam", value: '"New Amsterdam", sans-serif' },
  ];

  return (
    <select
      value={canvasText?.fontFamily}
      onChange={(e) =>
        dispatch(
          canvasActions.editText({
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
