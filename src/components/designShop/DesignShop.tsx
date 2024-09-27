import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";
import { getCurrentArticle } from "../../store/selectors/canvasSelectors";
import FabricCanvasBack from "../fabricCanvas/FabricCanvasBack";
import FabricCanvasFront from "../fabricCanvas/FabricCanvasFront";

function DesignShop() {
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const dispatch = useDispatch();
  const { frontCanvas, backCanvas } = useSelector(
    (state: IRootState) => state.canvas,
  );

  return (
    <div className="flex flex-col  items-center gap-6 rounded-lh bg-[#f9f9f9]">
      <div className="flex flex-col items-center justify-center gap-2 ">
        <FabricCanvasFront canvasWidth={320} canvasHeight={450} />
        <FabricCanvasBack canvasWidth={320} canvasHeight={450}/>
      </div>
      <div className="flex gap-6 ">
        <div
          onClick={() => {
            dispatch(canvasActions.setActiveSide("front"));
            backCanvas?.discardActiveObject();
            backCanvas?.renderAll();
          }}
          className={`flex w-14 cursor-pointer items-center justify-center overflow-hidden rounded-xl ${currentArticle.active === "front" ? "outline-solid outline outline-2 outline-[#141E46]" : ""}`}
        >
          <img
            src={currentArticle.articleFrontSideInfo.src}
            alt={currentArticle.articleFrontSideInfo.name}
          />
        </div>
        {currentArticle.articleBackSideInfo != null && (
          <>
            <div
              onClick={() => {
                dispatch(canvasActions.setActiveSide("back"));
                frontCanvas?.discardActiveObject();
                frontCanvas?.renderAll();
              }}
              className={`flex w-14 cursor-pointer items-center justify-center overflow-hidden rounded-xl ${currentArticle.active === "back" ? "outline-solid outline outline-2 outline-[#141E46]" : ""}`}
            >
              <img
                src={currentArticle.articleBackSideInfo.src}
                alt={currentArticle.articleBackSideInfo.name}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DesignShop;
