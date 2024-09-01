import { useEffect, useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useSelector, useDispatch } from "react-redux";
import { IRootState } from "../../store/store";
import useImage from "use-image";
import { canvasActions } from "../../store/slices/canvasSlice";
import CanvasImages from "../canvasImages/CanvasImages";
import CanvasMainImage from "../canvasMainImage/CanvasMainImage";
import CanvasBackgroundColor from "../canvasBackgroundColor/CanvasBackgroundColor";
import CanvasTexts from "../canvasTexts/CanvasTexts";
import CanvasTransformer from "../canvasTransformer/CanvasTransformer";
import {
  getCurrentArticle,
  getCurrentSide,
} from "../../store/selectors/canvasSelectors";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";

const Canvas = () => {
  const dispatch = useDispatch();
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);

  const shapeRefs = useRef<{ [key: string]: Konva.Node }>({});
  const trRef = useRef<Konva.Transformer>(null);

  useEffect(() => {
    if (trRef.current) {
      if (selectedLayer != null) {
        trRef.current.nodes([shapeRefs.current[selectedLayer.id]]);
        trRef.current.getLayer()?.batchDraw();
      } else {
        trRef.current.nodes([]);
        trRef.current.getLayer()?.batchDraw();
      }
    }
  }, [selectedLayer]);

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>,
  ) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(canvasActions.setSelectedLayer(null));
    }
  };

  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const currentArticleSide = useSelector((state: IRootState) =>
    getCurrentSide(state),
  );
  const [mainImage] = useImage(currentArticleSide?.src || "");

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
          onTouchStart={checkDeselect}
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

export default Canvas;
