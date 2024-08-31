import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

const Header = () => {
  return (
    <header className="relative bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-2">
        <HeaderLeft />
        <HeaderRight />
      </nav>
    </header>
  );
};

export default Header;
