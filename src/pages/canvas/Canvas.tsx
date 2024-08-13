import React, { useRef, useState } from "react";
import { Stage, Layer, Text, Line } from "react-konva";
import StarComp from "../../components/Star/Star";
import EllipseComp from "../../components/ellipse/Ellipse";
import RectComp from "../../components/rectComp/RectComp";
import ExportComp from "../../components/exportComp/ExportComp";
import CircleComp from "../../components/circle/CircleComp";
import ImageComp from "../../components/imageComp/ImageComp";
import CreateShapes from "../../components/createShapes/CreateShapes";
import Tools from "../../components/tools/Tools";
import Konva from "konva";
import { Shape, StateType } from "../../interfaces/canvasInterfaces";

const Canvas = () => {
  const [state, setState] = useState<StateType>({
    chosenColor: "",
    tool: "",
    lines: [],
    shapes: [],
    text: "",
    isEditing: false,
    fontFamily: "Roboto",
    curves: [],
    currentCurve: null,
    images: [],
    selectedId: null,
  });

  const stageRef = useRef<Konva.Stage>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef(null);
  const isDrawing = useRef(false);

  const updateState = <K extends keyof StateType>(
    key: K,
    value: StateType[K],
  ) => setState((prev) => ({ ...prev, [key]: value }));

  const handleDrag = (e: any, isStart: boolean) => {
    const id = e.target.id();
    updateState(
      "shapes",
      state.shapes.map((shape) => ({
        ...shape,
        isDragging: isStart ? shape.id === id : false,
      })),
    );
  };

  const handleMouseDown = (e: any) => {
    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const newLine = state.tool === "pen" || state.tool === "eraser";

    if (newLine) {
      updateState("lines", [
        ...state.lines,
        {
          tool: state.tool,
          points: [pos.x, pos.y],
          chosenColor: state.chosenColor,
        },
      ]);
    } else if (state.tool === "line") {
      updateState("currentCurve", { start: pos, end: pos });
    }
    isDrawing.current = true;
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) return;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    if (state.tool === "pen" || state.tool === "eraser") {
      const lastLine = { ...state.lines[state.lines.length - 1] };
      lastLine.points = lastLine.points.concat([pos.x, pos.y]);
      updateState("lines", [...state.lines.slice(0, -1), lastLine]);
    } else if (state.tool === "line" && state.currentCurve) {
      updateState("currentCurve", { ...state.currentCurve, end: pos });
    }
  };

  const handleMouseUp = () => {
    if (state.currentCurve) {
      updateState("curves", [...state.curves, state.currentCurve]);
      updateState("currentCurve", null);
    }
    isDrawing.current = false;
  };

  const checkDeselect = (e: any) => {
    if (e.target === e.target.getStage()) {
      updateState("selectedId", null); // Deselect any selected item
    }
  };

  return (
    <div className="container my-4 flex h-screen flex-col items-center justify-center gap-2">
      <ExportComp stageRef={stageRef} />
      <input
        type="file"
        multiple={false}
        onChange={(e) =>
          e.target.files?.length &&
          updateState("images", [...state.images, e.target.files[0]])
        }
      />
      <p className="text-xl text-white">Make Your Art</p>
      <div className="flex gap-4">
        <input
          type="color"
          className={state.tool === "pen" ? "visible" : "invisible"}
          onChange={(e) => updateState("chosenColor", e.target.value)}
        />
        {/* <input type="number" />
        <select onChange={(e) => updateState("fontFamily", e.target.value)}>
          <option value="Roboto">Roboto</option>
          <option value="Lobster">Lobster</option>
          <option value="CustomFont">CustomFont</option>
        </select> */}
      </div>
      <div className="flex items-start justify-center gap-6">
        <Tools setState={setState} />
        <Stage
          width={600}
          height={window.innerHeight - 300}
          className="rounded-xl bg-white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={stageRef}
          
          onTouchStart={checkDeselect}
        >
          <Layer>
            <Text
              text={state.text}
              x={50}
              y={50}
              fontSize={20}
              draggable
              onClick={() => updateState("isEditing", true)}
              ref={textRef}
            />

            {state.images.map((image, id) => (
              <ImageComp
                key={id}
                src={URL.createObjectURL(image)}
                setSelectedId={() => updateState("selectedId", "" + id)}
                selectedId={state.selectedId}
              />
            ))}

            {state.lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.chosenColor || "black"}
                strokeWidth={10}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}

            {state.shapes.map((shape) => (
              <React.Fragment key={shape.id}>
                {shape.name === "star" && (
                  <StarComp
                    setState={setState}
                    shape={shape}
                    handleDragEnd={(e) => handleDrag(e, false)}
                    handleDragStart={(e) => handleDrag(e, true)}
                  />
                )}
                {shape.name === "circle" && (
                  <CircleComp
                    setState={setState}
                    shape={shape}
                    handleDragEnd={(e) => handleDrag(e, false)}
                    handleDragStart={(e) => handleDrag(e, true)}
                  />
                )}
                {shape.name === "ellipse" && (
                  <EllipseComp
                    setState={setState}
                    shape={shape}
                    handleDragEnd={(e) => handleDrag(e, false)}
                    handleDragStart={(e) => handleDrag(e, true)}
                  />
                )}
                {shape.name === "square" && (
                  <RectComp
                    setState={setState}
                    shape={shape}
                    handleDragEnd={(e) => handleDrag(e, false)}
                    handleDragStart={(e) => handleDrag(e, true)}
                  />
                )}
              </React.Fragment>
            ))}

            {state.curves
              .concat(state.currentCurve ? [state.currentCurve] : [])
              .map((curve, i) => (
                <Line
                  key={i}
                  points={[
                    curve.start.x,
                    curve.start.y,
                    curve.end.x,
                    curve.end.y,
                  ]}
                  stroke="black"
                  strokeWidth={2}
                  tension={0.5}
                  lineCap="round"
                  lineJoin="round"
                />
              ))}
          </Layer>
        </Stage>
        {state.isEditing && (
          <input
            ref={inputRef}
            style={{
              display: "none",
              position: "absolute",
              top: 0,
              left: 0,
              fontSize: "20px",
              outline: "none",
            }}
            onChange={(e) => updateState("text", e.target.value)}
            onBlur={() => updateState("isEditing", false)}
          />
        )}
        <CreateShapes
          shapes={state.shapes}
          setShapes={(shapes: Shape[]) => updateState("shapes", shapes)}
        />
      </div>
    </div>
  );
};

export default Canvas;
