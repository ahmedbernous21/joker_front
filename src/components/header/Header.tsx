const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-2">
        <div className="flex items-center">
          <img
            src="/public/joker_logo.jpg"
            alt="Joker Graphics Logo"
            className="mr-3 h-20 w-20"
          />
          <span className="text-2xl font-semibold text-gray-800">
            Joker Graphics
          </span>
        </div>
        <ul className="flex gap-8 text-gray-700">
          <li className="hover:text-gray-900">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-gray-900">
            <a href="#services">Services</a>
          </li>
          <li className="hover:text-gray-900">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
