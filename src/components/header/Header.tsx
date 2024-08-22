import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="relative bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between p-2">
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

        <div className="sm:hidden">
          {isMenuOpen ? (
            <>
              <div
                className="fixed inset-0 h-screen w-screen"
                onClick={toggleMenu}
              ></div>
              <FaX className="faX cursor-pointer relative" onClick={toggleMenu} />
            </>
          ) : (
            <FaBars className="faBars cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        <ul
          className={`menu absolute -bottom-32 right-2 w-[200px] flex-col gap-8 rounded-xl border sm:border-none border-gray-300 bg-white text-gray-700 duration-500 sm:static sm:flex sm:w-auto sm:flex-row sm:bg-transparent ${
            isMenuOpen
              ? "clip-open"
              : "clip-closed"
          }`}
        >
          {["about", "services", "contact"].map((section) => (
            <li key={section} className="p-2 hover:text-gray-900 sm:p-0">
              <HashLink
                onClick={toggleMenu}
                to={`/#${section}`}
                className="inline-block capitalize w-full duration-300 hover:text-blue-500"
              >
                {section}
              </HashLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
