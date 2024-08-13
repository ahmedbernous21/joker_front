import { Rect } from "react-konva";

interface SquareProps {
  shape: any;
  handleDragStart: any;
  handleDragEnd: any;
  setState: any;
}

const RectComp = ({
  shape,
  handleDragStart,
  handleDragEnd,
  setState,
}: SquareProps) => {
  return (
    <>
      {shape.name == "square" && (
        <Rect
          key={shape.id}
          onClick={() => setState((prev: any) => ({ ...prev, tool: "" }))}
          id={shape.id}
          x={shape.x}
          y={shape.y}
          width={20}
          height={20}
          fill="#89b717"
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          // shadowColor="black"
          // shadowBlur={10}
          shadowOpacity={0}
          shadowOffsetX={shape.isDragging ? 10 : 5}
          shadowOffsetY={shape.isDragging ? 10 : 5}
          scaleX={shape.isDragging ? 1.2 : 1}
          scaleY={shape.isDragging ? 1.2 : 1}
        />
      )}
    </>
  );
};
export default RectComp;
