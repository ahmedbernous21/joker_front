import ColorPicker from "../colorPicker/ColorPicker";

const LeftSideHeader = () => {
  return (
    <>
      <p  className="text-center font-bold">Background</p>
      <ColorPicker type="articleBackGround" />
    </>
  );
};
export default LeftSideHeader;
