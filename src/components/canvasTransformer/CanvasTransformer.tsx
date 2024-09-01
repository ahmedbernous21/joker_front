import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import Konva from "konva";
import { Transformer } from "react-konva";
import React from "react";

interface CanvasTransformerProps {
  trRef: React.RefObject<Konva.Transformer>;
}

const CanvasTransformer = ({ trRef }: CanvasTransformerProps) => {
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);


  return (
    <>
      {selectedLayer?.id && (
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
    </>
  );
};

export default CanvasTransformer;