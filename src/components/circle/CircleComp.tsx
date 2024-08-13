import { Circle, Rect } from "react-konva";

interface CircleCompProps {
  shape: any;
  handleDragStart: any;
  handleDragEnd: any;
  setState: any;
}

const CircleComp = ({
  shape,
  handleDragStart,
  handleDragEnd,
  setState,
}: CircleCompProps) => {
  return (
    <>
      {shape.name == "circle" && (
        <Circle
          key={shape.id}
          onClick={() => setState((prev: any) => ({ ...prev, tool: "" }))}
          id={shape.id}
          x={shape.x}
          radius={20}
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
export default CircleComp;
