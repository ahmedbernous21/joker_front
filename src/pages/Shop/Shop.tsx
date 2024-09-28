import { useState } from "react";
import DesignShop from "../../components/designShop/DesignShop";
import ColorPicker from "../../components/colorPicker/ColorPicker";
import CreateImage from "../../components/createImage/CreateImage";
import TextCustomize from "../../components/rightSectionCustomize/RightSectionCustomize";
import SubmitOrderButton from "../../components/submitOrderButton/SubmitOrderButton";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

const Shop = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col gap-5 p-10 text-sm font-medium lg:p-10 lg:text-lg bg-[#f9f9f9] min-h-screen">
      <p className="hidden md:block pl-9 text-xl lg:text-3xl font-semibold mb-6">Personnaliser ma commande</p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-1 justify-center pt-20">
          <DesignShop />
        </div>
        <div className="flex flex-col gap-10 py-10 p-20 lg:p-10 rounded-lg bg-white">
          <div className="flex justify-between">
            <p className="text-xl font-semibold">T-shirts Sport </p>
            <p className="text-[#DB3F40] font-bold">1900Da</p>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="font-light">Texte</p>
            <TextCustomize/>
            <p className="font-light mt-2">Arrière-plan</p>
            <div className="flex gap-5">
              <div className="flex cursor-pointer flex-col gap-3 rounded-lg p-3 bg-white border-gray-500 border">
                <p>Couleur</p>
                <ColorPicker type="articleBackGround" />
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 border border-gray-500">
                <p className="font-medium">Image</p>
                <CreateImage />
              </div>
            </div>
            <p className="font-light mt-2">Détails de la commande</p>
            <div className="flex gap-5 mb-2">
              <div className="flex flex-col gap-3 rounded-lg bg-white p-2 border border-gray-500">
                <p>Taille</p>
                <select
                  className="cursor-pointer rounded-lg  outline-none"
                  name="taille"
                  id="taille"
                >
                  <option value="L">L</option>
                  <option value="M">M</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg border border-gray-500 ">
              <CiCircleMinus 

        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
      />
      <p>{quantity}</p>
      <CiCirclePlus 
      onClick={() => setQuantity(quantity + 1)}
        className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-800 transition-colors"
      />
    </div>

            </div>
            <SubmitOrderButton/>
            {/* <button className="flex items-center justify-center gap-5 rounded-lg bg-[#141E46] p-5 text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.666 9.61H9.60601V15.82H6.42601V9.61H0.366011V6.73H6.42601V0.519998H9.60601V6.73H15.666V9.61Z"
                  fill="white"
                />
              </svg>
              Ajouter au panier
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
