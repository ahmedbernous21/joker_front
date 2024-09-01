import { useState } from "react";
import toast from "react-hot-toast";
import { canvasActions } from "../../store/slices/canvasSlice";
import { useDispatch } from "react-redux";
import httpClient from "../../httpClient";

interface OrderModelProps {
  setIsModelOpen: (isOpen: boolean) => void;
}
const OrderModel = ({ setIsModelOpen }: OrderModelProps) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };
  const createOrder = async () => {
    if (!selectedSize) {
      return toast.error("Please select a size");
    }
    try {
      const response = await httpClient.post("requests/", {
        size: selectedSize,
      });
      if (response) {
        console.log(response);
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during login");
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
          <p className="text-xl font-bold">Select T-Shirt Size</p>
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
          <p className="mt-4">Price: {"0 DZD"}</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(canvasActions.readyToExportToggle("1"))}
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
