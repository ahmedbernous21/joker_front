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
            fontFamily: '"Inter", sans-serif', //"Times New Roman" : this is the defalt font family in fabric.js
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
          }),
        );
        toast.success("Text added successfully");
      }}
      className="h-6 w-6 cursor-pointer rounded-full border-2 border-black text-2xl text-black"
    />
  );
};
export default CreatText;
