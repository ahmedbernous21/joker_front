import { Ellipse } from "react-konva";
interface EllipseProps {
  shape: any;
  handleDragStart: any;
  handleDragEnd: any;
  setState: any;
}

const EllipseComp = ({
  shape,
  handleDragStart,
  handleDragEnd,
  setState,
}: EllipseProps) => {
  return (
    <>
      {shape.name == "ellipse" && (
        <Ellipse
          radiusX={40}
          radiusY={100}
          key={shape.id}
          id={shape.id}
          x={shape.x}
          y={shape.y}
          width={40}
          height={20}
          fill="#89b717"
          draggable
          onClick={() => setState((prev: any) => ({ ...prev, tool: "" }))}
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
export default EllipseComp;
