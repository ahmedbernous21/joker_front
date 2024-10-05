import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { TextOptionsId } from "../../interfaces/CanvasSliceInterfaces";

interface FontFamilyCustomizeProps {
  canvasText: TextOptionsId;
}

import { useState } from "react";


const FontFamilyCustomize = ({ canvasText }: FontFamilyCustomizeProps) => {
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFont, setSelectedFont] = useState<string | undefined>(
    canvasText?.fontFamily
  );

  const fonts = [
    { name: "Times New Roman", value: '"Times New Roman", serif' },
    { name: "Dancing Script", value: '"Dancing Script", sans-serif' },
    { name: "Lobster", value: '"Lobster", cursive' },
    { name: "Pacifico", value: '"Pacifico", cursive' },
    { name: "Montserrat", value: '"Montserrat", sans-serif' },
    { name: "Oswald", value: '"Oswald", sans-serif' },
    { name: "Playfair Display", value: '"Playfair Display", serif' },
    { name: "Raleway", value: '"Raleway", sans-serif' },
    { name: "Fira Sans", value: '"Fira Sans", sans-serif' },
  ];

  const handleFontChange = (fontFamily: string) => {
    setSelectedFont(fontFamily);
    setIsOpen(false);
    dispatch(
      canvasActions.editText({
        id: selectedLayer?.id,
        fontFamily,
      })
    );
  };

  return (
    <div className="relative w-full md:w-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:border-[#33AA15] focus:border-[#33AA15] focus:ring-2 focus:ring-[#33AA15] transition-all duration-300 ease-in-out"
      >
        {fonts.find((font) => font.value === selectedFont)?.name || "Select Font"}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg max-h-60 overflow-y-auto">
          {fonts.map((font, index) => (
            <li
              key={index}
              onClick={() => handleFontChange(font.value)}
              className={`cursor-pointer px-3 py-2 hover:bg-[#33AA15] hover:text-white transition duration-150 ease-in-out ${
                selectedFont === font.value ? "bg-[#33AA15] text-white" : ""
              }`}
            >
              {font.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FontFamilyCustomize;

