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
      <div className="flex md:h-[470px] max-w-[600px] flex-row md:flex-col items-center justify-center gap-4 rounded-xl border-2 bg-white p-4 px-6 text-center text-black">
        <LeftSideHeader />
        <BiText
          onClick={() => {
            dispatch(
              canvasActions.createText({
                id: uuid(),
                text: "édite-moi",
                color: "black",
                fontFamily: '"Moderustic", sans-serif',
                fontSize: 30,
                bold: false,
                rotation: 0,
                underline: false,
                italic: false,
              }),
            );
            toast.success("Text added successfully");
          }}
          className="cursor-pointer rounded-full p-1 text-2xl text-black"
        />
        <label htmlFor="add-image">
          <FaUpload className="cursor-pointer rounded-full p-1 text-2xl text-black" />
        </label>
        <input
          type="file"
          name=""
          id="add-image"
          multiple={false}
          onChange={(e) => {
            if (e.target.files) {
              const img = new window.Image();
              img.src = URL.createObjectURL(e.target.files[0]); // Ensure this image has a transparent background
              img.onload = () => {
                dispatch( 
                  canvasActions.createImage({
                    src: img,
                    id: uuid(),
                    rotation: 0,
                  }),
                );
              };
            }
          }}
          className="hidden"
        />
      </div>
      {/* <div>View 3rd</div> */}
    </div>
  );
};
export default LeftSideCustomize;
