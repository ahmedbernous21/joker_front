import BackTextCustomizeSection from "../backTextCustomizeSection/BackTextCustomizeSection";
import FrontTextCustomizeSection from "../frontTextCustomizeSection/FrontTextCustomizeSection";
import LeftSideHeader from "./LeftSideHeader";
import LeftSideSubmitButton from "./LeftSideSubmitButton";

const LeftSideCustomize = () => {
  return (
    <div className="flex flex-col gap-4 md:mx-0 mx-4">
      <div className="relative flex h-[470px] max-w-[600px] flex-col items-center justify-center overflow-auto rounded-xl bg-white p-4 px-6 text-center text-black">
        <div className="flex flex-col">
          <LeftSideHeader />
        </div>
        <FrontTextCustomizeSection />
        <BackTextCustomizeSection />
      </div>
      <LeftSideSubmitButton />
    </div>
  );
};
export default LeftSideCustomize;
