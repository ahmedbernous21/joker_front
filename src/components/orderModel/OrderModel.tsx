import { useState, useEffect, useContext } from "react";
import httpClient from "../../httpClient";
import toast from "react-hot-toast";
import { ShopContext } from "../../contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import Loader from "../loaders/Loader";

// Define the response interface
interface OrderResponse {
  id: number | string;
  [key: string]: any; // For other properties that might be in the response
}

interface OrderModelProps {
  setIsModelOpen: (value: boolean) => void;
  price: number;
  preSelectedSize?: string;
  quantity?: number;
  currentArticle: any; // Add this prop
}

const OrderModel = ({
  setIsModelOpen,
  price,
  preSelectedSize = "",
  quantity = 1,
  currentArticle, // Add this prop
}: OrderModelProps) => {
  if (!currentArticle) {
    console.error("currentArticle is not defined in OrderModel");
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80">
        <div className="container fixed mt-6 h-[80vh] w-[90%] max-w-[500px] overflow-auto rounded-2xl bg-white p-6 text-center sm:w-[50vw]">
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl font-bold text-red-500">Error</h2>
            <p className="text-gray-600">There was an error loading the article data.</p>
            <button
              onClick={() => setIsModelOpen(false)}
              className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition duration-300 hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  const navigate = useNavigate();
  const { frontCanvas, backCanvas } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState<string>(preSelectedSize);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModelOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setIsModelOpen]);

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

    if (!phone.match(/^(0|(\+213))([567][0-9]{8}|[0-9]{9})$/)) {
      return toast.error("Please enter a valid Algerian phone number");
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Convert the canvas to base64 images
      const frontImage = frontCanvas ? frontCanvas.toDataURL() : null;
      const backImage = backCanvas ? backCanvas.toDataURL() : null;

      const orderData = {
        article: currentArticle.articleType || "t_shirt",
        size: selectedSize,
        phone,
        city,
        name,
        color: currentArticle.articleColor || "white",
        price: price || currentArticle.articlePrice,
        description: `Order for ${currentArticle.articleName}`,
        frontImage,
        backImage,
        text: currentArticle.articleFrontSide?.texts?.[0]?.text || "",
        creation_date: new Date().toISOString(),
        is_seen: false,
        state: "unseen",
        is_delivered: false,
        quantity: quantity,
      };

      console.log("Sending order data:", orderData);
      const response = await httpClient.post<OrderResponse>(
        "requests/",
        orderData,
      );

      if (response && response.id) {
        const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

        // Get smaller versions of the images for storage
        const frontImageThumbnail = frontCanvas
          ? frontCanvas.toDataURL("image/jpeg", 0.3)
          : null;
        const backImageThumbnail = backCanvas
          ? backCanvas.toDataURL("image/jpeg", 0.3)
          : null;

        savedOrders.push({
          id: response.id,
          date: new Date().toISOString(),
          name: currentArticle.articleName,
          articleType: currentArticle.articleType || "t_shirt",
          color: currentArticle.articleColor || "white",
          size: selectedSize,
          price,
          quantity,
          status: "processing",
          frontImage: frontImageThumbnail,
          backImage: backImageThumbnail,
        });

        localStorage.setItem("orders", JSON.stringify(savedOrders));

        toast.success("Order created successfully!");

        setTimeout(() => {
          setIsModelOpen(false);
          navigate("/my-orders/");
        }, 1500);
      }
    } catch (error: any) {
      console.error("Error creating order:", error);
      setErrorMessage(
        error.message || "An error occurred while creating the order",
      );
      toast.error("Failed to create order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/80"
      onClick={() => setIsModelOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="container fixed mt-6 h-[80vh] w-[90%] max-w-[500px] overflow-auto rounded-2xl bg-white p-6 text-center sm:w-[50vw]"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="text-2xl font-bold">Complete Your Order</h2>
          <p className="text-gray-600">Product: {currentArticle.articleName}</p>
          <p className="text-gray-600">Price: {price} DA</p>
          {quantity > 1 && (
            <p className="text-gray-600">Quantity: {quantity}</p>
          )}
          {preSelectedSize && (
            <p className="text-gray-600">Size: {preSelectedSize}</p>
          )}

          {!preSelectedSize && (
            <div className="mt-4 w-full">
              <p className="mb-2 text-left font-semibold">Select Size</p>
              <div className="mt-2 flex flex-wrap justify-center gap-4">
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
            </div>
          )}

          <div className="mt-6 w-full">
            <p className="mb-2 text-left font-semibold">Your Information</p>
            <div className="mt-2 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="City/Wilaya"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="mt-4 w-full rounded-lg bg-red-100 p-3 text-red-700">
              {errorMessage}
            </div>
          )}

          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setIsModelOpen(false)}
              className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition duration-300 hover:bg-gray-100 sm:w-1/2"
            >
              Cancel
            </button>
            <button
              onClick={createOrder}
              disabled={isLoading}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700 disabled:bg-blue-400 sm:w-1/2"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader
                    backgroundColor="transparent"
                    color="white"
                    className="mr-2 h-5 w-5"
                  />
                  Processing...
                </div>
              ) : (
                "Submit Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModel;
