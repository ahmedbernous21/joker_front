import { Star } from "react-konva";

interface StarProps {
  shape: any;
  handleDragStart: any;
  handleDragEnd: any;
  setState: any;
}

const StarComp = ({
  shape,
  handleDragStart,
  handleDragEnd,
  setState,
}: StarProps) => {
  return (
    <>
      {shape.name == "star" && (
        <Star
          key={shape.id}
          id={shape.id}
          x={shape.x}
          y={shape.y}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill="#89b717"
          opacity={0.8}
          draggable
          rotation={shape.rotation}
          shadowColor="black"
          shadowBlur={10}
          shadowOpacity={0.6}
          shadowOffsetX={shape.isDragging ? 10 : 5}
          shadowOffsetY={shape.isDragging ? 10 : 5}
          scaleX={shape.isDragging ? 1.2 : 1}
          onClick={() => setState((prev: any) => ({ ...prev, tool: "" }))}
          scaleY={shape.isDragging ? 1.2 : 1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      )}
    </>
  );
};
export default StarComp;
