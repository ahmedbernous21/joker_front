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
    { name: "Normal", value: "sans-serif" },
    { name: "Dancing Script", value: '"Dancing Script", sans-serif' },
    { name: "Impact", value: '"Impact", sans-serif' },
    { name: "Lobster", value: '"Lobster", cursive' },
    { name: "Pacifico", value: '"Pacifico", cursive' },
    { name: "Montserrat", value: '"Montserrat", sans-serif' },
    { name: "Oswald", value: '"Oswald", sans-serif' },
    { name: "Playfair Display", value: '"Playfair Display", serif' },
    { name: "Raleway", value: '"Raleway", sans-serif' },
    { name: "Fira Sans", value: '"Fira Sans", sans-serif' },
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

export default FontFamilyCustomize;
