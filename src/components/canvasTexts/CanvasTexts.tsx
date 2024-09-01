import { Fragment, useEffect, useRef, useState } from "react";
import { Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { Html } from "react-konva-utils";
import { getCurrentSide } from "../../store/selectors/canvasSelectors";
import { TextConfig } from "konva/lib/shapes/Text";
import Konva from "konva";

interface CanvasTextsProps {
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node | null }>;
  trRef: React.RefObject<Konva.Transformer>;
}

const CanvasTexts = ({ shapeRefs, trRef }: CanvasTextsProps) => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  const currentArticleSide = useSelector((state: IRootState) =>
    getCurrentSide(state),
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<TextConfig | undefined>(
    currentArticleSide?.texts.find((text) => text.id === selectedLayer?.id),
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

  const handleTextClick = (text: TextConfig) => {
    dispatch(
      canvasActions.setSelectedLayer({
        id: text.id,
        type: "text",
      }),
    );
    setIsEditing(true);
  };

  const handleTextTransformAndDrag = (id: string | undefined) => {
    if (!id) {
      return;
    }
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
    setText(
      currentArticleSide?.texts.find((text) => text.id === selectedLayer?.id),
    );
  }, [currentArticleSide?.texts, selectedLayer]);

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
    text?.text,
    text?.fontSize,
    text?.fontWeight,
    text?.height,
  ]);

  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    if (!selectedLayer && !isScrolling) {
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
      {currentArticleSide?.texts?.map((canvasText) => (
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
            ref={(node) => {
              if (canvasText.id != undefined) {
                shapeRefs.current[canvasText.id] = node;
              }
            }}
            id={canvasText.id}
            onClick={() => handleTextClick(canvasText)}
            onTap={() => handleTextClick(canvasText)}
            onTransformStart={() => handleTextTransformAndDrag(canvasText.id)}
            onTransform={() => handleTextTransformAndDrag(canvasText.id)}
            onTransformEnd={() => handleTextTransformAndDrag(canvasText.id)}
            onDragStart={() => handleTextTransformAndDrag(canvasText.id)}
            onDragMove={() => handleTextTransformAndDrag(canvasText.id)}
            onDragEnd={() => handleTextTransformAndDrag(canvasText.id)}
            onWheel={() => setIsScrolling(true)}
          />
        </Fragment>
      ))}

      {selectedLayer && trRef && (
        <Html>
          <textarea
            ref={textareaRef}
            value={text?.text}
            onChange={(e) => handleInputChange(e)}
            wrap="char"
            style={{
              position: "absolute",
              fontSize: `${text?.fontSize}px`,
              color:
                isEditing && selectedLayer.id == text?.id
                  ? text?.color
                  : "transparent",
              top: `${text?.y}px`,
              width: `${text?.width}px`,
              height: `${text?.height}px`,
              textAlign: "center",
              fontFamily: text?.fontFamily,
              fontStyle: text?.style === "italic" ? "italic" : "",
              fontWeight: text?.fontWeight === "bold" ? "bold" : "normal",
              textDecoration:
                text?.underline === "underline" ? "underline" : "",
              transform: `rotate(${text?.rotation}deg) scale(${text?.scaleX}, ${text?.scaleY})`,
              transformOrigin: "top left",
              border: "none",
              resize: "none",
              lineHeight: 1,
              pointerEvents: isEditing ? "auto" : "none",
              overflow: "hidden",
              boxSizing: "border-box",
              padding: 0,
              margin: 0,
              left: `${text?.x}px`,
            }}
            autoFocus
            onClick={() => {
              setIsEditing(true);
            }}
            readOnly={!isEditing}
            className="overflow-hidden bg-transparent focus:outline-none"
          />
        </Html>
      )}
    </>
  );
};

export default CanvasTexts;
