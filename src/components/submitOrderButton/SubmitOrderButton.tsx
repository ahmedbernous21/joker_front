import { useState } from "react";
import OrderModel from "../orderModel/OrderModel";

const SubmitOrderButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModelOpen(true)}
        className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white duration-300 hover:opacity-80"
      >
        Submit
      </button>
      {isModelOpen && <OrderModel setIsModelOpen={setIsModelOpen} />}
    </>
  );
};
export default SubmitOrderButton;
