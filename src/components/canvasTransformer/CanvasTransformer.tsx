import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { Transformer } from "react-konva";

interface CanvasTransformerProps {
  trRef: any;
}

const CanvasTransformer = ({ trRef }: CanvasTransformerProps) => {
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);
  return (
    <>
      {selectedLayer?.id && (
        <Transformer
        zIndex={10}
        
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
export default CanvasTransformer;
