import { useDispatch } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const CreateText = () => {
  const dispatch = useDispatch();

  const handleCreateText = () => {
    try {
      const newText = {
        id: uuid(),
        text: "Édite-moi",
        fontFamily: '"Inter", sans-serif',
        fontSize: 30,
        fill: "#000000",
        bold: false,
        angle: 0,
        underline: false,
        width: 300,
        lineHeight: 1,
        textAlign: "center",
        fontStyle: "normal",
        height: 50,
        scaleX: 1,
        scaleY: 1,
        left: 10,
        top: 20,
      };

      dispatch(canvasActions.createText(newText));
      toast.success("Text added successfully!");
    } catch (error) {
      toast.error("Failed to add text. Try again.");
      console.error("Error adding text:", error);
    }
  };

  return (
    <button
      onClick={handleCreateText}
      className="flex items-center gap-2 bg-[#33AA15] text-white p-3 rounded-md  hover:bg-[#2a8f12] active:bg-[#22760f] transition-colors duration-300"
      aria-label="Add Text"
    >
      <div className="rounded-full bg-white p-1 flex items-center justify-center">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.666 9.61H9.60601V15.82H6.42601V9.61H0.366011V6.73H6.42601V0.519998H9.60601V6.73H15.666V9.61Z"
            fill="#33AA15"
          />
        </svg>
      </div>
    </button>
  );
};

export default CreateText;
