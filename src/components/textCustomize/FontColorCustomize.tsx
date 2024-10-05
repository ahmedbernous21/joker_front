import ColorPicker from "../colorPicker/ColorPicker";

const TextColorCustomize = () => {
  return (
    <div className="flex flex-col gap-2 overflow-x-hidden">
      <div className="relative">
        <ColorPicker type="text" />
      </div>
    </div>
  );
};

export default TextColorCustomize;
