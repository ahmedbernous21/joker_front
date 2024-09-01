import { Image } from "react-konva";

interface CanvasMainImageProps {
  mainImage: HTMLImageElement | undefined;
}

const CanvasMainImage = ({ mainImage }: CanvasMainImageProps) => {
  return (
    <Image
      image={mainImage}
      x={0}
      y={0}
      width={320}
      height={450}
      listening={false}
    />
  );
};
export default CanvasMainImage;
