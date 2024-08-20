import { useState } from "react";
import Model from "../model/Model";

const LeftSideSubmitButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModelOpen(true)}
        className="rounded-lg bg-blue-500 px-4 py-2 text-white duration-300 hover:opacity-80 w-full "
      >
        Submit
      </button>
      {isModelOpen && <Model setIsModelOpen={setIsModelOpen} />}
    </>
  );
};
export default LeftSideSubmitButton;
