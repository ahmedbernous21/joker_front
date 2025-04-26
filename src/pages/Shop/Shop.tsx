import { useState } from "react";
import DesignShop from "../../components/designShop/DesignShop";
import ColorPicker from "../../components/colorPicker/ColorPicker";
import CreateImage from "../../components/createImage/CreateImage";
import TextCustomize from "../../components/rightSectionCustomize/RightSectionCustomize";
import SubmitOrderButton from "../../components/submitOrderButton/SubmitOrderButton";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import DeleteLayer from "../../components/deleteLayer/DeleteLayer";
import { FaTextHeight, FaPaintBrush, FaImage } from "react-icons/fa";
import SelectArticle from "../../components/SelectArticle/SelectArticle";
import { getCurrentArticle } from "../../store/selectors/canvasSelectors";
import OrderModel from "../../components/orderModel/OrderModel";
import { Article } from "../../interfaces/CanvasSliceInterfaces";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const { articles, selectedLayer } = useSelector(
    (state: IRootState) => state.canvas,
  );
  const [activeTab, setActiveTab] = useState("text");
  const currentArticle = useSelector((state: IRootState) =>
    getCurrentArticle(state),
  );
  const isExist = articles.find(
    (article: Article) =>
      article.articleName === location.pathname.split("/")[2],
  );

  if (!isExist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9f9f9] px-6 py-16">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
            <FaExclamationTriangle className="h-12 w-12 text-[#DB3F40]" />
          </div>

          <h2 className="mb-3 text-2xl font-bold text-gray-800">
            Article Not Found
          </h2>

          <p className="mb-8 text-gray-600">
            We couldn't find the article you're looking for. It may have been
            removed or the URL might be incorrect.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/design"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#DB3F40] px-6 py-3 font-medium text-white transition-all hover:bg-opacity-90"
            >
              <FaArrowLeft /> Browse Articles
            </Link>

            <Link
              to="/"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
            >
              Return to Home
            </Link>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          If you believe this is an error, please contact our support team.
        </p>
      </div>
    );
  }

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
  };
  return (
    <div className="flex min-h-screen flex-col gap-5 bg-[#f9f9f9] px-5 py-8 text-sm font-medium md:p-1 lg:p-10">
      {/* Heading */}
      <div className="flex items-center">
        <p className="mb-4 hidden flex-1 pl-4 text-lg font-semibold md:block md:pl-9 md:text-xl lg:mb-6 lg:text-3xl">
          Customize my order
        </p>
        <SelectArticle />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Left Section - Design */}
        <div className="flex flex-1 justify-center md:pt-20">
          <DesignShop />
        </div>

        {/* Right Section - Customization for Desktop */}
        <div className="hidden flex-col gap-6 rounded-lg bg-white px-6 py-6 md:flex md:p-10 md:py-10 lg:p-10">
          <DesktopCustomization
            article={currentArticle}
            quantity={quantity}
            selectedSize={selectedSize}
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
            setQuantity={setQuantity}
            handleSizeChange={handleSizeChange}
            selectedLayer={selectedLayer}
          />
        </div>

        {/* Customization for Mobile */}
        <div className="flex flex-col gap-1 sm:gap-4 md:hidden">
          {/* Tabs for switching between customization options */}
          <div className="flex justify-around border-b border-gray-300 pb-2">
            <button
              onClick={() => setActiveTab("text")}
              className={`p-2 ${activeTab === "text" ? "border-b-2 border-red-500" : ""}`}
            >
              <FaTextHeight className="mr-2 inline-block" />
              Text
            </button>
            <button
              onClick={() => setActiveTab("background")}
              className={`p-2 ${activeTab === "background" ? "border-b-2 border-red-500" : ""}`}
            >
              <FaPaintBrush className="mr-2 inline-block" />
              Background
            </button>
            <button
              onClick={() => setActiveTab("orderDetails")}
              className={`p-2 ${activeTab === "orderDetails" ? "border-b-2 border-red-500" : ""}`}
            >
              <FaImage className="mr-2 inline-block" />
              Image & Order
            </button>
          </div>

          {/* Conditional rendering based on active tab */}
          {activeTab === "text" && <TextCustomize />}
          {activeTab === "background" && (
            <div className="flex flex-col gap-4 p-4">
              <p className="mt-2 font-light">Color</p>
              <ColorPicker type="articleBackGround" />
            </div>
          )}
          {activeTab === "orderDetails" && (
            <div className="flex flex-col gap-4 p-4">
              <p className="font-light">Image</p>
              <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-500 bg-white p-2 pr-3">
                <p className="font-medium">Add Image</p>
                <div className="flex items-center gap-2">
                  <CreateImage />
                  {selectedLayer && selectedLayer.type === "image" && (
                    <DeleteLayer />
                  )}
                </div>
              </div>

              <p className="mt-4 font-light">Order Details</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2 border border-gray-500 p-3">
                  <p className="text-sm">Size</p>
                  <select
                    className="cursor-pointer rounded-lg bg-gray-50 p-2"
                    value={selectedSize}
                    onChange={handleSizeChange}
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
                <div className="flex items-center justify-center gap-3 border border-gray-500 p-3 text-xl">
                  <CiCircleMinus
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800"
                  />
                  <p>{quantity}</p>
                  <CiCirclePlus
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800"
                  />
                </div>
              </div>
            </div>
          )}
          <>
            <SubmitOrderButton setIsModelOpen={setIsModelOpen} />
            {isModelOpen && (
              <OrderModel
                setIsModelOpen={setIsModelOpen}
                price={currentArticle.articlePrice * quantity}
                preSelectedSize={selectedSize}
                quantity={quantity}
                currentArticle={currentArticle} 
              />
            )}
          </>
        </div>
      </div>
    </div>
  );
};

