interface ExportCompProps {
  stageRef: any;
}

const ExportComp = ({ stageRef }: ExportCompProps) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const img = new window.Image();
      img.src = reader.result;
      img.onload = () => {
        setImage(img);
      };
    };
    reader.readAsDataURL(file);
  };
  const exportToImage = () => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.href = uri;
    link.download = "canvas-image.png";
    link.click();
  };

  return (
    <div className="fixed bottom-12 right-12 rounded-xl bg-blue-500 px-6 py-2 text-white">
      <input type="file" onChange={handleFileChange} className="hidden" />
      <button onClick={exportToImage}>Export as Image</button>
    </div>
  );
};
export default ExportComp;
