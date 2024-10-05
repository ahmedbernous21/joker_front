import { useDispatch } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { IoIosAdd } from "react-icons/io";

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
      className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#349b11] px-4 py-2 text-white duration-300 hover:opacity-80"
      aria-label="Add Text"
    >
<svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
              >
            <path
              d="M15.666 9.61H9.60601V15.82H6.42601V9.61H0.366011V6.73H6.42601V0.519998H9.60601V6.73H15.666V9.61Z"
              fill="white"
            />
        </svg>    <span className="block md:hidden">Ajouter</span> <span className="hidden md:block">Ajouter du text</span>
    </button>
  );
};

export default CreateText;
