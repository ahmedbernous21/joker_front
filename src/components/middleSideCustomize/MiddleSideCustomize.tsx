import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { canvasActions } from "../../store/slices/canvasSlice";
import Canvas from "../canvas/Canvas";

function MiddleSideCustomize() {
  const dispatch = useDispatch();
  const { readyToExport } = useSelector((state: IRootState) => state.canvas);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const { articles, selectedArticleIndex } = useSelector(
    (state: IRootState) => state.canvas,
  );
  function downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    if (frontRef.current) {
      const uri = frontRef.current.toDataURL(); // Adjust the pixel ratio for higher resolution
      downloadURI(uri, "frontTshirt.png");
    }
    if (backRef.current) {
      const uri = backRef.current.toDataURL(); // Adjust the pixel ratio for higher resolution
      downloadURI(uri, "backTshirt.png");
    }
  };
  useEffect(() => {
    if (readyToExport) {
      handleExport();
      dispatch(canvasActions.readyToExportToggle("0"));
    }
  }, [readyToExport]);

  return (
    <div className="flex flex-col-reverse  items-center md:items-start  gap-6 md:flex-row">
      <div className="flex md:flex-col gap-6">
        <div
          onClick={() => dispatch(canvasActions.setActiveSide("front"))}
          className={`flex w-14 cursor-pointer items-center justify-center overflow-hidden rounded-xl ${articles[selectedArticleIndex].active === "front" ? "outline-solid outline outline-2 outline-blue-500" : ""}`}
        >
          <img src={articles[selectedArticleIndex].firstImage.src} alt="" />
        </div>
        {articles[selectedArticleIndex].secondImage != null && (
          <>
            <div
              onClick={() => dispatch(canvasActions.setActiveSide("back"))}
              className={`flex w-14 cursor-pointer items-center justify-center overflow-hidden rounded-xl ${articles[selectedArticleIndex].active === "back" ? "outline-solid outline outline-2 outline-blue-500" : ""}`}
            >
              <img
                src={articles[selectedArticleIndex].secondImage.src}
                alt=""
              />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
        <Canvas stageRef={frontRef} />
      </div>
    </div>
  );
}

export default MiddleSideCustomize;
