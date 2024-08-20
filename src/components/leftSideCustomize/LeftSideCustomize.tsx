import { BiText } from "react-icons/bi";
// import BackTextCustomizeSection from "../backTextCustomizeSection/BackTextCustomizeSection";
// import FrontTextCustomizeSection from "../frontTextCustomizeSection/FrontTextCustomizeSection";
// import LeftSideSubmitButton from "./LeftSideSubmitButton";
import LeftSideHeader from "./LeftSideHeader";
import { useDispatch } from "react-redux";
import { tShirtActions } from "../../store/slices/tShirtSlice";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { FaUpload } from "react-icons/fa6";

const LeftSideCustomize = () => {
  const dispatch = useDispatch();

  return (
    <div className="mx-4 flex flex-col items-center justify-center gap-4 md:mx-0">
      <div className="flex h-[470px] max-w-[600px] flex-col items-center justify-center gap-4 rounded-xl bg-white p-4 px-6 text-center text-black">
        <LeftSideHeader />
        <BiText
          onClick={() => {
            dispatch(
              tShirtActions.createText({
                id: uuid(),
                text: "hello world",
                color: "black",
                fontFamily: '"Moderustic", sans-serif',
                fontSize: 100,
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
              dispatch(tShirtActions.createImage(e.target.files[0]));
            }
          }}
          className="hidden"
        />
        {/* <FrontTextCustomizeSection />
        <BackTextCustomizeSection /> */}
      </div>
      {/* <div>
        View 3rd
      </div> */}
    </div>
  );
};
export default LeftSideCustomize;
