import { canvasActions } from "../../store/slices/canvasSlice";
import { useDispatch } from "react-redux";
import { Image } from "react-konva";

interface CanvasImagesProps {
  shapeRefs: any;
  currentArticle: any;
}
const CanvasImages = ({ shapeRefs, currentArticle }: CanvasImagesProps) => {
  const dispatch = useDispatch();

  const handleImageTransformAndDrag = (image: any) => {
    const node = shapeRefs.current[image.id];
    dispatch(
      canvasActions.editImage({
        id: image.id,
        x: node.x(),
        y: node.y(),
        scaleX: node.scaleX(),
        scaleY: node.scaleY(),
        width: node.width(), // Adjust width based on scale
        height: node.height(), // Adjust height based on scale
        rotation: node.rotation(),
      }),
    );
  };
  const selectLayerHandler = (image: any) => {
    dispatch(
      canvasActions.setSelectedLayer({
        id: image.id,
        type: "image",
      }),
    );
  };
  return (
    <>
      {currentArticle.images?.map((image: any) => {
        const img = new window.Image();
        img.src = image.src;
        img.onload = () => {};
        return (
          <Image
            key={`image-${image.id}`}
            image={img}
            ref={(node) => (shapeRefs.current[image.id] = node)}
            id={`image-${image.id}`}
            x={image.x}
            y={image.y}
            scaleX={image.scaleX}
            scaleY={image.scaleY}
            width={image.width}
            height={image.height}
            rotation={image.rotation}
            draggable
            onClick={() => selectLayerHandler(image)}
            onTap={() => selectLayerHandler(image)}
            onTransformStart={() => handleImageTransformAndDrag(image)}
            onTransform={() => handleImageTransformAndDrag(image)}
            onTransformEnd={() => handleImageTransformAndDrag(image)}
            onDragMove={() => handleImageTransformAndDrag(image)}
            onDragEnd={() => handleImageTransformAndDrag(image)}
          />
        );
      })}
    </>
  );
};
export default CanvasImages;
