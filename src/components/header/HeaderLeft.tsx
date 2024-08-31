import { Link } from "react-router-dom";

const HeaderLeft = () => {
  return (
    <Link to="/" className="flex items-center">
      <img
        src="/joker_logo.jpg"
        alt="Joker Graphics Logo"
        className="mr-3 h-20 w-20"
      />
      <span className="text-lg font-semibold text-gray-800 sm:text-2xl">
        Joker Graphics
      </span>
    </Link>
  );
};
export default HeaderLeft;
