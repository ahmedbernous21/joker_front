const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-6">
        <div className="text-2xl font-semibold text-gray-800">
          Joker Graphics
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
