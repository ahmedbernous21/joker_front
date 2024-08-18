import LeftSideCustomize from "../../components/leftSideCustomize/LeftSideCustomize";
import TshirtCanvas from "../../components/tshirtCanvas/TshirtCanvas";

const Home = () => {
  return (
    <div
      className="flex flex-wrap justify-center items-center gap-12 my-12 xl:my-0"
      style={{ minHeight: "calc(100vh - 63px)" }}
    >
      <LeftSideCustomize />
      <TshirtCanvas />
    </div>
  );
};
export default Home;
