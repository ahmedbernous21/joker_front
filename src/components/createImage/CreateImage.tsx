import { FaUpload } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { canvasActions } from "../../store/slices/canvasSlice";

const CreateImage = () => {
    const dispatch = useDispatch();
  return (
    <>
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
              
              }),
            );
          }
        }}
        className="hidden"
      />
    </>
  );
};
export default CreateImage;
