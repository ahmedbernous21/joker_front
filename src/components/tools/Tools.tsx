import { FaEraser, FaPen, FaX } from "react-icons/fa6";
import { PiTextTBold } from "react-icons/pi";

interface ToolsProps {
  setState: any;
}

const Tools = ({ setState}: ToolsProps) => {
  const removeCanvasDraw = (e) => {
    setState({
      chosenColor: "",
      tool: "",
      lines: [],
      shapes: [],
      text: "",
      isEditing: false,
      fontFamily: "Roboto",
      curves: [],
      currentCurve: null,
      images: [],
      selectedId: null,
    });
  };
  return (
    <div className="flex flex-col justify-start gap-6">
      <button
        onClick={() => setState((prev: any) => ({ ...prev, text: "hi here" }))}
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <PiTextTBold />{" "}
      </button>
      <button
        onClick={() => setState((prev: any) => ({ ...prev, tool: "pen" }))}
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <FaPen />
      </button>
      <button
        onClick={() => setState((prev: any) => ({ ...prev, tool: "eraser" }))}
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <FaEraser />
      </button>
      <button
        onClick={() => setState((prev: any) => ({ ...prev, tool: "line" }))}
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <span className="h-[2px] w-4 -rotate-45 bg-black" />
      </button>

      <button
        onClick={(e) => removeCanvasDraw(e)}
        className="flex h-8 w-8 items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <FaX />
      </button>
    </div>
  );
};
export default Tools;
