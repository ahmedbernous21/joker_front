import LeftSideCustomize from "../../components/leftSideCustomize/LeftSideCustomize";
import RightSection from "../../components/rightSection/RightSection";
import MiddleSideCustomize from "../../components/middleSideCustomize/MiddleSideCustomize";
import FabricCanvas from "../../components/fabricCanvas/FabricCanvas";
import MiddleDesignSection from "../../components/middleDesignSection/MiddleDesignSection";

const Design = () => {
  return (
    <div className="bg-gray-50">
      <div
        className="container flex flex-wrap items-center justify-center gap-12 py-12 md:py-6 xl:my-0"
        style={{ minHeight: "calc(100vh - 109px)" }}
      >
        <LeftSideCustomize />
        {/* <MiddleSideCustomize /> */}
        <MiddleDesignSection />
        {/* <FabricCanvas /> */}

        <RightSection />
      </div>
    </div>
  );
};
export default Design;
