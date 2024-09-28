import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <header className="relative w-full md:bg-[#F9F9F9] bg-[#F1F1F1] z-50">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 md:px-8 py-2">
        <HeaderLeft />
        <HeaderRight />
      </nav>
    </header>
  );
};

export default Header;
