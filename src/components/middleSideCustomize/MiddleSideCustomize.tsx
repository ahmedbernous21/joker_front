import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";
import Canvas from "../canvas/Canvas";
import { getCurrentArticle } from "../../store/selectors/canvasSelectors";

function MiddleSideCustomize() {
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const dispatch = useDispatch();
  const { readyToExport } = useSelector(
    (state: IRootState) => state.canvas,
  );
  // const frontRef = useRef(null);
  // const backRef = useRef(null);
  // function downloadURI(uri: string, name: string) {
  //   const link = document.createElement("a");
  //   link.download = name;
  //   link.href = uri;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  // const handleExport = () => {
  //   if (frontRef.current) {
  //     const uri = frontRef.current.toDataURL(); // Adjust the pixel ratio for higher resolution
  //     downloadURI(uri, "frontTshirt.png");
  //   }
  //   if (backRef.current) {
  //     const uri = backRef.current.toDataURL(); // Adjust the pixel ratio for higher resolution
  //     downloadURI(uri, "backTshirt.png");
  //   }
  // };
  // useEffect(() => {
  //   if (readyToExport) {
  //     handleExport();
  //     dispatch(canvasActions.readyToExportToggle("0"));
  //   }
  // }, [readyToExport]);

  return (
    <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:items-start">
      <div className="flex gap-6 md:flex-col">
        <div
          onClick={() => dispatch(canvasActions.setActiveSide("front"))}
          className={`flex w-14 cursor-pointer items-center justify-center overflow-hidden rounded-xl ${currentArticle.active === "front" ? "outline-solid outline outline-2 outline-blue-500" : ""}`}
        >
          <img src={currentArticle.articleFrontSideInfo.src} alt="" />
        </div>
        {currentArticle.articleBackSideInfo != null && (
          <>
            <div
              onClick={() => dispatch(canvasActions.setActiveSide("back"))}
              className={`flex w-14 cursor-pointer items-center justify-center overflow-hidden rounded-xl ${currentArticle.active === "back" ? "outline-solid outline outline-2 outline-blue-500" : ""}`}
            >
              <img src={currentArticle.articleBackSideInfo.src} alt="" />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
        <Canvas />
      </div>
    </div>
  );
}

export default MiddleSideCustomize;
