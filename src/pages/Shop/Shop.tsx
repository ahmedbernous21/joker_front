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

const Shop = () => {
  const [quantity, setQuantity] = useState(1);
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);

  return (
    <div className="flex min-h-screen flex-col gap-5 bg-[#f9f9f9] px-5 py-8 text-sm font-medium md:p-1 lg:p-10">
      {/* Heading */}
      <p className="mb-4 hidden pl-4 text-lg font-semibold md:block md:pl-9 md:text-xl lg:mb-6 lg:text-3xl">
        Customize my order
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Left Section - Design */}
        <div className="flex flex-1 justify-center pt-10 md:pt-20">
          <DesignShop />
        </div>

        {/* Right Section - Customization and Order Details */}
        <div className="flex flex-col gap-6 rounded-lg bg-white px-6 py-6 md:p-10 md:py-10 lg:p-10">
          {/* Product Info */}
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold md:text-xl">T-shirts Sport</p>
            <p className="font-bold text-[#DB3F40]">1900Da</p>
          </div>

          {/* Customization Options */}
          <div className="flex flex-col gap-4">
            {/* Text Customization */}
            <p className="font-light">Texte</p>
            <TextCustomize />

            {/* Background Options */}
            <p className="mt-2 font-light">Arrière-plan</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Color Picker */}
              <div className="bg-grey flex cursor-pointer flex-col gap-2 rounded-lg border border-gray-500 p-3">
                <p className="font-medium">Couleur</p>
                <ColorPicker type="articleBackGround" />
              </div>

              {/* Image Upload and Delete Button */}
              <div className="flex items-center justify-between gap-2 rounded-lg border border-gray-500 bg-white p-2 pr-3">
                <p className="font-medium">Image</p>

                {/* Flexbox for Image and Delete Button */}
                <div className="flex items-center justify-between gap-2">
                  <CreateImage />

                  {/* Conditionally render the delete button */}
                  {selectedLayer && selectedLayer.type === "image" && (
                    <DeleteLayer />
                  )}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <p className="mt-2 font-light">Détails de la commande</p>

            {/* Size and Quantity - Two-column layout using grid */}
            <div className="mb-2 grid grid-cols-2 gap-3">
              {/* Size Selector */}
              <div className="flex flex-col gap-2 rounded-lg border border-gray-500 bg-white p-3">
                <p className="text-sm">Taille</p>
                <select
                  className="cursor-pointer rounded-lg bg-gray-50 p-2 outline-none"
                  name="taille"
                  id="taille"
                >
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-center gap-3 rounded-lg border border-gray-500 bg-white p-3 text-xl lg:text-2xl">
                <CiCircleMinus
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="h-6 w-6 cursor-pointer text-gray-400 transition-colors hover:text-gray-800 lg:h-8 lg:w-8"
                />
                <p>{quantity}</p>
                <CiCirclePlus
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-6 w-6 cursor-pointer text-gray-400 transition-colors hover:text-gray-800 lg:h-8 lg:w-8"
                />
              </div>
            </div>

            {/* Submit Order Button */}
            <SubmitOrderButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
