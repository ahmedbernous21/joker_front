import { useState } from "react";
import DesignShop from "../../components/designShop/DesignShop";
import ColorPicker from "../../components/colorPicker/ColorPicker";
import CreateImage from "../../components/createImage/CreateImage";
import TextCustomize from "../../components/rightSectionCustomize/RightSectionCustomize";
import SubmitOrderButton from "../../components/submitOrderButton/SubmitOrderButton";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useSelector} from "react-redux";
import { IRootState } from "../../store/store";
import DeleteLayer from "../../components/deleteLayer/DeleteLayer";

const Shop = () => {
  const [quantity, setQuantity] = useState(1);
  const { selectedLayer } = useSelector((state: IRootState) => state.canvas);


  return (
    <div className="flex flex-col gap-5 px-5 py-8 md:p-1 lg:p-10 text-sm font-medium bg-[#f9f9f9] min-h-screen">
      {/* Heading */}
      <p className="hidden md:block pl-4 md:pl-9 text-lg md:text-xl lg:text-3xl font-semibold mb-4 lg:mb-6">
        Personnaliser ma commande
      </p>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Left Section - Design */}
        <div className="flex flex-1 justify-center pt-10 md:pt-20">
          <DesignShop />
        </div>

        {/* Right Section - Customization and Order Details */}
        <div className="flex flex-col gap-6 py-6 md:py-10 px-6 md:p-10 lg:p-10 rounded-lg bg-white">
          {/* Product Info */}
          <div className="flex justify-between items-center">
            <p className="text-lg md:text-xl font-semibold">T-shirts Sport</p>
            <p className="text-[#DB3F40] font-bold">1900Da</p>
          </div>

          {/* Customization Options */}
          <div className="flex flex-col gap-4">
            {/* Text Customization */}
            <p className="font-light">Texte</p>
            <TextCustomize />

            {/* Background Options */}
            <p className="font-light mt-2">Arrière-plan</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Color Picker */}
              <div className="flex cursor-pointer flex-col gap-2 p-3 rounded-lg bg-white border border-gray-500">
                <p className="font-medium">Couleur</p>
                <ColorPicker type="articleBackGround" />
              </div>

              {/* Image Upload and Delete Button */}
              <div className="flex items-center justify-between gap-2 pr-3 p-2 rounded-lg bg-white border border-gray-500">
                <p className="font-medium">Image</p>

                {/* Flexbox for Image and Delete Button */}
                <div className="flex items-center gap-2 justify-between">
                  <CreateImage />

                  {/* Conditionally render the delete button */}
                  {selectedLayer && selectedLayer.type === "image" && (
                 <DeleteLayer/>
                  )}
                </div>
              </div>
            </div>

            {/* Order Details */}
            <p className="font-light mt-2">Détails de la commande</p>

            {/* Size and Quantity - Two-column layout using grid */}
            <div className="grid grid-cols-2 gap-3 mb-2">
              {/* Size Selector */}
              <div className="flex flex-col gap-2 p-3 rounded-lg bg-white border border-gray-500">
                <p className="text-sm">Taille</p>
                <select
                  className="cursor-pointer rounded-lg outline-none bg-gray-50 p-2"
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
              <div className="flex items-center justify-center text-xl lg:text-2xl gap-3 p-3 rounded-lg bg-white border border-gray-500">
                <CiCircleMinus
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="h-6 w-6 lg:h-8 lg:w-8 cursor-pointer text-gray-400 hover:text-gray-800 transition-colors"
                />
                <p>{quantity}</p>
                <CiCirclePlus
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-6 w-6 lg:h-8 lg:w-8 cursor-pointer text-gray-400 hover:text-gray-800 transition-colors"
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
