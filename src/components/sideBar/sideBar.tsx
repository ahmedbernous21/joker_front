import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface MenuItem {
  label: string;
  href: string;
}

interface SideBarProps {
  title?: string;
  menuItems?: MenuItem[];
}

const SideBar: React.FC<SideBarProps> = ({
  title = "Admin Dashboard",
  menuItems = [],
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const sidebarRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const activeIndex = menuItems.findIndex(
    (item) => location.pathname === item.href,
  );

  const toggleSidebar = (): void => setIsOpen(!isOpen);

  const logoutHandler = async (): Promise<void> => {
    try {
      // const { data } = await fetch.post("/auth/logout");
      // toast.success(data.message);
      navigate("/admin/login");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-[2231331] w-64 min-w-64 transform bg-[#E3F0F5] transition-all duration-300 ease-in-out ${
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } lg:sticky lg:top-0 lg:translate-x-0`}
      >
        <div className="flex h-full flex-col justify-between overflow-y-auto py-8">
          <header className="flex flex-shrink-0 flex-col items-center gap-3">
            <img
              src="/avatar_placeholder.svg"
              width={80}
              height={80}
              alt="Avatar"
              className="rounded-full"
            />
            <h1 className="text-2xl font-semibold">Bonjour Kedash!</h1>
          </header>

          <nav className="mt-8 flex-grow overflow-y-auto">
            <ul className="relative">
              <div
                className="absolute h-12 w-full bg-[#79D0F1] transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateY(${activeIndex * 3}rem)`,
                }}
              ></div>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className={`relative z-10 block px-4 py-3 pl-10 ${
                      activeIndex === index
                        ? "font-semibold text-white"
                        : "font-normal hover:bg-[#79D0F1]/20"
                    }`}
                    onClick={() => isMobile && setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <footer className="mt-auto flex flex-shrink-0 flex-col items-center gap-6 lg:gap-12">
            <div className="relative inline-block h-32 w-32">
              <div
                className="absolute h-[5.5rem] w-[5.5rem] rounded-xl bg-[#EFF9FB]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                }}
              ></div>
              <img
                src="/joker_logo.png"
                width={128}
                height={128}
                alt="Exclusive Labs"
                className="relative z-10"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
            <button
              onClick={logoutHandler}
              className="w-3/4 rounded bg-blue-500 py-2 text-base text-white transition-colors hover:bg-blue-600"
            >
              Log Out
            </button>
          </footer>
        </div>
        <button
          ref={buttonRef}
          className="fixed left-full top-1/2 z-50 rounded-full bg-transparent p-2 backdrop-blur-lg lg:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <FaChevronLeft className="h-4 w-4 scale-150 transform" />
          ) : (
            <FaChevronRight className="h-4 w-4 scale-150 transform" />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </button>
      </aside>
    </>
  );
};

export default SideBar;
