import { useEffect, useRef } from "react";
import { Stage, Layer, Image, Text, Rect, Transformer } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import useImage from "use-image";

import { canvasActions } from "../../store/slices/canvasSlice";

const Canvas = ({ stageRef }: any) => {
  const dispatch = useDispatch();
  const { bgCanvas, selectedLayer, articles, selectedArticleIndex } =
    useSelector((state: IRootState) => state.canvas);

  // the image in the canvas
  const [mainImage] = useImage(
    articles[selectedArticleIndex].active == "front"
      ? articles[selectedArticleIndex].firstImage.src
      : articles[selectedArticleIndex].secondImage.src,
  );
  const shapeRefs = useRef<any>({});
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (trRef.current) {
      if (selectedLayer.id) {
        trRef.current.setNode(shapeRefs.current[selectedLayer.id]);
        trRef.current.getLayer().batchDraw();
      } else {
        trRef.current.setNode(null);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedLayer]);

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    if (e.target._id - 2 === e.target.getStage()._id) {
      dispatch(canvasActions.setSelectedLayer(null));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white">
      <p className="text-xl font-bold text-black">
        {articles[selectedArticleIndex].active == "front"
          ? articles[selectedArticleIndex].firstImage.name
          : articles[selectedArticleIndex].secondImage.name}
      </p>
      <Stage
        ref={stageRef}
        width={320}
        height={450}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        className="flex flex-col"
      >
        <Layer>
          <Rect
            width={320}
            height={450}
            x={0}
            y={0}
            stroke={bgCanvas}
            fill={bgCanvas}
          />
          <Image image={mainImage} x={0} y={0} width={320} height={450} />
          {(articles[selectedArticleIndex].active == "front"
            ? articles[selectedArticleIndex].firstImage.images
            : articles[selectedArticleIndex].secondImage.images
          )?.map((image: any) => (
            <Image
              key={`image-${image.id}`}
              image={image.src}
              ref={(node) => (shapeRefs.current[image.id] = node)}
              id={`image-${image.id}`}
              x={115}
              y={100}
              width={80}
              rotation={image.rotation}
              height={80}
              draggable
              onClick={() => {
                dispatch(
                  canvasActions.setSelectedLayer({
                    id: image.id,
                    type: "image",
                  }),
                );
              }}
              onTap={() => {
                dispatch(
                  canvasActions.setSelectedLayer({
                    id: image.id,
                    type: "image",
                  }),
                );
              }}
              onDragEnd={(e) => {
                console.log("Image dragged to:", e.target.x(), e.target.y());
              }}
              onTransformEnd={(e) => {
                const node = shapeRefs.current[`image-${image.id}`];
                console.log("Image transformed:", {
                  x: node.x(),
                  y: node.y(),
                  scaleX: node.scaleX(),
                  scaleY: node.scaleY(),
                });
              }}
            />
          ))}

          {(articles[selectedArticleIndex].active == "front"
            ? articles[selectedArticleIndex].firstImage.canvasTexts
            : articles[selectedArticleIndex].secondImage.canvasTexts
          )?.map((canvasText: any) => (
            <Text
              key={canvasText.id}
              text={canvasText.text}
              x={canvasText.x || 0}
              y={canvasText.y || 0}
              width={320}
              align="center"
              fontSize={canvasText.fontSize}
              textDecoration={`${canvasText.underline ? "underline" : ""}`}
              fontFamily={canvasText.fontFamily}
              fontStyle={`${canvasText.italic ? "italic" : ""} ${
                canvasText.bold ? "bold" : ""
              } `}
              rotation={canvasText.rotation}
              draggable
              fill={canvasText.color}
              ref={(node) => (shapeRefs.current[canvasText.id] = node)}
              id={canvasText.id}
              onClick={() => {
                dispatch(
                  canvasActions.setSelectedLayer({
                    id: canvasText.id,
                    type: "text",
                  }),
                );
              }}
              onTap={() => {
                dispatch(
                  canvasActions.setSelectedLayer({
                    id: canvasText.id,
                    type: "text",
                  }),
                );
              }}
              
              onTransformEnd={(e) => {
                const node = shapeRefs.current[canvasText.id];
                console.log("Text transformed:", {
                  x: node.x(),
                  y: node.y(),
                  scaleX: node.scaleX(),
                  scaleY: node.scaleY(),
                });
              }}
            />
          ))}

          {selectedLayer != null && (
            <Transformer
              ref={trRef}
              stroke="none"
              strokeWidth={0}
              opacity={0.5}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
