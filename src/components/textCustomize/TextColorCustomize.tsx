import { useSelector } from "react-redux";
import ColorPicker from "../colorPicker/ColorPicker";
import { IRootState } from "../../store/store";

const TextColorCustomize = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold">Color</p>
      <div className="relative">
        <ColorPicker type="text" />
      </div>
    </div>
  );
};
export default TextColorCustomize;
