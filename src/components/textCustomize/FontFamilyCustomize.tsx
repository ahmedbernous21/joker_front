import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { TextOptionsId } from "../../interfaces/CanvasSliceInterfaces";

interface FontFamilyCustomizeProps {
  canvasText: TextOptionsId;
}

const FontFamilyCustomize = ({ canvasText }: FontFamilyCustomizeProps) => {
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const dispatch = useDispatch();

  const fonts = [
    // { name: "Normal", value: "sans-serif" },
    { name: "Times New Roman", value: '"Times New Roman", ' },
    { name: "Dancing Script", value: '"Dancing Script", sans-serif' },
    // { name: "Impact", value: '"Impact", sans-serif' },
    { name: "Lobster", value: '"Lobster", cursive' },
    { name: "Pacifico", value: '"Pacifico", cursive' },
    { name: "Montserrat", value: '"Montserrat", sans-serif' },
    { name: "Oswald", value: '"Oswald", sans-serif' },
    { name: "Playfair Display", value: '"Playfair Display", serif' },
    { name: "Raleway", value: '"Raleway", sans-serif' },
    { name: "Fira Sans", value: '"Fira Sans", sans-serif' },
  ];
  const handleFontChange = async (fontFamily: string) => {
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
