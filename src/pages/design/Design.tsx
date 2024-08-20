import LeftSideCustomize from "../../components/leftSideCustomize/LeftSideCustomize";
import RightSection from "../../components/rightSection/RightSection";
import TshirtCanvas from "../../components/tshirtCanvas/TshirtCanvas";

const Design = () => {
  return (
    <div
      className="my-12 flex flex-wrap items-center justify-center bg-gray-50 gap-12 xl:my-0"
      style={{ minHeight: "calc(100vh - 108px)" }}
    >
      <LeftSideCustomize />
      <TshirtCanvas />
      <RightSection />
    </div>
  );
};
export default Design;
