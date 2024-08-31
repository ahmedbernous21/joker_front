import { Fragment, useEffect, useRef, useState } from "react";
import { Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { Html } from "react-konva-utils";

interface CanvasText {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  rotation: number;
  fontSize: number;
  fontFamily: string;
  style: string;
  fontWeight: string;
  underline: string;
  color: string;
}

interface CanvasTextsProps {
  currentArticle: {
    canvasTexts: CanvasText[];
  };
  shapeRefs: React.MutableRefObject<{ [key: string]: any }>;
  trRef: React.RefObject<any>;
}

const CanvasTexts = ({
  currentArticle,
  shapeRefs,
  trRef,
}: CanvasTextsProps) => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [canvasText, setCanvasText] = useState<CanvasText | undefined>(
    currentArticle.canvasTexts.find((text) => text.id === selectedLayer?.id),
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) {
      return;
    }

    const currentLength = textareaRef.current.value.length;
    const newLength = e.target.value.length;

    if (
      newLength > currentLength &&
      +e.target.style.height.slice(0, -2) >
        440 - +e.target.style.top.slice(0, -2)
    ) {
      return;
    }
    if (selectedLayer) {
      dispatch(
        canvasActions.editText({
          id: selectedLayer.id,
          text: e.target.value,
        }),
      );
    }
  };

  const handleTextClick = (canvasText: CanvasText) => {
    dispatch(
      canvasActions.setSelectedLayer({
        id: canvasText.id,
        type: "text",
      }),
    );
    setIsEditing(true);
  };

  const handleTextTransformAndDrag = (id: string) => {
    const node = shapeRefs.current[id];
    if (node) {
      dispatch(
        canvasActions.editText({
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
    }
  };

  useEffect(() => {
    setCanvasText(
      currentArticle.canvasTexts.find((text) => text.id === selectedLayer?.id),
    );
  }, [currentArticle.canvasTexts, selectedLayer]);

  useEffect(() => {
    if (selectedLayer) {
      handleTextTransformAndDrag(selectedLayer.id);
    }
  }, [
    trRef?.current?.height,
    trRef?.current?.width,
    trRef?.current?.x,
    trRef?.current?.y,
    trRef?.current?.scaleX,
    trRef?.current?.scaleY,
    trRef?.current?.rotation,
    canvasText?.text,
    canvasText?.fontSize,
    canvasText?.fontWeight,
    canvasText?.height,
  ]);

  useEffect(() => {
    if (!selectedLayer) {
      setIsEditing(false);
    }
  }, [selectedLayer]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <>
      {currentArticle.canvasTexts?.map((canvasText) => (
        <Fragment key={canvasText.id}>
          <Text
            text={canvasText.text}
            x={canvasText.x}
            padding={3}
            y={canvasText.y}
            width={canvasText.width}
            scaleX={canvasText.scaleX}
            verticalAlign="top"
            scaleY={canvasText.scaleY}
            align="center"
            lineHeight={1}
            fontSize={canvasText.fontSize}
            textDecoration={
              canvasText.underline === "underline" ? "underline" : ""
            }
            fontFamily={canvasText.fontFamily}
            fontStyle={`${canvasText.style === "italic" ? "italic" : ""} ${
              canvasText.fontWeight === "bold" ? "bold" : "normal"
            }`}
            rotation={canvasText.rotation}
            draggable
            fill={
              isEditing && selectedLayer?.id == canvasText.id
                ? "transparent"
                : canvasText.color
            }
            ref={(node) => (shapeRefs.current[canvasText.id] = node)}
            id={canvasText.id}
            onClick={() => handleTextClick(canvasText)}
            onTap={() => handleTextClick(canvasText)}
            onTransformStart={() => handleTextTransformAndDrag(canvasText.id)}
            onTransform={() => handleTextTransformAndDrag(canvasText.id)}
            onTransformEnd={() => handleTextTransformAndDrag(canvasText.id)}
            onDragStart={() => handleTextTransformAndDrag(canvasText.id)}
            onDragMove={() => handleTextTransformAndDrag(canvasText.id)}
            onDragEnd={() => handleTextTransformAndDrag(canvasText.id)}
          />
        </Fragment>
      ))}

      {selectedLayer && (
        <Html>
          <textarea
            ref={textareaRef}
            value={canvasText?.text}
            onChange={(e) => handleInputChange(e)}
            wrap="hard"
            style={{
              position: "absolute",
              fontSize: `${canvasText?.fontSize}px`,
              color:
                isEditing && selectedLayer.id == canvasText?.id
                  ? canvasText?.color
                  : "transparent",
              top: `${canvasText?.y}px`,
              // left: `${canvasText?.x}px`,
              width: `${canvasText?.width}px`,
              height: `${canvasText?.height}px`,
              textAlign: "center",
              fontFamily: canvasText?.fontFamily,
              fontStyle: canvasText?.style === "italic" ? "italic" : "",
              fontWeight: canvasText?.fontWeight === "bold" ? "bold" : "normal",
              textDecoration:
                canvasText?.underline === "underline" ? "underline" : "",
              transform: `rotate(${canvasText?.rotation}deg) scale(${canvasText?.scaleX}, ${canvasText?.scaleY})`,
              transformOrigin: "top left",
              border: "none",
              resize: "none",
              lineHeight: 1,
              pointerEvents: isEditing ? "auto" : "none",
              overflow: "hidden",
              boxSizing: "border-box",
              padding: 0,
              margin: 0,
              left: canvasText?.style === "italic" ? `${canvasText?.x - 0.5}px` : `${canvasText?.x}px`,
            }}
            autoFocus
            onClick={() => setIsEditing(true)}
            readOnly={!isEditing}
            className="overflow-hidden bg-transparent focus:outline-none"
          />
        </Html>
      )}
    </>
  );
};

export default CanvasTexts;