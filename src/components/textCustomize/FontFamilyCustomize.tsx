// import { useDispatch, useSelector } from "react-redux";
// import { canvasActions } from "../../store/slices/canvasSlice";
// import { IRootState } from "../../store/store";
// import {
//   getCurrentSelectedText,
//   getTextById,
// } from "../../store/selectors/canvasSelectors";
// import { useEffect } from "react";

// const FontFamilyCustomize = () => {
//   const dispatch = useDispatch();
//   const { selectedLayer, frontCanvas, backCanvas } = useSelector(
//     (state: IRootState) => state.canvas,
//   );

//   const text = useSelector((state) => getTextById(state));
//   useEffect(() => {
//     console.log(text?.fontFamily);
//   }, [text?.fontFamily]);

//   return (
//     <select
//       value={text?.fontFamily}
//       onChange={(e) => {
//         console.log(e.target.value);
//         // backCanvas?.discardActiveObject();
//         // frontCanvas?.discardActiveObject();
//         dispatch(
//           canvasActions.editText({
//             id: text?.id,
//             fontFamily: e.target.value,
//           }),
//         );
//       }}
//       className="cursor-pointer rounded-xl px-4 py-1"
//     >
//       {fonts.map((font, index) => (
//         <option key={index} value={font.value}>
//           {font.name}
//         </option>
//       ))}
//     </select>
//   );
// };
// export default FontFamilyCustomize;

import { Range } from "react-range";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { Text } from "fabric/fabric-impl";

interface FontFamilyCustomizeProps {
  canvasText: Text;
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
  return (
    <select
      value={canvasText?.fontFamily}
      onChange={(e) => {
        dispatch(
          canvasActions.editText({
            id: selectedLayer?.id,
            fontFamily: e.target.value,
          }),
        );
      }}
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
