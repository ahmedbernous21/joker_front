import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { getCurrentSelectedText } from "../../store/selectors/canvasSelectors";

const TextFontFamily = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const text = useSelector((state) => getCurrentSelectedText(state));

  const [fontFamily, setFontFamily] = useState(text?.fontFamily || "");

  const fonts = [
    { name: "Bebas Neue", value: '"Bebas Neue", sans-serif' },
    { name: "Anton", value: '"Anton", sans-serif' },
    { name: "Impact", value: '"Impact", sans-serif' },
    { name: "Lobster", value: '"Lobster", cursive' },
    { name: "Pacifico", value: '"Pacifico", cursive' },
    { name: "Montserrat", value: '"Montserrat", sans-serif' },
    { name: "Oswald", value: '"Oswald", sans-serif' },
    { name: "Playfair Display", value: '"Playfair Display", serif' },
    { name: "Raleway", value: '"Raleway", sans-serif' },
    { name: "Fira Sans", value: '"Fira Sans", sans-serif' },
  ];

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setFontFamily(newFont);

    setTimeout(() => {
      dispatch(
        canvasActions.editText({
          id: selectedLayer?.id,
          fontFamily: newFont,
        }),
      );
    }, 1000);
    console.log(newFont);
  };
  return (
    <select
      value={fontFamily}
      onChange={handleFontChange}
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
