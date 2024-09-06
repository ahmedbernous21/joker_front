import { BiText } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const CreatText = () => {
  const dispatch = useDispatch();
  return (
    <BiText
      onClick={() => {
        dispatch(
          canvasActions.createText({
            id: uuid(),
            text: "édite-moi",
            fontFamily: '"Moderustic", sans-serif',
            fontSize: 30,
            color: "#000000",
            bold: false,
            rotation: 0,
            underline: false,
            italic: false,
            width: 300,
            lineHeight: 1,
            textAlign : "center",
            height: 50,
            scaleX: 1,
            scaleY: 1,
            x: 10,
            y: 20,
          }),
        );
        toast.success("Text added successfully");
      }}
      className="h-6 w-6 cursor-pointer rounded-full border-2 border-black text-2xl text-black"
    />
  );
};
export default CreatText;
