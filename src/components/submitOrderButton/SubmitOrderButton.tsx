import { useState } from "react";
import OrderModel from "../orderModel/OrderModel";

const SubmitOrderButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModelOpen(true)}
        className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#141E46] px-4 py-2 text-white duration-300 hover:opacity-80"
      >
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
        Ajouter  au panier
      </button>
      {isModelOpen && <OrderModel setIsModelOpen={setIsModelOpen} />}
    </>
  );
};
export default SubmitOrderButton;
