import { canvasActions } from "../../store/slices/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-konva";
import { ImageConfig } from "konva/lib/shapes/Image";
import { getCurrentSide } from "../../store/selectors/canvasSelectors";
import { IRootState } from "../../store/store";

interface CanvasImagesProps {
  shapeRefs: any;
}
const CanvasImages = ({ shapeRefs }: CanvasImagesProps) => {
  const dispatch = useDispatch();
  const currentArticleSide = useSelector((state: IRootState) =>
    getCurrentSide(state),
  );

  const handleImageTransformAndDrag = (id: string | undefined) => {
    if (!id) {
      return;
    }
    const node = shapeRefs.current[id];
    dispatch(
      canvasActions.editImage({
        id,
        x: node.x(),
        y: node.y(),
        scaleX: node.scaleX(),
        scaleY: node.scaleY(),
        width: node.width(),
        height: node.height(),
        rotation: node.rotation(),
      }),
    );
  };
  const selectLayerHandler = (image: ImageConfig) => {
    dispatch(
      canvasActions.setSelectedLayer({
        id: image.id,
        type: "image",
      }),
    );
  };
  return (
    <>
      {currentArticleSide?.images?.map((image: ImageConfig) => {
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
            onTransformStart={() => handleImageTransformAndDrag(image.id)}
            onTransform={() => handleImageTransformAndDrag(image.id)}
            onTransformEnd={() => handleImageTransformAndDrag(image.id)}
            onDragMove={() => handleImageTransformAndDrag(image.id)}
            onDragEnd={() => handleImageTransformAndDrag(image.id)}
          />
        );
      })}
    </>
  );
};
export default CanvasImages;
