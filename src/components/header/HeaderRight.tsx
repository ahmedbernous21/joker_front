import { HashLink } from "react-router-hash-link";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import CartAndSearch from "./HeaderIcon";
import {
  MdDashboardCustomize,
  MdShoppingCart,
  MdCall,
  MdHome,
  MdAdd,
} from "react-icons/md";

interface NavLink {
  name: string;
  link: string;
}

interface MobileNavLink {
  name: string;
  link: string;
  icon: JSX.Element;
}

const navLinks: NavLink[] = [
  { name: "Acceuil", link: "/" },
  { name: "À propos", link: "/#about" },
  { name: "Services", link: "/#services" },
  { name: "shop", link: "/shop" },
  { name: "Contact", link: "/contact" },
];

const mobileNavLinks: MobileNavLink[] = [
  { name: "Home", link: "/", icon: <MdHome /> },
  { name: "shop", link: "/shop", icon: <MdDashboardCustomize /> },
  { name: "Nos services", link: "/#services", icon: <MdAdd /> },
  { name: "Cart", link: "/cart", icon: <MdShoppingCart /> },
  { name: "Contact", link: "/contact", icon: <MdCall /> },
];

const HeaderRight = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // helper function to check active section
  const isActive = (link: string): boolean => {
    const [path, hash] = link.split("#");
    if (link === "/") {
      return location.pathname === "/" && !location.hash && !activeSection;
    }
    if (activeSection && hash === activeSection) {
      return true;
    }
    if (hash) {
      return (
        location.pathname === path &&
        location.hash === `#${hash}` &&
        !activeSection
      );
    }
    return location.pathname === link;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(true);
        setTimeout(() => setIsMenuVisible(false), 5000);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("");
  };

  return (
    <>
      <ul className="hidden sm:gap-6 lg:flex lg:items-center lg:justify-center lg:px-9">
        {navLinks.map((section) => (
          <li key={section.link} className="p-2">
            <HashLink
              to={section.link}
              className={classNames(
                "font-medium capitalize duration-300 hover:text-[#DB3F40]",
                {
                  "text-[#DB3F40]": isActive(section.link),
                },
              )}
            >
              {section.name}
            </HashLink>
          </li>
        ))}
      </ul>

      <div className="hidden lg:block">
        <CartAndSearch />
      </div>

      {/* mobile bottom nav*/}
      <nav
        ref={menuRef}
        className={classNames(
          "fixed bottom-0 left-0 right-0 z-50 border-t border-[#f9f9f9] bg-[#fffdfd] transition-transform duration-500 ease-in-out lg:hidden",
        )}
      >
        <ul className="flex items-center justify-around py-4">
          {mobileNavLinks.map((section) => (
            <li key={section.link}>
              <HashLink
                to={section.link}
                onClick={() => {
                  if (section.link === "/") handleHomeClick();
                }}
                className={classNames(
                  "flex items-center justify-center rounded-full p-3 duration-300 hover:bg-gray-100",
                  {
                    "text-[#DB3F40]": isActive(section.link),
                    "text-gray-500": !isActive(section.link),
                    "bg-red-200": section.name === "Nos services",
                  },
                )}
              >
                <section.icon.type
                  className={classNames(
                    "h-9 w-9",
                    isActive(section.link) ? "text-[#DB3F40]" : "text-gray-500",
                    {
                      "text-red-500": section.name === "Nos services",
                    },
                  )}
                />
              </HashLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default HeaderRight;
