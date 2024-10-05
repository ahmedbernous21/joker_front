import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IoCloudUploadSharp } from "react-icons/io5";
const CreateImage = () => {
  const dispatch = useDispatch();

  const resizeImage = (file, canvasWidth, canvasHeight, quality = 1) => {
    return new Promise((resolve) => {
      const img = new Image();
      const imageSrc = URL.createObjectURL(file);
      img.src = imageSrc;

      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const imgRatio = imgWidth / imgHeight;

        let newWidth = imgWidth;
        let newHeight = imgHeight;

        if (newWidth > canvasWidth || newHeight > canvasHeight) {
          if (newWidth / canvasWidth > newHeight / canvasHeight) {
            newWidth = canvasWidth;
            newHeight = canvasWidth / imgRatio;
          } else {
            newHeight = canvasHeight;
            newWidth = canvasHeight * imgRatio;
          }
        }

        const scale = 0.5;
        const scaledWidth = newWidth * scale;
        const scaledHeight = newHeight * scale;

        const canvas = document.createElement("canvas");
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        const resizedImageSrc = canvas.toDataURL("image/jpeg", quality);

        resolve({ resizedImageSrc, newWidth, newHeight });
      };
    });
  };

  const handleFileChange = async (e) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const canvasWidth = 800;
      const canvasHeight = 600;
      const quality = 0.8;

      const { resizedImageSrc, newWidth, newHeight } = await resizeImage(
        file,
        canvasWidth,
        canvasHeight,
        quality
      );

      dispatch(
        canvasActions.createImage({
          src: resizedImageSrc,
          id: uuid(),
          angle: 0,
          left: 30,
          top: 60,
          width: newWidth,
          height: newHeight,
        })
      );
    }
  };

  return (
    <>
      {/* Clickable icon to trigger file input */}
      <label htmlFor="add-image">
        <div className="flex items-center cursor-pointer py-3 transition-all duration-300 hover:scale-110 h-12 w-auto ">
        <IoCloudUploadSharp 
        className="text-4xl text-[#33AA15]" />
        </div>
      </label>
      
      {/* Hidden file input */}
      <input
        type="file"
        id="add-image"
        multiple={false}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png"
      />
    </>
  );
};

export default CreateImage;