import { SelectedLayer } from "../../interfaces/CanvasSliceInterfaces";

interface DesktopCustomizationProps {
  article: Article; 
  quantity: number;
  selectedSize: string;
  isModelOpen: boolean;
  setIsModelOpen: (value: boolean) => void;
  setQuantity: (value: number) => void;
  handleSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedLayer: SelectedLayer | null;
}
const DesktopCustomization = ({
  article,
  quantity,
  selectedSize,
  isModelOpen,
  setIsModelOpen,
  setQuantity,
  handleSizeChange,
  selectedLayer,
}: DesktopCustomizationProps) => (
  <>
    <div className="flex items-center justify-between">
      <p className="text-lg font-semibold">{article.articleName}</p>
      <p className="font-bold text-[#DB3F40]">{article.articlePrice}Da</p>
    </div>
    <div className="flex flex-col gap-4">
      <p className="font-light">Text</p>
      <TextCustomize />
      <p className="mt-2 font-light">Background</p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="flex cursor-pointer flex-col gap-2 border border-gray-500 p-3">
          <p className="font-medium">Color</p>
          <ColorPicker type="articleBackGround" />
        </div>
        <div className="flex items-center justify-between gap-2 border border-gray-500 p-2 pr-3">
          <p className="font-medium">Image</p>
          <div className="flex items-center gap-2">
            <CreateImage />
            {selectedLayer && selectedLayer.type === "image" && <DeleteLayer />}
          </div>
        </div>
      </div>
      <p className="mt-2 font-light">Order Details</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-2 border border-gray-500 p-3">
          <p className="text-sm">Size</p>
          <select
            className="cursor-pointer rounded-lg bg-gray-50 p-2"
            value={selectedSize}
            onChange={handleSizeChange}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="flex items-center justify-center gap-3 border border-gray-500 p-3 text-xl">
          <CiCircleMinus
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800"
          />
          <p>{quantity}</p>
          <CiCirclePlus
            onClick={() => setQuantity(quantity + 1)}
            className="h-6 w-6 cursor-pointer text-gray-400 hover:text-gray-800"
          />
        </div>
      </div>
      <>
        <SubmitOrderButton setIsModelOpen={setIsModelOpen} />
        {isModelOpen && (
          <OrderModel
            setIsModelOpen={setIsModelOpen}
            price={article.articlePrice * quantity}
            preSelectedSize={selectedSize}
            quantity={quantity}
            currentArticle={article}
          />
        )}
      </>
    </div>
  </>
);

export default Shop;
