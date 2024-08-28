import { Fragment, useEffect, useRef, useState } from "react";
import { Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { Html } from "react-konva-utils";

interface CanvasTextsProps {
  currentArticle: any;
  shapeRefs: any;
  trRef: any;
}

const CanvasTexts = ({
  currentArticle,
  shapeRefs,
  trRef,
}: CanvasTextsProps) => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [canvasText, setCanvasText] = useState(
    currentArticle.canvasTexts.find((text) => text.id === selectedLayer?.id),
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedLayer) {
      dispatch(
        canvasActions.editText({
          id: selectedLayer.id,
          text: e.target.value,
        }),
      );
    }
  };

  const handleTextClick = (canvasText: any) => {
    dispatch(
      canvasActions.setSelectedLayer({
        id: canvasText.id,
        type: "text",
      }),
    );
  };

  const handleTextTransformAndDrag = (id: any) => {
    const node = shapeRefs.current[id];
    if (node) {
      dispatch(
        canvasActions.editText({
          id,
          x: node.x(),
          y: node.y(),
          scaleX: node.scaleX(),
          scaleY: node.scaleY(),
          width: node.width(), // Adjust width based on scale
          height: node.height(), // Adjust height based on scale
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
    trRef?.current?.height(),
    trRef?.current?.width(),
    trRef?.current?.x(),
    trRef?.current?.y(),
    trRef?.current?.scaleX(),
    trRef?.current?.scaleY(),
    textareaRef.current?.textContent?.length,
  ]);

  useEffect(() => {
    if (!selectedLayer) {
      setIsEditing(false);
    }
  }, [selectedLayer, isEditing]);

  return (
    <>
      {currentArticle.canvasTexts?.map((canvasText: any) => (
        <Fragment key={canvasText.id}>
          <Text
            text={canvasText.text}
            x={canvasText.x}
            y={canvasText.y}
            width={canvasText.width}
            scaleX={canvasText.scaleX}
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
            onTransform={() => handleTextTransformAndDrag(canvasText.id)}
            onTransformEnd={() => handleTextTransformAndDrag(canvasText.id)}
            onDragStart={() => handleTextTransformAndDrag(canvasText.id)}
            onDragMove={() => handleTextTransformAndDrag(canvasText.id)}
            onDragEnd={() => handleTextTransformAndDrag(canvasText.id)}
          />
        </Fragment>
      ))}

      {selectedLayer && (
        <>
          {(() => {
            return (
              <Html divProps={{ style: {} }}>
                <textarea
                  ref={textareaRef}
                  value={canvasText?.text}
                  onChange={handleInputChange}
                  style={{
                    position: "absolute",
                    fontSize: `${canvasText?.fontSize}px`,
                    color:
                      isEditing && selectedLayer.id == canvasText.id
                        ? canvasText?.color
                        : "transparent",
                    top: `${canvasText?.y}px`,
                    left: `${canvasText?.x}px`,
                    width: `${canvasText?.width}px`,
                    height: `${canvasText?.height}px`,
                    maxHeight : `${450 - canvasText?.y}px`,
                    textAlign: "center",
                    fontFamily: canvasText?.fontFamily,
                    fontStyle:
                      canvasText?.style === "italic" ? "italic" : "normal",
                    fontWeight:
                      canvasText?.fontWeight === "bold" ? "bold" : "normal",
                    textDecoration:
                      canvasText?.underline === "underline" ? "underline" : "",
                    transform: `scaleX(${canvasText?.scaleX}) scaleY(${canvasText?.scaleY})`,
                    transformOrigin: "left top",
                    border: "none",
                    resize: "none", // Prevent textarea from being resized
                    lineHeight: 1,
                  }}
                  autoFocus
                  onClick={() => setIsEditing(true)}
                  readOnly={
                    isEditing && selectedLayer.id == canvasText?.id
                      ? false
                      : true
                  }
                  className="overflow-hidden bg-transparent focus:outline-none"
                />
              </Html>
            );
          })()}
        </>
      )}
    </>
  );
};

export default CanvasTexts;