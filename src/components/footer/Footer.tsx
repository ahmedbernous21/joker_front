import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaLinkedin, FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  
  return (
    <footer className="bg-[#DB3F40] px-4 py-10 text-white">
      <div className="container mx-auto grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Logo and Address Section */}
        <div className="flex flex-col items-center space-y-4 md:items-start">
          <img
            src="joker_logo.jpg"
            alt="Logo"
            className="h-16 w-16 rounded-lg"
          />
          <address className="text-center not-italic md:text-left">
            Commune de Azzaba, Skikda, <br />
            AN 2039
          </address>
          <nav className="mt-4 flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white transition-colors duration-200 hover:text-gray-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white transition-colors duration-200 hover:text-gray-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              aria-label="X (Twitter)"
              className="text-white transition-colors duration-200 hover:text-gray-300"
            >
              <FaSquareXTwitter size={24} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white transition-colors duration-200 hover:text-gray-300"
            >
              <FaLinkedin size={24} />
            </a>
          </nav>
        </div>

        <div className="grid-col-1 md:grid-col-3 sm:grid-col-2 grid gap-8 md:flex md:gap-16">
          <div>
            <h6 className="mb-4 font-medium">Services</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Aide
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Ma commande
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h6 className="mb-4 font-medium">Informations</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm">
        © 2024 Djoker Graphics. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
