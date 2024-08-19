import LeftSideCustomize from "../../components/leftSideCustomize/LeftSideCustomize";
import TshirtCanvas from "../../components/tshirtCanvas/TshirtCanvas";

const Design = () => {
  return (
    <div
      className="my-12 flex flex-wrap items-center justify-center gap-12 xl:my-0"
      style={{ minHeight: "calc(100vh - 63px)" }}
    >
      <LeftSideCustomize />
      <TshirtCanvas />
    </div>
  );
};
export default Design;
