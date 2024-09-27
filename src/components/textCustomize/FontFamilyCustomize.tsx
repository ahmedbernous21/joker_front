import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { TextOptionsId } from "../../interfaces/CanvasSliceInterfaces";
import FontFaceObserver from "fontfaceobserver";

interface FontFamilyCustomizeProps {
  canvasText: TextOptionsId;
}

const FontFamilyCustomize = ({ canvasText }: FontFamilyCustomizeProps) => {
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const dispatch = useDispatch();

  const fonts = [
    { name: "Grey Qo", value: '"Grey Qo", cursive' },
    { name: "Inter", value: '"Inter", sans-serif' },
    { name: "Lora", value: '"Lora", serif' },
    { name: "Moderustic", value: '"Moderustic", sans-serif' },
    { name: "New Amsterdam", value: '"New Amsterdam", sans-serif' },
  ];

  const handleFontChange = async (fontFamily: string) => {
    const font = new FontFaceObserver(fontFamily.split(`"`)[1]);
    await font.load();
    dispatch(
      canvasActions.editText({
        id: selectedLayer?.id,
        fontFamily,
      }),
    );
  };

  return (
    <select
      value={canvasText?.fontFamily}
      onChange={(e) => handleFontChange(e.target.value)}
      className="cursor-pointer px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#33AA15] transition duration-200 ease-in-out"
    >
      {fonts.map((font, index) => (
        <option key={index} value={font.value}>
          {font.name}
        </option>
      ))}
    </select>
  );
};

export default FontFamilyCustomize;
