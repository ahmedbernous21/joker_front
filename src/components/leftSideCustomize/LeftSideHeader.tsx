import ColorPicker from "../colorPicker/ColorPicker";

const LeftSideHeader = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-center font-bold">Tshirt </p>
      <div className="flex relative flex-wrap items-center justify-center gap-4">
        <ColorPicker type="" id="" />
      </div>
    </div>
  );
};  
export default LeftSideHeader;
