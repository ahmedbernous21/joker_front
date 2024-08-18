import ColorPicker from "../colorPicker/ColorPicker";

const LeftSideHeader = () => {

  return (
    <div className="">
      <p className="text-center font-bold">Tshirt </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <p className="my-2 text-center font-bold">canvas backgroundColor</p>
        <ColorPicker type="" />
      </div>      
    </div>
  );
};
export default LeftSideHeader;
