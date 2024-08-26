import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Text, Rect, Transformer } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import useImage from "use-image";
import { canvasActions } from "../../store/slices/canvasSlice";
import { Html } from "react-konva-utils";
import React from "react";

const Canvas = ({ stageRef }: any) => {
  const dispatch = useDispatch();
  const { selectedLayer, articles, selectedArticleIndex } = useSelector(
    (state: IRootState) => state.canvas,
  );

  const [mainImage] = useImage(
    articles[selectedArticleIndex].active === "front"
      ? articles[selectedArticleIndex].firstImage.src
      : articles[selectedArticleIndex].secondImage.src,
  );

  const shapeRefs = useRef<any>({});
  const trRef = useRef<any>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  useEffect(() => {
    if (trRef.current) {
      if (selectedLayer?.id) {
        trRef.current.setNode(shapeRefs.current[selectedLayer.id]);
        trRef.current.getLayer().batchDraw();
      } else {
        trRef.current.setNode(null);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedLayer]);

  const checkDeselect = (e: any) => {
    if (e.target._id - 2 === e.target.getStage()._id) {
      dispatch(canvasActions.setSelectedLayer(null));
    }
  };

  const currentArticle =
    articles[selectedArticleIndex].active === "front"
      ? articles[selectedArticleIndex].firstImage
      : articles[selectedArticleIndex].secondImage;

  const { articleBackground } = articles[selectedArticleIndex];
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingTextId) {
      dispatch(
        canvasActions.editText({
          id: editingTextId,
          text: e.target.value,
        }),
      );
    }
  };

  const handleTextClick = (id: string) => {
    setEditingTextId(id);
    dispatch(
      canvasActions.setSelectedLayer({
        id,
        type: "text",
      }),
    );
  };

  const handleInputBlur = () => {
    // setEditingTextId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white">
      <p className="text-xl font-bold text-black">{currentArticle.name}</p>
      <div className="relative">
        <Stage
          ref={stageRef}
          width={320}
          height={450}
          // onMouseDown={checkDeselect}
          // onTouchStart={checkDeselect}
          className="relative flex flex-col"
        >
          <Layer>
            <Rect
              width={320}
              height={450}
              x={0}
              y={0}
              stroke={articleBackground}
              draggable={false}
              fill={articleBackground}
            />
            <Image
              image={mainImage}
              draggable={false}
              x={0}
              y={0}
              width={320}
              height={450}
            />
            {currentArticle.images?.map((image: any) => (
              <Image
                key={`image-${image.id}`}
                image={image.src}
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
                onTransform={() => {
                  const node = shapeRefs.current[image.id];
                  dispatch(
                    canvasActions.editImage({
                      id: image.id,
                      x: node.x(),
                      y: node.y(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY(),
                      width: node.width() * node.scaleX(), // Adjust width based on scale
                      height: node.height() * node.scaleY(), // Adjust height based on scale
                    }),
                  );
                }}
                onTransformEnd={() => {
                  const node = shapeRefs.current[image.id];
                  dispatch(
                    canvasActions.editImage({
                      id: image.id,
                      x: node.x(),
                      y: node.y(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY(),
                      width: node.width() * node.scaleX(), // Adjust width based on scale
                      height: node.height() * node.scaleY(), // Adjust height based on scale
                    }),
                  );
                }}
                onDragMove={() => {
                  const node = shapeRefs.current[image.id];
                  dispatch(
                    canvasActions.editImage({
                      id: image.id,
                      x: node.x(),
                      y: node.y(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY(),
                      width: node.width() * node.scaleX(), // Adjust width based on scale
                      height: node.height() * node.scaleY(), // Adjust height based on scale
                    }),
                  );
                }}
                onDragEnd={() => {
                  const node = shapeRefs.current[image.id];
                  dispatch(
                    canvasActions.editImage({
                      id: image.id,
                      x: node.x(),
                      y: node.y(),
                      scaleX: node.scaleX(),
                      scaleY: node.scaleY(),
                      width: node.width() * node.scaleX(), // Adjust width based on scale
                      height: node.height() * node.scaleY(), // Adjust height based on scale
                    }),
                  );
                }}
              />
            ))}

            {currentArticle.canvasTexts?.map((canvasText: any) => (
              <React.Fragment key={canvasText.id}>
                <Text
                  text={canvasText.text}
                  x={canvasText.x}
                  y={canvasText.y}
                  width={canvasText.width}
                  scaleX={canvasText.scaleX}
                  scaleY={canvasText.scaleY}
                  align="center"
                  fontSize={canvasText.fontSize}
                  textDecoration={
                    canvasText.underline === "underline" ? "underline" : ""
                  }
                  fontFamily={canvasText.fontFamily}
                  fontStyle={`${canvasText.style === "italic" ? "italic" : ""} ${canvasText.fontWeight === "bold" ? "bold" : "normal"}`}
                  rotation={canvasText.rotation}
                  draggable
                  // fill={editingTextId ? "transparent " : canvasText.color}
                  fill={canvasText.color}
                  ref={(node) => (shapeRefs.current[canvasText.id] = node)}
                  id={canvasText.id}
                  onClick={() => handleTextClick(canvasText.id)}
                  onTap={() => handleTextClick(canvasText.id)}
                  onTransform={() => {
                    const node = shapeRefs.current[canvasText.id];
                    dispatch(
                      canvasActions.editText({
                        id: canvasText.id,
                        x: node.x(),
                        y: node.y(),
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY(),
                        width: node.width() * node.scaleX(), // Adjust width based on scale
                        height: node.height() * node.scaleY(), // Adjust height based on scale
                      }),
                    );
                  }}
                  onTransformEnd={() => {
                    const node = shapeRefs.current[canvasText.id];
                    dispatch(
                      canvasActions.editText({
                        id: canvasText.id,
                        x: node.x(),
                        y: node.y(),
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY(),
                        width: node.width() * node.scaleX(), // Adjust width based on scale
                        height: node.height() * node.scaleY(), // Adjust height based on scale
                      }),
                    );
                  }}
                  onDragMove={() => {
                    const node = shapeRefs.current[canvasText.id];
                    dispatch(
                      canvasActions.editText({
                        id: canvasText.id,
                        x: node.x(),
                        y: node.y(),
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY(),
                        width: node.width() * node.scaleX(), // Adjust width based on scale
                        height: node.height() * node.scaleY(), // Adjust height based on scale
                      }),
                    );
                  }}
                  onDragEnd={() => {
                    const node = shapeRefs.current[canvasText.id];
                    dispatch(
                      canvasActions.editText({
                        id: canvasText.id,
                        x: node.x(),
                        y: node.y(),
                        scaleX: node.scaleX(),
                        scaleY: node.scaleY(),
                        width: node.width() * node.scaleX(), // Adjust width based on scale
                        height: node.height() * node.scaleY(), // Adjust height based on scale
                      }),
                    );
                  }}
                />
                {editingTextId === canvasText.id && (
                  <Html
                    divProps={{
                      style: {
                        position: "absolute",
                        pointerEvents: "none", // Make sure textarea does not block interactions
                        zIndex: 10,
                      },
                    }}
                  >
                    <textarea
                      value={canvasText.text}
                      onChange={handleInputChange}
                      onBlur={handleInputBlur}
                      autoFocus
                      style={{
                        fontSize: `${20}px`,
                        position: "absolute",
                        // top: `${trRef?.current?.y()}px`,
                        top: "0px",
                        // left: `${canvasText.x}px`,
                        // bottom: "0px",
                        left: "0px",
                        width: `${canvasText.width}px`,
                        height: `${canvasText.height}px`,
                        // maxHeight : `500px`,
                        textAlign: "center",
                        fontFamily: canvasText.fontFamily,
                        fontStyle:
                          canvasText.style === "italic" ? "italic" : "normal",
                        fontWeight:
                          canvasText.fontWeight === "bold" ? "bold" : "normal",
                        textDecoration:
                          canvasText.underline === "underline"
                            ? "underline"
                            : "",
                        color: canvasText.color,
                        transform: `scaleX(${canvasText.scaleX}) scaleY(${canvasText.scaleY})`,
                        transformOrigin: "top left",
                        border: "none",
                        padding: 0,
                        margin: 0,
                        resize: "none", // Prevent textarea from being resized
                      }}
                      className="focus:outline-none"
                    />
                  </Html>
                )}
              </React.Fragment>
            ))}

            {selectedLayer && (
              <Transformer
                ref={trRef}
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
    </div>
  );
};

export default Canvas;
