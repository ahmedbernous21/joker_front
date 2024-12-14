import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import httpClient from "../../httpClient";
import { IRootState } from "../../store/store";

interface OrderModelProps {
  setIsModelOpen: (isOpen: boolean) => void;
}

const OrderModel = ({ setIsModelOpen }: OrderModelProps) => {
  const { frontCanvas, backCanvas } = useSelector(
    (state: IRootState) => state.canvas,
  );

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [uuid, setUuid] = useState<string>(""); // Populate this with actual user UUID if available
  const [errorMessage, setErrorMessage] = useState("");

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const downloadFilesHandler = () => {
    if (frontCanvas) {
      downloadFile(frontCanvas.toDataURL(), "front");
    }
    if (backCanvas) {
      downloadFile(backCanvas.toDataURL(), "back");
    }
  };

  const downloadFile = (canvas: string, side: string) => {
    const link = document.createElement("a");
    link.download = `${side}.png`;
    link.href = canvas;
    link.click();
  };

  const createOrder = async () => {
    if (!selectedSize || !phone || !city || !name) {
      return toast.error("Please fill in all fields");
    }

    try {
      const response = await httpClient.post("requests/", {
        size: selectedSize,
        phone,
        city,
        name,
        uuid,
      });
      if (response) {
        console.log("Order created successfully:", response);
        // here is the request ..
        toast.success("Order created successfully!");
      }
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while creating the order",
      );
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
      onClick={() => setIsModelOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="container fixed mt-6 h-[80vh] w-[400px] overflow-auto rounded-2xl bg-white p-6 text-center sm:w-[50vw]"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-xl font-bold">Select Size</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                onClick={() => handleSizeSelection(size)}
                className={`rounded-lg border-2 px-4 py-2 ${
                  selectedSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                } transition duration-300 hover:bg-blue-500 hover:text-white`}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="mt-4">Selected Size: {selectedSize || "None"}</p>

          {/* Form Fields for Additional Information */}
          <div className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border p-2"
            />
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border p-2"
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-lg border p-2"
            />
            <input
              type="text"
              placeholder="UUID"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              className="w-full rounded-lg border p-2"
            />
          </div>

          <p className="mt-4">Price: {"0 DZD"}</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <div className="flex gap-2">
            <button
              onClick={downloadFilesHandler}
              className="mt-6 rounded-lg border border-blue-500 bg-white px-4 py-2 text-blue-500"
            >
              Download
            </button>
            <button
              onClick={createOrder}
              className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModel;
