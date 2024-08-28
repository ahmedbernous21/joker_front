import { Rect } from "react-konva";

interface CanvasBackgroundColorProps {
  articleBackground: string;
}
const CanvasBackgroundColor = ({
  articleBackground,
}: CanvasBackgroundColorProps) => {
  return (
    <Rect
      width={320}
      height={450}
      x={0}
      onClick={(e) => {
        console.log(e.target._id);
      }}
      listening={false}
      y={0}
      stroke={articleBackground}
      fill={articleBackground}
    />
  );
};
export default CanvasBackgroundColor;
