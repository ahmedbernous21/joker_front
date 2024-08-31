import { HashLink } from "react-router-hash-link";
import { useState } from "react";
import { FaBars, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HeaderRight = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  return (
    <>
      <div className="sm:hidden">
        {isMenuOpen ? (
          <>
            <div
              className="fixed inset-0 h-screen w-screen"
              onClick={toggleMenu}
            ></div>
            <FaX className="faX relative cursor-pointer" onClick={toggleMenu} />
          </>
        ) : (
          <FaBars className="faBars cursor-pointer" onClick={toggleMenu} />
        )}
      </div>

      <ul
        className={`menu absolute -bottom-32 right-2 w-[200px] flex-col gap-8 rounded-xl border border-gray-300 bg-white text-gray-700 duration-500 sm:static sm:flex sm:w-auto sm:flex-row sm:border-none sm:bg-transparent ${
          isMenuOpen ? "clip-open" : "clip-closed"
        }`}
      >
        {[
          { name: "about", link: "/#about" },
          { name: "services", link: "/#services" },
          { name: "contact", link: "/#contact" },
          // { name: "login", link: "/kedache/" },
        ].map((section) => (
          <li key={section.link} className="p-2 hover:text-gray-900 sm:p-0">
            <HashLink
              onClick={toggleMenu}
              to={section.link}
              className="inline-block w-full capitalize duration-300 hover:text-blue-500"
            >
              {section.name}
            </HashLink>
          </li>
        ))}
      </ul>
    </>
  );
};
export default HeaderRight;
