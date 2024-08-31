import { BiText } from "react-icons/bi";
import LeftSideHeader from "./LeftSideHeader";
import { useDispatch } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { FaUpload } from "react-icons/fa6";

const LeftSideCustomize = () => {
  const dispatch = useDispatch();

  return (
    <div className="mx-4 flex flex-col items-center justify-center gap-4 md:mx-0">
      <div className="flex max-w-[600px] flex-row flex-wrap items-center justify-center gap-4 rounded-xl border-2 bg-white p-4 px-6 text-center text-black md:h-[470px] md:flex-col">
        <LeftSideHeader />
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
        <label htmlFor="add-image">
          <FaUpload className="h-6 w-6 cursor-pointer rounded-full border-2 border-black text-2xl text-black" />
        </label>
        <input
          type="file"
          name=""
          id="add-image"
          multiple={false}
          onChange={(e) => {
            if (e.target.files) {
              const imageSrc = URL.createObjectURL(e.target.files[0]);
              dispatch(
                canvasActions.createImage({
                  src: imageSrc,
                  id: uuid(),
                  rotation: 0,
                  x: 115,
                  y: 100,
                  width: 80,
                  height: 80,
                }),
              );
            }
          }}
          className="hidden"
        />
      </div>
    </div>
  );
};
export default LeftSideCustomize;
