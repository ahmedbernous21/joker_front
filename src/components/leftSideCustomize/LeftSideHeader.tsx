import ColorPicker from "../colorPicker/ColorPicker";


const LeftSideHeader = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-center font-bold">Tshirt Background</p>
      <ColorPicker id={null} type="bgCanvas" />
    </div>
  );
};
export default LeftSideHeader;
