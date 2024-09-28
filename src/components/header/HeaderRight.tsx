import { HashLink } from "react-router-hash-link";
import { useState, useEffect, useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import CartAndSearch from "./HeaderIcon";

interface NavLink {
  name: string;
  link: string;
  src: string;
}

const navLinks: NavLink[] = [
  { name: "Acceuil", link: "/" ,src: "sidebar1.svg"},
  { name: "À propos", link: "/#about" ,src: "sidebar2.svg"},
  { name: "Nos services", link: "/#services" ,src: "sidebar3.svg"},
  { name: "shop", link: "/shop" ,src: "sidebar5.svg"},
  { name: "Contact ", link: "/contact" ,src: "sidebar4.svg"},
];

const HeaderRight: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);

  const closeMenu = (): void => setIsMenuOpen(false);

  const isActive = (link: string): boolean => {
    if (link.startsWith("#")) {
      return location.hash === link; 
    }
    return location.pathname === link; 
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="lg:hidden flex justify-end pr-4 pt-4">
          <button className="cursor-pointer absolute top-8 right-8 text-2xl">
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={toggleMenu}
              aria-label="Open menu"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
      </div>

      <aside
        ref={menuRef}
        className={classNames(
          "fixed inset-0 z-40 w-64 h-screen pt-20 transition-transform  border-gray-200 bg-[#F9F9F9]",
          {
            "translate-x-0": isMenuOpen,
            "-translate-x-full": !isMenuOpen,
          }
        )}
      >
        <IoCloseOutline
            className="cursor-pointer text-4xl absolute top-4 right-6 "
            onClick={toggleMenu}
        />
        <ul className="space-y-3 font-medium pt-6">
          {navLinks.map((section) => (
            <li key={section.link}
              className={classNames(
                "p-2  gap-4 pl-10 flex",
                {
                  "bg-[#FBEBEB]": isActive(section.link),
                }
              )}
            >
              <img className="h-5" src={section.src} alt="section icon" />
              <HashLink
                onClick={closeMenu}
                to={section.link}
                className={classNames(
                  "flex items-center capitalize duration-300 hover:text-gray-600 "
                )}
              >
                {section.name}
              </HashLink>
            </li>
          ))}
        </ul>
        <div className="pl-10 pt-10">
          <CartAndSearch />
        </div>
      </aside>

      <ul className="hidden lg:flex sm:gap-6 lg:justify-center lg:items-center lg:px-9">
        {navLinks.map((section) => (
          <li key={section.link} className="p-2">
            <HashLink
              to={section.link}
              className={classNames(
                "capitalize duration-300 hover:text-[#DB3F40] font-medium",
                {
                  "text-red-500": isActive(section.link),
                }
              )}
            >
              {section.name}
            </HashLink>
          </li>
        ))}
      </ul>
      <div className={isMenuOpen ? "hidden" : "hidden lg:block "}>
        <CartAndSearch />
      </div>
    </>
  );
};

export default HeaderRight;
