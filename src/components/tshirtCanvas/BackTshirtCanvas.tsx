import { useState, useEffect, useRef } from "react";
import { Stage, Layer, Image, Text, Rect, Transformer } from "react-konva";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import useImage from "use-image";

const FrontTshirtCanvas = ({ stageRef }: any) => {
  const {
    bgCanvas,
    backText,
    backTextSize,
    isBackTextBold,
    backFontFamily,
    backTextColor,
    backImageUrl,
  } = useSelector((state: IRootState) => state.tShirt);

  // Front t-shirt image
  const [backImage] = useImage("/crew_back.png");

  // State to manage the logo image
  const [backImageLogo, setBackImageLogo] = useState(new window.Image());
  useEffect(() => {
    if (backImageUrl) {
      const img = new window.Image();
      img.src = URL.createObjectURL(backImageUrl); // Ensure this image has a transparent background
      img.onload = () => setBackImageLogo(img);
    }
  }, [backImageUrl]);

  const [selectedId, selectShape] = useState<string | null>(null);
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (trRef.current) {
      if (selectedId) {
        trRef.current.setNode(shapeRef.current);
        trRef.current.getLayer().batchDraw();
      } else {
        trRef.current.nodes([]);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedId]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white">
      <p className="text-xl font-bold text-black">BACK</p>
      <Stage
        ref={stageRef}
        width={320}
        height={450}
        onMouseDown={(e) => {
          const clickedOnEmpty = e.target === e.target.getStage();
          if (clickedOnEmpty) {
            selectShape(null);
          }
        }}
        className="flex flex-col rounded-b-xl"
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
          <Image image={backImage} x={0} y={0} width={320} height={450} />
          {backImageUrl && (
            <Image
              image={backImageLogo}
              ref={shapeRef}
              id="static-image"
              x={115}
              y={100}
              width={80}
              height={80}
              draggable
              onClick={() => selectShape("static-image")}
              onDragEnd={(e) => {
                console.log("Image dragged to:", e.target.x(), e.target.y());
              }}
              onTransformEnd={(e) => {
                const node = shapeRef.current;
                console.log("Image transformed:", {
                  x: node.x(),
                  y: node.y(),
                  scaleX: node.scaleX(),
                  scaleY: node.scaleY(),
                });
              }}
            />
          )}
          {selectedId === "static-image" && (
            <Transformer
              ref={trRef}
              stroke="none" // Removes the border color
              strokeWidth={0} // Ensures no visible border
              opacity={0.1} // Sets transparency
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          )}
          <Text
            text={backText}
            y={80}
            width={320}
            align="center"
            fontSize={backTextSize}
            fontFamily={backFontFamily}
            fontStyle={isBackTextBold ? "bold" : ""}
            draggable
            fill={backTextColor}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default FrontTshirtCanvas;
