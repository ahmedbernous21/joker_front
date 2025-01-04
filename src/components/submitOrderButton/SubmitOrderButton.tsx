import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SubmitOrderButtonProps {
  setIsModelOpen: (isOpen: boolean) => void;
}
const SubmitOrderButton = ({ setIsModelOpen }: SubmitOrderButtonProps) => {
  return (
    <>
      <button
        onClick={() => setIsModelOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#141E46] mb-24 px-4 py-2 text-white duration-300 hover:opacity-80"
      >
        <FontAwesomeIcon icon={faShoppingCart} />
        Order Now
      </button>
    </>
  );
};
export default SubmitOrderButton;
