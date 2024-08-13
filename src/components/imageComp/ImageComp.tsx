import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva";
import { useImage } from "react-konva-utils";

interface ImageCompProps {
  src: string;
  selectedId: any;
  setSelectedId: any;
}

const ImageComp = ({ src, selectedId, setSelectedId }: ImageCompProps) => {
  const [imageProps, setImageProps] = useState({
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    id: selectedId,
  });

  const shapeRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (selectedId === imageProps.id) {
      // Attach the transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedId, imageProps.id]);

  const onSelect = () => {
    setSelectedId(imageProps.id);
  };

  const onChange = (newAttrs: any) => {
    setImageProps(newAttrs);
  };

  const [image] = useImage(src);

  return (
    <>
      <Image
        image={image}
        ref={shapeRef}
        {...imageProps}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...imageProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // Transformer changes the scale of the node
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // Reset scale back to 1 after transformation
          node.scaleX(1);
          node.scaleY(1);

          onChange({
            ...imageProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {imageProps.id === selectedId && (
        <Transformer
          ref={trRef}
          ignoreStroke
          flipEnabled={false}
          // anchorStroke="transparent"
          // anchorFill="transparent"
          // borderStroke="transparent"

          boundBoxFunc={(oldBox, newBox) => {
            // Limit the resize to a minimum size
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default ImageComp;
