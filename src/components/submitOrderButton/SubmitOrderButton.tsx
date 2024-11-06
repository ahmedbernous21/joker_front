import { useState } from "react";
import OrderModel from "../orderModel/OrderModel";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SubmitOrderButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModelOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#141E46] px-4 py-2 text-white duration-300 hover:opacity-80"
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        Order Now
      </button>
      {isModelOpen && <OrderModel setIsModelOpen={setIsModelOpen} />}
    </>
  );
};
export default SubmitOrderButton;
