import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Text, Rect, Transformer } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import useImage from "use-image";

import { tShirtActions } from "../../store/slices/tShirtSlice";
const FrontTshirtCanvas = ({ stageRef }: any) => {
  const dispatch = useDispatch();
  const { bgCanvas, selectedId, frontTexts, images } = useSelector(
    (state: IRootState) => state.tShirt,
  );

  // Front t-shirt image
  const [frontImage] = useImage("/crew_front.png");

  // State to manage the logo image
  const [imagesTmp, setimagesTmp] = useState<any[]>([]);
  useEffect(() => {
    if (images.length > 0) {
      images.forEach((image) => {
        const img = new window.Image();
        console.log(image);
        img.src = URL.createObjectURL(image); // Ensure this image has a transparent background
        img.onload = () => setimagesTmp([...imagesTmp, img]);
      });
    }
  }, [images]);

  // const [selectedId] = useState<string | null>(null);
  const shapeRefs = useRef<any>({});
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (trRef.current) {
      if (selectedId) {
        trRef.current.setNode(shapeRefs.current[selectedId]);
        trRef.current.getLayer().batchDraw();
      } else {
        trRef.current.nodes([]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white">
      <p className="text-xl font-bold text-black">FRONT</p>
      <Stage
        ref={stageRef}
        width={320}
        height={450}
        onMouseDown={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            dispatch(tShirtActions.setSelectedId(null));
          }
        }}
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
          <Image image={frontImage} x={0} y={0} width={320} height={450} />
          {imagesTmp?.map((image) => (
            <Image
              image={image}
              ref={(node) => (shapeRefs.current["static-image"] = node)}
              id="static-image"
              x={115}
              y={100}
              width={80}
              height={80}
              draggable
              onDragEnd={(e) => {
                console.log("Image dragged to:", e.target.x(), e.target.y());
              }}
              onTransformEnd={(e) => {
                const node = shapeRefs.current["static-image"];
                console.log("Image transformed:", {
                  x: node.x(),
                  y: node.y(),
                  scaleX: node.scaleX(),
                  scaleY: node.scaleY(),
                });
              }}
            />
          ))}

          {frontTexts.map((frontText) => (
            <Text
              key={frontText.id}
              text={frontText.text}
              x={frontText.x || 0}
              y={frontText.y || 0}
              width={320}
              align="center"
              fontSize={frontText.fontSize}
              textDecoration={`${frontText.underline ? "underline" : ""}`}
              fontFamily={frontText.fontFamily}
              fontStyle={`${frontText.italic ? "italic" : ""} ${frontText.bold ? "bold" : ""} `}
              rotation={frontText.rotation}
              draggable
              fill={frontText.color}
              ref={(node) => (shapeRefs.current[frontText.id] = node)}
              id={frontText.id}
              onClick={() => {
                dispatch(tShirtActions.setSelectedId(frontText.id));
              }}
              onTransformEnd={(e) => {
                const node = shapeRefs.current[frontText.id];
                console.log("Text transformed:", {
                  x: node.x(),
                  y: node.y(),
                  scaleX: node.scaleX(),
                  scaleY: node.scaleY(),
                });
              }}
            />
          ))}

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
        </Layer>
      </Stage>
    </div>
  );
};

export default FrontTshirtCanvas;
