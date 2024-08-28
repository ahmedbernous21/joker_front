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

const Canvas = ({ stageRef }: any) => {
  const dispatch = useDispatch();
  const { selectedLayer, articles, selectedArticleIndex } = useSelector(
    (state: IRootState) => state.canvas,
  );

  const [mainImage] = useImage(
    articles[selectedArticleIndex].active === "front"
      ? articles[selectedArticleIndex].firstImage.src
      : articles[selectedArticleIndex].secondImage.src,
  );

  const shapeRefs = useRef<any>({});
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (trRef.current) {
      if (selectedLayer?.id) {
        trRef.current.setNode(shapeRefs.current[selectedLayer.id]);
        trRef.current.getLayer().batchDraw();
      } else {
        trRef.current.setNode(null);
        trRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedLayer]);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(canvasActions.setSelectedLayer(null));
    }
  };

  const currentArticle =
    articles[selectedArticleIndex].active === "front"
      ? articles[selectedArticleIndex].firstImage
      : articles[selectedArticleIndex].secondImage;

  const { articleBackground } = articles[selectedArticleIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 bg-white">
      <p className="text-xl font-bold text-black">{currentArticle.name}</p>
      <div className="relative">
        <Stage
          ref={stageRef}
          width={320}
          height={450}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          className="max-h-[450px] max-w-[320px] overflow-hidden"
        >
          <Layer>
            <CanvasBackgroundColor articleBackground={articleBackground} />
            <CanvasMainImage mainImage={mainImage} />
            <CanvasImages
              shapeRefs={shapeRefs}
              currentArticle={currentArticle}
            />

            <CanvasTexts
              currentArticle={currentArticle}
              shapeRefs={shapeRefs}
              trRef={trRef}
            />

            <CanvasTransformer trRef={trRef} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Canvas;
