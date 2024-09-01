import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import {
  getCurrentArticle,
  getCurrentSide,
} from "../../store/selectors/canvasSelectors";
import { useImage } from "react-konva-utils";
import Konva from "konva";
import { canvasActions } from "../../store/slices/canvasSlice";
import { Layer, Stage } from "react-konva";
import CanvasBackgroundColor from "../canvasBackgroundColor/CanvasBackgroundColor";
import CanvasMainImage from "../canvasMainImage/CanvasMainImage";
import CanvasImages from "../canvasImages/CanvasImages";
import CanvasTexts from "../canvasTexts/CanvasTexts";
import CanvasTransformer from "../canvasTransformer/CanvasTransformer";

const CanvasComponent: React.FC = () => {
  const dispatch = useDispatch();
  const trRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<{ [key: string]: Konva.Node }>({});
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const selectedLayer = useSelector(
    (state: IRootState) => state.canvas.selectedLayer,
  );
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const currentArticleSide = useSelector((state: IRootState) =>
    getCurrentSide(state),
  );
  const [mainImage] = useImage(
    currentArticleSide?.src || "",
  );

  useEffect(() => {
    if (trRef.current) {
      if (selectedLayer?.id) {
        trRef.current.nodes([shapeRefs.current[selectedLayer.id]]);
        trRef.current.getLayer()?.batchDraw();
      } else {
        trRef.current.nodes([]);
        trRef.current.getLayer()?.batchDraw();
      }
    }
  }, [selectedLayer]);

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>,
  ) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty && !isScrolling) {
      dispatch(canvasActions.setSelectedLayer(null));
    }
    setIsScrolling(false); // Reset scrolling state after handling the event
  };

  const handleTouchStart = (e: Konva.KonvaEventObject<TouchEvent>) => {
    const touch = e.evt.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: Konva.KonvaEventObject<TouchEvent>) => {
    if (touchStart) {
      const touch = e.evt.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }
    setTouchStart(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white">
      <p className="text-xl font-bold text-black">
        {currentArticle.articleName}
      </p>
      <div className="relative">
        <Stage
          width={320}
          height={450}
          onMouseDown={checkDeselect}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={() => setIsScrolling(true)}
          className="max-h-[450px] max-w-[320px] overflow-hidden"
        >
          <Layer>
            <CanvasBackgroundColor
              articleBackground={currentArticle.articleBackground}
            />
            <CanvasMainImage mainImage={mainImage} />
            <CanvasImages shapeRefs={shapeRefs} />
            <CanvasTexts shapeRefs={shapeRefs} trRef={trRef} />
            <CanvasTransformer trRef={trRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default CanvasComponent;
