import FrontTshirtCanvas from "./FrontTshirtCanvas";
import BackTshirtCanvas from "./BackTshirtCanvas";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { tShirtActions } from "../../store/slices/tShirtSlice";
import LeftSideSubmitButton from "../leftSideCustomize/LeftSideSubmitButton";

function TshirtCanvas() {
  const dispatch = useDispatch();
  const { readyToExport } = useSelector((state: IRootState) => state.tShirt);
  const frontTshirtStageRef = useRef(null);
  const backTshirtStageRef = useRef(null);

  function downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleExport = () => {
    if (frontTshirtStageRef.current) {
      const uri = frontTshirtStageRef.current.toDataURL(); // Adjust the pixel ratio for higher resolution
      downloadURI(uri, "frontTshirt.png");
    }
    if (backTshirtStageRef.current) {
      const uri = backTshirtStageRef.current.toDataURL(); // Adjust the pixel ratio for higher resolution
      downloadURI(uri, "backTshirt.png");
    }
  };
  useEffect(() => {
    if (readyToExport) {
      handleExport();
      dispatch(tShirtActions.readyToExportToggle("0"));
    }
  }, [readyToExport]);
  return (
    <div className="flex-col items-center justify-center gap-2 flex">
      <div className="flex flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
        <FrontTshirtCanvas stageRef={frontTshirtStageRef} />
        <BackTshirtCanvas stageRef={backTshirtStageRef} />
      </div>
    </div>
  );
}

export default TshirtCanvas;
