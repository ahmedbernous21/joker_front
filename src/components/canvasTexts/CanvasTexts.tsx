import { Fragment, useEffect, useRef } from "react";
import { Stage, Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { canvasActions } from "../../store/slices/canvasSlice";
import { IRootState } from "../../store/store";
import { Html } from "react-konva-utils";
import {
  getCurrentSelectedText,
  getCurrentSide,
} from "../../store/selectors/canvasSelectors";
import { TextConfig } from "konva/lib/shapes/Text";
import Konva from "konva";
import Editable from "../editable/Editable";
import ContentEditable from "react-contenteditable";

interface CanvasTextsProps {
  shapeRefs: React.MutableRefObject<{ [key: string]: Konva.Node | null }>;
  trRef: React.RefObject<Konva.Transformer>;
  canvasRef: React.RefObject<Konva.Stage>;
}

const CanvasTexts = ({ shapeRefs, trRef, canvasRef }: CanvasTextsProps) => {
  const dispatch = useDispatch();
  const { selectedLayer, isEditing } = useSelector(
    (state: IRootState) => state.canvas,
  );
  const currentArticleSide = useSelector((state: IRootState) =>
    getCurrentSide(state),
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const text = useSelector((state: IRootState) =>
    getCurrentSelectedText(state),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!textAreaRef.current) {
      return;
    }

    const currentLength = textAreaRef.current.value.length;
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

  const selectLayerHandler = (text: TextConfig) => {
    if (text == null) {
      dispatch(canvasActions.setSelectedLayer(null));
      return;
    }
    dispatch(
      canvasActions.setSelectedLayer({
        id: text.id,
        type: "text",
      }),
    );
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

  const handleTextClick = (
    canvasText: TextConfig,
    e: Konva.KonvaEventObject<Event>,
  ) => {
    if (selectedLayer && canvasText.id === selectedLayer.id) {
      dispatch(canvasActions.setIsEditing(true));
    } else {
      selectLayerHandler(canvasText);
      dispatch(canvasActions.setIsEditing(false));
    }
  };

  const getMousePosition = (canvas: HTMLElement, event: Event) => {
    const rect = canvas.getBoundingClientRect();
    const x = (event as MouseEvent).clientX - rect.left;
    const y = (event as MouseEvent).clientY - rect.top;
    return { x, y };
  };

  return (
    <>
      {currentArticleSide?.texts?.map((canvasText) => (
        <Fragment key={canvasText.id}>
          <Text
            id={"text" + canvasText.id}
            text={canvasText.text}
            x={canvasText.x}
            padding={3}
            y={canvasText.y}
            width={canvasText.width}
            scaleX={canvasText.scaleX}
            verticalAlign="top"
            scaleY={canvasText.scaleY}
            align="center"
            lineHeight={1.1}
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
              selectedLayer?.id == canvasText.id
                ? "transparent"
                : canvasText.color
            }
            ref={(node) => {
              if (canvasText.id != undefined) {
                shapeRefs.current[canvasText.id] = node;
              }
            }}
            onClick={(e) => handleTextClick(canvasText, e)}
            onTap={(e) => handleTextClick(canvasText, e)}
            onTransformStart={() => handleTextTransformAndDrag(canvasText.id)}
            onTransform={() => handleTextTransformAndDrag(canvasText.id)}
            onTransformEnd={() => handleTextTransformAndDrag(canvasText.id)}
            onDragStart={() => handleTextTransformAndDrag(canvasText.id)}
            onDragMove={() => handleTextTransformAndDrag(canvasText.id)}
            onDragEnd={() => handleTextTransformAndDrag(canvasText.id)}
          />
        </Fragment>
      ))}

      {selectedLayer && selectedLayer?.id == text?.id && (
        <Html>
          <textarea
            ref={textAreaRef}
            id={"textArea" + text?.id}
            value={text?.text}
            onChange={(e) => handleInputChange(e)}
            wrap="word"
            style={{
              position: "absolute",
              fontSize: `${text?.fontSize}px`,
              color: text?.color,
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
              lineHeight: text?.lineHeight,
              overflow: "hidden",
              boxSizing: "border-box",
              padding: 3,
              margin: 0,
              left: `${text?.x}px`,
              pointerEvents: isEditing ? "auto" : "none", // Allow user interaction
            }}
            className="text-area overflow-hidden bg-transparent focus:outline-none"
          />
        </Html>
      )}
    </>
  );
};

export default CanvasTexts;
