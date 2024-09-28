import ColorPicker from "../colorPicker/ColorPicker";

const TextColorCustomize = () => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium">Couleur</p>
      <div className="relative">
        <ColorPicker type="text" />
      </div>
    </div>
  );
};
export default TextColorCustomize;
